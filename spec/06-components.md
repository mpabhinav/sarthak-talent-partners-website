# 06 · Component inventory

Build these once, reuse everywhere. Use composition (children/slots) rather than boolean props (see the `vercel-composition-patterns` skill). Server components unless marked **(client)**.

## Brand

| Component | Notes |
|---|---|
| `<Logo variant="horizontal" tone="navy \| reversed" />` | Uses `/brand/sarthak-lockup-horizontal(-reversed).png` via `next/image`, height 36 px desktop / 30 px mobile, `alt="Sarthak Talent Partners"`. Wrapped in a link to `/` with `aria-label="Sarthak Talent Partners home"`. |
| `<Mark tone size />` | Renders `sarthak-mark.png` via `next/image`; used in the mobile header, 404, favicon fallback. |
| `<GoldDot size />` | `span` 0.5em circle, `aria-hidden`. Used at the end of headlines and as bullets. |
| `<Swoosh>word</Swoosh>` **(client)** | Wraps a word with an absolutely positioned SVG curve underneath (path below, 3 px stroke, gold, round caps). Animates `pathLength` on first view via `motion`. Static under reduced motion. Make 3 slightly different hand-drawn path variants and pick by prop so it doesn't look stamped. |
| `<Eyebrow>` | Uppercase tracked label. Light: gold-ink. Dark: gold. Optional leading `<GoldDot>`. |

Suggested swoosh path (viewBox `0 0 200 20`, `preserveAspectRatio="none"`): `M2 14 C 40 6, 90 4, 130 8 S 185 16, 198 9`.

## Layout

| Component | Notes |
|---|---|
| `<Header>` **(client for scroll state)** | Sticky; transparent prop for home hero; becomes white + hairline at scrollY > 24. Skip link "Skip to content" as the first focusable element. |
| `<MegaMenu>` **(client)** | shadcn NavigationMenu. Content generated from `getServices()` grouped by pillar. |
| `<MobileNav>` **(client)** | shadcn Sheet + Accordion. Traps focus, closes on route change. |
| `<Footer>` | Navy; columns from spec/03. Year computed at build. |
| `<CtaBand enquiry="hire" \| ...>` | Blue band; copy per enquiry type from `content/pages/shared.md`. |
| `<Breadcrumbs items>` | Emits `BreadcrumbList` JSON-LD. |
| `<Section bg="white \| paper \| navy \| blue" spacing="sm \| md \| lg" number?="01" label?>` | Wrapper with padding scale and optional margin number. Navy/blue sections flip text colour context via a `data-tone="dark"` attribute that child components read through CSS. |
| `<Container>` | max-w 1280, responsive padding. |

## Sections (each in `components/sections/`)

`HomeHero`, `ShortlistCard`, `ProofStrip`, `RoleTicker` **(client)**, `PillarRows`, `Timeline`, `ItNonItSplit`, `PrincipleQuote`, `BeyondHiring`, `IndustryChips`, `InsightsTeaser`, `TwoDoors`, `PageHero` (generic for inner pages: eyebrow, title, intro, actions, visual slot), `GlanceStrip`, `IncludesList`, `DarkGroupedList`, `StepsList` (vertical) and `StepsRow` (horizontal), `WhyList`, `FaqSection` (shadcn Accordion + FAQPage JSON-LD), `RelatedServices`, `CandidateNote`, `EngagementModels`, `JobList` **(client filters)**, `JobMeta`, `PostCard`, `PostGrid` **(client filters)**, `TeamGrid`, `PhotoPair`, `PhotoMosaic`, `MapEmbed` **(client lazy)**.

## Motion (`components/motion/`, all client)

| Component | Behaviour |
|---|---|
| `<Reveal delay? y=12>` | Fade + rise on first view; no-op under reduced motion. |
| `<Stagger>` | Staggers direct children by 60 ms. |
| `<DrawPath>` | pathLength 0 → 1; used by Swoosh and Timeline line. |
| `<CountUp to suffix>` | Counts once in view; renders final value on server for no-JS/SEO. |
| `<Marquee speed>` | CSS-transform marquee, duplicated content `aria-hidden` on the copy, pause on hover/focus-within, static when reduced motion. |

Keep the motion bundle lean: import from `motion/react` and use `LazyMotion` + `domAnimation` with the `m` component.

## UI primitives (shadcn, restyled)

`button` (variants: `primary`, `primary-on-dark`, `outline`, `link-arrow`), `accordion`, `navigation-menu`, `sheet`, `tabs`, `input`, `textarea`, `select`, `label`, `checkbox`, `radio-group`, `sonner` (toast, optional). Restyle every one to spec/02 tokens: radius, focus ring (2 px gold, 2 px offset), heights (48 px inputs, 44 px min tap targets).
