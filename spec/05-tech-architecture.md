# 05 · Technical architecture

## Bootstrap (Phase 0)

The kit folder becomes the repo root. Scaffold Next.js **into the current folder** without overwriting the kit files:

```bash
pnpm create next-app@latest . --ts --tailwind --eslint --app --src-dir --turbopack --import-alias "@/*" --use-pnpm
# If it refuses because the folder isn't empty, scaffold into ./_tmp and move everything except README/.gitignore up.
pnpm dlx shadcn@latest init        # base: Radix; style: closest to "new-york"; CSS file: src/app/globals.css
pnpm add motion lucide-react zod gray-matter next-mdx-remote reading-time clsx tailwind-merge
pnpm add -D @tailwindcss/typography @playwright/test prettier prettier-plugin-tailwindcss
mkdir -p public/brand && cp assets/brand/*.{svg,png} public/brand/
cp assets/brand/favicon.ico src/app/favicon.ico
cp assets/brand/icon-512.png src/app/icon.png
cp assets/brand/apple-icon.png src/app/apple-icon.png
```

Use context7 to confirm current APIs for Next 16, Tailwind v4 and shadcn before writing config. Add scripts: `typecheck: tsc --noEmit`, `test:e2e: playwright test`.

## Folder structure

```
src/
  app/
    (site)/
      layout.tsx                 header + footer + fonts
      page.tsx                   home
      about/page.tsx
      services/page.tsx
      services/[pillar]/page.tsx
      services/[pillar]/[service]/page.tsx
      careers/page.tsx
      careers/[slug]/page.tsx
      insights/page.tsx
      insights/[slug]/page.tsx
      contact/page.tsx
      privacy/page.tsx
      terms/page.tsx
      thank-you/page.tsx
    not-found.tsx
    sitemap.ts
    robots.ts
    opengraph-image.tsx          default OG (next/og ImageResponse, navy bg + lockup)
    globals.css
  components/
    layout/      Header, MegaMenu, MobileNav, Footer, CtaBand, Breadcrumbs
    sections/    Hero*, ProofStrip, RoleTicker, PillarRows, Timeline, ItNonItSplit,
                 PrincipleQuote, IndustryChips, InsightsTeaser, TwoDoors, FaqSection,
                 ServiceIncludes, StepsList, RelatedServices, JobList, ...
    ui/          shadcn primitives (button, accordion, navigation-menu, sheet, tabs, input, textarea, select, label)
    brand/       Logo, Mark, GoldDot, Swoosh, Eyebrow
    motion/      Reveal, Stagger, DrawPath, CountUp, Marquee
    forms/       EnquiryForm, CvForm, JobApplyForm, Field, FormStatus
    mdx/         mdx-components.tsx, Callout, Figure
  config/
    site.ts                       all business details + feature flags
    nav.ts                        nav structure derived from content
  lib/
    content.ts                    loaders: getServices(), getService(), getPillars(), getJobs(), getPosts()
    schemas.ts                    zod schemas for every content type
    seo.ts                        buildMetadata(), jsonLd helpers
    utils.ts                      cn()
content/                          (from the kit; source of truth for copy)
public/
  brand/  images/  images/CREDITS.md
```

## Content model

Content is Markdown/MDX with YAML frontmatter in `/content`. Load at build time with `fs` + `gray-matter` in `src/lib/content.ts`, validate with zod, and fail the build on invalid content. Body Markdown for services is optional long-form; most structure is in frontmatter.

