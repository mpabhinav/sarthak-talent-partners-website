# 04 · Page specs

Copy for every section is in `content/`. This file says **how each page is laid out**. Section names below match the headings in the content files. "bg:" is the section background.

Grid shorthand: `L5 / R7` = left column 5 of 12, right column 7 of 12.

---

## Home (`/`), content: `content/pages/home.md`

### 1. Hero (bg: white, full viewport height minus header, min 640 px)
- `L7`: eyebrow → h1 (`display-xl`, Fraunces 450). The word marked `{swoosh}` in the content gets the drawn gold underline. Replace the closing full stop with the gold dot. → intro paragraph (`body-l`, ink-muted, max 52ch) → primary button "Hire talent" + secondary text link "Looking for a job? See open roles →".
- `R5`: one tall portrait photograph (4:5, radius-lg) of a recruiter on a call or an interview in progress. Overlapping its bottom-left corner by ~48 px: a small paper-coloured **"shortlist card"** (a designed artefact, not a screenshot): eyebrow "Shortlist", a role title, three tiny avatar circles with initials, and a line "Screened and spoken to". This is the hero's human detail. Content in the hero section of home.md.
- Mobile: photo first (16:10 crop), then text; shortlist card shrinks and sits under the photo.
- Under the hero, a **proof strip**: 4 stats in one row separated by hairline vertical rules, Fraunces numbers, Hanken labels. Values are `[[placeholders]]`. If the client hasn't confirmed numbers by launch, hide the strip with a flag in `site.ts` (`showStats: false`). Never ship made-up numbers.

### 2. Role ticker (bg: navy, 72 px tall)
- A slow marquee of role names separated by gold dots: "Java Developers • Accountants • Site Engineers • Data Analysts …" (list in content).
- Pauses on hover/focus. Under reduced motion: a static wrapped list.
- Left-pinned label in gold eyebrow style: "We recruit for".

### 3. What we do (bg: white)
- `L4`: section eyebrow + h2 + short paragraph, sticky on desktop.
- `R8`: three **large numbered rows** (not cards), separated by hairlines: `01` Talent & Staffing, `02` Technology Services, `03` HR & Payroll. Each row: number (Fraunces, gold-ink), title (h3 large), one-line summary, sub-service links inline separated by dots, arrow link to the pillar hub. On desktop hover, a small photo for that pillar fades in on the right of the row. Talent & Staffing row is visually the biggest (lead pillar).

### 4. How a hire works (bg: paper)
- h2 left, intro right (`L5 / R7`, text only).
- Below: a horizontal **timeline** of 5 steps across the full width. Each step: a day marker ("Day 1"), title, two-line description. A thin navy line connects the steps with gold dots at each node. The line draws left to right on enter.
- Mobile: vertical timeline with the line on the left.

