# 09 · Build plan

Work in phases. At the end of each phase: `pnpm build` passes, you've screenshotted every touched page at 375 and 1280 px and looked at them, you've run the `web-design-guidelines` audit on touched files and fixed findings, `PLACEHOLDERS.md` is updated, and you've committed. Then give the user a short status (what's done, screenshots, open questions) before starting the next phase.

Use the task list for the steps inside each phase.

---

## Phase 0 · Setup (≈ 30 min)

1. Read CLAUDE.md and every spec file.
2. Run the bootstrap in spec/05. Confirm `/mcp` shows shadcn, context7, playwright connected.
3. Copy brand assets into `public/brand/`, wire favicon, icon, apple-icon.
4. Create `src/config/site.ts`, `.env.example`, `DECISIONS.md`, `PLACEHOLDERS.md`.
5. Add Prettier + tailwind plugin, ESLint (Next config), `typecheck` script.
6. `git init`, first commit.

**Done when:** `pnpm dev` shows the default page with the Sarthak favicon, build passes.

## Phase 1 · Design system (≈ 2 h)

1. Use the `design-system` + `ui-styling` skills. Write tokens into `globals.css` exactly as spec/02 (`@theme` + shadcn variable mapping). Base styles: body font, heading styles, `text-wrap`, selection colour (gold at 30%), focus-visible ring.
2. Fonts via `next/font` in the root layout.
3. Install and restyle shadcn primitives listed in spec/06.
4. Build brand components: Logo, Mark, GoldDot, Swoosh (3 path variants), Eyebrow.
5. Build Section, Container, motion primitives (Reveal, Stagger, DrawPath, CountUp, Marquee).
6. Create a hidden `/styleguide` route (noindex, excluded from sitemap) showing colours with contrast ratios, the type scale, buttons in all variants on light and dark, form fields with error states, eyebrows, swooshes, cards.

**Done when:** the styleguide screenshot looks like a designed system, not shadcn defaults. Show it to the user.

## Phase 2 · Shell and content layer (≈ 2 h)

1. `src/lib/schemas.ts` and `src/lib/content.ts`; load every file in `content/`; the build fails on schema errors.
2. Placeholder rendering in dev + `pnpm placeholders` script.
3. Header (transparent/solid states), MegaMenu, MobileNav, Footer, CtaBand, Breadcrumbs.
4. `buildMetadata`, JSON-LD helpers, `sitemap.ts`, `robots.ts`, default OG image.

**Done when:** every route in spec/03 exists (even if sparse), nav works by keyboard and on mobile, footer is complete.

## Phase 3 · Home page (≈ 3 h)

1. Run `frontend-design` thinking: write the design direction paragraph in `DECISIONS.md` (adapting spec/02 to the home page).
2. Source 6–10 photographs (Unsplash/Pexels, people at work in Indian offices/sites), optimise, save to `public/images/`, log in `CREDITS.md`.
3. Build sections 1–10 from spec/04 in order, using `content/pages/home.md`.
4. Visual QA at 375 / 768 / 1280 / 1536. Run the anti-template checklist from spec/02 and fix anything that fails.

**Done when:** the home page passes the checklist and Lighthouse mobile ≥ 95/100/100/100 locally (`pnpm build && pnpm start`).

## Phase 4 · Services (≈ 4 h)

1. Services hub, three pillar hubs, service detail template.
2. Render all 11 service files. Check every one visually (they share a template; make sure long titles and lists don't break it).
3. FAQ JSON-LD, Service JSON-LD, related services, candidate note.

**Done when:** all 15 service-related URLs render, pass the audit, and the mega menu links to all of them.

## Phase 5 · About, Careers, Insights, Contact, legal (≈ 4 h)

1. About page.
2. Careers page, JobList with filters, job detail + JobPosting JSON-LD.
3. Insights index + post template with MDX components, TOC, reading time, related posts, per-post OG image.
4. Contact page with tabbed EnquiryForm and map.
5. CvForm, JobApplyForm, thank-you page. Test real submissions with a Web3Forms key (ask the user for it, or use their test key) and confirm the email arrives.
6. Privacy, Terms, 404.

**Done when:** every form submits successfully and handles errors, all pages pass the audit.

## Phase 6 · Hardening (≈ 2 h)

1. Playwright e2e: every route returns 200 and has one h1; nav opens and links work; each form validates and submits (mock the Web3Forms endpoint with `page.route`); axe has zero serious violations on every route.
2. Lighthouse on Home, a service page, Careers, Contact, a blog post. Fix until targets in spec/08 are met.
3. Reduced-motion pass (emulate `prefers-reduced-motion: reduce`, screenshot).
4. 320 px width pass, 200% zoom pass.
5. Final `PLACEHOLDERS.md` and a `README.md` for the client (how to edit content files, add a job, add a blog post, change contact details, deploy).

**Done when:** spec/10 checklist is fully ticked.

## Phase 7 · Deploy (only when the user says so)

Use the Vercel plugin or `deploy-to-vercel` skill. Set env vars. Share the preview URL.
