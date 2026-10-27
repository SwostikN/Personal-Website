import Image from "next/image";
import Link from "next/link";
import type { MediaItem, Publication, Talk } from "@/lib/types";
import { formatDate } from "@/lib/format";
import { EmbedFacade } from "./embed-facade";
import { DownloadIcon } from "./icons";

/** Native video: nothing downloads until play is pressed. */
export function TalkVideo({ talk }: { talk: Talk }) {
  if (!talk.video) return null;
  return (
    <figure>
      <div className="overflow-hidden rounded-xl border border-line bg-ink">
        <video
          controls
          playsInline
          preload="none"
          poster={talk.video.poster}
          className="aspect-video w-full"
          aria-label={`Video: ${talk.video.caption}`}
        >
          <source src={talk.video.src} type="video/mp4" />
        </video>
      </div>
      <figcaption className="mt-3 text-sm text-ink-muted">{talk.video.caption}</figcaption>
    </figure>
  );
}

/** Third-party video behind a click-to-play preview (no cookies until played). */
export function MediaEmbed({ item }: { item: MediaItem }) {
  return (
    <figure className="flex h-full flex-col">
      {item.embed ? (
        <div className="overflow-hidden rounded-xl border border-line bg-white">
          <EmbedFacade src={item.embed} title={item.title} platform={item.platform} poster={item.poster ?? "/research/nrb-wp-65-cover.jpg"} />
        </div>
      ) : null}
      <figcaption className="mt-3 text-sm text-ink-muted">
        {item.summary}{" "}
        <a href={item.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent underline underline-offset-4">
          Watch on {item.platform} ↗<span className="sr-only"> (opens in a new tab)</span>
        </a>
      </figcaption>
    </figure>
  );
}

export function PaperCard({ paper, compact = false, headingLevel = "h3" }: { paper: Publication; compact?: boolean; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <article className="grid gap-8 md:grid-cols-[13rem_1fr] md:items-start">
      {paper.cover && (
        <Link href="/research" className="group block" aria-label={`Read ${paper.title}`}>
          <div className="relative aspect-[1400/1996] overflow-hidden rounded-lg border border-line shadow-[0_18px_40px_-24px_rgba(15,23,42,0.45)] transition-transform duration-300 group-hover:-translate-y-1">
            <Image src={paper.cover} alt={`Cover of ${paper.series}`} fill sizes="13rem" className="object-cover" />
          </div>
        </Link>
      )}
      <div>
        <p className="font-mono text-xs tracking-wide text-accent uppercase">{paper.series} · {formatDate(paper.date)}</p>
        <H className="mt-2 text-2xl leading-tight font-bold tracking-tight text-ink sm:text-3xl">{paper.title}</H>
        <p className="mt-2 text-ink-muted">{paper.authors.join(", ")} · {paper.publisher}</p>
        {!compact && <p className="mt-4 leading-relaxed text-ink-muted">{paper.abstract}</p>}
        {paper.findings && (
          <dl className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {paper.findings.map((f) => (
              <div key={f.label} className="rounded-lg bg-surface p-4">
                <dt className="sr-only">{f.label}</dt>
                <dd>
                  <span className="block text-2xl font-extrabold tracking-tight text-ink">{f.value}</span>
                  <span className="mt-1 block text-xs leading-snug text-ink-muted">{f.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        )}
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
        </div>
      </div>
    </article>
  );
}
