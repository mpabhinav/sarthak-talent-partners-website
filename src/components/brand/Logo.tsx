import Link from "next/link";
import Image from "next/image";
import { cn } from "cn";

type LogoProps = {
  variant?: "horizontal";
  /** navy for light backgrounds, reversed for navy and blue. */
  tone?: "navy" | "reversed";
  priority?: boolean;
  className?: string;
};

/** Horizontal lockup (mark + wordmark, no tagline), 48px tall on mobile and 56px from md up, linked to home. */
export function Logo({ variant = "horizontal", tone = "navy", priority = false, className }: LogoProps) {
  void variant;
  const src =
    tone === "navy"
      ? "/brand/sarthak-lockup-horizontal.png"
      : "/brand/sarthak-lockup-horizontal-reversed.png";
  return (
    <Link
      href="/"
      aria-label="Sarthak Talent Partners home"
      className={cn("inline-flex shrink-0 items-center rounded-sm", className)}
    >
      <Image
        src={src}
        alt="Sarthak Talent Partners"
        width={1179}
        height={480}
        priority={priority}
        sizes="140px"
        className="h-12 w-auto md:h-14"
      />
    </Link>
  );
}
