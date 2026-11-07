# Kickoff prompt

Paste everything below the line into Claude Code, opened in this folder, after running `bash setup/install-tooling.sh`.

---

You're building the Sarthak Talent Partners marketing website. Everything you need is in this folder.

1. Read `CLAUDE.md` first, then every file in `spec/` in numbered order, then skim `content/` and `assets/brand/README.md`. Don't write code until you've read them all.
2. Confirm the MCP servers are connected (`shadcn`, `context7`, `playwright`). If any isn't, tell me and continue without it.
3. Make a task list from `spec/09-build-plan.md` and work through it **phase by phase**. Use the skills listed in CLAUDE.md at the points it says to.
4. Before building any page, use the `frontend-design` skill and write the page's design direction (one paragraph) into `DECISIONS.md`, consistent with `spec/02`.
5. Use context7 to check current APIs for Next.js 16, Tailwind CSS v4, shadcn/ui and motion rather than relying on memory.
6. After each phase: run `pnpm build`, take Playwright screenshots at 375 px and 1280 px of every page you touched and look at them, run the `web-design-guidelines` audit on the touched files and fix what it finds, update `PLACEHOLDERS.md`, commit, and then stop and send me a short status with the screenshots before moving to the next phase.
7. Never invent statistics, client names, testimonials or certifications. Anything in `[[double brackets]]` stays a visible placeholder.
8. Don't deploy until I ask.

Start with Phase 0.
