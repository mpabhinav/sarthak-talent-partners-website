import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { CtaBand } from "@/components/layout/CtaBand";
import { CandidateNote } from "@/components/sections/CandidateNote";
import { DarkGroupedList } from "@/components/sections/DarkGroupedList";
import { FaqSection } from "@/components/sections/FaqSection";
import { GlanceStrip } from "@/components/sections/GlanceStrip";
import { IncludesList } from "@/components/sections/IncludesList";
import { RelatedServices } from "@/components/sections/RelatedServices";
import { ServiceHero } from "@/components/sections/ServiceHero";
import { StepsList } from "@/components/sections/StepsList";
import { WhyList } from "@/components/sections/WhyList";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPillar, getService, getServices } from "@/lib/content";
import { stripPlaceholders } from "@/lib/placeholders";
import { absoluteUrl, buildMetadata, siteUrl } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getServices().map((s) => ({ pillar: s.pillar, service: s.slug }));
}

type Props = { params: Promise<{ pillar: string; service: string }> };

export async function generateMetadata({ params }: Props) {
  const { pillar, service: slug } = await params;
  const service = getService(pillar, slug);
  const pillarData = getPillar(pillar);
  if (!service || !pillarData) return {};
  return buildMetadata({
    ...service.seo,
    path: "/services/" + pillar + "/" + slug,
  });
}

export default async function ServicePage({ params }: Props) {
  const { pillar: pillarSlug, service: slug } = await params;
  const service = getService(pillarSlug, slug);
  const pillar = getPillar(pillarSlug);
  if (!service || !pillar) notFound();

  const all = getServices();
  const related = service.related.flatMap((r) => all.filter((s) => s.slug === r));
  const isStaffing = pillar.slug === "staffing";

  // Keep the white/paper rhythm intact whether or not the navy list section is present.
  const hasList = Boolean(service.list);
  const [stepsBg, whyBg, faqBg, relatedBg] = hasList
    ? (["white", "paper", "white", "paper"] as const)
    : (["paper", "white", "paper", "white"] as const);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: stripPlaceholders(service.title),
    serviceType: stripPlaceholders(service.title),
    description: stripPlaceholders(service.summary),
    url: absoluteUrl(`/services/${pillar.slug}/${service.slug}`),
    provider: { "@type": "Organization", name: site.name, url: siteUrl },
    areaServed: "IN",
  };

  return (
    <>
      <ServiceHero
        service={service}
        photo={pillar.hero.image}
        crumbs={[
          { label: "Services", href: "/services" },
          { label: pillar.title, href: "/services/" + pillar.slug },
          { label: service.title },
        ]}
      />
      <GlanceStrip items={service.glance} />
      <IncludesList
        title={service.includes.title}
        intro={service.includes.intro}
        items={service.includes.items}
      />
      {service.list ? <DarkGroupedList title={service.list.title} groups={service.list.groups} /> : null}
      <StepsList title="How it works" steps={service.steps} bg={stepsBg} />
      <WhyList
        title="Why Sarthak"
        reasons={service.why.reasons}
        pullLine={service.why.pullLine}
        bg={whyBg}
      />
      <FaqSection faqs={service.faqs} bg={faqBg} />
      <RelatedServices services={related} bg={relatedBg} />
      {isStaffing ? <CandidateNote bg={relatedBg === "paper" ? "white" : "paper"} /> : null}
      <CtaBand enquiry={service.enquiry} />
      <JsonLd data={jsonLd} />
    </>
  );
}
