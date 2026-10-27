import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageIntro } from "@/components/ui";
import { getPosts } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { absolute, breadcrumbJsonLd, JsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Writing: notes on systems, requirements and AI",
  description:
    "Articles by Swostik Nepal on requirements, ERP and SAP Business One, AI safety and building reliable systems in Nepal.",
  path: "/writing",
});

export default function WritingPage() {
  const posts = getPosts();
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Writing", path: "/writing" }]),
          {
            "@type": "Blog",
            name: "Writing",
            url: absolute("/writing"),
            blogPost: posts.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: absolute(`/writing/${p.slug}`), datePublished: p.date })),
          },
        ]}
      />
      <PageIntro eyebrow="Writing" title="Notes from the work." intro="What I learn building and running real systems: requirements, data, ERP, and AI that has to be safe." />
      <Container className="pb-24">
        <ul className="divide-y divide-line border-y border-line">
          {posts.map((post) => (
            <li key={post.slug}>
              <article className="grid gap-3 py-8 md:grid-cols-[10rem_1fr]">
                <p className="font-mono text-xs text-ink-muted">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span className="block">{post.readingMinutes} min read</span>
                </p>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-ink">
                    <Link href={`/writing/${post.slug}`} className="hover:text-accent">{post.title}</Link>
                  </h2>
                  <p className="mt-2 max-w-2xl leading-relaxed text-ink-muted">{post.description}</p>
                  <ul className="mt-3 flex flex-wrap gap-2 font-mono text-xs text-accent">
                    {post.tags.map((t) => <li key={t}>#{t.toLowerCase().replace(/\s+/g, "-")}</li>)}
                  </ul>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
