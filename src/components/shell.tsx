import Link from "next/link";
import { site } from "@/lib/content";
import { DocumentIcon, GitHubIcon, LinkedInIcon, MailIcon } from "./icons";
import { NAV } from "@/lib/nav-items";
import { MobileMenu, NavLinks } from "./nav";

export function Monogram({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-baseline font-serif leading-none text-ink ${className}`}>
      <span aria-hidden className="text-[2.6rem] font-semibold">S</span>
      <span aria-hidden className="ml-0.5 text-xl font-semibold text-accent">n</span>
      <span className="sr-only">{site.name}, home</span>
    </Link>
  );
}

function Socials({ vertical = false }: { vertical?: boolean }) {
  const items = [
    { href: site.social.github, label: "GitHub", Icon: GitHubIcon },
    site.social.linkedin ? { href: site.social.linkedin, label: "LinkedIn", Icon: LinkedInIcon } : null,
    { href: `mailto:${site.email}`, label: "Email", Icon: MailIcon },
  ].filter((x): x is NonNullable<typeof x> => Boolean(x));
  return (
    <ul className={`flex gap-5 ${vertical ? "flex-col items-center" : "items-center"}`}>
      {items.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={label}
            {...(href.startsWith("http") ? { target: "_blank", rel: "me noopener noreferrer" } : {})}
            className="flex size-9 items-center justify-center text-ink-muted transition-colors hover:text-accent"
          >
            <Icon className="size-[1.15rem]" />
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Rail() {
  return (
    <aside aria-label="Profile links" className="no-print fixed inset-y-0 left-0 z-30 hidden w-24 flex-col items-center justify-between border-r border-line bg-canvas py-8 lg:flex">
      <Monogram />
      <Socials vertical />
    </aside>
  );
}

export function Header() {
  return (
    <header className="no-print sticky top-0 z-40 border-b border-line bg-canvas/95 backdrop-blur supports-[backdrop-filter]:bg-canvas/85 lg:static lg:border-0 lg:bg-canvas">
      <div className="relative mx-auto flex h-18 max-w-6xl items-center justify-between px-4 sm:px-8 lg:h-24 lg:px-12">
        <Monogram className="lg:hidden" />
        <nav aria-label="Main" className="hidden md:block">
          <NavLinks />
        </nav>
        <Link
          href="/cv"
          className="hidden items-center gap-2 text-[0.95rem] font-semibold text-accent hover:underline hover:underline-offset-4 md:inline-flex"
        >
          <DocumentIcon className="size-4" /> View my CV
        </Link>
        <MobileMenu cvHref="/cv" />
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="no-print border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-8 md:grid-cols-[2fr_1fr] lg:px-12">
        <div>
          <p className="font-serif text-2xl text-ink">{site.name}</p>
          <p className="mt-2 max-w-sm text-sm text-ink-muted">
            {site.jobTitle}, {site.location.city}, {site.location.country}.
          </p>
          <div className="mt-5 -ml-2">
            <Socials />
          </div>
        </div>
        <nav aria-label="Footer">
          <p className="font-mono text-xs tracking-wide text-ink uppercase">Pages</p>
          <ul className="mt-4 space-y-2 text-sm">
            {[...NAV, { href: "/writing", label: "Writing" }, { href: "/cv", label: "CV" }, { href: "/now", label: "Now" }].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-ink-muted capitalize hover:text-accent">{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="mx-auto max-w-6xl border-t border-line px-4 py-6 text-xs text-ink-muted sm:px-8 lg:px-12">
        <p>Built and maintained by {site.name}. Designed to meet WCAG 2.2 AA.</p>
      </div>
    </footer>
  );
}

export function SkipLink() {
  return (
    <a href="#main" className="sr-only z-50 bg-ink px-4 py-3 text-canvas focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
      Skip to content
    </a>
  );
}
