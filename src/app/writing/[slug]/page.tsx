import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Blocks } from "@/components/blocks";
import { Container, Eyebrow } from "@/components/ui";
import { getPost, getPosts, site } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { articleJsonLd, breadcrumbJsonLd, JsonLd, pageMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/writing/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/writing/${post.slug}`,
    type: "article",
    publishedTime: post.date,
    keywords: post.tags,
  });
}

export default async function PostPage({ params }: PageProps<"/writing/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const others = getPosts().filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <article>
      <JsonLd
        data={[
          articleJsonLd(post),
          breadcrumbJsonLd([
            { name: "Writing", path: "/writing" },
            { name: post.title, path: `/writing/${post.slug}` },
          ]),
        ]}
      />
      <Container className="max-w-3xl pt-10 pb-24 sm:pt-16">
        <nav aria-label="Breadcrumb" className="font-mono text-xs text-ink-muted">
          <Link href="/writing" className="hover:text-accent">← All writing</Link>
        </nav>
        <header className="mt-8 border-b border-line pb-10">
          <Eyebrow>{post.tags.join(" · ")}</Eyebrow>
          <h1 className="mt-4 text-4xl leading-[1.08] font-bold tracking-tight text-ink sm:text-5xl">{post.title}</h1>
          <p className="mt-5 text-xl leading-relaxed text-ink-muted">{post.description}</p>
          <p className="mt-6 font-mono text-xs text-ink-muted">
            By <Link href="/about" rel="author" className="text-ink underline underline-offset-4 hover:text-accent">{site.name}</Link> ·{" "}
            <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read
          </p>
        </header>
        <div className="mt-10">
          <Blocks blocks={post.body} />
        </div>

        {others.length > 0 && (
          <aside className="mt-16 border-t border-ink pt-8" aria-labelledby="more">
            <h2 id="more" className="font-mono text-xs tracking-wide text-ink uppercase">More writing</h2>
            <ul className="mt-4 space-y-3">
              {others.map((p) => (
                <li key={p.slug}>
                  <Link href={`/writing/${p.slug}`} className="text-lg font-semibold text-ink hover:text-accent">{p.title}</Link>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </Container>
    </article>
  );
}
