#!/usr/bin/env node
/**
 * Featurebase Help Center Sync Script
 * 
 * Syncs Mintlify docs to Featurebase Help Center automatically.
 * - Creates collections matching the docs.json navigation hierarchy
 * - Creates/updates/deletes articles with proper parent collections
 * - Tracks IDs in .featurebase-mapping.json
 * 
 * External URL: Configure your custom domain (docs.triform.ai) in Featurebase
 * settings. Featurebase will auto-generate externalUrl for all articles.
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { marked } from 'marked';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DOCS_ROOT = path.resolve(__dirname, '..');

// Configuration
const FEATUREBASE_API_URL = 'https://do.featurebase.app/v2/help_center';
const MAPPING_FILE = path.join(DOCS_ROOT, '.featurebase-mapping.json');
const DOCS_JSON = path.join(DOCS_ROOT, 'docs.json');
const DOCS_BASE_URL = 'https://docs.triform.ai';

// Get API key from environment
const API_KEY = process.env.FEATUREBASE_API_KEY;

// CLI flags
const DRY_RUN = process.argv.includes('--dry-run');
const VERBOSE = process.argv.includes('--verbose') || process.argv.includes('-v');

// Rate limiting
const RATE_LIMIT_DELAY = 500; // ms between API calls

/**
 * Load the docs.json navigation config
 */
async function loadDocsConfig() {
  const content = await fs.readFile(DOCS_JSON, 'utf-8');
  return JSON.parse(content);
}

/**
 * Build a hierarchical structure from navigation groups
 * Returns: { collections: [...], articles: [...] }
 */
function parseNavigationHierarchy(groups) {
  const collections = []; // { name, path, parentPath }
  const articles = [];    // { pagePath, collectionPath }
  
  function processItem(item, parentCollectionPath = null) {
    if (typeof item === 'string') {
      // It's an article page path
      articles.push({
        pagePath: item,
        collectionPath: parentCollectionPath,
      });
    } else if (item && typeof item === 'object' && item.group) {
      // It's a nested group (sub-collection)
      const collectionPath = parentCollectionPath 
        ? `${parentCollectionPath}/${item.group}`
        : item.group;
      
      collections.push({
        name: item.group,
        path: collectionPath,
        parentPath: parentCollectionPath,
      });
      
      if (item.pages) {
        item.pages.forEach(subItem => processItem(subItem, collectionPath));
      }
    }
  }
  
  // Process top-level groups
  groups.forEach(group => {
    const collectionPath = group.group;
    
    collections.push({
      name: group.group,
      path: collectionPath,
      parentPath: null,
    });
    
    if (group.pages) {
      group.pages.forEach(item => processItem(item, collectionPath));
    }
  });
  
  return { collections, articles };
}

/**
 * Load and parse an MDX file
 */
async function loadMdxFile(pagePath) {
  const filePath = path.join(DOCS_ROOT, `${pagePath}.mdx`);
  
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const { data: frontmatter, content: body } = matter(content);
    
    return {
      path: pagePath,
      filePath,
      title: frontmatter.title || pagePath.split('/').pop(),
      description: frontmatter.description || '',
      body,
      contentHash: crypto.createHash('md5').update(content).digest('hex'),
    };
  } catch (error) {
    if (error.code === 'ENOENT') {
      // Try .md extension
      try {
        const mdPath = path.join(DOCS_ROOT, `${pagePath}.md`);
        const content = await fs.readFile(mdPath, 'utf-8');
        const { data: frontmatter, content: body } = matter(content);
        
        return {
          path: pagePath,
          filePath: mdPath,
          title: frontmatter.title || pagePath.split('/').pop(),
          description: frontmatter.description || '',
          body,
          contentHash: crypto.createHash('md5').update(content).digest('hex'),
        };
      } catch {
        console.warn(`⚠️  File not found: ${pagePath}.mdx or ${pagePath}.md`);
        return null;
      }
    }
    throw error;
  }
}

/**
 * Convert markdown to HTML
 */
