import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Blocks, LockIcon } from "@/components/blocks";
import { ArrowIcon } from "@/components/icons";
import { RoadAppMockup } from "@/components/road-app-mockup";
import { SmartLink } from "@/components/inline";
import { Container, Eyebrow, Tag } from "@/components/ui";
import { getAdjacentProject, getProject, getProjects } from "@/lib/content";
import { breadcrumbJsonLd, JsonLd, pageMetadata, projectJsonLd } from "@/lib/seo";

export async function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: project.seoTitle,
    description: project.description,
    path: `/work/${project.slug}`,
    type: "article",
    keywords: project.keywords,
  });
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = getAdjacentProject(project.slug);

  const facts: [string, string][] = [
    ["Role", project.role],
    ...(project.organisation ? [["Organisation", project.organisation] as [string, string]] : []),
    ["Timeline", project.timeline],
    ["Status", project.status],
  ];

  return (
    <article>
      <JsonLd
        data={[
          projectJsonLd(project),
          breadcrumbJsonLd([
            { name: "Work", path: "/work" },
            { name: project.title, path: `/work/${project.slug}` },
          ]),
        ]}
      />

      {/* Header */}
      <header className="border-b border-line">
        <Container className="pt-8 pb-12 sm:pt-12 sm:pb-16">
          <nav aria-label="Breadcrumb" className="font-mono text-xs text-ink-muted">
            <ol className="flex flex-wrap gap-2">
              <li><Link href="/" className="hover:text-accent">Home</Link></li>
              <li aria-hidden>/</li>
              <li><Link href="/work" className="hover:text-accent">Work</Link></li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-ink">{project.title}</li>
            </ol>
          </nav>
          <div className="mt-8">
            <Eyebrow>{project.kind}</Eyebrow>
            <h1 className="mt-3 max-w-4xl text-4xl leading-[1.05] font-bold tracking-tight text-ink sm:text-6xl">{project.title}</h1>
            <p className="mt-5 max-w-3xl text-xl leading-relaxed text-ink-muted">{project.summary}</p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_auto]">
            <dl className="grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
              {facts.map(([k, v]) => (
                <div key={k}>
                  <dt className="font-mono text-xs tracking-wide text-ink-muted uppercase">{k}</dt>
                  <dd className="mt-1 font-medium text-ink">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-wrap items-start gap-3">
              {project.links.live && (
                <SmartLink href={project.links.live} className="inline-flex min-h-11 items-center gap-2 bg-accent px-5 font-semibold text-white hover:bg-ink">
                  Visit live site ↗
                </SmartLink>
              )}
              {project.links.code && (
                <SmartLink href={project.links.code} className="inline-flex min-h-11 items-center gap-2 border border-ink px-5 font-semibold text-ink hover:bg-ink hover:text-white">
                  View code ↗
                </SmartLink>
              )}
              {project.links.private && (
                <span className="inline-flex min-h-11 items-center gap-2 border border-line px-4 text-sm text-ink-muted">
                  <LockIcon className="size-4" /> Private codebase · walkthrough on request
                </span>
              )}
            </div>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Technologies">
            {project.stack.map((s) => (
              <li key={s}><Tag>{s}</Tag></li>
            ))}
          </ul>
        </Container>
      </header>

      {/* Metrics */}
      {project.metrics.length > 0 && (
        <div className="border-b border-line bg-surface">
          <Container>
            <dl className="grid grid-cols-1 divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {project.metrics.map((m) => (
                <div key={m.label} className="py-6 sm:px-6 sm:first:pl-0">
                  <dt className="sr-only">{m.label}</dt>
                  <dd>
                    <span className="block font-serif text-4xl text-ink">{m.value}</span>
                    <span className="mt-1 block text-sm text-ink-muted">{m.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Container>
        </div>
      )}

      {/* Work in progress: prototype + what's done vs planned */}
      {project.progress && (
        <section aria-labelledby="prototype-h" className="border-b border-line py-16 sm:py-20">
          <Container className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="pb-10">
              <RoadAppMockup />
            </div>
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-[#F5D9A8] bg-[#FFF8EC] px-3 py-1 font-mono text-[0.7rem] tracking-wide text-[#8A5300] uppercase">
                <span className="anim-pulse size-1.5 rounded-full bg-[#F59E0B]" aria-hidden /> Work in progress
              </p>
              <h2 id="prototype-h" className="mt-4 text-2xl font-bold tracking-tight text-ink sm:text-3xl">Where it stands</h2>
              {project.audience && (
                <>
                  <p className="mt-4 font-mono text-xs tracking-wide text-accent uppercase">Designed for</p>
                  <ul className="mt-2 space-y-1.5 text-ink-muted">
                    {project.audience.map((a) => (
                      <li key={a.who}><strong className="text-ink">{a.who}:</strong> {a.gets}</li>
                    ))}
                  </ul>
                </>
              )}
              <p className="mt-3 font-mono text-xs tracking-wide text-[#1E6B35] uppercase">Done so far</p>
              <ul className="mt-2 space-y-2 text-ink">
                {project.progress.done.map((d) => (
                  <li key={d} className="flex gap-2"><span aria-hidden className="text-[#1E6B35]">✓</span>{d}</li>
                ))}
              </ul>
              <p className="mt-6 font-mono text-xs tracking-wide text-ink-muted uppercase">Planned next</p>
              <ul className="mt-2 space-y-2 text-ink-muted">
                {project.progress.next.map((d) => (
                  <li key={d} className="flex gap-2"><span aria-hidden>○</span>{d}</li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      )}

      {/* Body */}
      <Container className="grid gap-12 py-16 lg:grid-cols-[13rem_1fr] lg:gap-16 lg:py-24">
        <div className="no-print lg:sticky lg:top-8 lg:self-start">
          <nav aria-label="On this page">
            <p className="font-mono text-xs tracking-wide text-ink uppercase">On this page</p>
            <ol className="mt-4 space-y-2 text-sm">
              {project.sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-ink-muted hover:text-accent">{s.title}</a>
                </li>
              ))}
              {project.artefacts.length > 0 && (
                <li><a href="#artefacts" className="text-ink-muted hover:text-accent">Artefacts</a></li>
              )}
            </ol>
          </nav>
        </div>

        <div className="min-w-0 max-w-3xl space-y-16">
          {project.sections.map((s) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-24">
              <h2 id={`${s.id}-h`} className="mb-6 text-2xl font-bold tracking-tight text-ink sm:text-3xl">{s.title}</h2>
              <Blocks blocks={s.blocks} />
            </section>
          ))}

          {project.artefacts.length > 0 && (
            <section id="artefacts" aria-labelledby="artefacts-h" className="scroll-mt-24">
              <h2 id="artefacts-h" className="mb-6 text-2xl font-bold tracking-tight text-ink sm:text-3xl">Artefacts I produced</h2>
              <ul className="grid gap-px border border-line bg-line sm:grid-cols-2">
                {project.artefacts.map((a) => (
                  <li key={a} className="bg-canvas px-4 py-3 text-ink">{a}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </Container>

      {/* Next project */}
      <Container className="pb-20">
        <Link href={`/work/${next.slug}`} className="group flex items-center justify-between gap-6 border-t border-ink pt-8">
          <span>
            <span className="font-mono text-xs tracking-wide text-ink-muted uppercase">Next case study</span>
            <span className="mt-2 block text-2xl font-bold text-ink group-hover:text-accent sm:text-3xl">{next.title}</span>
          </span>
          <ArrowIcon className="size-7 shrink-0 text-ink transition-transform group-hover:translate-x-1" />
        </Link>
      </Container>
    </article>
  );
}
