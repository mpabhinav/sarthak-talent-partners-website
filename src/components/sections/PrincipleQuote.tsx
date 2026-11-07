import { Eyebrow } from "@/components/brand/Eyebrow";
import { Mark } from "@/components/brand/Mark";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { Text } from "@/components/Text";
import { getPage } from "@/lib/content";

/** "Why companies stay with us": a company principle (not a client testimonial) plus four numbered principles. */
export function PrincipleQuote() {
  const { principles: p } = getPage("home");
  return (
    <Section bg="navy" spacing="lg" aria-labelledby="principles-title">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow dot as="h2" className="mb-8">
              <span id="principles-title">
                <Text>{p.eyebrow}</Text>
              </span>
            </Eyebrow>
            <figure>
              <blockquote className="font-display text-[length:var(--text-h2)] leading-[1.18] font-normal tracking-[-0.01em] text-white italic">
                <p className="max-w-none">
                  <Text>{`“${p.quote}”`}</Text>
                </p>
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="flex size-12 shrink-0 items-center justify-center rounded-full border border-rule bg-blue"
                >
                  <Mark tone="reversed" size={28} />
                </span>
                <span>
                  <span className="block font-semibold text-white">
                    <Text>{p.attribution.name}</Text>
                  </span>
                  <span className="block text-small text-fg-muted">
                    <Text>{p.attribution.role}</Text>
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <Stagger as="ol" className="border-b border-slate/30 lg:col-span-7 lg:pt-3" itemClassName="border-t border-slate/30">
          {p.items.map((item, i) => (
            <div key={item.title} className="grid gap-x-8 gap-y-2 py-8 sm:grid-cols-[3.5rem_minmax(0,1fr)]">
              <span className="font-display text-2xl leading-none text-accent-text tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-h3 text-white">
                  <Text>{item.title}</Text>
                </h3>
                <p className="mt-2 text-body text-slate">
                  <Text>{item.text}</Text>
                </p>
              </div>
            </div>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
