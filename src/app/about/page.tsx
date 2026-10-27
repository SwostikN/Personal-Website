import type { Metadata } from "next";
import Image from "next/image";
import { Inline } from "@/components/inline";
import { TalkFeature } from "@/components/talk";
import { ButtonLink, Container, Eyebrow, PageIntro, SectionHeader, Tag } from "@/components/ui";
import { bio, education, experience, languages, leadership, portrait, publications, site, skills, talks } from "@/lib/content";
import { formatDate, formatRange } from "@/lib/format";
import { breadcrumbJsonLd, JsonLd, pageMetadata, profilePageJsonLd, publicationJsonLd, talkJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About Swostik Nepal: System Analyst, Kathmandu",
  description:
    "Swostik Nepal: SAP Business One consultant at Saurabh Group, Nepal Rastra Bank research intern, First Class BSc (Hons) Computing, Rotaract Treasurer.",
  path: "/about",
  type: "profile",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={[profilePageJsonLd("/about"), breadcrumbJsonLd([{ name: "About", path: "/about" }]), ...publications.map(publicationJsonLd), ...talks.map(talkJsonLd)]} />
      <PageIntro eyebrow="About" title={`I'm ${site.name}.`} intro={bio[0].replace(`I'm ${site.name}, a`, "A")} />

      <Container className="grid gap-14 pb-20 lg:grid-cols-[1fr_20rem]">
        <div className="prose-body max-w-2xl space-y-5 text-lg text-ink-muted">
          {bio.slice(1).map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <div className="space-y-8 border-t border-line pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
          <div className="relative aspect-square w-40 overflow-hidden bg-surface">
            <Image src={portrait.src} alt={portrait.alt} fill sizes="10rem" className="object-cover" />
          </div>
          <div>
            <Eyebrow>Based in</Eyebrow>
            <p className="mt-2 text-ink">{site.location.city}, {site.location.country}</p>
          </div>
          <div>
            <Eyebrow>Languages</Eyebrow>
            <ul className="mt-2 text-ink">
              {languages.map((l) => <li key={l.name}>{l.name} <span className="text-ink-muted">· {l.level}</span></li>)}
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <ButtonLink href="/cv">View CV</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">Contact</ButtonLink>
          </div>
        </div>
      </Container>

      <section aria-labelledby="method" className="border-t border-line py-20">
        <Container>
          <SectionHeader
            id="method"
            eyebrow="How I work"
            title="From how people work to software they can rely on."
            intro="What I want to keep doing: make public and organisational systems more reliable, more accessible and easier to use, starting from the people who use them."
          />
          <ol className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {site.method.map((m, i) => (
              <li key={m.step} className="bg-canvas p-6" data-reveal>
                <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 text-xl font-bold text-ink">{m.step}</h3>
                <p className="mt-2 leading-relaxed text-ink-muted">{m.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="experience" className="border-t border-line bg-surface py-20">
        <Container>
          <SectionHeader id="experience" eyebrow="Experience" title="Work history" />
          <ol className="mt-10 space-y-px border border-line bg-line">
            {experience.map((e) => (
              <li key={e.organisation} className="grid gap-4 bg-canvas p-6 sm:p-8 md:grid-cols-[14rem_1fr]">
                <div>
                  <p className="font-mono text-xs text-ink-muted">{formatRange(e.start, e.end)}</p>
                  <p className="mt-2 font-semibold text-ink">{e.organisation}</p>
                  <p className="text-sm text-ink-muted">{e.place}</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-ink">{e.role}</h3>
                  <p className="mt-2 text-ink-muted">{e.summary}</p>
                  <ul className="mt-4 space-y-2 text-ink-muted">
                    {e.highlights.map((h, i) => (
                      <li key={i} className="relative pl-5 leading-relaxed">
                        <span aria-hidden className="absolute top-[0.7em] left-0 h-px w-2.5 bg-accent" />
                        <Inline text={h} />
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="pubs" className="py-20">
        <Container className="grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeader id="pubs" eyebrow="Publication" title="Research and talks" />
            {publications.map((p) => (
              <article key={p.slug} className="mt-8 border-l-2 border-accent pl-6">
                <p className="font-mono text-xs text-ink-muted">{p.series} · {formatDate(p.date)}</p>
                <h3 className="mt-2 text-xl font-bold text-ink">{p.title}</h3>
                <p className="mt-1 text-ink-muted">{p.authors.join(", ")} · {p.publisher}</p>
                <p className="mt-3 leading-relaxed text-ink-muted">{p.abstract}</p>
                <p className="mt-3 leading-relaxed text-ink-muted"><strong className="text-ink">My contribution:</strong> {p.contribution}</p>
              </article>
            ))}
            {talks.map((t) => <TalkFeature key={t.slug} talk={t} gallery />)}
          </div>
          <div>
            <SectionHeader id="education" eyebrow="Education" title="Education" />
            <ol className="mt-8 space-y-6">
              {education.map((ed) => (
                <li key={ed.institution} className="border-l border-line pl-6">
                  <p className="font-mono text-xs text-ink-muted">{formatRange(ed.start, ed.end)}</p>
                  <h3 className="mt-1 font-bold text-ink">{ed.qualification}</h3>
                  <p className="text-ink-muted">{ed.institution}</p>
                  {ed.detail && <p className="mt-1 text-sm text-ink-muted">{ed.detail}</p>}
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section aria-labelledby="skills" className="border-t border-line py-20">
        <Container className="grid gap-14 lg:grid-cols-[2fr_1fr]">
          <div>
            <SectionHeader id="skills" eyebrow="Skills" title="What I work with" />
            <dl className="mt-8 grid gap-8 sm:grid-cols-2">
              {skills.map((g) => (
                <div key={g.group}>
                  <dt className="font-semibold text-ink">{g.group}</dt>
                  <dd className="mt-3">
                    <ul className="flex flex-wrap gap-2">
                      {g.items.map((s) => <li key={s}><Tag>{s}</Tag></li>)}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <SectionHeader eyebrow="Leadership" title="Service" />
            {leadership.map((l) => (
              <div key={l.organisation} className="mt-8">
                <p className="font-semibold text-ink">{l.organisation}</p>
                <ul className="mt-2 space-y-1 text-ink-muted">
                  {l.roles.map((r) => <li key={r.title}>{r.title}, {r.period}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
