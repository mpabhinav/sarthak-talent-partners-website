# 03 · Information architecture

## Sitemap and routes

```
/                                         Home
/about                                    About Sarthak
/services                                 Services hub (all three pillars)
  /services/staffing                      Pillar hub: Talent & Staffing
    /services/staffing/it-recruitment
    /services/staffing/non-it-recruitment
    /services/staffing/permanent-staffing
    /services/staffing/contract-staffing
    /services/staffing/sourcing-and-screening
  /services/technology                    Pillar hub: Technology Services
    /services/technology/cloud-services
    /services/technology/data-analytics
    /services/technology/application-development
    /services/technology/it-consulting
  /services/hr-payroll                    Pillar hub: HR & Payroll
    /services/hr-payroll/payroll-management
    /services/hr-payroll/hr-operations-compliance
/careers                                  Careers + open roles list
  /careers/[slug]                         Job detail + apply form
/insights                                 Blog index
  /insights/[slug]                        Blog post (MDX)
/contact                                  Contact (tabs: Hire talent / Technology / Payroll / General)
/privacy                                  Privacy policy
/terms                                    Terms of use
/thank-you                                Post-submit page (noindex)
/not-found                                Custom 404
```

All service and pillar pages are generated from `content/services/*.md` with `generateStaticParams`. All are statically rendered (SSG).

Contact deep links: `/contact?enquiry=hire`, `?enquiry=technology`, `?enquiry=payroll`, `?enquiry=general`. Pre-select the tab from the query string.

## Primary navigation (desktop)

```
[mark + wordmark]   Services ▾   About   Careers   Insights   Contact        [Hire talent →]
```

- **Services ▾** opens a mega-menu panel (full container width, white, hairline bottom border) with three columns, one per pillar. Each column: pillar name (links to the pillar hub) as an eyebrow, then its services as links with a one-line description in ink-muted. Bottom row of the panel: "Looking for a job? See open roles →" linking to /careers.
- Use shadcn `NavigationMenu` (Radix) restyled; opens on hover *and* click, closes on Escape, fully keyboard navigable.
- Active page: gold dot under the nav item.
- **Hire talent** button: navy pill, links to `/contact?enquiry=hire`.
- Header: sticky, 72 px tall, transparent over the home hero, white with hairline after scroll.

## Mobile navigation

- 64 px header with mark + wordmark and a "Menu" button (text + icon, not an icon alone).
- Opens a full-height sheet (shadcn `Sheet`, from the right) in navy. Large Fraunces links. Services expands as an accordion with three pillar groups.
- Pinned at the sheet bottom: "Hire talent" (gold pill) and "Find a job" (outline).
- Phone and email at the very bottom as tap-to-call / mailto.

## Footer (navy, four columns + bottom bar)

| Column 1 | Column 2 | Column 3 | Column 4 |
|---|---|---|---|
| Reversed horizontal lockup, tagline, 2-line company blurb, social icons (LinkedIn, Instagram, X: only those present in site config) | **Talent & Staffing** links (5) | **Technology** links (4) + **HR & Payroll** links (2) | **Company**: About, Careers, Insights, Contact. Then address, phone, email from site config |

Above the columns: a full-width CTA band (blue on navy): "Hiring this quarter? Tell us the role. We'll come back within one working day." + gold "Start a brief" button.

Bottom bar (navy-900): © {year} Sarthak Talent Partners Private Limited · Privacy · Terms · "Made in [[City]]".

## Breadcrumbs

On every page below the top level: `Home / Services / Talent & Staffing / IT Recruitment`. Small, ink-muted, with `BreadcrumbList` JSON-LD.

## Cross-linking rules

- Every service page ends with "Related services" (2–3 from the same or adjacent pillar, defined in the content frontmatter `related:`).
- Every staffing page links to /careers in a small candidate note ("Are you a candidate? See open roles").
- Every page has an enquiry CTA band before the footer, with the enquiry type matching the pillar.
