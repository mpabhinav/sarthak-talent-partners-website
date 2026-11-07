import Image from "next/image";
import { cn } from "cn";

type MarkProps = {
  tone?: "navy" | "reversed";
  /** Rendered height in px. Minimum 24 per brand rules. */
  size?: number;
  className?: string;
};

const RATIO = 455 / 480;

/** The S mark with the figure reaching for the star. Never animate or recolour. */
export function Mark({ tone = "navy", size = 32, className }: MarkProps) {
  return (
    <Image
      src={tone === "navy" ? "/brand/sarthak-mark.png" : "/brand/sarthak-mark-reversed.png"}
      alt="Sarthak Talent Partners"
      width={Math.round(size * RATIO)}
      height={size}
      className={cn("w-auto shrink-0", className)}
      style={{ height: size }}
    />
  );
}
