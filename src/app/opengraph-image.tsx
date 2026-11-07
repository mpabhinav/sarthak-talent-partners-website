import fs from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = "Sarthak Talent Partners: People. Growth. Success.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Fraunces from Google Fonts, limited to the glyphs used. Returns undefined if offline (falls back to the default face). */
async function loadFraunces(text: string): Promise<ArrayBuffer | undefined> {
  try {
    const css = await (
      await fetch(
        "https://fonts.googleapis.com/css2?family=Fraunces:wght@400&text=" + encodeURIComponent(text),
      )
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!url) return undefined;
    const res = await fetch(url);
    return res.ok ? await res.arrayBuffer() : undefined;
  } catch {
    return undefined;
  }
}

export default async function Image() {
  const logo = await fs.readFile(
    path.join(process.cwd(), "public/brand/sarthak-lockup-horizontal-reversed.png"),
  );
  const logoSrc = "data:image/png;base64," + logo.toString("base64");
  const font = await loadFraunces(site.tagline);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#041838",
          padding: "80px",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="" width={442} height={180} />
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ width: 16, height: 16, borderRadius: 16, background: "#D7A449" }} />
          <div
            style={{
              fontSize: 60, whiteSpace: "nowrap",
              lineHeight: 1.1,
              color: "#FDFDFD",
              fontFamily: font ? "Fraunces" : "serif",
            }}
          >
            {site.tagline}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: font ? [{ name: "Fraunces", data: font, style: "normal", weight: 400 }] : undefined,
    },
  );
}