### 5. IT and non-IT, side by side (bg: white)
- Two columns `L6 / R6` (the one place a symmetric split is right, because it's a comparison). Left: "Technology roles", right: "Business & operations roles". Each: h3, short paragraph, then the role families as a two-column list with gold-dot bullets. Each column ends with a link to its service page.
- Between them, a vertical hairline.

### 6. Why companies stay with us (bg: navy)
- `L5`: a large pull quote in Fraunces italic (white), attributed to the founder `[[Founder name]], Founder` with a small circular photo placeholder. This is a principle statement from the company, not a client testimonial.
- `R7`: four principles as a numbered list with hairline (slate at 30%) separators: title in white, text in slate.

### 7. Beyond hiring (bg: white)
- Short band: `L5` h2 "Need more than people?" + paragraph. `R7`: two compact linked panels side by side: Technology Services and HR & Payroll, each with an icon, 2-line summary and the list of their services. These *are* clickable cards, so cards are fine here.

### 8. Industries (bg: paper)
- Eyebrow + h2 on one line, then industries as large text chips (pill, 1 px line border, Hanken 500 18 px), wrapped. No icons. List from content, all `[[confirm]]`.

### 9. Insights teaser (bg: white)
- h2 left, "All insights →" right. Three latest posts: first one larger (`L6`), two stacked (`R6`). Each: category eyebrow, title (Fraunces), date + read time.

### 10. Two doors CTA (split, full width)
- Left half navy: "Hiring?" h2, one line, gold button "Start a brief".
- Right half paper: "Looking for work?" h2, one line, navy button "See open roles".
- On mobile they stack.

---

## About (`/about`), content: `content/pages/about.md`

1. **Hero** (white): `L7` eyebrow, h1 `display-l`, intro. `R5`: two overlapping photos (team at a table + a candidate interview), slightly offset vertically, like prints on a desk.
2. **Our story** (white): `L3` margin label "01 / Story"; `L4-R8` (columns 4–11) 3 short paragraphs in `body-l`. A founder signature line at the end (script-style SVG signature placeholder or simply name + title in Fraunces italic).
3. **What we believe** (paper): "02 / Beliefs". Four principles as a 2×2 grid of text blocks with big gold-ink numbers, no cards, no icons.
4. **How we measure ourselves** (navy): "03 / Measures". h2 + paragraph `L5`, then `R7` a list of six measures with hairlines. Each a short title + one line.
5. **Vision and mission** (white): two columns with Fraunces headings. Mission as a short list with gold dots.
6. **The team** (paper): grid of 4–6 team cards (photo 4:5, name, role, one human line like "Has placed 300+ engineers in Hyderabad", all `[[placeholders]]`). If no photos are supplied, hide this section with a flag.
7. **CTA band** (blue): general enquiry.

---

## Services hub (`/services`), content: `content/services/_hub.md`

1. **Hero** (white): `L8` h1 + intro; `R4` a small "jump to" list of the three pillars.
2. **Three pillar sections**, each (alternating white/paper/white):
   - `L4` sticky: pillar number, pillar name (h2), summary, link to pillar hub.
   - `R8`: services as a hairline list. Each row: service name (h3), one-line summary, arrow. Whole row is a link.
3. **Ways to work with us** (navy): 4 engagement models in a horizontal row on desktop: Permanent hire, Contract staffing, Project delivery, Managed service. Each: title, who it's for, how billing usually works (`[[confirm]]`).
4. **FAQ** (white): accordion, 5 questions from content.
5. **CTA band**.

---

## Pillar hub template (`/services/[pillar]`), content: `content/services/_pillars.md`

1. **Hero** (navy, with a duotone photo on the right `R5`): breadcrumb, eyebrow, h1, intro, CTA button for the pillar's enquiry type.
2. **Services in this pillar** (white): cards in a 2-column grid (these are links, so cards are fine): number, title, summary, 3 bullet highlights, "Explore →".
3. **How we work** (paper): pillar-specific process (from content), numbered steps in a 4-column row.
4. **Why Sarthak for this** (white): `L5` h2, `R7` three reasons as hairline list.
5. **FAQ** (paper): accordion.
6. **CTA band**.

---

## Service detail template (`/services/[pillar]/[service]`), content: `content/services/*.md`

1. **Hero** (white): breadcrumb; `L7` eyebrow (pillar name), h1, intro, primary CTA + a text link to the FAQ. `R5`: a photograph relevant to the service *or*, for technology services, a typographic panel (navy card listing tools/platforms in Hanken mono-spaced style). Content frontmatter `heroVisual: photo | panel` decides.
2. **At a glance** strip (paper, compact): 3–4 facts from frontmatter `glance:` (e.g. "Typical shortlist: 5–7 working days"). All `[[confirm]]` values.
3. **What's included** (white): `L4` h2 sticky + intro; `R8` items as a 2-column hairline list (title + 1–2 lines each).
4. **Roles we hire / Capabilities** (navy): role families or capabilities as columns of gold-dot lists. Title comes from frontmatter `listTitle`.
5. **How it works** (white): numbered steps, vertical on the left with big numbers, description on the right (`L3 / R9` per step).
6. **Why Sarthak** (paper): three reasons, text only, with one pull-line in Fraunces italic.
7. **FAQ** (white): accordion (shadcn Accordion), FAQPage JSON-LD.
8. **Related services** (paper): 2–3 small link cards.
9. **Candidate note** (staffing pages only): a one-line strip "Looking for a role like this? See open roles →".
10. **CTA band** with the right enquiry type.

---

## Careers (`/careers`), content: `content/pages/careers.md` + `content/jobs/*.md`

1. **Hero** (white): `L7` h1 + intro + two anchors ("See open roles", "Send us your CV"). `R5`: photo of people at work, candid.
2. **Open roles** (paper): filter chips (All / At Sarthak / With our clients; and by location) as client-side filters on a static list. Each job row: title (h3), tags (location, type, experience), posted date, "View role →". Empty state: "No open roles right now. Send us your CV and we'll call you when something fits." with the CV form link.
3. **Life at Sarthak** (white): `L5` text, `R7` a 3-photo mosaic (`[[replace with real photos]]`).
4. **What you get** (navy): benefits as a hairline list.
5. **What to expect when you apply** (white): 4 steps for candidates, honest about timelines.
6. **General CV form** (paper): see spec/07.

### Job detail (`/careers/[slug]`)
- Breadcrumb, h1 job title, meta row (location, type, experience, posted). `L8` content: About the role, What you'll do, What you'll need, Nice to have (from MDX body). `R4` sticky apply card with "Apply for this role" button that scrolls to the form at the bottom, plus share link.
- Apply form pre-fills the role title (hidden field).
- `JobPosting` JSON-LD from frontmatter.

---

## Insights (`/insights`), content: `content/insights/*.mdx`

- **Index**: h1 + intro; featured (latest) post large with image; then a 3-column grid; category chips filter (client-side). Pagination not needed under 24 posts.
- **Post**: breadcrumb, category eyebrow, h1 (Fraunces), meta (author, date, read time), cover image (16:9), body at 68ch with good MDX styles (h2/h3, lists with gold-dot bullets, blockquote in Fraunces italic with gold left rule, tables, callout component). Right rail on desktop: table of contents (sticky). End: author box, 2 related posts, CTA band. `Article` JSON-LD.

---

## Contact (`/contact`), content: `content/pages/contact.md`

1. **Hero + form** (white): `L5`: h1, intro, response promise ("We reply within one working day"), then office details (address, phone, email, hours) from `site.ts`, and a small note "Job seeker? Apply through Careers →". `R7`: the form card (paper background) with tabs: Hire talent / Technology / Payroll & HR / General. Fields change per tab (spec/07).
2. **Map** (full width, 360 px): lazy-loaded Google Maps embed iframe for the office address from `site.ts`. Render a static navy placeholder with the address until the user scrolls near it. Hide if no address configured.

---

## Legal (`/privacy`, `/terms`), content: `content/legal/*.md`
Plain long-form layout, 68ch, table of contents at top. Last updated date from frontmatter. Note in `PLACEHOLDERS.md` that these templates must be reviewed by the client's lawyer.

## Thank you (`/thank-you`)
Big Fraunces "Thank you." with the gold dot, one line based on `?type=`, links back to Services and Insights. `noindex`.

## 404
Fraunces h1 "This page has moved on.", one line, search-free: three links (Home, Services, Careers). Keep the mark visible.
