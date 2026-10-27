import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/hero";
import { ArrowIcon } from "@/components/icons";
import { NewsletterForm } from "@/components/newsletter-form";
import { MediaEmbed, PaperCard, TalkVideo } from "@/components/research";
import { Improvements, PublicSystems } from "@/components/public-systems";
import { RoadAppMockup } from "@/components/road-app-mockup";
import { Container, Eyebrow, ProjectCard, SectionHeader } from "@/components/ui";
import { experience, getFeaturedProjects, getProject, getProjects, media, publications, site, talks } from "@/lib/content";
import { formatRange } from "@/lib/format";
import { JsonLd, pageMetadata, profilePageJsonLd, publicationJsonLd, talkJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: site.name,
  description: site.description,
  path: "/",
  type: "profile",
  absoluteTitle: true,
  keywords: site.keywords,
});

export default function Home() {
  const featured = getFeaturedProjects();
  const roadApp = getProject("road-development-app")!;
  const more = getProjects().filter((p) => !p.featured && p.slug !== roadApp.slug).slice(0, 2);
  const paper = publications[0];
  const talk = talks[0];
  const [saurabh, nrb, cubit] = experience;

  const experienceCards = [
    {
      org: saurabh.organisation,
      role: saurabh.role,
      when: formatRange(saurabh.start, saurabh.end),
      what: "Developed and deployed Sarbo360, the SAP Business One portal about 200 staff at Sarbottam Steels and Sarbottam Spinning use daily, including connectIPS payments.",
      logos: [
        { src: "/logos/saurabh-group.png", alt: "Saurabh Group" },
        { src: "/logos/sarbottam-steels.png", alt: "Sarbottam Steels" },
        { src: "/logos/sarbottam-spinning.jpg", alt: "Sarbottam Spinning" },
      ],
      more: saurabh.more!,
    },
    {
      org: nrb.organisation,
      role: nrb.role,
      when: formatRange(nrb.start, nrb.end),
      what: "Built the data pipelines behind a Google-Trends economic policy uncertainty index for Nepal, and co-authored NRB Working Paper No. 65.",
      logos: [{ src: "/logos/nepal-rastra-bank.png", alt: "Nepal Rastra Bank" }],
      more: nrb.more!,
    },
    {
      org: "Rotaract District 3292",
      role: "Developed and deployed the district platform",
      when: "2026",
      what: "Public website and member portal for 6,000+ Rotaractors in 198 clubs across Nepal and Bhutan. Also Treasurer of the Rotaract Club of Patan Heritage.",
      logos: [{ src: "/logos/rotaract-3292.png", alt: "Rotaract" }],
      more: { href: "/work/rotaract-district-3292", label: "Read the case study" },
    },
    {
      org: "Cloud Bird India · Nritya Sanjiwani",
      role: "Freelance web developer",
      when: "Aug – Sep 2026",
      what: "Rebuilt both client websites in Next.js, with an admin portal, validated forms and email delivery. Both are live.",
      logos: [
        { src: "/logos/cloud-bird-india.png", alt: "Cloud Bird India" },
        { src: "/logos/nritya-sanjiwani.svg", alt: "Nritya Sanjiwani" },
      ],
      more: { href: "/work/client-websites", label: "See the client work" },
    },
    {
      org: cubit.organisation,
      role: cubit.role,
      when: formatRange(cubit.start, cubit.end),
      what: "Built a document question-answering and summarisation tool with retrieval-augmented generation, the start of my applied-AI work.",
      logos: [{ src: "/logos/cubit.svg", alt: "Cubit" }],
      more: cubit.more!,
    },
    {
      org: "The British College · Leeds Beckett University",
      role: "BSc (Hons) Computing, First Class Honours",
      when: "2023 – 2026",
      what: "Dissertation: MediRAG, a medical question-answering system with a measured safety layer (69/69 emergencies caught).",
      logos: [{ src: "/logos/british-college.svg", alt: "The British College" }],
      more: { href: "/about#education", label: "Education and skills" },
    },
  ];

  return (
    <>
      <JsonLd data={[profilePageJsonLd("/"), publicationJsonLd(paper), ...talks.map(talkJsonLd)]} />
      <Hero />

      {/* Built for: the organisations using these systems, each linked to its case study */}
      <section aria-labelledby="built-for" className="border-y border-line">
        <Container className="flex flex-col gap-3 py-6 lg:flex-row lg:items-center lg:gap-x-6">
          <h2 id="built-for" className="shrink-0 font-mono text-xs tracking-[0.16em] text-ink-muted uppercase">Built for</h2>
          <ul className="flex min-w-0 flex-1 flex-wrap items-center gap-x-6 gap-y-2 xl:gap-x-3.5">
            {site.builtFor.map((org, i) => (
              <li key={org.name} className="flex items-center gap-3.5">
                {i > 0 && <span aria-hidden className="hidden text-ink-muted/40 xl:inline">/</span>}
                {org.href.startsWith("http") ? (
                  <a href={org.href} target="_blank" rel="noopener noreferrer" className="text-[1rem] font-semibold whitespace-nowrap text-ink-muted transition-colors hover:text-accent">
                    {org.name}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <Link href={org.href} className="text-[1rem] font-semibold whitespace-nowrap text-ink-muted transition-colors hover:text-accent">
                    {org.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Professional statement: why public systems, each point tied to existing work */}
      <PublicSystems />

      {/* Ongoing project: the Road Development App (prototype, sample data) */}
      <section aria-labelledby="ongoing" className="overflow-hidden border-t border-line bg-[linear-gradient(180deg,#FBFCFF,#FFFFFF)] py-20 sm:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div data-reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-[#F5D9A8] bg-[#FFF8EC] px-3 py-1 font-mono text-[0.7rem] tracking-wide text-[#8A5300] uppercase">
              <span className="anim-pulse size-1.5 rounded-full bg-[#F59E0B]" aria-hidden /> Ongoing project · work in progress
            </p>
            <h2 id="ongoing" className="mt-5 text-4xl leading-[1.05] font-extrabold tracking-[-0.04em] text-ink sm:text-5xl">
              {roadApp.title}
              <span className="mt-2 block font-mono text-sm font-medium tracking-wide text-ink-muted uppercase">Working title</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted">{roadApp.summary}</p>
            {roadApp.audience && (
              <div className="mt-7">
                <p className="font-mono text-xs tracking-wide text-accent uppercase">Designed for</p>
                <dl className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                  {roadApp.audience.map((a) => (
                    <div key={a.who} className="border-l-2 border-line pl-3">
                      <dt className="font-semibold text-ink">{a.who}</dt>
                      <dd className="text-sm leading-relaxed text-ink-muted">{a.gets}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
            {roadApp.progress && (
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="font-mono text-xs tracking-wide text-[#1E6B35] uppercase">Done so far</p>
                  <ul className="mt-3 space-y-2 text-[0.95rem] text-ink">
                    {roadApp.progress.done.map((d) => (
                      <li key={d} className="flex gap-2"><span aria-hidden className="text-[#1E6B35]">✓</span>{d}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-mono text-xs tracking-wide text-ink-muted uppercase">Planned next</p>
                  <ul className="mt-3 space-y-2 text-[0.95rem] text-ink-muted">
                    {roadApp.progress.next.map((d) => (
                      <li key={d} className="flex gap-2"><span aria-hidden>○</span>{d}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            <Link href={`/work/${roadApp.slug}`} className="group mt-9 inline-flex min-h-12 items-center gap-2 bg-accent px-7 font-semibold text-white transition-colors hover:bg-ink">
              View project <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
          <div data-reveal className="pb-10">
            <RoadAppMockup />
          </div>
        </Container>
      </section>

      {/* Selected work */}
      <section aria-labelledby="work" className="border-t border-line bg-surface py-20 sm:py-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6" data-reveal>
            <SectionHeader id="work" eyebrow="Selected projects" title="Systems in daily use." />
            <Link href="/work" className="group inline-flex items-center gap-2 font-semibold text-ink hover:text-accent">
              All projects <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {featured.map((p, i) => (
              <div key={p.slug} className={i === 0 ? "lg:col-span-2" : ""} data-reveal>
                <ProjectCard project={p} large />
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {more.map((p) => (
              <div key={p.slug} data-reveal>
                <ProjectCard project={p} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Short before-and-after case studies of improving existing systems */}
      <Improvements />

      {/* Research and talks */}
      <section aria-labelledby="research" className="border-t border-line py-20 sm:py-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6" data-reveal>
            <SectionHeader id="research" eyebrow="Research & talks" title="Published by Nepal Rastra Bank. Presented at Tribhuvan University." />
            <Link href="/research" className="group inline-flex items-center gap-2 font-semibold text-ink hover:text-accent">
              Research page <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="mt-12" data-reveal>
            <PaperCard paper={paper} compact />
          </div>
          <div className="mt-14 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div data-reveal>
              <p className="font-mono text-xs tracking-wide text-accent uppercase">Watch presentation</p>
              <h3 className="mt-2 text-xl font-bold text-ink">Presenting at {talk.event}, {talk.host}</h3>
              <div className="mt-4">
                <TalkVideo talk={talk} />
              </div>
              <ul className="mt-5 grid grid-cols-3 gap-3" aria-label={`Photos from ${talk.event}`}>
                {talk.photos.slice(0, 3).map((ph) => (
                  <li key={ph.src} className="relative aspect-[3/2] overflow-hidden rounded-lg bg-surface">
                    <Image src={ph.src} alt={ph.alt} fill sizes="(min-width: 1024px) 12rem, 33vw" className="object-cover transition-transform duration-500 hover:scale-105" />
                  </li>
                ))}
              </ul>
            </div>
            {media[0] && (
              <div data-reveal>
                <p className="font-mono text-xs tracking-wide text-accent uppercase">In the media</p>
                <h3 className="mt-2 text-xl font-bold text-ink">{media[0].title}</h3>
                <div className="mt-4">
                  <MediaEmbed item={media[0]} />
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Experience: consistent cards, each with a logo and a read-more link */}
      <section aria-labelledby="experience" className="border-t border-line bg-surface py-20 sm:py-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6" data-reveal>
            <SectionHeader id="experience" eyebrow="Experience" title="Where I've worked, and who I've built for." />
            <Link href="/cv" className="group inline-flex items-center gap-2 font-semibold text-ink hover:text-accent">
              Full CV <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {experienceCards.map((c) => (
              <li key={c.org} data-reveal>
                <article className="group flex h-full flex-col rounded-xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_18px_40px_-24px_rgba(31,95,209,0.45)]">
                  <div className="flex items-center gap-3">
                    {c.logos.map((l) => (
                      <span key={l.src} className="relative flex h-12 w-20 items-center justify-center rounded-md border border-line bg-white p-1.5">
                        <Image src={l.src} alt={`${l.alt} logo`} width={72} height={40} className="max-h-9 w-auto object-contain" />
                      </span>
                    ))}
                  </div>
                  <p className="mt-5 font-mono text-xs text-ink-muted">{c.when}</p>
                  <h3 className="mt-1 text-lg leading-snug font-bold text-ink">{c.org}</h3>
                  <p className="text-sm font-medium text-accent">{c.role}</p>
                  <p className="mt-3 leading-relaxed text-ink-muted">{c.what}</p>
                  <Link href={c.more.href} className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-ink hover:text-accent">
                    {c.more.label} <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Closing: get in touch + newsletter (light band echoing the hero's sky-blue shard) */}
      <section aria-labelledby="contact-cta" className="bg-[linear-gradient(160deg,#F7FAFF_0%,#E8F0FF_100%)] py-20 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-24">
          <div className="border-l-[6px] border-accent pl-6 sm:pl-11">
            <Eyebrow>Get in touch</Eyebrow>
            <h2 id="contact-cta" className="mt-4 text-4xl leading-[1.03] font-extrabold tracking-[-0.045em] text-ink sm:text-[3.4rem]">
              Need a system that works the way your organisation does?
            </h2>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex min-h-14 items-center bg-accent px-8 font-semibold text-white transition-colors hover:bg-ink">Contact me</Link>
              <a href={`mailto:${site.email}`} className="inline-flex min-h-14 items-center border border-ink px-7 font-semibold text-ink transition-colors hover:bg-ink hover:text-white">{site.email}</a>
            </div>
          </div>
          <div>
            <Eyebrow>Newsletter</Eyebrow>
            <h3 className="mt-4 text-3xl font-extrabold tracking-[-0.035em] text-ink sm:text-[2.1rem]">Notes from the work</h3>
            <p className="mt-3 text-lg leading-relaxed text-ink-muted">Occasional notes on systems, ERP and civic tech in Nepal. No spam, unsubscribe any time.</p>
            <NewsletterForm to={site.email} />
          </div>
        </Container>
      </section>
    </>
  );
}
