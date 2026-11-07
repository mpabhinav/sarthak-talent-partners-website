# 08 · SEO, performance and accessibility

## SEO

- `buildMetadata({ title, description, path, image? })` in `src/lib/seo.ts` returns Next `Metadata` with title template `%s | Sarthak Talent Partners`, canonical URL, Open Graph, Twitter card. Every page uses it. Titles and descriptions for service pages come from frontmatter `seo`.
- Home title: "Sarthak Talent Partners | IT & Non-IT Recruitment, Staffing, Technology and Payroll Services in [[City]]".
- `sitemap.ts` lists every static route + all services, jobs (active only) and posts (non-draft). `robots.ts` allows all, points to the sitemap, disallows `/thank-you`.
- Default OG image via `app/opengraph-image.tsx` (navy, reversed lockup, tagline in Fraunces). Per-post OG images: `insights/[slug]/opengraph-image.tsx` with the title.
- JSON-LD (render with a `<script type="application/ld+json">` helper):
  - Home: `Organization` + `WebSite` (name, url, logo `/brand/sarthak-mark.png`, sameAs socials, contactPoint) and `LocalBusiness`/`EmploymentAgency` with address once confirmed.
  - Service pages: `Service` (serviceType, provider, areaServed "IN").
  - FAQ sections: `FAQPage`.
  - Jobs: `JobPosting` (title, description, datePosted, validThrough, employmentType, hiringOrganization, jobLocation). Only for active jobs.
  - Posts: `Article`. Breadcrumbs: `BreadcrumbList`.
- One `h1` per page. Logical heading order. Descriptive link text (no "click here").
- Image alt text describes the photo ("Recruiter reviewing a shortlist with a hiring manager"), decorative images get `alt=""`.
- Local SEO checklist for the client (put in README): Google Business Profile, consistent NAP (name, address, phone) everywhere, LinkedIn company page.

## Performance budget

| Metric | Target (mobile, Lighthouse) |
|---|---|
| Performance | ≥ 95 |
| LCP | < 2.0 s |
| CLS | < 0.05 |
| INP | < 200 ms |
| JS (home, gzip) | < 120 KB |

How:
- Server components everywhere; client islands only for interactive pieces (see spec/06).
- Hero image: `priority`, correct `sizes`, AVIF; everything else lazy.
- Fonts: two variable families only, subset latin, `display: swap`; preload only the display font weights used above the fold.
- No carousels libs, no icon fonts, no jQuery, no Lottie. `motion` via `LazyMotion`.
- Map iframe and below-the-fold videos (none planned) load on interaction/visibility.
- Check bundle with `next build` output and `@next/bundle-analyzer` if over budget.

## Accessibility (WCAG 2.2 AA)

- Contrast: use only the pairs in spec/02. Automated check with axe (Playwright `@axe-core/playwright`) in e2e tests, zero serious/critical violations.
- Keyboard: everything reachable; visible focus ring (gold, 2 px, 2 px offset) on every focusable element including cards; mega menu and sheet follow Radix keyboard patterns; Escape closes.
- Skip link, landmarks (`header`, `nav`, `main`, `footer`), `lang="en-IN"` on `<html>`.
- Targets ≥ 44×44 px. Text resizes to 200% without loss. No horizontal scroll at 320 px.
- Motion: everything respects `prefers-reduced-motion`. The marquee stops and becomes a list.
- Forms: see spec/07.
