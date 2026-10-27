"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/nav-items";


function isActive(pathname: string, href: string) {
  if (href.includes("#")) return false; // in-page anchors are never the "current page"
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavLinks() {
  const pathname = usePathname();
  return (
    <ul className="hidden items-center gap-8 md:flex">
      {NAV.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`relative py-2 text-[1.02rem] font-medium text-ink transition-colors hover:text-accent ${
                active ? "after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:bg-ink" : ""
              }`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function MobileMenu({ cvHref }: { cvHref: string }) {
  const pathname = usePathname();
  // The menu belongs to the page it was opened on, so navigating closes it without an effect.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (next: boolean | ((v: boolean) => boolean)) =>
    setOpenOn((typeof next === "function" ? next(open) : next) ? pathname : null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 items-center gap-2 border border-line px-3 text-sm font-medium"
      >
        <span aria-hidden className="flex w-4 flex-col gap-1">
          <span className={`h-px bg-ink transition ${open ? "translate-y-[2.5px] rotate-45" : ""}`} />
          <span className={`h-px bg-ink transition ${open ? "-translate-y-[2.5px] -rotate-45" : ""}`} />
        </span>
        {open ? "Close" : "Menu"}
      </button>
      {open && (
        <nav id="mobile-menu" aria-label="Main" className="absolute inset-x-0 top-full z-40 border-b border-line bg-canvas px-4 pb-6">
          <ul className="divide-y divide-line">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className="block py-4 text-lg font-medium capitalize aria-[current=page]:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={cvHref} className="block py-4 text-lg font-medium text-accent">
                CV
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
