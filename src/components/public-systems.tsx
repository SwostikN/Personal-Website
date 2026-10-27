import Link from "next/link";
import { ArrowIcon } from "./icons";
import { Container } from "./ui";

// What I want to build for public institutions, with each claim tied to existing work.
// Deliberately no claims of government adoption: every link points at work that exists.

const pillars = [
  {
    title: "Records that agree with their source",
    text: "Information management that holds up to checking. Sarbo360's reports reconcile with SAP itself, and every posting is traceable.",
    proof: { href: "/work/sarbo360", label: "Sarbo360" },
  },
  {
    title: "Evidence for better decisions",
    text: "Public data turned into something decision-makers can use, like the policy-uncertainty index built for Nepal Rastra Bank research.",
    proof: { href: "/research", label: "The research" },
  },
  {
    title: "Services people actually use",
    text: "Platforms designed around the people on the other end, with clear roles and access, like the district platform for 6,000+ members.",
    proof: { href: "/work/rotaract-district-3292", label: "Rotaract 3292" },
  },
  {
    title: "Accessible and fast by default",
    text: "Pages that work on any phone and any connection, in Nepali and English, built to WCAG 2.2 AA. This site included.",
    proof: { href: "/work/documed-ai", label: "DocuMed AI" },
  },
];

const stages = ["Records", "Checked", "Published", "People"];

export function PublicSystems() {
  return (
    <section aria-labelledby="public" className="py-20 sm:py-28">
      <Container>
        <div className="grid items-end gap-12 lg:grid-cols-[1.1fr_0.9fr]" data-reveal>
          <div>
            <p className="font-mono text-xs tracking-[0.14em] text-accent uppercase">Why I build</p>
            <h2 id="public" className="mt-3 scroll-mt-28 text-4xl leading-[1.05] font-extrabold tracking-[-0.04em] text-ink sm:text-5xl">
              Public services people can rely on.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
              I want to help Nepal&rsquo;s public institutions run on systems that are reliable, accessible and easy to use: portals that load
              fast and work on any phone, records that match their official source, and services designed around the people who use them.
            </p>
          </div>

          {/* A record travelling through a system, left to right */}
          <figure aria-label="Diagram: records are checked, published, and reach people" className="rounded-xl border border-line bg-surface p-6">
            <div className="relative mx-2 h-10">
              <div aria-hidden className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line" />
              {[0, 1.2, 2.4].map((delay) => (
                <span
                  key={delay}
                  aria-hidden
                  className="anim-travel absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_0_4px_rgba(158,27,50,0.15)]"
                  style={{ animationDelay: `${delay}s` }}
                />
              ))}
              <ol className="relative flex h-full items-center justify-between">
                {stages.map((s) => (
                  <li key={s} className="size-3.5 rounded-full border-2 border-accent bg-white" aria-hidden />
                ))}
              </ol>
            </div>
            <ol className="mt-3 flex justify-between font-mono text-[0.68rem] tracking-wide text-ink-muted uppercase">
              {stages.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
            <figcaption className="mt-4 text-sm text-ink-muted">Every record checked against its source before it reaches anyone.</figcaption>
          </figure>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <li key={p.title} className="group flex flex-col bg-canvas p-6 transition-colors hover:bg-surface" data-reveal>
              <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-lg leading-snug font-bold text-ink">{p.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-muted">{p.text}</p>
              <Link href={p.proof.href} className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-ink hover:text-accent">
                See: {p.proof.label} <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

const improvements = [
  {
    where: "Nritya Sanjiwani",
    before: "One HTML file with hash links; the three forms didn't send anywhere.",
    after: "Real pages with their own titles for search, forms validated and stored, an admin with two roles, and image uploads that require alt text.",
    href: "/work/client-websites",
  },
  {
    where: "Cloud Bird India",
    before: "The original single-file HTML build, with no automated tests.",
    after: "Rebuilt in Next.js with tests; the contact form emails the team, and if email fails it offers a pre-filled draft so no message is lost.",
    href: "/work/client-websites",
  },
  {
    where: "Sarbo360 reports",
    before: "Payment totals covered only the first page of results, exports counted cancelled documents, and editing a PO matched rows by position.",
    after: "Totals now match SAP's own figures, and edits match SAP's line numbers, so the right line is always updated.",
    href: "/work/sarbo360",
  },
];

export function Improvements() {
  return (
    <section aria-labelledby="improve" className="border-t border-line py-20 sm:py-28">
      <Container>
        <div className="max-w-2xl" data-reveal>
          <p className="font-mono text-xs tracking-[0.14em] text-accent uppercase">Improving what exists</p>
          <h2 id="improve" className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">Making existing systems better.</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">Most public work isn&rsquo;t a blank page. Three short before-and-afters.</p>
        </div>
        <ul className="mt-12 grid gap-5 lg:grid-cols-3">
          {improvements.map((c) => (
            <li key={c.where} data-reveal>
              <article className="group flex h-full flex-col rounded-xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_18px_40px_-24px_rgba(158,27,50,0.4)]">
                <h3 className="text-lg font-bold text-ink">{c.where}</h3>
                <div className="mt-4 rounded-lg bg-surface p-4">
                  <p className="font-mono text-[0.68rem] tracking-wide text-ink-muted uppercase">Before</p>
                  <p className="mt-1 text-[0.95rem] leading-relaxed text-ink-muted">{c.before}</p>
                </div>
                <div className="mt-3 rounded-lg border border-[#E2C3C8] bg-[#FBF3F4] p-4">
                  <p className="font-mono text-[0.68rem] tracking-wide text-accent uppercase">After</p>
                  <p className="mt-1 text-[0.95rem] leading-relaxed text-ink">{c.after}</p>
                </div>
                <Link href={c.href} className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-ink hover:text-accent">
                  Read more <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
