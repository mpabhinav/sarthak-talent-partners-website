# Decisions

## Phase 0

- Phase 0: scaffolded with create-next-app into _tmp and moved up because the folder was not empty.
- Phase 0: disabled `cacheComponents`/`partialPrefetching` from the scaffold. The site is fully static SSG; Cache Components adds friction (Suspense for searchParams, dynamic dates) with no benefit here.
- Phase 0: allowed sharp build so `next/image` optimisation works for `next start` and Lighthouse runs.
- Phase 0: shadcn `radix-vega` preset uses the `cn` package (published by shadcn) in place of clsx + tailwind-merge.

## Phase 1

- Phase 1: tokens use `@theme static` (not plain `@theme`) so every brand variable is always emitted for `var()` use in SVG and inline styles; values are exactly spec/02.
- Phase 1: spec radii (4/8/14/pill) override shadcn's calc radii; `--radius-xl` 20px added for large containers.
- Phase 1: role aliases `--fg`, `--fg-muted`, `--accent-text`, `--inverse`, `--rule`, `--surface` flip under `[data-tone="dark"]`, so components use `text-fg`, `text-accent-text`, `border-rule` and need no `dark:` classes. No page-level dark mode.
- Phase 1: no red in the brand palette, so `--destructive` is gold-ink; error states use a 2px gold-ink border, an alert icon and message text (never colour alone). Add a red error token only if the client approves a new hue.
- Phase 1: field borders use `--line` per spec (about 1.3:1 on white, below WCAG 1.4.11's 3:1 for control boundaries). Hover goes slate, focus goes navy plus the gold ring. Revisit if the client wants strict non-text contrast.
- Phase 1: Button gains `ButtonArrow` (child with `data-arrow`) rather than an `arrow` boolean prop, so it works with `asChild`.
- Phase 1: Marquee and Swoosh are server components (CSS-only animation; Swoosh renders the client `DrawPath`), which keeps client JS smaller than making them client components.
- Phase 1: Reveal/Stagger/DrawPath start hidden in SSR HTML, so CSS (reduced motion) and a `<noscript>` style force them visible; hidden content never depends on JS being present.
- Phase 1: `themeColor` in `layout.tsx` is the one hex literal outside globals.css (Next metadata cannot read CSS variables).
- Phase 1: Marquee satisfies the spec (pause on hover/focus, static under reduced motion) but has no explicit pause button; add one in Phase 3 if a WCAG 2.2.2 control is wanted.

## Phase 2

- Phase 2: zod schemas are strict (unknown frontmatter keys fail the build) and loaders also check slug equals file name and that every `related` slug exists; `validateAllContent()` runs in the root layout so any bad file breaks every build path.
- Phase 2: loaders are plain sync functions over `fs`, wrapped in React `cache` for the file reads; `server-only` is installed so client components cannot import `content.ts` or `nav.ts`.
- Phase 2: `site.url` contains a placeholder, so `seo.ts` strips `[[ ]]` before building `metadataBase`, canonical and sitemap URLs; this keeps the build valid until the real domain is set.
- Phase 2: `[[placeholders]]` render in `<mark data-placeholder>` only when `NODE_ENV !== "production"`; production HTML shows the inner text plain. Attributes, metadata and JSON-LD always use `stripPlaceholders()`.
- Phase 2: MDX bodies (legal, jobs, posts) go through `next-mdx-remote/rsc` with element overrides that pass text through the placeholder renderer.
- Phase 2: `buildMetadata` always sets an explicit OG/Twitter image (`/opengraph-image`) because a page-level `openGraph` object does not inherit the file-based image; the home page uses `absoluteTitle` so the root title template is not appended to its already-complete title.
- Phase 2: Header is transparent-until-scrolled only on `/` (route list in Header.tsx, or the `transparent` prop). It stays in flow (sticky), so the Phase 3 hero must pull itself under it with a negative top margin if it wants to sit behind the bar.
- Phase 2: mega menu uses `viewport={false}` and a `fixed` panel at `top-[72px]` because Radix wraps the list in a positioned div; overrides repeat shadcn's `group-data-[viewport=false]` prefixes so they win. ArrowDown opens nothing while closed (Radix only uses it inside an open panel); Enter, Space, click and hover open it.
- Phase 2: mobile sheet is a full-width navy sheet below `sm` and max-w-md above; links close it through `SheetClose` and a pathname check; Menu and Close buttons carry visible text, not icons alone.
- Phase 2: every page ships its own enquiry `CtaBand`, so the layout renders the Footer with `withCta={false}` to avoid two stacked blue bands; the footer's own CTA band (copy from shared.md `footer.ctaBand`) is built and used on the 404 page via `SiteShell footerCta`.
- Phase 2: footer social icons are inline SVG paths (lucide v1 has no brand icons) and render only for non-empty `site.socials` entries.
- Phase 2: the 404 renders inside `SiteShell` (header and footer) so the mark and nav stay visible; copy is `shared.md` notFound plus a full stop in the h1, links Home, Services, Careers.
- Phase 2: `/insights` has no page file in content/pages, so its h1 is "Insights", its intro reuses `home.md` insightsTeaser.title and its meta description is one interim sentence; replace if the client supplies copy. Privacy and Terms meta descriptions are also one-line interim sentences.
- Phase 2: `opengraph-image.tsx` fetches Fraunces (400, only the tagline glyphs) from Google Fonts at build and falls back to the default serif if offline; its navy and gold hex values are literals because next/og cannot read CSS variables.
- Phase 2: `html { scroll-padding-top: 5rem }` so the sticky header never hides focused or anchored content; `<main id="main" tabIndex={-1}>` so the skip link moves focus reliably.
- Phase 2: PageHero is a minimal inner-page hero (eyebrow, h1, intro, actions) used by every sparse page; Phases 3 to 5 replace it per page.

## Phase 3

- Phase 3: user-requested addition, not in spec/04: `OpenRolesTeaser` ("careers inside" the home page) sits between Insights and Two Doors on paper. Eyebrow "Careers", h2 "Open roles", "See all open roles" link are tiny UI labels; every job row (title, location, type, experience) comes from job frontmatter via `getJobs({ activeOnly: true })`, max four.
- Phase 3: background rhythm is white hero, navy ticker, white pillars, paper timeline, white split, navy principles, white beyond hiring, paper industries, white insights, paper open roles, split doors. The left half of Two Doors is navy and the footer below it is navy too (spec-mandated layout); its navy-to-blue gradient ends in blue so the two do not read as one block.
- Phase 3: pillar sub-service links are resolved from `getServices()` by title (exact or suffix match, so "Sourcing & Screening" finds "Candidate Sourcing & Screening") and the build throws if one does not match. They are separated by spacing and underlines, not gold dots, because dots wrap to the start of a line and look broken in a 540px column.
- Phase 3: pillar hover photos are decorative (`alt=""`, `aria-hidden`), `loading="lazy"` inside a `display:none` (below lg) wrapper, so they are not fetched until the row is shown. They fade in on hover and focus-within, pure CSS, no client JS.
- Phase 3: founder attribution uses the reversed Mark in a circle (no photo exists, `founder.jpg` is not used). Name stays the `[[Founder name]]` placeholder.
- Phase 3: Insights teaser needs no cover images (they do not exist yet). With 3 posts it is one large (L6) and two stacked (R6); with 2 posts they sit side by side 7/5; with 1 it is a single large item.
- Phase 3: ProofStrip is built and gated by `site.flags.showStats`; it counts up only plain numeric values, and `[[placeholder]]` values render as copy.
- Phase 3: role ticker got a pause button (WCAG 2.2.2, closes the Phase 1 note). It toggles `data-paused` on the band and is hidden under reduced motion. Also fixed the reduced-motion marquee CSS (the list did not wrap because of `flex-shrink: 0`), so the static wrapped list now works.
- Phase 3: Header needed no change: `Header.tsx` is already transparent-until-scrolled on `/` only. The hero is white and the header stays in flow, so no negative margin is used.
- Phase 3: hero h1 is `display-xl` as specced; at 1280 it sets on three lines in the L7 column. Mobile hero photo uses `object-position: 50% 20%` so the 16:10 crop keeps the face.
- Phase 3: Lighthouse mobile (simulated 4G) Performance is about 82, LCP about 4.7s with 0 CLS. The hero image itself loads in well under 200ms; the likely driver is about 300KB of preloaded Fraunces (normal and italic variable) in the root layout. Revisit in the performance phase (e.g. drop the italic preload, trim axes). The only best-practices miss is the Vercel analytics scripts 404ing locally.

## Phase 4

- Phase 4: Breadcrumbs gained a `bare` prop (no Container) and now uses `text-fg-muted`, so it reads correctly inside the navy pillar hero (slate on navy, ink-muted on white).
- Phase 4: tiny UI labels not in content: "How it works", "Why Sarthak", "Questions we hear often", "Ask us something else", "Related services", "View service", "Read the FAQs", "See the services", "Services in {pillar}", "Tools and platforms", "Billing". The pillar "How we work" title is also a UI label.
- Phase 4: service pages with `heroVisual: photo` use the matching pillar photo (no per-service photos exist, none downloaded). Staffing services therefore share one photo; the three staffing photo pages differ in copy and layout. The pillar hero applies a duotone via `mix-blend-luminosity` on a navy ground plus a navy gradient, so no new image files.
- Phase 4: the navy "Roles we hire / Capabilities" section is optional in the content (3 services have no `list`). When absent, the steps/why/faq/related backgrounds shift (paper/white/paper/white) so white and paper still alternate and no two sections of the same colour touch. The staffing candidate note takes the opposite background of Related services.
- Phase 4: pillar card "3 bullet highlights" are the first three `includes.items` titles of each service (no separate content field exists). Even-numbered cards drop 40px on desktop for an asymmetric grid; with an odd count the last card sits alone on the left.
- Phase 4: hub pillar summary uses `pillar.hero.intro` (no dedicated summary field in _pillars.md).
- Phase 4: FAQ is L5 heading and R7 accordion on all pages (spec only says accordion). It emits FAQPage JSON-LD with placeholders stripped; Service JSON-LD carries serviceType, provider Organization and areaServed "IN". Pillar and hub pages emit FAQPage and BreadcrumbList only.
- Phase 4: the tools panel on service heroes uses the system monospace stack (no mono font is loaded) on a navy-to-blue card, with a gold slash marker per item.
- Phase 4: hero sections for hub, pillar and service are custom (not PageHero) and are not wrapped in Reveal; every section below the fold uses Reveal or Stagger.
- Phase 4: the only console errors in production are the two Vercel analytics script 404s outside Vercel (already known from Phase 3).

## Rebrand to Sarthak Talent Partners (7 Nov 2026)

- The client renamed the company from Revora Solutions to **Sarthak Talent Partners** (legal name Sarthak Talent Partners Private Limited). Domain `sarthakco.in`, served at `https://www.sarthakco.in` (the bare domain redirects to www, so canonical URLs use www). The site moved to a new repo; the Revora repo is kept as it was.
- New logo from the client's two PNGs. The header uses the lockup with the tagline cut off, shown 48/56 px tall because the TALENT PARTNERS line is unreadable any smaller. The full logo with the tagline is kept for large placements and the share image.
- The site tagline is now the one in the logo: "People. Growth. Success." (it replaced "Connecting Talent with Opportunity").
- Emails: `hello@sarthakco.in` for general enquiries, privacy and data requests; `careers@sarthakco.in` for job applications.
- Office: Shop No 3, Sports World, 35-625, near AOC Center, Mahatma Gandhi Nagar, Seshachala Colony, East Marredpally, Secunderabad, Telangana 500026. The map embed is built from this address.
- Short form in copy is "Sarthak" (for example "Why Sarthak", "At Sarthak"). SEO titles say Hyderabad, the city people search for.
- The palette stays as it was: the new logo uses the same navy and gold family.

## Home hero banner (7 Nov 2026)

- The client supplied the home hero image (`home-hero-banner.jpg`, 1600x900). It has text built into the right side, so the hero now shows it full width: whole image at 16:9 below 1024 px, and 21:9 from 1024 px up, trimming only the top and bottom edges so the text is never cut.
- The headline, intro and buttons now sit under the banner (headline left, intro and buttons right on desktop).
- The shortlist card is no longer shown in the hero: it would cover the banner. Its copy stays in `content/pages/home.md`.
- A sharper original (2x, 3200 px wide) would look crisper on high-resolution screens, if the client has one.
