import Link from "next/link";
import type { ReactNode } from "react";

// Renders the small inline syntax used in content: **bold**, `code`, [label](href).
const TOKEN = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;

export function Inline({ text }: { text: string }) {
  const parts = text.split(TOKEN).filter(Boolean);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**")) return <strong key={i} className="font-semibold text-ink">{part.slice(2, -2)}</strong>;
        if (part.startsWith("`")) return <code key={i}>{part.slice(1, -1)}</code>;
        if (part.startsWith("[")) {
          const m = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
          if (m) return <SmartLink key={i} href={m[2]}>{m[1]}</SmartLink>;
        }
        if (part.startsWith("*") && part.endsWith("*") && part.length > 2) return <em key={i}>{part.slice(1, -1)}</em>;
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export function SmartLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  const external = /^https?:\/\//.test(href);
  if (external) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

/** Plain text for meta tags and JSON-LD. */
export function stripInline(text: string) {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1");
}
