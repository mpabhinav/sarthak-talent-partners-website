import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CircleAlertIcon } from "lucide-react";
import { cn } from "cn";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Logo } from "@/components/brand/Logo";
import { Mark } from "@/components/brand/Mark";
import { GoldDot } from "@/components/brand/GoldDot";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { Swoosh } from "@/components/brand/Swoosh";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { CountUp } from "@/components/motion/CountUp";
import { Marquee } from "@/components/motion/Marquee";
import { Button, ButtonArrow } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Styleguide",
  description: "Internal design system reference.",
  robots: { index: false, follow: false },
};

/* ---------- data ---------- */

const brandSwatches = [
  { name: "Base white", token: "white", hex: "#FDFDFD", role: "Default page background", bg: "bg-white", ink: "text-navy" },
  { name: "Deep navy", token: "navy", hex: "#041838", role: "Text, dark sections, primary buttons", bg: "bg-navy", ink: "text-white" },
  { name: "Brand blue", token: "blue", hex: "#09254D", role: "Navy hover, cards on navy", bg: "bg-blue", ink: "text-white" },
  { name: "Accent gold", token: "gold", hex: "#D7A449", role: "Fills, dots, underlines, focus ring", bg: "bg-gold", ink: "text-navy" },
  { name: "Soft slate", token: "slate", hex: "#969DAD", role: "Borders, icons on navy, disabled", bg: "bg-slate", ink: "text-navy" },
] as const;

const derivedSwatches = [
  { name: "Paper", token: "paper", hex: "#F6F3EC", role: "Alternating sections", bg: "bg-paper", ink: "text-navy" },
  { name: "Ink muted", token: "ink-muted", hex: "#4A5468", role: "Secondary text on light", bg: "bg-ink-muted", ink: "text-white" },
  { name: "Gold ink", token: "gold-ink", hex: "#8A6420", role: "Gold text on light", bg: "bg-gold-ink", ink: "text-white" },
  { name: "Line", token: "line", hex: "#E4E1D8", role: "Hairline borders", bg: "bg-line", ink: "text-navy" },
  { name: "Navy 900", token: "navy-900", hex: "#020E22", role: "Footer bar, overlays", bg: "bg-navy-900", ink: "text-white" },
] as const;

const contrast = [
  { fg: "navy", bg: "white", ratio: "17.3", use: "Body, headings", ok: true, fgClass: "text-navy", bgClass: "bg-white" },
  { fg: "ink-muted", bg: "white", ratio: "7.5", use: "Secondary text", ok: true, fgClass: "text-ink-muted", bgClass: "bg-white" },
  { fg: "gold-ink", bg: "white", ratio: "5.3", use: "Eyebrows, links on light", ok: true, fgClass: "text-gold-ink", bgClass: "bg-white" },
  { fg: "gold", bg: "navy", ratio: "7.8", use: "Eyebrows, links, buttons on dark", ok: true, fgClass: "text-gold", bgClass: "bg-navy" },
  { fg: "white", bg: "navy", ratio: "17.3", use: "Text on dark", ok: true, fgClass: "text-white", bgClass: "bg-navy" },
  { fg: "slate", bg: "navy", ratio: "6.5", use: "Secondary text on dark", ok: true, fgClass: "text-slate", bgClass: "bg-navy" },
  { fg: "gold", bg: "white", ratio: "2.2", use: "Fills, rules and dots only", ok: false, fgClass: "", bgClass: "" },
  { fg: "slate", bg: "white", ratio: "2.7", use: "Borders and icons on navy only", ok: false, fgClass: "", bgClass: "" },
] as const;

const typeScale = [
  { token: "display-xl", cls: "text-display-xl", spec: "clamp(2.75rem, 6vw + 1rem, 6rem)", use: "Home hero", sample: "People who stay" },
  { token: "display-l", cls: "text-display-l", spec: "clamp(2.25rem, 4vw + 1rem, 4.25rem)", use: "Page heroes", sample: "A shortlist worth reading" },
  { token: "h2", cls: "text-h2", spec: "clamp(1.875rem, 2.5vw + 1rem, 3rem)", use: "Section titles", sample: "Ways to work with us" },
  { token: "h3", cls: "text-h3", spec: "clamp(1.25rem, 1vw + 1rem, 1.625rem)", use: "Card and row titles", sample: "Contract staffing for a project or a peak season" },
] as const;

