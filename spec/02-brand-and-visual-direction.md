# 02 · Brand and visual direction

## Design direction: "The Recruiter's Desk"

One paragraph to hold in your head while building:

> Editorial and warm, like a well-made annual report crossed with a good consultancy's case-study page. Deep navy carries authority; a single gold accent shows up the way a highlighter would on a printed shortlist: sparingly, deliberately, by hand. Large serif headlines with real line breaks, generous white space, asymmetric grids, real photographs of people at work, and small hand-made details (a drawn underline, a numbered margin note, a gold dot borrowed from the logo) that tell you a person designed this.

What it should feel like: Stripe Press restraint, Monocle magazine warmth, a Swiss annual report's grid. What it must not feel like: a SaaS template, a Dribbble shot, a generic "IT solutions" site with globe and circuit imagery.

## The logo and its motifs

Files: `assets/brand/` (see `assets/brand/README.md`).

The mark is an S formed by a gold swoosh and a navy figure (a round head, one arm raised) reaching for a gold four-point star: a person rising towards success. The full lockup adds SARTHAK, TALENT PARTNERS and the tagline "People. Growth. Success." Borrow two motifs from it, and only these two:

1. **The gold dot.** An 8–12 px gold circle used as a bullet, a list marker, a "current page" marker in the nav, and at the end of the hero headline in place of a full stop.
2. **The swoosh.** A single gold curve (SVG path, 2–3 px stroke, round caps) used as a hand-drawn underline under one key word per page and as a rare section divider. Draw it with `motion` `pathLength` 0 → 1 once when it enters view.

