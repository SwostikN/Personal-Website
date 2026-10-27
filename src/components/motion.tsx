"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Fades in elements marked `data-reveal` as they scroll into view.
 * Only elements that start below the fold are hidden, and only after JS runs,
 * so content is always present for search engines and no-JS visitors.
 * Users who prefer reduced motion see everything immediately.
 */
export function RevealOnScroll() {
  const pathname = usePathname();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let pending = [...document.querySelectorAll<HTMLElement>("[data-reveal]")].filter(
      (el) => el.getBoundingClientRect().top > window.innerHeight * 0.92,
    );
    if (!pending.length) return;
    pending.forEach((el) => el.classList.add("reveal-pending"));

    // A plain position check on scroll: unlike IntersectionObserver it can't miss
    // an element during a fast scroll, and anything already passed is revealed too.
    let frame = 0;
    const check = () => {
      frame = 0;
      const line = window.innerHeight * 0.92;
      pending = pending.filter((el) => {
        if (el.getBoundingClientRect().top < line) {
          el.classList.add("reveal-in");
          return false;
        }
        return true;
      });
      if (!pending.length) cleanup();
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    const cleanup = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cleanup();
      cancelAnimationFrame(frame);
    };
  }, [pathname]);
  return null;
}

/** A 2px reading-progress bar along the top edge. */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <div aria-hidden className="no-print pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5">
      <div ref={bar} className="h-full origin-left scale-x-0 bg-accent" />
    </div>
  );
}
