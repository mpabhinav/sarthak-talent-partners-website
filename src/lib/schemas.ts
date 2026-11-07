import { z } from "zod";

/**
 * Zod schemas for every file in content/. They are strict (unknown keys fail the build)
 * so typos in frontmatter are caught early. Any string may contain [[placeholders]].
 */

// ---------- shared building blocks ----------
export const PillarSlug = z.enum(["staffing", "technology", "hr-payroll"]);
export const EnquiryType = z.enum(["hire", "technology", "payroll", "general"]);
export type EnquiryType = z.infer<typeof EnquiryType>;

const str = z.string().min(1);
const Seo = z.strictObject({ title: str, description: z.string().min(1).max(160) });
const Img = z.strictObject({ src: str, alt: str });
const Cta = z.strictObject({ label: str, href: str });
const TitleText = z.strictObject({ title: str, text: str });
const Faq = z.strictObject({ q: str, a: str });

// ---------- services ----------
export const Service = z.strictObject({
  title: str,
  slug: str,
  pillar: PillarSlug,
  order: z.number(),
  icon: str, // lucide icon name
  summary: str, // one line, used in menus and cards
  enquiry: EnquiryType,
  seo: Seo,
  hero: z.strictObject({ eyebrow: str, headline: str, intro: str, cta: str }),
  heroVisual: z.enum(["photo", "panel"]).default("photo"),
  panelItems: z.array(str).optional(),
  glance: z.array(z.strictObject({ label: str, value: str })).default([]),
  includes: z.strictObject({ title: str, intro: str, items: z.array(TitleText).min(1) }),
  list: z
    .strictObject({
      title: str,
      groups: z.array(z.strictObject({ name: str, items: z.array(str).min(1) })).min(1),
    })
    .optional(),
  steps: z.array(TitleText).min(1),
  why: z.strictObject({ pullLine: str.optional(), reasons: z.array(TitleText).min(1) }),
  faqs: z.array(Faq).min(1),
  related: z.array(str),
});
export type Service = z.infer<typeof Service>;

export const PillarData = z.strictObject({
  slug: PillarSlug,
  order: z.number(),
  title: str,
  enquiry: EnquiryType,
  seo: Seo,
  hero: z.strictObject({ eyebrow: str, headline: str, intro: str, image: Img }),
  process: z.array(TitleText).min(1),
  why: z.strictObject({ title: str, reasons: z.array(TitleText).min(1) }),
  faqs: z.array(Faq).min(1),
});
export type PillarData = z.infer<typeof PillarData>;
export const PillarsFile = z.strictObject({ pillars: z.array(PillarData).length(3) });

export const ServicesHub = z.strictObject({
  seo: Seo,
  hero: z.strictObject({ eyebrow: str, headline: str, intro: str }),
  engagementModels: z.strictObject({
    title: str,
    items: z.array(z.strictObject({ title: str, who: str, billing: str })).min(1),
  }),
  faqs: z.array(Faq).min(1),
});
export type ServicesHub = z.infer<typeof ServicesHub>;

// ---------- jobs and posts ----------
export const Job = z.strictObject({
  title: str,
  slug: str,
  employer: z.enum(["sarthak", "client"]),
  location: str,
  type: z.enum(["Full-time", "Contract", "Part-time", "Internship"]),
  experience: str,
  posted: z.coerce.date(),
  validThrough: z.coerce.date().optional(),
  salary: str.optional(),
  summary: str,
  active: z.boolean().default(true),
});
export type Job = z.infer<typeof Job>;

export const Post = z.strictObject({
  title: str,
  slug: str,
  excerpt: str,
  category: str,
  author: str,
  date: z.coerce.date(),
  cover: str.optional(),
  coverAlt: str.optional(),
  draft: z.boolean().default(false),
});
export type Post = z.infer<typeof Post>;

// ---------- legal ----------
export const Legal = z.strictObject({ title: str, updated: z.coerce.date() });
export type Legal = z.infer<typeof Legal>;

