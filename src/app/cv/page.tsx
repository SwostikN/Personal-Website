import type { Metadata } from "next";
import { DownloadIcon } from "@/components/icons";
import { Inline } from "@/components/inline";
import { ButtonLink, Container } from "@/components/ui";
import { education, experience, getProjects, languages, leadership, publications, site, skills, talks } from "@/lib/content";
import { formatDate, formatRange } from "@/lib/format";
import { breadcrumbJsonLd, JsonLd, pageMetadata, profilePageJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "CV: Swostik Nepal, Software Developer",
  description:
    "CV of Swostik Nepal: SAP Business One consultant at Saurabh Group, Nepal Rastra Bank research intern, First Class BSc (Hons) Computing.",
  path: "/cv",
  type: "profile",
});

// The CV is rendered from the same data as the rest of the site, so the two can't disagree.
// It's laid out to print cleanly to two A4 pages.
export default function CvPage() {
  const projects = getProjects().filter((p) => ["sarbo360", "rotaract-district-3292", "documed-ai", "vestiq", "road-development-app", "client-websites"].includes(p.slug));

  return (
    <>
      <JsonLd data={[profilePageJsonLd("/cv"), breadcrumbJsonLd([{ name: "CV", path: "/cv" }])]} />
      <Container className="max-w-4xl pt-10 pb-24 print:max-w-none print:p-0">
        <div className="no-print mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
          <p className="text-ink-muted">Preview my CV below, or download it as a PDF.</p>
          <ButtonLink href={site.cvPdf} download>
            <DownloadIcon className="size-4" /> Download PDF
          </ButtonLink>
        </div>

        <header className="border-b-2 border-ink pb-5">
          <h1 className="text-4xl font-bold tracking-tight text-ink print:text-3xl">{site.name}</h1>
          <p className="mt-1 text-lg font-medium text-accent">{site.jobTitle}</p>
          <p className="mt-2 text-sm text-ink-muted">
            {site.location.city}, {site.location.country} · <a href={`mailto:${site.email}`}>{site.email}</a> · github.com/SwostikN
            {site.social.linkedin ? ` · ${site.social.linkedin.replace(/^https?:\/\/(www\.)?/, "")}` : ""} · {site.url.replace(/^https?:\/\//, "")}
          </p>
        </header>

        <CvSection title="Profile">
          <p className="leading-relaxed">
            Software developer and SAP Business One consultant who builds and maintains production systems: features and APIs, integrations, and the tests behind them. Developed and deployed Sarbo360, an ERP portal used daily by about 200 staff, including connectIPS bill payments, and the Rotaract District 3292 platform for 6,000+ members. Co-author of Nepal Rastra Bank Working Paper No. 65, presented at CAICE 2026 (Tribhuvan University). First Class BSc (Hons) Computing.
          </p>
        </CvSection>

        <CvSection title="Experience">
          <ol className="space-y-5">
            {experience.map((e) => (
              <li key={e.organisation} className="break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-bold text-ink">{e.role}</h3>
                  <span className="font-mono text-xs text-ink-muted">{formatRange(e.start, e.end)}</span>
                </div>
                <p className="text-sm text-ink-muted">{e.organisation}, {e.place}</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-[0.95rem] leading-relaxed">
                  {e.highlights.map((h, i) => <li key={i}><Inline text={h} /></li>)}
                </ul>
              </li>
            ))}
          </ol>
        </CvSection>

        <CvSection title="Publication and presentation">
          {publications.map((p) => (
            <div key={p.slug} className="break-inside-avoid">
              <p className="text-[0.95rem]">{p.authors.join(", ")} ({p.date.slice(0, 4)}). <em>{p.title}</em>. {p.series}, {p.publisher}.</p>
              <p className="mt-1 text-sm text-ink-muted">{p.contribution}</p>
            </div>
          ))}
          {talks.map((t) => (
            <p key={t.slug} className="mt-2 break-inside-avoid text-[0.95rem]">
              <span className="font-bold text-ink">Presented at {t.event}</span>, {t.eventFull}, {t.host}, {t.venue}, {t.city}, {formatDate(t.startDate).replace(/^\d+ /, "")}.
            </p>
          ))}
        </CvSection>

        <CvSection title="Selected projects">
          <ul className="space-y-3">
            {projects.map((p) => (
              <li key={p.slug} className="break-inside-avoid text-[0.95rem]">
                <span className="font-bold text-ink">{p.title}</span>
                <span className="text-ink-muted"> · {p.role} · {p.timeline}</span>
                <p className="leading-relaxed">{p.summary}</p>
              </li>
            ))}
          </ul>
        </CvSection>

        <CvSection title="Education">
          <ul className="space-y-3">
            {education.map((ed) => (
              <li key={ed.institution} className="break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <span className="font-bold text-ink">{ed.qualification}</span>
                  <span className="font-mono text-xs text-ink-muted">{formatRange(ed.start, ed.end)}</span>
                </div>
                <p className="text-sm text-ink-muted">{ed.institution}</p>
                {ed.detail && <p className="text-sm">{ed.detail}</p>}
              </li>
            ))}
          </ul>
        </CvSection>

        <CvSection title="Leadership">
          {leadership.map((l) => (
            <p key={l.organisation} className="text-[0.95rem]">
              <span className="font-bold text-ink">{l.organisation}</span>: {l.roles.map((r) => `${r.title} (${r.period})`).join(" · ")}
            </p>
          ))}
        </CvSection>

        <CvSection title="Skills">
          <dl className="space-y-1.5 text-[0.95rem]">
            {skills.map((g) => (
              <div key={g.group} className="grid grid-cols-[8rem_1fr] gap-3">
                <dt className="font-bold text-ink">{g.group}</dt>
                <dd>{g.items.join(", ")}</dd>
              </div>
            ))}
            <div className="grid grid-cols-[8rem_1fr] gap-3">
              <dt className="font-bold text-ink">Languages</dt>
              <dd>{languages.map((l) => `${l.name} (${l.level})`).join(", ")}</dd>
            </div>
          </dl>
        </CvSection>

        <p className="mt-8 text-xs text-ink-muted">References available on request. Last updated {formatDate("2026-10-29")}.</p>

        <div className="no-print mt-10 border-t border-line pt-8">
          <ButtonLink href={site.cvPdf} download>
            <DownloadIcon className="size-4" /> Download PDF
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}

function CvSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-7 text-ink-muted print:mt-5">
      <h2 className="mb-3 border-b border-line pb-1 font-mono text-xs tracking-[0.14em] text-accent uppercase">{title}</h2>
      {children}
    </section>
  );
}
