import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { siteUrl } from "@/lib/seo";
import { validateAllContent } from "@/lib/content";
import { HydrationMarker } from "@/components/motion/HydrationMarker";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-fraunces",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hanken",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Sarthak Talent Partners", template: "%s | Sarthak Talent Partners" },
  description: "People. Growth. Success.",
};

export const viewport: Viewport = {
  themeColor: "#FDFDFD",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  // Any invalid file in content/ fails the build here, whichever route is rendered.
  validateAllContent();
  return (
    <html
      lang="en-IN"
      className={`${fraunces.variable} ${hanken.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}[data-draw]{opacity:1!important;stroke-dasharray:none!important;stroke-dashoffset:0!important}`}</style>
        </noscript>
        <HydrationMarker />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
