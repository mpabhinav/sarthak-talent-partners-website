#!/usr/bin/env bash
# Sarthak Talent Partners website kit: one-time tooling setup.
# Run from the project root (the folder that contains CLAUDE.md):
#   bash setup/install-tooling.sh
# Safe to re-run. Nothing here touches your global Claude config except the
# optional plugin installs at the bottom, which you run inside Claude Code.

set -euo pipefail

echo "==> Checking prerequisites"
command -v node >/dev/null || { echo "Node.js 20.9+ is required (https://nodejs.org)"; exit 1; }
NODE_MAJOR=$(node -p "process.versions.node.split('.')[0]")
if [ "$NODE_MAJOR" -lt 20 ]; then echo "Node $NODE_MAJOR found, Next.js 16 needs Node 20.9 or newer"; exit 1; fi
command -v git >/dev/null || { echo "git is required"; exit 1; }
command -v claude >/dev/null || echo "WARN: 'claude' CLI not on PATH. Install Claude Code first: https://claude.com/claude-code"

echo "==> Project skills"
echo "    12 skills are already bundled in .claude/skills (no install needed):"
ls -1 .claude/skills | sed 's/^/      - /'

echo "==> Optional: refresh Vercel + shadcn skills to their latest upstream versions"
echo "    (skip if offline; the bundled copies work as-is)"
if [ "${REFRESH_SKILLS:-0}" = "1" ]; then
  npx -y skills add vercel-labs/agent-skills --skill vercel-react-best-practices -a claude-code -y || true
  npx -y skills add vercel-labs/agent-skills --skill web-design-guidelines -a claude-code -y || true
  npx -y skills add shadcn/ui -a claude-code -y || true
fi

echo "==> Playwright browser for the playwright MCP + webapp-testing skill"
npx -y playwright install chromium || echo "WARN: playwright browser install failed; visual QA will be limited"

cat <<'EOF'

==> MCP servers
    .mcp.json registers: shadcn, context7, playwright.
    Start Claude Code in this folder, approve them once, then run /mcp to confirm all three say "connected".

==> Plugins (run these INSIDE Claude Code, one per line)
    /plugin marketplace add anthropics/claude-plugins-official
    /plugin install vercel@claude-plugins-official
    /plugin install code-review@claude-plugins-official
    /plugin install security-guidance@claude-plugins-official
    /reload-plugins

    Do NOT also install frontend-design@claude-plugins-official: the same skill is bundled
    in .claude/skills/frontend-design and two copies just waste context.
    context7 and playwright are already wired through .mcp.json, so skip their plugins too.

==> Done. Next: open Claude Code here and paste KICKOFF_PROMPT.md.
EOF
