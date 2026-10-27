import type { MetadataRoute } from "next";
import { getPosts, getProjects } from "@/lib/content";
import { absolute } from "@/lib/seo";

// Fixed dates from content (not `new Date()`), so the sitemap prerenders and
// `lastModified` only changes when content does.
const SITE_UPDATED = "2026-10-27";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: absolute("/"), lastModified: SITE_UPDATED, changeFrequency: "monthly", priority: 1 },
    { url: absolute("/work"), lastModified: SITE_UPDATED, changeFrequency: "monthly", priority: 0.9 },
    { url: absolute("/research"), lastModified: SITE_UPDATED, changeFrequency: "monthly", priority: 0.9 },
    { url: absolute("/about"), lastModified: SITE_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    { url: absolute("/cv"), lastModified: SITE_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    { url: absolute("/writing"), lastModified: SITE_UPDATED, changeFrequency: "weekly", priority: 0.7 },
    { url: absolute("/contact"), lastModified: SITE_UPDATED, changeFrequency: "yearly", priority: 0.5 },
    { url: absolute("/now"), lastModified: SITE_UPDATED, changeFrequency: "monthly", priority: 0.4 },
  ];
  const work = getProjects().map((p) => ({
    url: absolute(`/work/${p.slug}`),
    lastModified: SITE_UPDATED,
    changeFrequency: "monthly" as const,
    priority: p.featured ? 0.9 : 0.7,
  }));
  const posts = getPosts().map((p) => ({
    url: absolute(`/writing/${p.slug}`),
    lastModified: p.date,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));
  return [...pages, ...work, ...posts];
}
