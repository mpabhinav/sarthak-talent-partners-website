import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { Text } from "@/components/Text";

type Props = {
  title: string;
  reasons: { title: string; text: string }[];
  /** Optional pull-line set in Fraunces italic under the heading (service pages). */
  pullLine?: string;
  bg?: "white" | "paper";
};

/** "Why Sarthak": L5 heading (and pull-line), R7 reasons as a hairline list. Text only. */
export function WhyList({ title, reasons, pullLine, bg = "white" }: Props) {
  return (
    <Section bg={bg} spacing="md" aria-labelledby="why-title">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-12">
        <Reveal className="lg:col-span-5">
          <h2 id="why-title" className="text-h2">
            <Text>{title}</Text>
          </h2>
          {pullLine ? (
            <blockquote className="mt-8 border-l-2 border-gold pl-6 font-display text-h3 leading-snug italic">
              <Text>{pullLine}</Text>
            </blockquote>
          ) : null}
        </Reveal>
        <Stagger
          as="ol"
          className="lg:col-span-7 lg:pt-3"
          itemClassName="border-t border-line py-7 last:border-b"
        >
          {reasons.map((r) => (
            <div key={r.title} className="grid gap-x-8 gap-y-2 md:grid-cols-[minmax(0,12rem)_minmax(0,1fr)]">
              <h3 className="text-h3">
                <Text>{r.title}</Text>
              </h3>
              <p className="text-fg-muted">
                <Text>{r.text}</Text>
              </p>
            </div>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
