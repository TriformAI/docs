#!/bin/bash
# generate_all_txt.sh - Concatenate all documentation into a single all.txt file
set -euo pipefail

OUTPUT_FILE="all.txt"

echo "Generating $OUTPUT_FILE from all documentation files..."

# Clear/create output file
> "$OUTPUT_FILE"

# Add header
cat >> "$OUTPUT_FILE" <<EOF
================================================================================
TRIFORM DOCUMENTATION - COMPLETE REFERENCE
================================================================================
Generated: $(date)
================================================================================

EOF

# Function to process a single MDX file
process_file() {
    local file="$1"
    local relative_path="${file#./}"
    
    # Add file separator
    echo "" >> "$OUTPUT_FILE"
    echo "================================================================================" >> "$OUTPUT_FILE"
    echo "FILE: $relative_path" >> "$OUTPUT_FILE"
    echo "================================================================================" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    
    # Add file content
    cat "$file" >> "$OUTPUT_FILE"
    
    echo "" >> "$OUTPUT_FILE"
}

# Process files in a logical order
echo "Processing documentation files..."

# 1. Main index
if [ -f "index.mdx" ]; then
    process_file "index.mdx"
fi

# 2. Getting Started
for file in getting-started/*.mdx; do
    [ -f "$file" ] && process_file "$file"
done

# 3. Tutorials
for file in tutorials/*.mdx; do
    [ -f "$file" ] && process_file "$file"
done

# 4. Triton
for file in triton/*.mdx; do
    [ -f "$file" ] && process_file "$file"
done

# 5. Workspace
find workspace -name "*.mdx" -type f | sort | while read -r file; do
    process_file "$file"
done

# 6. Concepts
for file in concepts/*.mdx; do
    [ -f "$file" ] && process_file "$file"
done

# Process concepts subdirectories
find concepts -mindepth 2 -name "*.mdx" -type f | sort | while read -r file; do
    process_file "$file"
done

# 7. Organizations
for file in orgs/*.mdx; do
    [ -f "$file" ] && process_file "$file"
done

# 8. Accounts
for file in accounts/*.mdx; do
    [ -f "$file" ] && process_file "$file"
done

# 9. Quotas
for file in quotas/*.mdx; do
    [ -f "$file" ] && process_file "$file"
done

# 10. Security
for file in security/*.mdx; do
    [ -f "$file" ] && process_file "$file"
done

# 11. API Reference
find api-reference -name "*.mdx" -type f | sort | while read -r file; do
    process_file "$file"
done

# 12. Roadmap
for file in roadmap/*.mdx; do
    [ -f "$file" ] && process_file "$file"
done

# 13. Changelog
for file in changelog/*.mdx; do
    [ -f "$file" ] && process_file "$file"
done

# 14. Community
for file in community/*.mdx; do
    [ -f "$file" ] && process_file "$file"
done

# 15. Support
for file in support/*.mdx; do
    [ -f "$file" ] && process_file "$file"
done

# 16. Legal
for file in legal/*.mdx; do
    [ -f "$file" ] && process_file "$file"
done

# 17. Appendix
for file in appendix/*.mdx; do
    [ -f "$file" ] && process_file "$file"
done

# Add footer
cat >> "$OUTPUT_FILE" <<EOF

================================================================================
END OF DOCUMENTATION
================================================================================
Total files processed: $(grep -c "^FILE:" "$OUTPUT_FILE" || echo "0")
Generated: $(date)
================================================================================
EOF

echo ""
echo "✅ Done! All documentation has been compiled to: $OUTPUT_FILE"
echo "📄 File size: $(du -h "$OUTPUT_FILE" | cut -f1)"
echo "📊 Total lines: $(wc -l < "$OUTPUT_FILE")"
echo ""

