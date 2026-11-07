# 01 · Project brief

## The company

**Sarthak Talent Partners** is a people-and-technology services firm. It does three things:

| Pillar | What it covers | Who buys it |
|---|---|---|
| **Talent & Staffing** (the core business, lead with it) | IT recruitment, non-IT recruitment, permanent staffing, contract staffing, candidate sourcing & screening | HR heads, talent acquisition leads, founders, plant/operations managers |
| **Technology Services** | Cloud services (Salesforce + cloud platforms), data & analytics, application development, IT consulting | CTOs, IT managers, operations heads at mid-size companies |
| **HR & Payroll** | Payroll processing, HR operations and statutory compliance | CFOs, finance controllers, HR managers at SMEs and growing companies |

Tagline from the brand sheet: **People. Growth. Success.**
The four icons on the brand sheet (IT Recruitment, Non-IT Recruitment, Permanent Staffing, Candidate Sourcing & Screening) tell you what the client cares about most. Recruitment is the hero; technology and payroll are the "and we can also run this for you" story.

## Positioning (use this to make design and copy decisions)

Sarthak is a **hands-on, mid-sized partner**, not a faceless job board and not a giant consultancy. The promise:
- Shortlists of people who were actually spoken to, not CV dumps
- One accountable point of contact
- Can staff a team *and* run the tech and payroll around it

Tone: warm, direct, confident, specific. Sounds like a senior recruiter who knows the market, not a brochure.

## Audiences and what each needs from the site

1. **Employers / hiring managers** (primary): "Can they fill my role fast with good people?" → proof of process, roles they hire for, speed, a short enquiry form.
2. **Tech buyers**: "Do they understand my stack?" → clear service scope, how engagements work, flexible models.
3. **Finance/HR for payroll**: "Will this be accurate and compliant?" → what's covered, how handover works, data security.
4. **Job seekers** (secondary but high traffic): "Do they have jobs for me? Can I send my CV?" → Careers page, open roles, simple apply flow.

## Goals (in priority order)

1. Generate employer enquiries (contact form + "Hire talent" CTA on every page)
2. Look credible enough that a procurement or HR head would forward the link
3. Collect candidate applications
4. Rank for local searches: "IT recruitment agency in [[City]]", "staffing company [[City]]", "payroll outsourcing [[City]]"

## Scope

In scope: Home, About, Services hub, 11 service detail pages, Careers (+ job detail pages), Insights blog (MDX), Contact, Privacy Policy, Terms, 404, sitemap/robots, OG images, analytics hook.

Out of scope: client logos section, testimonials from real clients (until the client supplies them), login/portal, job board backend, CMS, multilingual.

Explicitly **excluded**: Telecom engineering services. Any "Our clients" logo wall.

## Placeholders

The client has not yet supplied: legal entity name, office address, phone, email, social links, real company stats (years, placements, clients), team photos, founder name and note. Every one of these is written as `[[PLACEHOLDER]]` in `content/` and lives in `src/config/site.ts` or the content files, so the client can fill them in one pass.

## Success looks like

A first-time visitor understands in five seconds that Sarthak finds people (IT and non-IT) and can also run tech and payroll, sees a real human behind it, and can send an enquiry in under a minute from any page.
