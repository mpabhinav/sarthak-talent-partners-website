import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CtaBand } from "@/components/layout/CtaBand";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/sections/PageHero";
import { Text } from "@/components/Text";
import { getJobs, getPage } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

const careers = getPage("careers");

export const metadata = buildMetadata({ ...careers.seo, path: "/careers" });

export default function CareersPage() {
  const { hero, openRoles } = careers;
  const jobs = getJobs({ activeOnly: true });
  return (
    <>
      <Breadcrumbs items={[{ label: "Careers" }]} />
      <PageHero eyebrow={hero.eyebrow} title={hero.headline} intro={hero.intro} />
      <Container className="pb-20">
        <section id="open-roles" aria-labelledby="open-roles-title" className="scroll-mt-24 border-t border-line pt-10">
          <h2 id="open-roles-title" className="text-h2">
            {openRoles.title}
          </h2>
          {jobs.length === 0 ? (
            <p className="mt-6 text-fg-muted">{openRoles.emptyState}</p>
          ) : (
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {jobs.map((job) => (
                <li key={job.slug}>
                  <Link href={"/careers/" + job.slug} className="block py-5 hover:bg-paper md:px-3">
                    <span className="font-display text-xl text-fg">
                      <Text>{job.title}</Text>
                    </span>
                    <span className="mt-1 block text-small text-ink-muted">
                      <Text>{job.location}</Text> · {job.type} · {job.experience} ·{" "}
                      {job.employer === "sarthak" ? "At Sarthak" : "With our clients"}
                    </span>
                    <span className="mt-2 block text-fg-muted">
                      <Text>{job.summary}</Text>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </Container>
      <CtaBand enquiry="general" />
    </>
  );
}
