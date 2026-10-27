import { ImageResponse } from "next/og";
import { site } from "./content";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/** One template for every social card: white, ink, one blue shape, the serif S. */
export function ogImage({ eyebrow, title, footer }: { eyebrow: string; title: string; footer?: string }) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#ffffff", fontFamily: "sans-serif" }}>
        <div style={{ width: 96, borderRight: "1px solid #e4e4ea", display: "flex", justifyContent: "center", paddingTop: 48 }}>
          <div style={{ fontSize: 56, fontWeight: 700, color: "#262626", fontFamily: "serif" }}>S</div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", position: "relative" }}>
          <div style={{ position: "absolute", right: 64, top: 56, width: 150, height: 150, borderRadius: 75, background: "#3b82f6" }} />
          <div style={{ position: "absolute", right: 150, top: 150, width: 120, height: 190, background: "#b9d1ff" }} />
          <div style={{ fontSize: 26, letterSpacing: 4, color: "#1f5fd1", textTransform: "uppercase", display: "flex" }}>{eyebrow}</div>
          <div style={{ fontSize: title.length > 48 ? 64 : 78, fontWeight: 800, color: "#262626", lineHeight: 1.04, letterSpacing: -2, maxWidth: 820, display: "flex" }}>
            {title}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#5c5c66", borderTop: "2px solid #262626", paddingTop: 24 }}>
            <span>{site.name}</span>
            <span>{footer ?? site.jobTitle}</span>
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}
