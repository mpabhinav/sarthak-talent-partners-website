# CLAUDE.md: Sarthak Talent Partners marketing website

You are building the public website for **Sarthak Talent Partners**, an Indian staffing, recruitment, IT services and HR/payroll company. Tagline: **"People. Growth. Success."**

This file is the contract. The detailed spec lives in `spec/`, the copy lives in `content/`, the brand files live in `assets/brand/`. Read them before you write code, and re-read the relevant spec file before each phase.

## Read order (do this first, every new session)

1. `spec/01-project-brief.md`: what we are building and for whom
2. `spec/02-brand-and-visual-direction.md`: the look, tokens, type, and the anti-AI-look rules
3. `spec/03-information-architecture.md`: sitemap, nav, URLs
4. `spec/04-page-specs.md`: section-by-section layout for every page
5. `spec/05-tech-architecture.md`: stack, folders, content model
6. `spec/06-components.md`, `spec/07-forms-and-integrations.md`, `spec/08-seo-performance-accessibility.md`
7. `spec/09-build-plan.md`: the phases. Work phase by phase. Do not skip ahead.
8. `spec/10-qa-and-launch-checklist.md`: definition of done

## Stack (fixed, do not swap)

- Next.js 16.x App Router, TypeScript strict, React 19, Turbopack (default)
- Tailwind CSS v4 (CSS-first `@theme` config, no `tailwind.config.js`)
- shadcn/ui (Radix base) for primitives only, restyled to our tokens
- `motion` (the package formerly called framer-motion) for animation, `lucide-react` for icons
- MDX blog via `@next/mdx` or `next-mdx-remote/rsc` + `gray-matter`, schemas validated with `zod`
- Forms: Web3Forms (free tier) via a client component POSTing to `https://api.web3forms.com/submit`
- Fonts via `next/font/google`: Fraunces (display) + Hanken Grotesk (body/UI)
- Hosting: Vercel. Package manager: pnpm (npm is fine if pnpm is missing)

## Skills in `.claude/skills/` and when to use them

| Skill | Use it when |
|---|---|
| `frontend-design` | Before building any page or section. State the design direction in one paragraph before you code. |
| `ui-ux-pro-max` | Choosing layout patterns, checking UX rules, landing-page section patterns. Run its search script for "B2B services", "recruitment", "corporate trust". |
| `ui-styling` | shadcn + Tailwind component styling, dark sections, accessible primitives |
| `shadcn` | Adding/customising shadcn components. Use the `shadcn` MCP to search the registry. |
| `design-system` | Building the token layer (primitive → semantic → component) in Phase 1 |
| `motion-design` | Any animation. Respect the motion budget in spec/02. |
| `vercel-react-best-practices` | Writing any React/Next code (server components first, no waterfalls, small client bundles) |
| `vercel-composition-patterns` | Designing reusable section/card components without boolean-prop soup |
| `web-design-guidelines` | End of every phase: audit the pages you touched |
| `writing-guidelines` | When you adapt or add any copy |
| `webapp-testing` | Screenshot every page at 375, 768, 1280, 1536 widths and look at them |
| `deploy-to-vercel` | Only when the user asks to deploy |

MCP servers (`.mcp.json`): `shadcn` (registry search/install), `context7` (current docs for Next 16, Tailwind v4, motion; use it instead of guessing APIs), `playwright` (drive a real browser for visual QA).

## Non-negotiable rules

1. **Brand colours only.** Use the tokens in spec/02. Never invent new hues. No purple, no teal, no rainbow gradients.
2. **Gold `#D7A449` is never body text on a light background** (contrast 2.2:1). On light surfaces, gold text uses `--gold-ink #8A6420`. Gold fills, rules, dots and underlines are fine anywhere.
3. **Slate `#969DAD` is never text on a light background.** Muted text on light uses `--ink-muted #4A5468`.
4. **Copy comes from `content/`.** Do not write new marketing copy unless a spec says "agent may write". Never invent client names, logos, testimonials, awards, certifications or statistics. Anything in `[[double brackets]]` is a placeholder the client must confirm: render it as-is in dev, and list every remaining placeholder in `PLACEHOLDERS.md` at the end of each phase.
5. **No competitor content.** The content was rewritten from scratch. Do not fetch or paste text from any other company's website.
6. **Do not look AI-generated.** Follow the "Anti-template checklist" in spec/02. In short: no centred-hero-with-two-buttons-and-blob, no three identical icon cards in a row as the default answer, no glassmorphism, no emoji icons, no "Unlock / Empower / Elevate / Seamless / Cutting-edge" copy, no stock 3D illustrations, no em-dash-heavy copy.
7. **Server Components by default.** `"use client"` only for interactive leaves (nav menu, forms, carousels, motion wrappers).
8. **Accessibility is part of done:** WCAG 2.2 AA, keyboard nav, visible focus rings (gold 2px offset), `prefers-reduced-motion` honoured, semantic landmarks, alt text that describes.
9. **Performance budget:** Lighthouse mobile ≥ 95 Performance, 100 Accessibility, 100 Best Practices, 100 SEO. LCP < 2.0 s, CLS < 0.05, JS on the home page < 120 KB gzip.
10. **All business details live in one file**: `src/config/site.ts` (name, phone, email, address, socials, Web3Forms key env name). No hard-coded phone numbers or emails in components.
11. **Logos:** use files from `assets/brand/` (copied into `public/brand/` in Phase 0). Use `sarthak-mark.png` wherever the mark appears small (header, favicon fallback, footer); use the horizontal lockup PNGs at 2x for the header/footer wordmark. Never recolour or stretch the logo; never put the navy logo on navy.
12. **Verify visually.** After building any page, screenshot it with Playwright at 375 px and 1280 px and actually look at the screenshots. Fix what looks off before you call it done.
13. **Spelling:** Indian/British English (organisation, optimise, programme, centre, enrol). Currency ₹. Phone format +91 XXXXX XXXXX.
14. Keep commits small and phase-scoped: `feat(home): hero and proof strip`.

## Commands

```bash
pnpm dev          # local dev on :3000
pnpm build        # must pass with zero type errors and zero ESLint errors
pnpm lint
pnpm typecheck    # tsc --noEmit
pnpm test:e2e     # playwright smoke tests (Phase 6)
```

## When unsure

Check the spec. If the spec is silent, pick the option that is simpler, more accessible and more on-brand, write the decision in `DECISIONS.md` with one line of reasoning, and continue. Ask the user only for things that change content or cost money.