const faqs = [
  { q: "Do you work with small companies and startups?", a: "Yes. Many of our clients have under 100 people. We adjust the process to your size; a startup’s first finance hire needs a different search from a 50-person engineering ramp-up." },
  { q: "Can we use more than one service?", a: "Of course. A common pattern is contract staff for a project, then a permanent hire for the role that remains, with payroll handled by us in between." },
  { q: "How quickly can you start?", a: "Usually the same week. For hiring, the brief call can happen within a day of your enquiry." },
];

const roles = [
  "Java Developers", "Accountants", "Data Analysts", "Sales Managers", "Salesforce Consultants",
  "Site Engineers", "HR Executives", "DevOps Engineers", "Customer Support Leads", "Business Analysts",
  "Plant Supervisors", "QA Engineers",
];

const toc = [
  ["01", "Colour", "colour"],
  ["02", "Typography", "type"],
  ["03", "Buttons", "buttons"],
  ["04", "Form fields", "forms"],
  ["05", "Tabs and accordion", "disclosure"],
  ["06", "Brand details", "brand"],
  ["07", "Cards", "cards"],
  ["08", "Sections", "sections"],
  ["09", "Motion", "motion"],
] as const;

/* ---------- local layout helpers (this page only) ---------- */

function SpecHead({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="mb-12 grid gap-4 md:mb-16 md:grid-cols-12 md:gap-x-6">
      <h2 className="text-h2 md:col-span-5">{title}</h2>
      {children ? (
        <div className="text-body-l text-fg-muted md:col-span-6 md:col-start-7 md:pt-3">{children}</div>
      ) : null}
    </div>
  );
}