// ---------- pages ----------
export const HomePage = z.strictObject({
  seo: Seo,
  hero: z.strictObject({
    eyebrow: str,
    headline: str, // may contain {swoosh}...{/swoosh}
    intro: str,
    primaryCta: Cta,
    secondaryCta: Cta,
    image: Img,
    shortlistCard: z.strictObject({
      eyebrow: str,
      role: str,
      initials: z.array(str),
      note: str,
    }),
  }),
  stats: z.array(z.strictObject({ value: str, label: str })), // hidden unless flags.showStats
  roleTicker: z.strictObject({ label: str, roles: z.array(str).min(1) }),
  whatWeDo: z.strictObject({
    eyebrow: str,
    title: str,
    intro: str,
    pillars: z.array(
      z.strictObject({
        number: str,
        title: str,
        summary: str,
        links: z.array(str),
        href: str,
        image: Img,
      }),
    ),
  }),
  howAHireWorks: z.strictObject({
    eyebrow: str,
    title: str,
    intro: str,
    steps: z.array(z.strictObject({ marker: str, title: str, text: str })),
    footnote: str,
  }),
  itNonIt: z.strictObject({
    left: z.strictObject({ title: str, text: str, groups: z.array(str), link: Cta }),
    right: z.strictObject({ title: str, text: str, groups: z.array(str), link: Cta }),
  }),
  principles: z.strictObject({
    eyebrow: str,
    quote: str,
    attribution: z.strictObject({ name: str, role: str, photo: str }),
    items: z.array(TitleText),
  }),
  beyondHiring: z.strictObject({
    title: str,
    text: str,
    panels: z.array(
      z.strictObject({ title: str, icon: str, text: str, href: str, items: z.array(str) }),
    ),
  }),
  industries: z.strictObject({ eyebrow: str, title: str, items: z.array(str) }),
  insightsTeaser: z.strictObject({ title: str, linkLabel: str }),
  twoDoors: z.strictObject({
    hiring: z.strictObject({ title: str, text: str, cta: Cta }),
    seeking: z.strictObject({ title: str, text: str, cta: Cta }),
  }),
});
export type HomePage = z.infer<typeof HomePage>;

export const AboutPage = z.strictObject({
  seo: Seo,
  hero: z.strictObject({ eyebrow: str, headline: str, intro: str, images: z.array(Img) }),
  story: z.strictObject({
    label: str,
    paragraphs: z.array(str).min(1),
    signature: z.strictObject({ name: str, role: str }),
  }),
  beliefs: z.strictObject({
    label: str,
    title: str,
    items: z.array(z.strictObject({ number: str, title: str, text: str })),
  }),
  measures: z.strictObject({ label: str, title: str, intro: str, items: z.array(TitleText) }),
  visionMission: z.strictObject({
    vision: z.strictObject({ title: str, text: str }),
    mission: z.strictObject({ title: str, items: z.array(str) }),
  }),
  team: z.strictObject({
    title: str,
    members: z.array(z.strictObject({ name: str, role: str, note: str, photo: str })),
  }), // hidden unless flags.showTeam
});
export type AboutPage = z.infer<typeof AboutPage>;

export const CareersPage = z.strictObject({
  seo: Seo,
  hero: z.strictObject({
    eyebrow: str,
    headline: str,
    intro: str,
    anchors: z.array(Cta),
    image: Img,
  }),
  openRoles: z.strictObject({ title: str, filters: z.array(str), emptyState: str }),
  life: z.strictObject({ title: str, paragraphs: z.array(str), photos: z.array(Img) }),
  benefits: z.strictObject({ title: str, items: z.array(TitleText) }),
  expect: z.strictObject({ title: str, steps: z.array(TitleText) }),
  cvForm: z.strictObject({ title: str, intro: str }),
});
export type CareersPage = z.infer<typeof CareersPage>;

export const ContactPage = z.strictObject({
  seo: Seo,
  hero: z.strictObject({
    eyebrow: str,
    headline: str,
    intro: str,
    promise: str,
    candidateNote: z.strictObject({ text: str, link: Cta }),
  }),
  tabs: z.array(z.strictObject({ id: EnquiryType, label: str, submitLabel: str })),
  consent: str,
});
export type ContactPage = z.infer<typeof ContactPage>;

const CtaBandCopy = z.strictObject({ title: str, text: str, cta: Cta });
export const SharedPage = z.strictObject({
  ctaBands: z.strictObject({
    hire: CtaBandCopy,
    technology: CtaBandCopy,
    payroll: CtaBandCopy,
    general: CtaBandCopy,
  }),
  footer: z.strictObject({ blurb: str, ctaBand: CtaBandCopy, madeIn: str }),
  candidateNote: z.strictObject({ text: str, link: Cta }),
  thankYou: z.strictObject({
    title: str,
    messages: z.strictObject({
      hire: str,
      technology: str,
      payroll: str,
      general: str,
      cv: str,
      job: str,
    }),
  }),
  notFound: z.strictObject({ title: str, text: str }),
});
export type SharedPage = z.infer<typeof SharedPage>;

export const PAGE_SCHEMAS = {
  home: HomePage,
  about: AboutPage,
  careers: CareersPage,
  contact: ContactPage,
  shared: SharedPage,
} as const;
export type PageName = keyof typeof PAGE_SCHEMAS;
export type PageData<N extends PageName> = z.infer<(typeof PAGE_SCHEMAS)[N]>;
export const LEGAL_NAMES = ["privacy", "terms"] as const;
export type LegalName = (typeof LEGAL_NAMES)[number];
