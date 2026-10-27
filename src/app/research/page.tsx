import type { Metadata } from "next";
import Image from "next/image";
import { MediaEmbed, PaperCard, TalkVideo } from "@/components/research";
import { Container, PageIntro, SectionHeader } from "@/components/ui";
import { media, publications, talks } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { breadcrumbJsonLd, JsonLd, pageMetadata, publicationJsonLd, talkJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Research: economic policy uncertainty in Nepal",
  description:
    "NRB Working Paper No. 65 by Budha, Byanjankar and Swostik Nepal: a Google-Trends uncertainty index for Nepal. Read the paper and watch the CAICE 2026 talk.",
  path: "/research",
  type: "article",
  keywords: ["Swostik Nepal research", "economic policy uncertainty Nepal", "NRB working paper 65", "Google Trends uncertainty index", "CAICE 2026"],
});

export default function ResearchPage() {
  const paper = publications[0];
  const talk = talks[0];
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd([{ name: "Research", path: "/research" }]), publicationJsonLd(paper), ...talks.map(talkJsonLd)]} />
      <PageIntro
        eyebrow="Research"
        title="Measuring economic policy uncertainty in Nepal."
        intro="We built an uncertainty index for Nepal from public Google Trends data (January 2011 to April 2026) and measured what happens to the economy when uncertainty rises."
      />

      <Container className="pb-20">
        <div data-reveal>
          <PaperCard paper={paper} headingLevel="h2" />
        </div>

        <div className="mt-12 grid gap-8 rounded-xl border border-line bg-surface p-6 sm:p-8 lg:grid-cols-2" data-reveal>
          <div>
            <p className="font-mono text-xs tracking-wide text-accent uppercase">My contribution</p>
            <p className="mt-3 leading-relaxed text-ink">{paper.contribution}</p>
          </div>
          <div>
            <p className="font-mono text-xs tracking-wide text-accent uppercase">How it works, briefly</p>
            <ul className="mt-3 space-y-2 leading-relaxed text-ink-muted">
              <li>56 policy keywords (fiscal, monetary, trade), each searched against “Nepal Rastra Bank” as a benchmark.</li>
              <li>Monthly index, deseasonalised and detrended with a Hodrick–Prescott filter.</li>
              <li>Effects estimated with local projections; checked with a structural VAR, different lags and a 95-keyword index.</li>
            </ul>
          </div>
        </div>
      </Container>

      <section aria-labelledby="talk" className="py-20">
        <Container>
          <SectionHeader
            id="talk"
            eyebrow="Watch presentation"
            title={`${talk.event}: ${talk.eventFull.replace(/\s*\(.*\)$/, "")}`}
            intro={`${talk.host} · ${talk.venue}, ${talk.city} · ${formatDate(talk.startDate).replace(/^\d+ /, "")}. Theme: ${talk.theme}.`}
          />
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div data-reveal>
              <TalkVideo talk={talk} />
              <p className="mt-6 leading-relaxed text-ink-muted">{talk.summary}</p>
            </div>
            <ul className="grid grid-cols-2 gap-3 self-start" aria-label={`Photos from ${talk.event}`} data-reveal>
              {talk.photos.map((ph) => (
                <li key={ph.src} className="relative aspect-[3/2] overflow-hidden rounded-lg bg-surface">
                  <Image src={ph.src} alt={ph.alt} fill sizes="(min-width: 1024px) 18rem, 50vw" className="object-cover transition-transform duration-500 hover:scale-105" />
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {media.length > 0 && (
        <section aria-labelledby="media" className="border-t border-line py-20">
          <Container>
            <SectionHeader id="media" eyebrow="In the media" title="The paper, explained by others" />
            <div className="mt-10 grid gap-10 lg:grid-cols-2">
              {media.map((m) => (
                <div key={m.url} data-reveal>
                  <h3 className="mb-4 text-xl font-bold text-ink">{m.title}</h3>
                  <MediaEmbed item={m} />
                </div>
              ))}
              {paper.coverage?.length ? (
                <div data-reveal>
                  <h3 className="mb-4 text-xl font-bold text-ink">In the news</h3>
                  <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line">
                    {[...paper.coverage].sort((a, b) => a.date.localeCompare(b.date)).map((c) => (
                      <li key={c.url}>
                        <a href={c.url} target="_blank" rel="noopener noreferrer" className="group block p-5 transition-colors hover:bg-surface sm:p-6">
                          <p className="font-mono text-xs tracking-wide text-accent uppercase">{c.outlet} · {formatDate(c.date)}</p>
                          <p lang={c.lang ?? "en"} className="mt-2 text-lg leading-snug font-bold text-ink group-hover:text-accent">{c.title}</p>
                          {c.translation && <p className="mt-1 text-sm text-ink-muted">“{c.translation}”</p>}
                          <span className="mt-3 inline-flex text-sm font-semibold text-accent">
                            Read the article ↗<span className="sr-only"> (opens in a new tab)</span>
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