```ts
// src/lib/schemas.ts (shape; refine as needed)
export const Pillar = z.enum(["staffing", "technology", "hr-payroll"]);

export const Service = z.object({
  title: z.string(),
  slug: z.string(),
  pillar: Pillar,
  order: z.number(),
  icon: z.string(),                       // lucide icon name
  summary: z.string(),                    // one line, used in menus/cards
  seo: z.object({ title: z.string(), description: z.string().max(160) }),
  hero: z.object({ eyebrow: z.string(), headline: z.string(), intro: z.string(), cta: z.string() }),
  heroVisual: z.enum(["photo", "panel"]).default("photo"),
  panelItems: z.array(z.string()).optional(),
  glance: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
  includes: z.object({ title: z.string(), intro: z.string(), items: z.array(z.object({ title: z.string(), text: z.string() })) }),
  list: z.object({ title: z.string(), groups: z.array(z.object({ name: z.string(), items: z.array(z.string()) })) }).optional(),
  steps: z.array(z.object({ title: z.string(), text: z.string() })),
  why: z.object({ pullLine: z.string().optional(), reasons: z.array(z.object({ title: z.string(), text: z.string() })) }),
  faqs: z.array(z.object({ q: z.string(), a: z.string() })),
  related: z.array(z.string()),          // slugs
  enquiry: z.enum(["hire", "technology", "payroll", "general"]),
});

export const Job = z.object({
  title: z.string(), slug: z.string(),
  employer: z.enum(["sarthak", "client"]),
  location: z.string(), type: z.enum(["Full-time", "Contract", "Part-time", "Internship"]),
  experience: z.string(), posted: z.coerce.date(), validThrough: z.coerce.date().optional(),
  salary: z.string().optional(), summary: z.string(), active: z.boolean().default(true),
});

export const Post = z.object({
  title: z.string(), slug: z.string(), excerpt: z.string(), category: z.string(),
  author: z.string(), date: z.coerce.date(), cover: z.string().optional(), coverAlt: z.string().optional(),
  draft: z.boolean().default(false),
});
```

Page content (`content/pages/*.md`) is structured frontmatter per section. Type each page's frontmatter with its own zod schema.

**Placeholders:** any string containing `[[...]]` is a placeholder. In development, render it with a dashed gold outline (`<mark data-placeholder>`) so it's impossible to miss. Add a script `pnpm placeholders` that greps `content/` and `src/config/site.ts` for `[[` and prints a list; also write it to `PLACEHOLDERS.md`.

## `src/config/site.ts`

```ts
export const site = {
  name: "Sarthak Talent Partners",
  legalName: "Sarthak Talent Partners Private Limited",
  tagline: "People. Growth. Success.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://[[sarthakco.in]]",
  email: { general: "[[hello@sarthakco.in]]", careers: "[[careers@sarthakco.in]]" },
  phone: { display: "[[+91 98765 43210]]", tel: "[[+919876543210]]" },
  whatsapp: "[[+919876543210]]",            // optional; renders a WhatsApp link in contact + footer if set
  address: { line1: "[[Office line 1]]", line2: "[[Area]]", city: "[[Hyderabad]]", state: "[[Telangana]]", pin: "[[500081]]", country: "India" },
  hours: "Mon–Sat, 9:30 am – 6:30 pm IST",
  mapsEmbedUrl: "",                          // Google Maps embed URL; empty hides the map
  socials: { linkedin: "[[https://www.linkedin.com/company/...]]", instagram: "", x: "" },
  forms: { web3formsKeyEnv: "NEXT_PUBLIC_WEB3FORMS_KEY", resumeUpload: false },
  flags: { showStats: false, showTeam: false },
  analytics: { vercel: true },
} as const;
```

## Rendering and data

- Everything is static (SSG) with `generateStaticParams`. `dynamicParams = false` on content routes so unknown slugs 404.
- No API routes needed. Forms post directly from the browser to Web3Forms.
- Images: `next/image` with `sizes` set properly, AVIF/WebP, `priority` only on the hero image. All photos stored locally in `public/images/`.
- Fonts: `next/font/google` with `display: "swap"`, subsets `latin`, variable fonts, exported as CSS variables `--font-fraunces` and `--font-hanken`.
- Analytics: `@vercel/analytics` and `@vercel/speed-insights` in the root layout (free on Vercel Hobby).

## Environment variables

```
NEXT_PUBLIC_SITE_URL=https://[[domain]]
NEXT_PUBLIC_WEB3FORMS_KEY=[[access key from web3forms.com, free, emailed instantly]]
```

Commit `.env.example` with both keys; never commit `.env.local`.

## Deployment (Vercel)

1. Push to GitHub. Import in Vercel (framework auto-detected). Add the two env vars for Production and Preview.
2. Add the custom domain; Vercel issues SSL.
3. Every PR gets a preview URL; check it on a phone before merging.
4. `deploy-to-vercel` skill or the Vercel plugin can do this from Claude Code, but only when the user asks.
