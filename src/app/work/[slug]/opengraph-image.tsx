import { getProject, getProjects } from "@/lib/content";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Case study by Swostik Nepal";
export const size = ogSize;
export const contentType = ogContentType;

export async function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  return ogImage({ eyebrow: p ? `Case study · ${p.kind}` : "Case study", title: p?.title ?? "Work", footer: p?.status });
}
