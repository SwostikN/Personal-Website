import type { MetadataRoute } from "next";
import { absolute } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/studio"] }],
    sitemap: absolute("/sitemap.xml"),
    host: absolute("/"),
  };
}
