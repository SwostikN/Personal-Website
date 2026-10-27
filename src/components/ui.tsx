import Link from "next/link";
import type { ReactNode } from "react";
import type { Project } from "@/lib/types";
import { LockIcon } from "./blocks";
import { ArrowIcon } from "./icons";

export function Container({ children, className = "", ...rest }: { children: ReactNode; className?: string } & Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "children">) {
  return (
    <div {...rest} className={`mx-auto max-w-6xl px-4 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="font-mono text-xs tracking-[0.14em] text-accent uppercase">{children}</p>;
}

export function SectionHeader({ eyebrow, title, intro, id }: { eyebrow: string; title: string; intro?: string; id?: string }) {
  return (
    <div className="max-w-2xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className="mt-3 scroll-mt-28 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{title}</h2>
      {intro && <p className="mt-4 text-lg leading-relaxed text-ink-muted">{intro}</p>}
    </div>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  download,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  download?: boolean;
}) {
  const cls =
    variant === "primary"
      ? "inline-flex min-h-12 items-center gap-2 bg-accent px-7 font-semibold text-white transition-colors hover:bg-ink"
      : "inline-flex min-h-12 items-center gap-2 border border-ink px-7 font-semibold text-ink transition-colors hover:bg-ink hover:text-white";
  if (download) {
    return (
      <a href={href} download className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return <span className="inline-block border border-line px-2 py-0.5 font-mono text-[0.72rem] text-ink-muted">{children}</span>;
}

export function ProjectCard({ project, large = false, headingLevel = "h3" }: { project: Project; large?: boolean; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <article className="group relative flex h-full flex-col border border-line bg-canvas p-6 transition-colors hover:border-ink sm:p-8">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-ink-muted">
        <span className="text-accent">{project.kind}</span>
        <span aria-hidden>·</span>
        <span>{project.status}</span>
        <span aria-hidden>·</span>
        <span>{project.year}</span>
        {project.links.private && (
          <span className="inline-flex items-center gap-1">
            <LockIcon className="size-3" /> Private
          </span>
        )}
      </div>
      <H className={`mt-4 font-bold tracking-tight text-ink ${large ? "text-3xl" : "text-2xl"}`}>
        <Link href={`/work/${project.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
          {project.title}
        </Link>
      </H>
      <p className="mt-3 leading-relaxed text-ink-muted">{project.summary}</p>
      {large && project.metrics.length > 0 && (
        <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-line pt-5">
          {project.metrics.map((m) => (
            <div key={m.label}>
              <dt className="sr-only">{m.label}</dt>
              <dd>
                <span className="block font-serif text-2xl text-ink">{m.value}</span>
                <span className="mt-1 block text-xs leading-snug text-ink-muted">{m.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      )}
      <div className="mt-auto flex items-center justify-between gap-4 pt-6">
        <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.stack.slice(0, large ? 5 : 3).map((s) => (
            <li key={s}><Tag>{s}</Tag></li>
          ))}
        </ul>
        <ArrowIcon className="size-5 shrink-0 text-ink transition-transform group-hover:translate-x-1 group-hover:text-accent" />
      </div>
    </article>
  );
}

export function PageIntro({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro?: string; children?: ReactNode }) {
  return (
    <Container className="pt-10 pb-12 sm:pt-16 sm:pb-16">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="mt-4 max-w-4xl text-4xl leading-[1.05] font-bold tracking-tight text-ink sm:text-6xl">{title}</h1>
      {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted sm:text-xl">{intro}</p>}
      {children}
    </Container>
  );
}