function markdownToHtml(markdown) {
  return marked.parse(markdown);
}

/**
 * Load the mapping file
 */
async function loadMapping() {
  try {
    const content = await fs.readFile(MAPPING_FILE, 'utf-8');
    return JSON.parse(content);
  } catch {
    return { articles: {}, collections: {} };
  }
}

/**
 * Save the mapping file
 */
async function saveMapping(mapping) {
  await fs.writeFile(MAPPING_FILE, JSON.stringify(mapping, null, 2));
}

/**
 * Delay helper for rate limiting
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Make an API request to Featurebase
 */
async function featurebaseRequest(method, endpoint, body = null) {
  const url = `${FEATUREBASE_API_URL}${endpoint}`;
  
  const options = {
    method,
    headers: {
      'X-API-Key': API_KEY,
      'Content-Type': 'application/json',
    },
  };
  
  if (body) {
    options.body = JSON.stringify(body);
  }
  
  if (VERBOSE) {
    console.log(`  → ${method} ${url}`);
    if (body) console.log(`    Body: ${JSON.stringify(body).slice(0, 200)}...`);
  }
  
  const response = await fetch(url, options);
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Featurebase API error: ${response.status} ${response.statusText}\n${errorText}`);
  }
  
  if (response.status === 204) {
    return null;
  }
  
  return response.json();
}

// ============================================================================
// COLLECTIONS API
// ============================================================================

/**
 * Create a collection
 */
async function createCollection(name, parentId = null) {
  const payload = {
    name,
  };
  
  if (parentId) {
    payload.parentId = parentId;
  }
  
  if (DRY_RUN) {
    console.log(`  [DRY-RUN] Would create collection: ${name}`);
    return { collectionId: `dry-run-collection-${name}` };
  }
  
  return featurebaseRequest('POST', '/collections', payload);
}

/**
 * Update a collection
 */
async function updateCollection(collectionId, name, parentId = null) {
  const payload = { name };
  
  if (parentId) {
    payload.parentId = parentId;
  }
  
  if (DRY_RUN) {
    console.log(`  [DRY-RUN] Would update collection: ${name} (${collectionId})`);
    return { collectionId };
  }
  
  return featurebaseRequest('PATCH', `/collections/${collectionId}`, payload);
}

/**
 * Delete a collection
 */
async function deleteCollection(collectionId) {
  if (DRY_RUN) {
    console.log(`  [DRY-RUN] Would delete collection: ${collectionId}`);
    return;
  }
  
  return featurebaseRequest('DELETE', `/collections/${collectionId}`);
}

// ============================================================================
// ARTICLES API
// ============================================================================

/**
 * Create a new article
 */
async function createArticle(doc, parentId = null) {
  const html = markdownToHtml(doc.body);
  
  const payload = {
    title: doc.title,
    description: doc.description,
    body: html,
    formatter: 'ai', // Use AI formatter to convert to Featurebase format
    state: 'live',
  };
  
  if (parentId) {
    payload.parentId = parentId;
  }
  
  if (DRY_RUN) {
    console.log(`  [DRY-RUN] Would create article: ${doc.title}${parentId ? ` (in collection ${parentId})` : ''}`);
    return { articleId: `dry-run-${doc.path}` };
  }
  
  return featurebaseRequest('POST', '/articles', payload);
}

/**
 * Update an existing article
 */
async function updateArticle(articleId, doc, parentId = null) {
  const html = markdownToHtml(doc.body);
  
  const payload = {
    title: doc.title,
    description: doc.description,
    body: html,
    state: 'live',
  };
  
  if (parentId) {
    payload.parentId = parentId;
  }
  
  if (DRY_RUN) {
    console.log(`  [DRY-RUN] Would update article: ${doc.title} (${articleId})`);
    return { articleId };
  }
  
  return featurebaseRequest('PATCH', `/articles/${articleId}`, payload);
}

/**
 * Delete an article
 */
async function deleteArticle(articleId) {
  if (DRY_RUN) {
    console.log(`  [DRY-RUN] Would delete article: ${articleId}`);
    return;
  }
  
  return featurebaseRequest('DELETE', `/articles/${articleId}`);
}

// ============================================================================
// SYNC LOGIC
// ============================================================================

/**
 * Sync collections from navigation hierarchy
 */
async function syncCollections(collections, mapping) {
  console.log('📁 Syncing collections...\n');
  
  const processedPaths = new Set();
  let created = 0;
  let unchanged = 0;
  let errors = 0;
  
  // Sort collections so parents are created before children
  const sortedCollections = [...collections].sort((a, b) => {
    const depthA = (a.path.match(/\//g) || []).length;
    const depthB = (b.path.match(/\//g) || []).length;
    return depthA - depthB;
  });
  
  for (const collection of sortedCollections) {
    processedPaths.add(collection.path);
    
    const existing = mapping.collections[collection.path];
    
    // Get parent collection ID if this is a nested collection
    let parentId = null;
    if (collection.parentPath && mapping.collections[collection.parentPath]) {
      parentId = mapping.collections[collection.parentPath].collectionId;
    }
    
    try {
      if (!existing) {
        console.log(`  📁 Creating collection: ${collection.name}`);
        const result = await createCollection(collection.name, parentId);
        
        mapping.collections[collection.path] = {
          collectionId: result.collectionId,
          name: collection.name,
          parentPath: collection.parentPath,
        };
        created++;
        await delay(RATE_LIMIT_DELAY);
      } else {
        if (VERBOSE) {
          console.log(`  ⏭️  Collection exists: ${collection.name}`);
        }
        unchanged++;
      }
    } catch (error) {
      console.error(`  ❌ Error creating collection ${collection.name}: ${error.message}`);
      errors++;
    }
  }
  
  // Delete removed collections (children first, then parents)
  const collectionsToDelete = Object.entries(mapping.collections)
    .filter(([path]) => !processedPaths.has(path))
    .sort((a, b) => {
      const depthA = (a[0].match(/\//g) || []).length;
      const depthB = (b[0].match(/\//g) || []).length;
      return depthB - depthA; // Deeper first
    });
  
  for (const [collPath, collInfo] of collectionsToDelete) {
    console.log(`  🗑️  Deleting collection: ${collInfo.name}`);
    try {
      await deleteCollection(collInfo.collectionId);
      delete mapping.collections[collPath];
      await delay(RATE_LIMIT_DELAY);
    } catch (error) {
      console.error(`  ❌ Error deleting collection ${collPath}: ${error.message}`);
      errors++;
    }
  }
  
  console.log(`\n  ✅ Collections: ${created} created, ${unchanged} unchanged, ${errors} errors\n`);
  
  return { created, unchanged, errors };
}

/**
 * Sync articles
 */
async function syncArticles(articles, mapping) {
  console.log('📄 Syncing articles...\n');
  
  const processedPaths = new Set();
  let created = 0;
  let updated = 0;
  let unchanged = 0;
  let deleted = 0;
  let errors = 0;
  
  for (const { pagePath, collectionPath } of articles) {
    processedPaths.add(pagePath);
    
    const doc = await loadMdxFile(pagePath);
    if (!doc) {
      errors++;
      continue;
    }
    
    const existing = mapping.articles[pagePath];
    
    // Get parent collection ID
    let parentId = null;
    if (collectionPath && mapping.collections[collectionPath]) {
      parentId = mapping.collections[collectionPath].collectionId;
    }
    
    try {
      if (!existing) {
        // New article
        console.log(`  ✨ Creating: ${doc.title}`);
        if (VERBOSE && parentId) {
          console.log(`     └─ In collection: ${collectionPath}`);
        }
        const result = await createArticle(doc, parentId);
        
        mapping.articles[pagePath] = {
          articleId: result.articleId,
          contentHash: doc.contentHash,
          title: doc.title,
          collectionPath,
          externalUrl: `${DOCS_BASE_URL}/${pagePath}`,
          lastSync: new Date().toISOString(),
        };
        created++;
      } else if (existing.contentHash !== doc.contentHash || existing.collectionPath !== collectionPath) {
        // Content or parent changed
        console.log(`  📝 Updating: ${doc.title}`);
        await updateArticle(existing.articleId, doc, parentId);
        
        mapping.articles[pagePath].contentHash = doc.contentHash;
        mapping.articles[pagePath].title = doc.title;
        mapping.articles[pagePath].collectionPath = collectionPath;
        mapping.articles[pagePath].externalUrl = `${DOCS_BASE_URL}/${pagePath}`;
        mapping.articles[pagePath].lastSync = new Date().toISOString();
        updated++;
      } else {
        if (VERBOSE) {
          console.log(`  ⏭️  Unchanged: ${doc.title}`);
        }
        unchanged++;
      }
      
      await delay(RATE_LIMIT_DELAY);
    } catch (error) {
      console.error(`  ❌ Error processing ${pagePath}: ${error.message}`);
      errors++;
    }
  }
  
  // Delete removed articles
  for (const [pagePath, articleInfo] of Object.entries(mapping.articles)) {
    if (!processedPaths.has(pagePath)) {
      console.log(`  🗑️  Deleting: ${articleInfo.title}`);
      
      try {
        await deleteArticle(articleInfo.articleId);
        delete mapping.articles[pagePath];
        deleted++;
        await delay(RATE_LIMIT_DELAY);
      } catch (error) {
        console.error(`  ❌ Error deleting ${pagePath}: ${error.message}`);
        errors++;
      }
    }
  }
  
  return { created, updated, unchanged, deleted, errors };
}

/**
 * Main sync function
 */
async function sync() {
  console.log('🔄 Starting Featurebase sync...\n');
  console.log(`📍 External URL base: ${DOCS_BASE_URL}`);
  console.log('   (Configure this as your custom domain in Featurebase settings)\n');
  
  if (!API_KEY) {
    console.error('❌ FEATUREBASE_API_KEY environment variable is required');
    process.exit(1);
  }
  
  if (DRY_RUN) {
    console.log('📋 Running in DRY-RUN mode - no changes will be made\n');
  }
  
  // Load configuration
  const docsConfig = await loadDocsConfig();
  const { collections, articles } = parseNavigationHierarchy(docsConfig.navigation.groups);
  const mapping = await loadMapping();
  
  console.log(`📚 Found ${collections.length} collections, ${articles.length} articles\n`);
  console.log('═'.repeat(50) + '\n');
  
  // Sync collections first
  const collStats = await syncCollections(collections, mapping);
  
  console.log('═'.repeat(50) + '\n');
  
  // Then sync articles
  const artStats = await syncArticles(articles, mapping);
  
  // Save updated mapping
  if (!DRY_RUN) {
    await saveMapping(mapping);
  }
  
  // Summary
  console.log('\n' + '═'.repeat(50));
  console.log('📊 Sync Summary');
  console.log('═'.repeat(50));
  console.log('Collections:');
  console.log(`   📁 Created:   ${collStats.created}`);
  console.log(`   ⏭️  Unchanged: ${collStats.unchanged}`);
  console.log('Articles:');
  console.log(`   ✨ Created:   ${artStats.created}`);
  console.log(`   📝 Updated:   ${artStats.updated}`);
  console.log(`   ⏭️  Unchanged: ${artStats.unchanged}`);
  console.log(`   🗑️  Deleted:   ${artStats.deleted}`);
  console.log('Errors:');
  console.log(`   ❌ Total:     ${collStats.errors + artStats.errors}`);
  console.log('═'.repeat(50));
  
  const totalErrors = collStats.errors + artStats.errors;
  if (totalErrors > 0) {
    console.log('\n⚠️  Completed with errors');
    process.exit(1);
  }
  
  console.log('\n✅ Sync completed successfully!');
  console.log(`\n💡 To enable external URLs (docs.triform.ai), configure your custom`);
  console.log(`   domain in Featurebase → Settings → Help Center → Custom Domain`);
}

// Run
sync().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
