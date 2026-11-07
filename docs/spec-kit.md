# Sarthak Talent Partners: website spec kit for Claude Code

A ready-to-build kit for the Sarthak Talent Partners marketing site (Next.js 16 + Tailwind v4 + shadcn/ui, hosted on Vercel). Unzip it, open it in Claude Code, paste the kickoff prompt, and the agent builds phase by phase.

## Quick start

```bash
unzip revora-website-kit.zip && cd revora-website-kit
bash setup/install-tooling.sh        # checks Node 20.9+, installs Playwright's Chromium
claude                               # start Claude Code in this folder
```

Inside Claude Code:
1. Approve the three project MCP servers when prompted, then run `/mcp` to check they're connected.
2. Install the plugins listed at the end of the setup script output (`/plugin install vercel@claude-plugins-official`, etc.).
3. Paste the contents of `KICKOFF_PROMPT.md`.

The agent stops after every phase with screenshots so you can steer it.

## What's inside

```
CLAUDE.md                  The agent's rulebook (stack, skills, non-negotiables). Claude Code loads it automatically.
KICKOFF_PROMPT.md          The first message to paste.
spec/
  01-project-brief.md      Company, audiences, goals, scope
  02-brand-and-visual-direction.md   Palette, contrast, type, grid, imagery, motion, voice, anti-AI-look checklist
  03-information-architecture.md     Sitemap, URLs, nav, mega menu, footer
  04-page-specs.md         Section-by-section layout for every page
  05-tech-architecture.md  Bootstrap commands, folders, zod content schemas, site config, env, deploy
  06-components.md         Component inventory
  07-forms-and-integrations.md       Web3Forms setup, all form fields, resume handling
  08-seo-performance-accessibility.md
  09-build-plan.md         Phases 0–7 with "done when" criteria
  10-qa-and-launch-checklist.md
content/                   All site copy, written fresh for Sarthak (YAML frontmatter + Markdown/MDX)
  pages/                   home, about, careers, contact, shared (CTAs, footer, 404, thank-you)
  services/                hub, 3 pillars, 11 service pages
  jobs/                    2 sample openings (replace before launch)
  insights/                2 seed blog posts
  legal/                   privacy + terms templates (need legal review)
assets/brand/              Logo SVG/PNG (normal + reversed), horizontal lockups, favicons, OG image, photo shot list
research/                  Notes on the competitor site and what was adapted
.claude/skills/            12 bundled skills (below)
.claude/settings.json      Project permissions
.mcp.json                  shadcn, context7, playwright MCP servers
setup/install-tooling.sh   One-time setup
```

## Site map

Home · About · Services hub · **Talent & Staffing** (IT Recruitment, Non-IT Recruitment, Permanent Staffing, Contract Staffing, Candidate Sourcing & Screening) · **Technology Services** (Cloud Services, Data & Analytics, Application Development, IT Consulting) · **HR & Payroll** (Payroll Management, HR Operations & Compliance) · Careers + job pages · Insights blog · Contact · Privacy · Terms

## Bundled skills

| Skill | Source |
|---|---|
| frontend-design, webapp-testing | Anthropic (via HAR5HA-7663/My_Claude_Setup) |
| ui-ux-pro-max, ui-styling, design-system, motion-design | HAR5HA-7663/My_Claude_Setup |
| vercel-react-best-practices, web-design-guidelines, vercel-composition-patterns, writing-guidelines, deploy-to-vercel | vercel-labs/agent-skills |
| shadcn | shadcn-ui/ui |

Deliberately **left out** from the My_Claude_Setup repo: `brand-guidelines` (applies Anthropic's own brand, which would fight Sarthak's), `canvas-design`, `theme-factory`, `design` (logo/poster generation, not needed), `web-artifacts-builder` (for claude.ai artifacts, not Next.js) and `jj-frontend` (a product-app standard that conflicts with a marketing-site layout).

Set `REFRESH_SKILLS=1` when running the setup script to pull the latest Vercel and shadcn skills from upstream.

## Plugins and MCP

- MCP (auto via `.mcp.json`): **shadcn** (component registry), **context7** (up-to-date library docs), **playwright** (real browser for visual QA).
- Plugins (install inside Claude Code): **vercel** (deploys, env vars), **code-review**, **security-guidance**. `frontend-design` is already bundled as a skill, so don't install its plugin too.

## Before launch, the client needs to supply

Everything marked `[[like this]]` in `content/` and `src/config/site.ts`; the agent keeps a running list in `PLACEHOLDERS.md`. The main ones:
- Legal entity name, office address, phone, emails, LinkedIn and other socials, domain
- Real numbers for the stats strip (it's hidden until then)
- Founder name, photo and story details; team photos (team section hidden until then)
- Fee models, replacement policy, cities and industries served, payroll headcount range
- Salesforce partner status/certifications (not claimed until confirmed)
- Real job openings
- A Web3Forms access key tied to the client's inbox (free at web3forms.com)
- Legal review of Privacy Policy and Terms

## Forms

Web3Forms free plan (250 submissions a month). File uploads need Web3Forms Pro, so CVs are collected as a link by default; flip `site.forms.resumeUpload` to `true` after upgrading and the file field appears.
