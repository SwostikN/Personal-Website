import Image from "next/image";
import type { Talk } from "@/lib/types";
import { formatDate } from "@/lib/format";

function dateRange(t: Talk) {
  const [sy, sm, sd] = t.startDate.split("-");
  const [ey, em, ed] = t.endDate.split("-");
  if (sy === ey && sm === em) return `${Number(sd)}–${formatDate(`${ey}-${em}-${ed}`)}`;
  return `${formatDate(t.startDate)} – ${formatDate(t.endDate)}`;
}

/** Conference talk: lead photo plus the facts a reader (or a panel) wants. */
export function TalkFeature({ talk, gallery = false, headingLevel = "h3" }: { talk: Talk; gallery?: boolean; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  const [lead, ...rest] = talk.photos;
  return (
    <article className="mt-10">
      <figure className="border border-line">
        <div className="relative aspect-[3/2] overflow-hidden bg-surface">
          <Image src={lead.src} alt={lead.alt} fill sizes="(min-width: 1024px) 40rem, 100vw" className="object-cover" />
        </div>
        <figcaption className="border-t border-line px-4 py-3 text-sm text-ink-muted">
          Presenting at {talk.event}, {talk.venue}
        </figcaption>
      </figure>
      <p className="mt-6 font-mono text-xs text-accent uppercase">Conference talk · {dateRange(talk)}</p>
      <H className="mt-2 text-xl font-bold text-ink">
        {talk.event}: {talk.eventFull.replace(/\s*\(.*\)$/, "")}
      </H>
      <p className="mt-1 text-ink-muted">{talk.host} · {talk.city}</p>
      <p className="mt-3 leading-relaxed text-ink-muted">
        <strong className="text-ink">Presented:</strong> <em>{talk.title}</em>. {talk.summary}
      </p>
      <p className="mt-2 text-sm text-ink-muted">Theme: {talk.theme}</p>

      {gallery && rest.length > 0 && (
        <ul className="mt-6 grid grid-cols-3 gap-2" aria-label={`More photos from ${talk.event}`}>
          {rest.map((p) => (
            <li key={p.src} className="relative aspect-[3/2] overflow-hidden bg-surface">
              <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 13rem, 33vw" className="object-cover" />
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
