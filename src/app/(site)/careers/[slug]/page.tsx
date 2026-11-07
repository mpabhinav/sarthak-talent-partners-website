import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CtaBand } from "@/components/layout/CtaBand";
import { Container } from "@/components/layout/Container";
import { Markdown } from "@/components/mdx/Markdown";
import { PageHero } from "@/components/sections/PageHero";
import { Text } from "@/components/Text";
import { getJob, getJobs } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getJobs({ activeOnly: true }).map((j) => ({ slug: j.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const job = getJob((await params).slug);
  if (!job) return {};
  return buildMetadata({
    title: job.title + " (" + job.location + ")",
    description: job.summary,
    path: "/careers/" + job.slug,
  });
}

export default async function JobPage({ params }: Props) {
  const job = getJob((await params).slug);
  if (!job) notFound();
  const meta: [string, string][] = [
    ["Location", job.location],
    ["Type", job.type],
    ["Experience", job.experience],
    ...(job.salary ? ([["Salary", job.salary]] as [string, string][]) : []),
    ["Posted", formatDate(job.posted)],
  ];
  return (
    <>
      <Breadcrumbs items={[{ label: "Careers", href: "/careers" }, { label: job.title }]} />
      <PageHero
        eyebrow={job.employer === "sarthak" ? "At Sarthak" : "With our clients"}
        title={job.title}
        intro={job.summary}
      />
      <Container className="pb-20">
        <dl className="grid gap-x-8 gap-y-4 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {meta.map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs font-semibold tracking-[0.14em] text-ink-muted uppercase">{label}</dt>
              <dd className="mt-1">
                <Text>{value}</Text>
              </dd>
            </div>
          ))}
        </dl>
        <Markdown source={job.body} className="mt-10" />
      </Container>
      <CtaBand enquiry="general" />
    </>
  );
}
