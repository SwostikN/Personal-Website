import type { Metadata } from "next";
import Image from "next/image";
import { MediaEmbed, PaperCard, PreprintCard, TalkVideo } from "@/components/research";
import { Container, PageIntro, SectionHeader } from "@/components/ui";
import { media, preprint, publications, site, talks } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { breadcrumbJsonLd, JsonLd, pageMetadata, publicationJsonLd, talkJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Research: safe health AI across Nepali scripts",
  description:
    "Swostik Nepal's research: the preprint Refusal Is Not Safety on health-chatbot gates across Nepali scripts, and NRB Working Paper No. 65 (co-author), presented at CAICE 2026.",
  path: "/research",
  type: "article",
  keywords: ["Swostik Nepal research", "Refusal Is Not Safety", "health chatbot safety Nepali", "Romanized Nepali", "economic policy uncertainty Nepal", "NRB working paper 65", "CAICE 2026"],
});

export default function ResearchPage() {
  const paper = publications[0];
  const talk = talks[0];
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd([{ name: "Research", path: "/research" }]), publicationJsonLd(preprint), publicationJsonLd(paper), ...talks.map(talkJsonLd)]} />
      <PageIntro eyebrow="Research" title="Health AI for people who don't write in English." intro={site.researchStory}>
        <p className="mt-4 text-ink-muted">
          Research contact:{" "}
          <a href={`mailto:${site.academicEmail}`} className="font-semibold text-ink underline decoration-line underline-offset-4 hover:text-accent">{site.academicEmail}</a>
        </p>
      </PageIntro>

      <Container className="pb-20">
        <div data-reveal>
          <PreprintCard paper={preprint} headingLevel="h2" />
        </div>
      </Container>

      <Container className="border-t border-line pt-16 pb-20">
        <p className="mb-8 font-mono text-xs tracking-wide text-accent uppercase">Co-authored · Nepal Rastra Bank · economic policy uncertainty in Nepal</p>
        <div data-reveal>
          <PaperCard paper={paper} headingLevel="h2" />
        </div>

        <div className="mt-12 grid gap-8 rounded-xl border border-line bg-surface p-6 sm:p-8 lg:grid-cols-2" data-reveal>
          <div>
            <p className="font-mono text-xs tracking-wide text-accent uppercase">My part, as co-author</p>
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
            eyebrow="Presented at CAICE 2026"
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
