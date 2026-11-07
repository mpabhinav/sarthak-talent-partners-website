# 07 · Forms and integrations

## Provider: Web3Forms (free plan)

- Free plan: 250 submissions/month, unlimited forms, email delivery to the address registered with the access key, hCaptcha available on free. File uploads are **not** on the free plan (Pro only).
- Get a key at web3forms.com by entering the client's inbox email; the key arrives by email. Put it in `NEXT_PUBLIC_WEB3FORMS_KEY` (it's designed to be public).
- Endpoint: `POST https://api.web3forms.com/submit` with JSON or FormData. Use context7 / web3forms docs to confirm the current field names before coding (`access_key`, `subject`, `from_name`, `botcheck`, `redirect` etc.).

### Resume handling (because uploads are paid)

- **Default (free):** the CV form asks for a **link** to the CV (Google Drive, Dropbox, OneDrive or LinkedIn profile) with helper text: "Paste a link to your CV. Make sure it's set to 'anyone with the link can view'." Validate it's a URL.
- **Upgrade path:** if `site.forms.resumeUpload === true`, render a file input instead (PDF/DOC/DOCX, max 5 MB) and send `multipart/form-data`. Document in `README` that this needs Web3Forms Pro.
- Build both paths now behind the flag; ship with `false`.

## The forms

All forms: client components, `react` `useActionState` or simple `useState` + `fetch`, zod validation on submit with inline errors next to fields, a hidden honeypot `botcheck` checkbox, a disabled + "Sending…" submit state, and on success `router.push('/thank-you?type=...')`. On network failure: inline error with the email address from `site.ts` as a fallback. Each submission sets `subject` like `"[Website] Hire talent: Senior Java Developer"` and `from_name: "Sarthak website"`.

### 1. EnquiryForm (Contact page tabs + CTA deep links)

Common fields: Full name*, Work email*, Phone* (Indian format, allow +91), Company*, Message.

| Tab | Extra fields |
|---|---|
| **Hire talent** (`hire`) | Role(s) you're hiring for*, Number of positions (select: 1, 2–5, 6–20, 20+), Hiring type (Permanent / Contract / Not sure), Location(s), When do you need them? (select: ASAP, Within a month, 1–3 months, Just exploring) |
| **Technology** (`technology`) | Service (select: Cloud services, Data & analytics, Application development, IT consulting, Not sure), Project stage (Idea / Scoping / In progress / Need support) |
| **Payroll & HR** (`payroll`) | Number of employees (select: <25, 25–100, 100–500, 500+), Services needed (checkboxes: Payroll processing, Statutory compliance, HR operations, Onboarding & exits) |
| **General** (`general`) | none |

Consent line under the button: "We'll only use these details to reply to you. See our privacy policy." (link). No pre-ticked marketing checkbox.

### 2. CvForm (Careers page, general application)

Full name*, Email*, Phone*, Current city*, Area (select: Technology, Finance & Accounts, Sales & Marketing, Operations & Supply Chain, HR & Admin, Engineering & Manufacturing, Healthcare, Other), Total experience (select: Fresher, 1–3, 3–6, 6–10, 10+ years), Notice period (select: Immediate, 15 days, 30 days, 60 days, 90 days), CV link* (or file if flag on), LinkedIn URL, Anything else.

### 3. JobApplyForm (job detail page)

Same as CvForm minus "Area", plus hidden `role` and `jobSlug`, and "Current CTC (optional)" and "Expected CTC (optional)" text fields.

## Accessibility for forms

- Every input has a visible `<label>`; required fields marked with "*" and `aria-required`.
- Errors: `aria-invalid`, `aria-describedby` pointing to the error text, focus moves to the first invalid field on submit.
- Success/failure announced via an `aria-live="polite"` region.
- Autocomplete attributes: `name`, `email`, `tel`, `organization`, `address-level2`.

## Other integrations

| What | How |
|---|---|
| Analytics | `@vercel/analytics` + `@vercel/speed-insights`. Optional GA4 via `@next/third-parties/google` only if the client asks, with `[[GA ID]]`. |
| Maps | Google Maps embed iframe (no API key needed for the basic embed URL), lazy loaded. |
| WhatsApp | If `site.whatsapp` is set, show a "Chat on WhatsApp" link (`https://wa.me/<number>`) on Contact and in the mobile nav. No floating bubble. |
| Spam | Web3Forms honeypot (`botcheck`) on all forms; enable hCaptcha later only if spam appears. |
