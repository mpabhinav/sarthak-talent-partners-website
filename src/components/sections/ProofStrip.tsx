import { Container } from "@/components/layout/Container";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { Text } from "@/components/Text";
import { site } from "@/config/site";
import { getPage } from "@/lib/content";

/** Plain digits (no placeholder) count up; anything else renders as copy. */
function Value({ value }: { value: string }) {
  const m = value.match(/^(\d[\d,]*)(\+?)$/);
  if (m) return <CountUp to={Number(m[1].replace(/,/g, ""))} suffix={m[2]} />;
  return <Text>{value}</Text>;
}

/** Four stats in one row with hairline dividers. Hidden unless site.flags.showStats: never ship unconfirmed numbers. */
export function ProofStrip() {
  if (!site.flags.showStats) return null;
  const { stats } = getPage("home");
  return (
    <section aria-label="Sarthak in numbers" className="bg-white pb-16 md:pb-24">
      <Container>
        <Reveal>
          <dl className="grid grid-cols-2 border-y border-line lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col px-2 py-8 md:px-8 ${i % 2 === 1 ? "border-l border-line" : ""} ${i > 0 ? "lg:border-l lg:border-line" : ""} ${i > 1 ? "border-t border-line lg:border-t-0" : ""}`}
              >
                <dt className="order-2 mt-2 text-small text-ink-muted">
                  <Text>{s.label}</Text>
                </dt>
                <dd className="font-display text-display-l leading-none text-navy">
                  <Value value={s.value} />
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
