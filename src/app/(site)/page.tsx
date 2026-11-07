import { BeyondHiring } from "@/components/sections/BeyondHiring";
import { HomeHero } from "@/components/sections/HomeHero";
import { IndustryChips } from "@/components/sections/IndustryChips";
import { InsightsTeaser } from "@/components/sections/InsightsTeaser";
import { ItNonItSplit } from "@/components/sections/ItNonItSplit";
import { OpenRolesTeaser } from "@/components/sections/OpenRolesTeaser";
import { PillarRows } from "@/components/sections/PillarRows";
import { PrincipleQuote } from "@/components/sections/PrincipleQuote";
import { ProofStrip } from "@/components/sections/ProofStrip";
import { RoleTicker } from "@/components/sections/RoleTicker";
import { Timeline } from "@/components/sections/Timeline";
import { TwoDoors } from "@/components/sections/TwoDoors";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/config/site";
import { getPage } from "@/lib/content";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { stripPlaceholders } from "@/lib/placeholders";

const home = getPage("home");

export const metadata = buildMetadata({
  title: home.seo.title,
  description: home.seo.description,
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  const sameAs = Object.values(site.socials).filter(Boolean).map(stripPlaceholders);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: site.name,
      url: absoluteUrl("/"),
      logo: absoluteUrl("/brand/sarthak-mark.png"),
      slogan: site.tagline,
      ...(sameAs.length ? { sameAs } : {}),
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: stripPlaceholders(site.phone.tel),
        email: stripPlaceholders(site.email.general),
        areaServed: "IN",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: site.name,
      url: absoluteUrl("/"),
    },
  ];
  return (
    <>
      <HomeHero />
      <ProofStrip />
      <RoleTicker />
      <PillarRows />
      <Timeline />
      <ItNonItSplit />
      <PrincipleQuote />
      <BeyondHiring />
      <IndustryChips />
      <InsightsTeaser />
      <OpenRolesTeaser />
      <TwoDoors />
      <JsonLd data={jsonLd} />
    </>
  );
}
