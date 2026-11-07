import { LegalPage } from "@/components/sections/LegalPage";
import { getLegal } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: getLegal("terms").title,
  description: "The terms that apply to your use of the Sarthak Talent Partners website.",
  path: "/terms",
});

export default function TermsPage() {
  return <LegalPage name="terms" />;
}
