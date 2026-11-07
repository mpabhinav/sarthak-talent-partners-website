import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CtaBand } from "@/components/layout/CtaBand";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/sections/PageHero";
import { Text } from "@/components/Text";
import { getPage, getPosts } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";

// Insights has no page file in content/pages; the teaser title is the only shared copy for it.
const heading = getPage("home").insightsTeaser.title;

export const metadata = buildMetadata({
  title: "Insights",
  description: "Notes on hiring, payroll and technology from the Sarthak team.",
  path: "/insights",
});

export default function InsightsPage() {
  const posts = getPosts();
  return (
    <>
      <Breadcrumbs items={[{ label: "Insights" }]} />
      <PageHero title="Insights" intro={heading} />
      <Container className="pb-20">
        <ul className="grid gap-x-10 gap-y-2 border-t border-line pt-6 md:grid-cols-2">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={"/insights/" + post.slug} className="block rounded-sm py-4 hover:bg-paper md:px-3">
                <span className="text-xs font-semibold tracking-[0.14em] text-accent-text uppercase">
                  {post.category}
                </span>
                <span className="mt-2 block font-display text-xl text-fg">{post.title}</span>
                <span className="mt-2 block text-fg-muted">{post.excerpt}</span>
                <span className="mt-2 block text-small text-ink-muted">
                  <time dateTime={post.date.toISOString()}>{formatDate(post.date)}</time> ·{" "}
                  <Text>{post.author}</Text>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
      <CtaBand enquiry="general" />
    </>
  );
}
