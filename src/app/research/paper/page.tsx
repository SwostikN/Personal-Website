import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DownloadIcon } from "@/components/icons";
import { Container, Eyebrow } from "@/components/ui";
import { publications } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { breadcrumbJsonLd, JsonLd, pageMetadata } from "@/lib/seo";

const paper = publications[0];
const reader = paper.reader!;
const pages = Array.from({ length: reader.pages }, (_, i) => i + 1);
const pageSrc = (n: number) => `${reader.dir}/page-${String(n).padStart(2, "0")}.webp`;

export const metadata: Metadata = pageMetadata({
  title: "Read NRB Working Paper No. 65 online",
  description: `Read "${paper.title}" by Budha, Byanjankar and Swostik Nepal (Nepal Rastra Bank, ${formatDate(paper.date)}) page by page, or download the PDF.`,
  path: reader.href,
  type: "article",
  keywords: ["NRB working paper 65", "economic policy uncertainty Nepal", "Swostik Nepal research paper"],
});

/** The working paper as an e-paper: one image per page, so it reads the same on every phone and browser. */
export default function PaperReaderPage() {
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd([{ name: "Research", path: "/research" }, { name: "Read the paper", path: reader.href }])]} />
      <Container className="pt-10 pb-10 sm:pt-16">
        <Eyebrow>
          {paper.series} · {formatDate(paper.date)}
        </Eyebrow>
        <h1 className="mt-4 max-w-4xl text-3xl leading-[1.1] font-bold tracking-tight text-ink sm:text-5xl">{paper.title}</h1>
        <p className="mt-4 text-ink-muted">
          {paper.authors.join(", ")} · {paper.publisher}
        </p>
        <Actions />
        <nav aria-label="Jump to page" className="mt-8 flex flex-wrap items-center gap-1.5">
          <span className="mr-2 font-mono text-xs tracking-wide text-ink-muted uppercase">Pages</span>
          {pages.map((n) => (
            <a key={n} href={`#page-${n}`} className="grid size-9 place-items-center border border-line font-mono text-xs text-ink transition-colors hover:border-accent hover:text-accent">
              {n}
            </a>
          ))}
        </nav>
      </Container>

      <section aria-label="The paper, page by page" className="border-y border-line bg-surface py-10 sm:py-14">
        <ol className="mx-auto flex max-w-3xl flex-col gap-8 px-4 sm:px-8">
          {pages.map((n) => (
            <li key={n} id={`page-${n}`} className="scroll-mt-24">
              <figure>
                <Image
                  src={pageSrc(n)}
                  alt={n === 1 ? `Cover page of ${paper.series}: ${paper.title}` : `Page ${n} of ${paper.series}`}
                  width={reader.width}
                  height={reader.height}
                  sizes="(min-width: 832px) 48rem, 100vw"
                  preload={n === 1}
                  className="h-auto w-full bg-white shadow-[0_18px_40px_-24px_rgba(28,28,34,0.45)]"
                />
                <figcaption className="mt-2 text-center font-mono text-xs text-ink-muted">
                  Page {n} of {reader.pages}
                </figcaption>
              </figure>
            </li>
          ))}
        </ol>
      </section>

      <Container className="py-12">
        <p className="max-w-2xl text-ink-muted">
          Published by {paper.publisher}. For searchable, selectable text, download the PDF.
        </p>
        <Actions />
      </Container>
    </>
  );
}

function Actions() {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {paper.pdf && (
        <a href={paper.pdf} download className="inline-flex min-h-12 items-center gap-2 bg-accent px-6 font-semibold text-white transition-colors hover:bg-ink">
          <DownloadIcon className="size-4" /> Download PDF
        </a>
      )}
      {paper.url && (
        <a href={paper.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center border border-ink px-6 font-semibold text-ink transition-colors hover:bg-ink hover:text-white">
          View on NRB ↗<span className="sr-only"> (opens in a new tab)</span>
        </a>
      )}
      <Link href="/research" className="inline-flex min-h-12 items-center px-2 font-semibold text-ink underline decoration-line decoration-2 underline-offset-[6px] hover:text-accent hover:decoration-accent">
        About the research
      </Link>
    </div>
  );
}
