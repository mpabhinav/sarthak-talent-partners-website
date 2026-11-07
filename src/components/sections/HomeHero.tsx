import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { GoldDot } from "@/components/brand/GoldDot";
import { Swoosh } from "@/components/brand/Swoosh";
import { Container } from "@/components/layout/Container";
import { Text } from "@/components/Text";
import { Button, ButtonArrow } from "@/components/ui/button";
import { getPage } from "@/lib/content";

/** Split "We find the {swoosh}people{/swoosh} who..." into plain and swoosh parts. */
function renderHeadline(headline: string) {
  const parts = headline.split(/(\{swoosh\}.*?\{\/swoosh\})/);
  return parts.map((part, i) => {
    const m = part.match(/^\{swoosh\}(.*)\{\/swoosh\}$/);
    return m ? (
      <Swoosh key={i}>{m[1]}</Swoosh>
    ) : (
      <Fragment key={i}>
        <Text>{part}</Text>
      </Fragment>
    );
  });
}

/**
 * Home hero: the client banner full width (its built-in text must never be cropped),
 * then the h1 on the left and the intro and buttons on the right.
 */
export function HomeHero() {
  const { hero } = getPage("home");
  return (
    <section aria-labelledby="home-hero-title" className="bg-white pt-4 pb-16 md:pt-8 md:pb-20 lg:pb-24">
      <Container>
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-paper lg:aspect-[21/9]">
          <Image
            src={hero.image.src}
            alt={hero.image.alt}
            fill
            priority
            fetchPriority="high"
            sizes="(min-width: 1280px) 1232px, 100vw"
            className="object-cover lg:object-[50%_45%]"
          />
        </div>

        <div className="mt-10 grid gap-8 md:mt-14 lg:grid-cols-12 lg:items-end lg:gap-x-12">
          <div className="lg:col-span-7">
            <Eyebrow dot className="mb-6">
              <Text>{hero.eyebrow}</Text>
            </Eyebrow>
            <h1 id="home-hero-title" className="max-w-[15ch] text-display-xl font-[450] lg:max-w-[14ch]">
              {renderHeadline(hero.headline)}
              <GoldDot size="0.14em" className="ml-[0.08em] align-baseline" />
            </h1>
          </div>
          <div className="lg:col-span-5 lg:pb-3">
            <p className="max-w-[52ch] text-body-l text-fg-muted">
              <Text>{hero.intro}</Text>
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2">
              <Button asChild size="lg">
                <Link href={hero.primaryCta.href}>
                  <Text>{hero.primaryCta.label}</Text>
                  <ButtonArrow />
                </Link>
              </Button>
              <Button asChild variant="link-arrow">
                <Link href={hero.secondaryCta.href}>
                  <Text>{hero.secondaryCta.label}</Text>
                  <ButtonArrow />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