Never put the full logo in decorative positions (watermarks, giant background R's). Never animate the logo itself.

## Colour

### Brand palette (from the client's sheet)

| Token | Hex | Role |
|---|---|---|
| `--base-white` | `#FDFDFD` | Default page background |
| `--deep-navy` | `#041838` | Primary text, dark sections, footer, primary buttons |
| `--brand-blue` | `#09254D` | Secondary dark surface, hover state of navy, cards on navy |
| `--accent-gold` | `#D7A449` | Accent fills, dots, underlines, focus ring, buttons on navy |
| `--soft-slate` | `#969DAD` | Borders, dividers, icons on navy, disabled states |

### Derived tokens (needed for accessibility and depth; do not add others)

| Token | Hex | Why |
|---|---|---|
| `--paper` | `#F6F3EC` | Warm off-white for alternating sections. Breaks the white monotony and feels like paper. |
| `--ink-muted` | `#4A5468` | Secondary text on light backgrounds (7.5:1 on white). |
| `--gold-ink` | `#8A6420` | Gold-coloured *text* on light backgrounds (5.3:1 on white). |
| `--line` | `#E4E1D8` | Hairline borders on paper/white. |
| `--navy-900` | `#020E22` | Footer bottom bar, image overlays. |

### Measured contrast (WCAG)

| Pair | Ratio | Use |
|---|---|---|
| navy on white | 17.3 | body, headings |
| ink-muted on white | 7.5 | secondary text |
| gold-ink on white | 5.3 | eyebrow labels, links on light |
| gold on navy | 7.8 | eyebrows, links, buttons on dark |
| white on navy | 17.3 | text on dark |
| slate on navy | 6.5 | secondary text on dark |
| **gold on white** | **2.2 ✗** | never for text |
| **slate on white** | **2.7 ✗** | never for text |

### Proportions

Roughly 70% light (white + paper), 25% navy, 5% gold. If gold covers more than a button and a few lines per screen, it's too much. Gradients: only navy → brand-blue, subtle, for dark sections. No other gradients.

### Tailwind v4 theme (put in `src/app/globals.css`)

```css
@import "tailwindcss";

@theme {
  --color-white: #FDFDFD;
  --color-navy: #041838;
  --color-navy-900: #020E22;
  --color-blue: #09254D;
  --color-gold: #D7A449;
  --color-gold-ink: #8A6420;
  --color-slate: #969DAD;
  --color-ink-muted: #4A5468;
  --color-paper: #F6F3EC;
  --color-line: #E4E1D8;

  --font-display: var(--font-fraunces), ui-serif, Georgia, serif;
  --font-sans: var(--font-hanken), ui-sans-serif, system-ui, sans-serif;

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 14px;   /* cards, images */
  --radius-pill: 999px; /* buttons */

  --ease-out-soft: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-in-out-soft: cubic-bezier(0.65, 0, 0.35, 1);
}
```

Then map shadcn's semantic variables (`--background`, `--foreground`, `--primary`, `--ring`, etc.) onto these in the same file so shadcn components inherit the brand. `--ring` = gold. Do not ship a dark mode; the site uses light pages with navy sections by design.

## Typography

| Role | Font | Settings |
|---|---|---|
| Display (h1–h3, pull quotes, big numbers) | **Fraunces** (variable, `next/font/google`, axes `opsz`, `SOFT`, `WONK` off) | weight 400–500, `SOFT` 30, tight tracking −0.02em, line-height 1.02–1.1 |
| Body, UI, nav, buttons, forms | **Hanken Grotesk** | weight 400/500/600, line-height 1.6 body, 1.3 UI |
| Eyebrows / labels | Hanken Grotesk 600 | uppercase, tracking 0.14em, 12–13 px, colour gold-ink (light) or gold (dark) |

Why this pairing: the serif brings the editorial, human warmth; Hanken is a clean grotesk that sits close to the geometric letters in the logo wordmark without being Inter. Do not substitute Inter, Roboto, Poppins, Montserrat, Space Grotesk, or system fonts.

Fluid type scale (use `clamp()`):

| Token | Size |
|---|---|
| `display-xl` (home hero) | clamp(2.75rem, 6vw + 1rem, 6rem) |
| `display-l` (page heroes) | clamp(2.25rem, 4vw + 1rem, 4.25rem) |
| `h2` | clamp(1.875rem, 2.5vw + 1rem, 3rem) |
| `h3` | clamp(1.25rem, 1vw + 1rem, 1.625rem) |
| `body-l` (intros) | 1.1875rem / 1.6 |
| `body` | 1.0625rem / 1.65 |
| `small` | 0.875rem |

Use italic Fraunces for one emphasised word in a headline at most (e.g. "people who *stay*"). Set `text-wrap: balance` on headings and `text-wrap: pretty` on paragraphs. Max line length 68ch.

## Layout and grid

- 12-column grid, max content width 1280 px, gutters 24 px (mobile 20 px side padding).
- **Asymmetry by default.** Typical split is 5/7 or 4/8, not 6/6. Headline column on the left, content offset by one column.
- Section spacing: 96–160 px desktop, 64–96 px mobile. Vary it; not every section gets the same padding.
- Numbered sections: small `01 / 02 / 03` labels in the left margin on long pages (services, about).
- Alternate backgrounds: white → paper → white → navy. Never two navy sections back to back.
- Hairline rules (`--line`) between list items instead of cards where possible. Cards are for things you can click.

## Imagery

- **Real photography of people working**: recruiters on calls, interviews across a table, developers pairing, a shop-floor supervisor, a finance team. Indian workplaces and faces. Slightly warm colour grade.
- Source in development: Unsplash/Pexels (free licence), saved locally into `public/images/` with `next/image`. List every image and its source URL in `public/images/CREDITS.md`. Mark them as "replace with real Sarthak team photos" in `PLACEHOLDERS.md`.
- Treatment: radius `--radius-lg`, occasional **navy duotone** (CSS `mix-blend-mode: multiply` over navy, or pre-processed) for section backgrounds behind white text.
- One image per section at most. Some sections get none.
- No stock 3D renders, no isometric illustrations, no globe/circuit/handshake-cliché images, no AI-generated people.
- Icons: `lucide-react`, 1.5 px stroke, 20–24 px, navy on light, slate or gold on navy. Icons support text, they are never the main event. The four brand-sheet icons (person with tie, three people, handshake, target) map to lucide `UserRound`, `UsersRound`, `Handshake`, `Target`.

## Motion budget

Motion should feel like paper settling, not like an app showing off.

- Section entrance: fade + 12 px rise, 500 ms, `--ease-out-soft`, stagger children 60 ms, once only (`whileInView`, `viewport={{ once: true, margin: "-10%" }}`).
- Swoosh underline: pathLength draw, 900 ms, once.
- Number counters on the stats strip: count up once, 1.2 s. Static if reduced motion.
- Buttons: 150 ms colour/background, arrow icon nudges 3 px right on hover.
- Nav: header goes from transparent to white with hairline border after 24 px scroll.
- Role ticker (home): slow horizontal marquee, pauses on hover and focus, static list under reduced motion.
- **Forbidden:** parallax backgrounds, scroll-jacking, cursor followers, tilt cards, typing-text hero, auto-advancing hero sliders, bouncing, anything longer than 1 s except the ticker.
- Wrap everything in a `<Reveal>` client component that checks `useReducedMotion()`.

## Components look

- **Buttons:** pill radius. Primary = navy bg, white text, gold focus ring; on navy sections primary = gold bg, navy text. Secondary = text link with a 1 px underline that thickens on hover plus a `→` arrow. Avoid two filled buttons side by side.
- **Links in body text:** gold-ink, underline offset 3 px.
- **Cards:** white on paper (or blue on navy), 1 px `--line` border, no drop shadow at rest, shadow `0 8px 30px -12px rgb(4 24 56 / 0.18)` on hover, image zoom 1.03 on hover.
- **Form fields:** 48 px tall, 1 px line border, 8 px radius, label above (never placeholder-only), gold focus ring.

## Copy voice (applies to anything the agent writes or adapts)

- Short, specific sentences. Lead with the outcome for the reader.
- "We" and "you". Contractions are fine.
- Specific beats general: "a shortlist in 5–7 working days" beats "fast turnaround".
- No buzzwords: unlock, empower, elevate, leverage, seamless, cutting-edge, synergy, world-class, one-stop, revolutionise, next-generation, "in today's fast-paced world".
- No em dashes in UI copy; use full stops, commas or colons.
- Indian/British English spelling.

## Anti-template checklist (run before calling any page done)

- [ ] Hero is not a centred headline + subline + two buttons over a gradient blob
- [ ] No row of three identical icon-title-text cards as the only layout idea on the page
- [ ] At least one asymmetric layout per page
- [ ] At least one real photograph on every main page (Home, About, each pillar hub, Careers)
- [ ] Gold used for ≤ 5% of the screen; never as text on white
- [ ] No gradient other than navy → blue
- [ ] No glassmorphism, neumorphism, glow, or blurred blobs
- [ ] No emoji anywhere
- [ ] No stock-cliché imagery (handshakes, globes, chess pieces, light bulbs)
- [ ] Headlines are specific to Sarthak, not interchangeable with any other company
- [ ] Section rhythm varies (padding, background, layout); the page does not look like the same block repeated
- [ ] One human detail per page (hand-drawn underline, margin number, founder signature, pull quote)
