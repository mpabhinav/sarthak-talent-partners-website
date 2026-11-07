import { LegalPage } from "@/components/sections/LegalPage";
import { getLegal } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: getLegal("privacy").title,
  description: "How Sarthak Talent Partners collects, uses and protects personal information on this website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return <LegalPage name="privacy" />;
}
