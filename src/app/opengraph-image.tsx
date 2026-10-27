import { site } from "@/lib/content";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = `${site.name}: ${site.jobTitle}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: `${site.location.city}, ${site.location.country}`, title: site.headline });
}