function Caption({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("mb-4 text-xs font-semibold tracking-[0.14em] text-fg-muted uppercase", className)}>
      {children}
    </p>
  );
}

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {hint && !error ? (
        <p id={`${id}-note`} className="text-small text-ink-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-note`} className="flex items-start gap-1.5 text-small font-semibold text-gold-ink">
          <CircleAlertIcon aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

function ButtonRow({ dark = false, bg }: { dark?: boolean; bg: string }) {
  return (
    <div
      data-tone={dark ? "dark" : undefined}
      className={cn("flex flex-col gap-8 rounded-lg p-6 md:p-8", bg, dark ? "text-white" : "border border-line text-navy")}
    >
      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        {dark ? (
          <Button variant="primary-on-dark">
            Hire talent <ButtonArrow />
          </Button>
        ) : (
          <Button variant="primary">
            Hire talent <ButtonArrow />
          </Button>
        )}
        <Button variant="outline">See open roles</Button>
        <Button variant="link-arrow">
          How we work <ButtonArrow />
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        {dark ? (
          <Button variant="primary-on-dark" size="lg">
            Large primary <ButtonArrow />
          </Button>
        ) : (
          <Button variant="primary" size="lg">
            Large primary <ButtonArrow />
          </Button>
        )}
        <Button variant={dark ? "primary-on-dark" : "primary"} disabled>
          Disabled
        </Button>
      </div>
    </div>
  );
}

/* ---------- page ---------- */

export default function StyleguidePage() {
  return (
    <main id="main">
      {/* Masthead */}
      <Section bg="white" spacing="md" className="relative border-b border-line">
        <div className="mb-14 flex items-center justify-between gap-6 md:mb-24">
          <Logo tone="navy" />
          <p className="text-xs font-semibold tracking-[0.14em] text-fg-muted uppercase">Internal reference</p>
        </div>
        <div className="grid gap-12 md:grid-cols-12 md:gap-x-6">
          <div className="md:col-span-7">
            <Eyebrow dot>Design system</Eyebrow>
            <h1 className="text-display-l mt-6">
              The Recruiter’s <Swoosh variant="a">Desk</Swoosh>
              <GoldDot className="ml-[0.06em]" />
            </h1>
            <p className="text-body-l mt-8 max-w-[52ch] text-fg-muted">
              Editorial and warm, like a well-made annual report. Deep navy carries authority; gold shows up the
              way a highlighter would on a printed shortlist, sparingly and by hand.
            </p>
          </div>
          <nav aria-label="Styleguide sections" className="md:col-span-4 md:col-start-9 md:pt-3">
            <Caption>Contents</Caption>
            <ol className="border-t border-line">
              {toc.map(([n, label, id]) => (
                <li key={id} className="border-b border-line">
                  <a
                    href={`#${id}`}
                    className="group flex min-h-11 items-baseline gap-4 py-2.5 text-fg transition-colors duration-150 hover:text-gold-ink"
                  >
                    <span className="font-display text-sm text-gold-ink tabular-nums">{n}</span>
                    <span className="font-semibold">{label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </Section>

      {/* 01 Colour */}
      <Section id="colour" bg="paper" spacing="lg" number="01" label="Colour">
        <SpecHead title="Five brand colours, five derived ones">
          <p>
            Roughly 70% light, 25% navy, 5% gold. Derived tokens exist only for accessibility and depth.
            Nothing else is allowed.
          </p>
        </SpecHead>

        <Caption>Brand palette</Caption>
        <Stagger className="grid grid-cols-2 gap-4 md:grid-cols-5" itemClassName="min-w-0">
          {brandSwatches.map((s) => (
            <Swatch key={s.token} {...s} />
          ))}
        </Stagger>

        <Caption className="mt-12">Derived tokens</Caption>
        <Stagger className="grid grid-cols-2 gap-4 md:grid-cols-5" itemClassName="min-w-0">
          {derivedSwatches.map((s) => (
            <Swatch key={s.token} {...s} />
          ))}
        </Stagger>

        <Caption className="mt-16">Measured contrast (WCAG)</Caption>
        <div>
          <table className="w-full border-t border-navy text-left text-small">
            <caption className="sr-only">Contrast ratios for text and background pairs</caption>
            <thead className="sr-only">
              <tr>
                <th scope="col">Sample</th>
                <th scope="col">Pair</th>
                <th scope="col">Ratio</th>
                <th scope="col">Use</th>
              </tr>
            </thead>
            <tbody>
              {contrast.map((c) => (
                <tr key={`${c.fg}-${c.bg}`} className="border-b border-line align-middle">
                  <td className="w-24 py-3 pr-4">
                    {c.ok ? (
                      <span className={cn("inline-flex h-10 w-16 items-center justify-center rounded-sm border border-line font-display text-lg", c.fgClass, c.bgClass)}>
                        Aa
                      </span>
                    ) : (
                      <span className="inline-flex h-10 w-16 items-center justify-center rounded-sm border border-dashed border-gold-ink text-gold-ink" aria-hidden="true">
                        &times;
                      </span>
                    )}
                  </td>
                  <td className="py-3 pr-4 font-semibold md:whitespace-nowrap">
                    {c.fg} on {c.bg}
                    <span className="mt-0.5 block text-xs font-normal text-ink-muted md:hidden">
                      {c.ok ? c.use : "Never for text"}
                    </span>
                  </td>
                  <td className="py-3 pr-4 font-display text-xl tabular-nums">{c.ratio}</td>
                  <td className="hidden py-3 text-ink-muted md:table-cell">
                    {c.ok ? (
                      c.use
                    ) : (
                      <>
                        <strong className="font-semibold text-gold-ink">Never for text.</strong> {c.use}.
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* 02 Typography */}
      <Section id="type" bg="white" spacing="lg" number="02" label="Typography">
        <SpecHead title="A serif for the voice, a grotesk for the work">
          <p>
            Fraunces for display, Hanken Grotesk for body, UI and labels. Headlines balance their lines;
            paragraphs avoid orphans.
          </p>
        </SpecHead>

        <div className="border-t border-navy">
          {typeScale.map((t) => (
            <Reveal key={t.token} className="grid gap-3 border-b border-line py-8 md:grid-cols-12 md:gap-x-6 md:py-10">
              <div className="md:col-span-3">
                <p className="font-semibold">{t.token}</p>
                <p className="text-small mt-1 text-ink-muted">{t.use}</p>
                <p className="text-small mt-2 break-words text-ink-muted tabular-nums">{t.spec}</p>
              </div>
              <p className={cn("font-display md:col-span-9", t.cls)} style={{ fontVariationSettings: '"SOFT" 30' }}>
                {t.sample}
              </p>
            </Reveal>
          ))}
          <Reveal className="grid gap-3 border-b border-line py-8 md:grid-cols-12 md:gap-x-6 md:py-10">
            <div className="md:col-span-3">
              <p className="font-semibold">body-l</p>
              <p className="text-small mt-1 text-ink-muted">Intros. 1.1875rem / 1.6</p>
            </div>
            <p className="text-body-l max-w-[60ch] md:col-span-8">
              We screen every candidate ourselves, so you meet a short list of people worth your time.
            </p>
          </Reveal>
          <Reveal className="grid gap-3 border-b border-line py-8 md:grid-cols-12 md:gap-x-6 md:py-10">
            <div className="md:col-span-3">
              <p className="font-semibold">body</p>
              <p className="text-small mt-1 text-ink-muted">Running text. 1.0625rem / 1.65</p>
            </div>
            <div className="md:col-span-8">
              <p className="text-body">
                Usually the same week. For hiring, the brief call can happen within a day of your enquiry.
                Body links look <a href="#type">like this</a>, in gold ink with a 3px offset, and secondary
                text uses <span className="text-ink-muted">ink muted</span>.
              </p>
            </div>
          </Reveal>
          <Reveal className="grid gap-3 border-b border-line py-8 md:grid-cols-12 md:gap-x-6 md:py-10">
            <div className="md:col-span-3">
              <p className="font-semibold">small</p>
              <p className="text-small mt-1 text-ink-muted">Notes, captions. 0.875rem</p>
            </div>
            <p className="text-small md:col-span-8">Mon to Sat, 9:30 am to 6:30 pm IST</p>
          </Reveal>
          <Reveal className="grid gap-3 border-b border-line py-8 md:grid-cols-12 md:gap-x-6 md:py-10">
            <div className="md:col-span-3">
              <p className="font-semibold">Italic emphasis</p>
              <p className="text-small mt-1 text-ink-muted">One word per headline, at most</p>
            </div>
            <p className="text-h2 font-display md:col-span-8">
              Hiring people who <em>stay</em>
            </p>
          </Reveal>
        </div>
      </Section>

      {/* 03 Buttons */}
      <Section id="buttons" bg="paper" spacing="lg" number="03" label="Buttons">
        <SpecHead title="Pill buttons, one filled per view">
          <p>
            Navy fill on light, gold fill on dark. Secondary actions are text links with an underline that
            thickens on hover. The arrow moves 3px.
          </p>
        </SpecHead>
        <div className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-5">
            <Caption>On white</Caption>
            <ButtonRow bg="bg-white" />
          </div>
          <div className="md:col-span-4">
            <Caption>On paper</Caption>
            <ButtonRow bg="bg-paper" />
          </div>
          <div className="md:col-span-3">
            <Caption>On navy</Caption>
            <ButtonRow dark bg="bg-navy" />
          </div>
        </div>
        <p className="text-small mt-8 text-ink-muted">
          All buttons are at least 44px tall. Variants: primary, primary-on-dark, outline, link-arrow.
        </p>
      </Section>

      {/* 04 Forms */}
      <Section id="forms" bg="white" spacing="lg" number="04" label="Form fields">
        <SpecHead title="Labels above, never placeholder-only">
          <p>
            48px fields, a 1px line border, 8px radius. Focus shows a navy border and the gold ring. Errors
            use a heavier border, an icon and a message, never colour alone.
          </p>
        </SpecHead>
        <form className="grid gap-x-6 gap-y-8 md:grid-cols-12" action="#" noValidate>
          <div className="grid gap-8 md:col-span-6 md:grid-cols-1">
            <Field id="sg-name" label="Full name">
              <Input id="sg-name" name="name" autoComplete="name" />
            </Field>
            <Field id="sg-email" label="Work email" error="Enter an email address like name@company.com.">
              <Input
                id="sg-email"
                name="email"
                type="email"
                autoComplete="email"
                spellCheck={false}
                defaultValue="name@company"
                aria-invalid="true"
                aria-describedby="sg-email-note"
              />
            </Field>
            <Field id="sg-phone" label="Phone (disabled)" hint="Not available for this enquiry.">
              <Input id="sg-phone" name="phone" type="tel" autoComplete="tel" disabled defaultValue="+91 00000 00000" aria-describedby="sg-phone-note" />
            </Field>
            <Field id="sg-select" label="Enquiry type">
              <Select name="enquiry" defaultValue="hire">
                <SelectTrigger id="sg-select">
                  <SelectValue placeholder="Choose one" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hire">I want to hire</SelectItem>
                  <SelectItem value="job">I am looking for a job</SelectItem>
                  <SelectItem value="tech">Technology services</SelectItem>
                  <SelectItem value="payroll">Payroll and HR</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>

          <div className="grid content-start gap-8 md:col-span-5 md:col-start-8">
            <Field id="sg-message" label="Tell us about the role" hint="Two or three lines is plenty.">
              <Textarea id="sg-message" name="message" aria-describedby="sg-message-note" />
            </Field>

            <fieldset className="flex flex-col gap-2">
              <legend className="mb-2 text-sm font-semibold">Engagement</legend>
              <RadioGroup defaultValue="perm" name="engagement">
                {[
                  ["perm", "Permanent hire"],
                  ["contract", "Contract staffing"],
                  ["project", "Project delivery"],
                ].map(([v, l]) => (
                  <div key={v} className="flex min-h-11 items-center gap-3">
                    <RadioGroupItem value={v} id={`sg-r-${v}`} />
                    <Label htmlFor={`sg-r-${v}`} className="font-normal">
                      {l}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </fieldset>

            <div className="flex flex-col">
              <div className="flex min-h-11 items-center gap-3">
                <Checkbox id="sg-c1" defaultChecked />
                <Label htmlFor="sg-c1" className="font-normal">
                  Send me a copy of this enquiry
                </Label>
              </div>
              <div className="flex min-h-11 items-center gap-3">
                <Checkbox id="sg-c2" aria-invalid="true" aria-describedby="sg-c2-note" />
                <Label htmlFor="sg-c2" className="font-normal">
                  I agree to be contacted
                </Label>
              </div>
              <p id="sg-c2-note" className="flex items-start gap-1.5 pl-8 text-small font-semibold text-gold-ink">
                <CircleAlertIcon aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                Tick this box to continue.
              </p>
              <div className="flex min-h-11 items-center gap-3">
                <Checkbox id="sg-c3" disabled />
                <Label htmlFor="sg-c3" className="font-normal">
                  Disabled option
                </Label>
              </div>
            </div>
          </div>
        </form>
      </Section>

      {/* 05 Tabs and accordion */}
      <Section id="disclosure" bg="paper" spacing="lg" number="05" label="Tabs and accordion">
        <SpecHead title="Hairlines instead of boxes" />
        <div className="grid gap-16 md:grid-cols-12 md:gap-x-6">
          <div className="md:col-span-5">
            <Caption>Tabs</Caption>
            <Tabs defaultValue="perm">
              <TabsList aria-label="Engagement models">
                <TabsTrigger value="perm">Permanent</TabsTrigger>
                <TabsTrigger value="contract">Contract</TabsTrigger>
                <TabsTrigger value="project">Project</TabsTrigger>
              </TabsList>
              <TabsContent value="perm">
                <p className="text-fg-muted">You want someone on your payroll for the long term.</p>
              </TabsContent>
              <TabsContent value="contract">
                <p className="text-fg-muted">
                  You need people for a project, a peak season or while a position is approved.
                </p>
              </TabsContent>
              <TabsContent value="project">
                <p className="text-fg-muted">
                  You have a defined technology outcome: a migration, an app, a dashboard.
                </p>
              </TabsContent>
            </Tabs>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Caption>Accordion</Caption>
            <Accordion type="single" collapsible defaultValue="item-0">
              {faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`item-${i}`}>
                  <AccordionTrigger>{f.q}</AccordionTrigger>
                  <AccordionContent>
                    <p>{f.a}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </Section>

      {/* 06 Brand details */}
      <Section id="brand" bg="white" spacing="lg" number="06" label="Brand details">
        <SpecHead title="Two motifs borrowed from the logo">
          <p>The gold dot and the swoosh. Used by hand, never as decoration for its own sake.</p>
        </SpecHead>

        <div className="grid gap-16 md:grid-cols-12 md:gap-x-6">
          <div className="md:col-span-7">
            <Caption>Swoosh: three hand-drawn variants</Caption>
            <div className="border-t border-navy">
              {(["a", "b", "c"] as const).map((v, i) => (
                <div key={v} className="flex items-baseline justify-between gap-6 border-b border-line py-8">
                  <p className="text-h2 font-display">
                    {["Find the ", "Hire the ", "Meet the "][i]}
                    <Swoosh variant={v}>{["people", "right", "shortlist"][i]}</Swoosh>
                  </p>
                  <span className="text-small text-ink-muted">variant {v}</span>
                </div>
              ))}
            </div>
            <p className="text-small mt-4 text-ink-muted">
              One key word per page. Draws once as it enters view; static under reduced motion.
            </p>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <Caption>Eyebrows</Caption>
            <div className="flex flex-col gap-6">
              <div className="rounded-lg border border-line p-6">
                <Eyebrow>On light, gold ink</Eyebrow>
                <br />
                <Eyebrow dot className="mt-4">
                  With leading dot
                </Eyebrow>
              </div>
              <div data-tone="dark" className="rounded-lg bg-navy p-6">
                <Eyebrow>On dark, gold</Eyebrow>
                <br />
                <Eyebrow dot className="mt-4">
                  With leading dot
                </Eyebrow>
              </div>
            </div>

            <Caption className="mt-12">Gold dot</Caption>
            <ul className="border-t border-line text-body">
              <li className="flex items-center gap-3 border-b border-line py-3">
                <GoldDot size="0.5rem" /> As a list bullet
              </li>
              <li className="border-b border-line py-3">
                <span className="font-display text-xl">
                  Headline full stop
                  <GoldDot className="ml-[0.06em]" />
                </span>
              </li>
              <li className="flex items-center gap-6 border-b border-line py-3">
                <span className="flex items-center gap-2 font-semibold">
                  <GoldDot size="0.4rem" /> Services
                </span>
                <span className="text-ink-muted">About</span>
                <span className="text-ink-muted">Careers</span>
              </li>
            </ul>

            <Caption className="mt-12">Logo and mark</Caption>
            <div className="flex items-center gap-8">
              <Mark size={40} />
              <div data-tone="dark" className="rounded-md bg-navy p-3">
                <Mark tone="reversed" size={32} />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 07 Cards */}
      <Section id="cards" bg="paper" spacing="lg" number="07" label="Cards">
        <SpecHead title="Cards are for things you can click">
          <p>No shadow at rest. A soft shadow on hover. Hairline lists everywhere else.</p>
        </SpecHead>
        <div className="grid gap-6 md:grid-cols-12">
          <a
            href="#cards"
            className="group block rounded-lg border border-line bg-white p-8 text-navy no-underline transition-shadow duration-200 hover:shadow-card-hover md:col-span-5"
          >
            <Eyebrow>Talent and staffing</Eyebrow>
            <h3 className="text-h3 mt-4">Permanent and contract hiring</h3>
            <p className="mt-3 text-ink-muted">
              From a single specialist to a full team, for technology, business and operations roles.
            </p>
            <span className="mt-8 inline-flex items-center gap-2 font-semibold underline decoration-1 underline-offset-[6px] group-hover:decoration-2">
              Explore <ButtonArrow className="size-4 text-gold-ink transition-transform duration-150 group-hover:translate-x-[3px]" />
            </span>
          </a>
          <div data-tone="dark" className="rounded-lg bg-navy p-4 md:col-span-6 md:col-start-7 md:p-6">
            <a
              href="#cards"
              className="group block rounded-lg border border-border bg-card p-8 text-white no-underline transition-shadow duration-200 hover:shadow-card-hover"
            >
              <Eyebrow>Technology services</Eyebrow>
              <h3 className="text-h3 mt-4">Cloud, data and applications</h3>
              <p className="mt-3 text-fg-muted">Engineers who have done the work before.</p>
              <span className="mt-8 inline-flex items-center gap-2 font-semibold underline decoration-1 underline-offset-[6px] group-hover:decoration-2">
                Explore <ButtonArrow className="size-4 text-gold transition-transform duration-150 group-hover:translate-x-[3px]" />
              </span>
            </a>
            <p className="text-small mt-4 text-fg-muted">Blue card on a navy section.</p>
          </div>
        </div>
      </Section>

      {/* 08 Sections */}
      <Section bg="white" spacing="sm" number="08" label="Sections" id="sections">
        <SpecHead title="Four backgrounds, three spacings">
          <p>
            White, paper, navy and blue. Navy and blue set <code className="text-small">data-tone=&quot;dark&quot;</code>{" "}
            so text, eyebrows, links and borders flip on their own. Never two navy sections back to back.
          </p>
        </SpecHead>
        <p className="text-fg-muted">This block is a white section with a numbered margin label, spacing sm.</p>
      </Section>
      <Section bg="paper" spacing="md" number="08.1" label="Paper">
        <h3 className="text-h3">Paper, spacing md</h3>
        <p className="mt-3 text-fg-muted">Warm off-white breaks the white monotony.</p>
      </Section>
      <Section bg="navy" spacing="lg" number="08.2" label="Navy">
        <Eyebrow dot>On navy</Eyebrow>
        <h3 className="text-h2 mt-4 max-w-[20ch]">Navy, spacing lg</h3>
        <p className="text-body-l mt-4 text-fg-muted">
          Secondary text is slate. Body links look <a href="#sections">like this</a>.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <Button variant="primary-on-dark">
            Primary on dark <ButtonArrow />
          </Button>
          <Button variant="link-arrow">
            Link <ButtonArrow />
          </Button>
        </div>
      </Section>
      <Section bg="paper" spacing="sm">
        <p className="text-fg-muted">A paper section to separate the two dark ones.</p>
      </Section>
      <Section bg="blue" spacing="md" number="08.3" label="Blue">
        <h3 className="text-h3">Blue, spacing md</h3>
        <p className="mt-3 text-fg-muted">The secondary dark surface, for call-to-action bands.</p>
      </Section>

      {/* 09 Motion */}
      <Section id="motion" bg="white" spacing="lg" number="09" label="Motion">
        <SpecHead title="Paper settling, not an app showing off">
          <p>
            Fade and 12px rise in 500ms, 60ms stagger, a 900ms swoosh, a 1.2s counter. Everything runs once
            and everything honours reduced motion.
          </p>
        </SpecHead>

        <Caption>Marquee (pauses on hover and focus)</Caption>
        <div className="border-y border-line py-5">
          <Marquee label="Roles we recruit for">
            {roles.map((r) => (
              <li key={r} className="flex items-center gap-4 pr-4">
                <span className="font-display text-xl whitespace-nowrap md:text-2xl">{r}</span>
                <GoldDot size="0.4rem" />
              </li>
            ))}
          </Marquee>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-12 md:gap-x-6">
          <div className="md:col-span-6">
            <Caption>Count up (demo values, not Sarthak figures)</Caption>
            <dl className="grid grid-cols-2 gap-6 border-t border-navy pt-6">
              <div>
                <dt className="text-small text-ink-muted">Demo A</dt>
                <dd className="text-display-l font-display">
                  <CountUp to={1250} suffix="+" />
                </dd>
              </div>
              <div>
                <dt className="text-small text-ink-muted">Demo B</dt>
                <dd className="text-display-l font-display">
                  <CountUp to={7} />
                </dd>
              </div>
            </dl>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <Caption>Stagger</Caption>
            <Stagger as="ul" className="border-t border-navy" itemClassName="border-b border-line py-3">
              <span>First row settles in</span>
              <span>Then the second, 60ms later</span>
              <span>Then the third</span>
              <span>And the fourth</span>
            </Stagger>
          </div>
        </div>
      </Section>

      <Container className="py-8">
        <p className="text-small text-ink-muted">Sarthak Talent Partners design system. Not linked from the site.</p>
      </Container>
    </main>
  );
}

function Swatch({
  name,
  token,
  hex,
  role,
  bg,
  ink,
}: {
  name: string;
  token: string;
  hex: string;
  role: string;
  bg: string;
  ink: string;
}) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white">
      <div className={cn("flex h-24 items-end p-3 md:h-32", bg, ink)}>
        <span className="font-display text-lg leading-none tabular-nums">{hex}</span>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <p className="font-semibold">{name}</p>
        <p className="text-small text-ink-muted">--color-{token}</p>
        <p className="text-small text-ink-muted">{role}</p>
      </div>
    </div>
  );
}
