#!/bin/bash
# generate_docs.sh — create Mintlify pages from your navigation
set -euo pipefail

# Auto-detect content directory:
# - If you're inside docs/, write files here.
# - Otherwise, write to ./docs
if [ "$(basename "$PWD")" = "docs" ]; then
  CONTENT_DIR="."
else
  CONTENT_DIR="docs"
fi

# Change if you prefer .md
EXT="mdx"

# All slugs from docs.json (navigation)
PAGES=(
  "index"

  "getting-started/login"
  "getting-started/workspace-overview"

  "workspace/top-bar"
  "workspace/canvas/overview"
  "workspace/canvas/project-view"
  "workspace/canvas/agent-toolbox"
  "workspace/canvas/flow-view/basics"
  "workspace/canvas/flow-view/io-nodes"
  "workspace/canvas/flow-view/create-connect"
  "workspace/canvas/flow-view/node-interactions"
  "workspace/chat-panel"
  "workspace/properties/overview"
  "workspace/properties/global-variables"
  "workspace/properties/components/definition"
  "workspace/properties/components/content/agents"
  "workspace/properties/components/content/flows"
  "workspace/properties/components/content/actions"
  "workspace/properties/components/content/projects"
  "workspace/properties/execute"
  "workspace/properties/input-output"

  "concepts/nodes"
  "concepts/projects"
  "concepts/agents"
  "concepts/actions"
  "concepts/flows"
  "concepts/library/overview"
  "concepts/library/triggers"
  "concepts/library/modules"
  "concepts/library/variables"

  "executions/executions"
  "executions/payloads"
  "executions/evaluations"

  "project-admin/projects-list"
  "project-admin/deployments"
  "project-admin/expose"
  "project-admin/api-keys"

  "orgs/overview"
  "orgs/affiliations"
  "orgs/roles-permissions"
  "orgs/members"
  "orgs/github-integration"
  "orgs/billing-settings"
  "users/profile"
  "users/authentication-sessions"
  "orgs/admin"
  "accounts/admin"

  "quotas/index"
  "quotas/execution-based"
  "quotas/resource-based"
  "quotas/api-integrations"
  "quotas/account-specific"

  "roadmap/monitoring"
  "roadmap/alerts"
  "roadmap/persistent-storage"
  "roadmap/community-library"

  "community/join-discord"

  "appendix/quick-reference"
)

# Title-case the last path segment without Bash 4 features
title_from_slug() {
  local last="${1##*/}"                # last segment
  echo "$last" \
    | tr '-' ' ' \
    | awk '{
        for (i=1;i<=NF;i++){
          $i = toupper(substr($i,1,1)) tolower(substr($i,2))
        }
        print
      }'
}

mkdir -p "$CONTENT_DIR"

for path in "${PAGES[@]}"; do
  dir="$CONTENT_DIR/$(dirname "$path")"
  file="$CONTENT_DIR/$path.$EXT"
  mkdir -p "$dir"

  if [ -f "$file" ]; then
    echo "SKIP  $file (already exists)"
    continue
  fi

  title="$(title_from_slug "$path")"

  cat > "$file" <<EOF
---
title: $title
description: ""
---

# $title

> Draft page for \`$path\`.

<!-- Add content here -->
EOF

  echo "CREATE $file"
done

echo "✅ Done. Pages created under '$CONTENT_DIR' with extension '.$EXT'."
