#!/usr/bin/env bash
set -Eeuo pipefail

echo
echo "==========================================================="
echo "  Triform Docs: MkDocs → Mintlify porter"
echo "  - Reads from ./docs (MkDocs)"
echo "  - Writes to ./pages (Mintlify, .mdx)"
echo "  - Converts admonitions to Mintlify callouts"
echo "  - Writes mint.json (if missing)"
echo "==========================================================="
echo

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DOCS="$ROOT/docs"
PAGES="$ROOT/pages"

if [[ ! -d "$DOCS" ]]; then
  echo "❌ ./docs not found. Run this from your MkDocs project root."
  exit 1
fi

mkdir -p "$PAGES"

# Convert a single file from MkDocs Markdown to Mintlify MDX
convert_file () {
  local src="$1"
  local rel="${src#$DOCS/}"
  local dst="$PAGES/${rel%.md}.mdx"
  mkdir -p "$(dirname "$dst")"

  # AWK transformation:
  # - Convert '!!! tip "Title"' → ':::tip' + optional bold title
  # - Convert '!!! note|warning|danger' similarly
  # - Close block with ':::' when we encounter a non-indented line after a 4-space sentence
  # - Remove the first 4 spaces inside admonitions
  awk '
    BEGIN{
      in=0; type=""
    }
    function open_block(t, title) {
      printf(":::%s\n", t)
      if (title != "") {
        printf("**%s**\n\n", title)
      }
    }
    function close_block() {
      if (in) { print ":::"
        in=0; type=""
      }
    }
    {
      # Match admonition starts like: !!! tip "Fastest first success"
      # or without title: !!! tip
      if (match($0, /^!!![[:space:]]+(tip|note|warning|danger)([[:space:]]*"([^"]*)")?[[:space:]]*$/, m)) {
        close_block()
        type=m[1]
        in=1
        title=m[3]
        open_block(type, title)
        next
      }

      if (in) {
        # Content inside admonition often indented with 4 spaces in MkDocs
        if (match($0, /^[[:space:]]{4}(.*)$/, mm)) {
          print mm[1]
          next
        }

        # Blank lines can occur inside a callout; keep them
        if ($0 ~ /^[[:space:]]*$/) { print ""; next }

        # A non-indented line usually means the block ended
        close_block()
        # Fall-through to normal printing of this current line
      }

      print $0
    }
    END{ close_block() }
  ' "$src" > "$dst"

  echo "[CONVERTED] ${rel} → pages/${rel%.md}.mdx"
}

echo "→ Converting Markdown files to MDX with Mintlify callouts…"
mapfile -t files < <(find "$DOCS" -type f -name "*.md" | sort)
for f in "${files[@]}"; do
  convert_file "$f"
done

# Write mint.json if absent
MINT_JSON="$ROOT/mint.json"
if [[ -f "$MINT_JSON" ]]; then
  echo "↷ mint.json already exists; not overwriting."
else
  echo "→ Creating mint.json with navigation…"
  # NOTE: Paths in navigation reference slugs relative to /pages without extension.
  cat > "$MINT_JSON" <<'JSON'
{
  "name": "Triform Docs",
  "mode": "dark",
  "colors": {
    "primary": "#7d87ff"
  },
  "navigation": [
    { "group": "Welcome",
      "pages": [
        "index"
      ]
    },
    { "group": "Getting Started",
      "pages": [
        "getting-started/login",
        "getting-started/workspace-overview"
      ]
    },
    { "group": "Workspace",
      "pages": [
        "workspace/top-bar",
        "workspace/canvas/overview",
        "workspace/canvas/project-view",
        "workspace/canvas/agent-toolbox",
        "workspace/canvas/flow-view/basics",
        "workspace/canvas/flow-view/io-nodes",
        "workspace/canvas/flow-view/create-connect",
        "workspace/canvas/flow-view/node-interactions",
        "workspace/chat-panel",
        "workspace/properties/overview",
        "workspace/properties/global-variables",
        "workspace/properties/components/definition",
        "workspace/properties/components/content/agents",
        "workspace/properties/components/content/flows",
        "workspace/properties/components/content/actions",
        "workspace/properties/components/content/projects",
        "workspace/properties/execute",
        "workspace/properties/input-output"
      ]
    },
    { "group": "Core Concepts",
      "pages": [
        "concepts/nodes",
        "concepts/projects",
        "concepts/agents",
        "concepts/actions",
        "concepts/flows",
        "concepts/library/overview",
        "concepts/library/triggers",
        "concepts/library/modules",
        "concepts/library/variables"
      ]
    },
    { "group": "Executions & Testing",
      "pages": [
        "executions/executions",
        "executions/payloads",
        "executions/evaluations"
      ]
    },
    { "group": "Project Administration",
      "pages": [
        "project-admin/projects-list",
        "project-admin/deployments",
        "project-admin/expose",
        "project-admin/api-keys"
      ]
    },
    { "group": "Organizations & Accounts",
      "pages": [
        "orgs/overview",
        "orgs/affiliations",
        "orgs/roles-permissions",
        "orgs/members",
        "orgs/github-integration",
        "orgs/billing-settings",
        "users/profile",
        "users/authentication-sessions",
        "orgs/admin",
        "accounts/admin"
      ]
    },
    { "group": "Quotas",
      "pages": [
        "quotas/index",
        "quotas/execution-based",
        "quotas/resource-based",
        "quotas/api-integrations",
        "quotas/account-specific"
      ]
    },
    { "group": "Roadmap",
      "pages": [
        "roadmap/monitoring",
        "roadmap/alerts",
        "roadmap/persistent-storage",
        "roadmap/community-library"
      ]
    },
    { "group": "Community",
      "pages": [
        "community/join-discord"
      ]
    },
    { "group": "Appendix",
      "pages": [
        "appendix/quick-reference"
      ]
    }
  ]
}
JSON
  echo "[WROTE] mint.json"
fi

echo
echo "✅ Done."
echo "Next steps:"
echo "  1) Install Mintlify CLI:  npm i -g mintlify"
echo "  2) Dev server:            mintlify dev"
echo "  3) Review callouts + pages in /pages (MDX)."
echo "  4) Optional: add a logo to /public/logo.svg and set it in mint.json."
echo
