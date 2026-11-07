import type { Metadata } from "next";
import { site } from "@/config/site";
import { stripPlaceholders } from "@/lib/placeholders";

/** Absolute site origin. Placeholders in NEXT_PUBLIC_SITE_URL are stripped so the URL is always valid. */
export const siteUrl = stripPlaceholders(site.url).replace(/\/+$/, "");

export function absoluteUrl(path = "/") {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

type BuildMetadataInput = {
  title: string;
  description: string;
  /** Route path, e.g. "/services/staffing". */
  path: string;
  /** Absolute or root-relative image URL. Defaults to the site OG image (pages that set openGraph do not inherit the file-based one). */
  image?: string;
  noindex?: boolean;
  /** Use the title exactly as given, without the " | Sarthak Talent Partners" suffix (home page). */
  absoluteTitle?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  image,
  noindex = false,
  absoluteTitle = false,
}: BuildMetadataInput): Metadata {
  const cleanTitle = stripPlaceholders(title);
  const cleanDescription = stripPlaceholders(description);
  const fullTitle = absoluteTitle ? cleanTitle : `${cleanTitle} | ${site.name}`;
  const images = [{ url: image ?? "/opengraph-image", width: 1200, height: 630 }];
  return {
    title: absoluteTitle ? { absolute: cleanTitle } : cleanTitle,
    description: cleanDescription,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_IN",
      title: fullTitle,
      description: cleanDescription,
      url: path,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: cleanDescription,
      images,
    },
  };
}
