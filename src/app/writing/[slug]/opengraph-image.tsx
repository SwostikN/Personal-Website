import { getPost, getPosts } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Article by Swostik Nepal";
export const size = ogSize;
export const contentType = ogContentType;

export async function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  return ogImage({ eyebrow: "Writing", title: post?.title ?? "Writing", footer: post ? formatDate(post.date) : undefined });
}
