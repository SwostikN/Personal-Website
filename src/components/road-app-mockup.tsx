// UI prototype of the Road Development App (working title). Everything here is
// SAMPLE DATA, drawn in HTML/CSS so it stays sharp, light and readable by screen readers.

import Image from "next/image";

const works = [
  { name: "Ring Road widening, section 4", ward: "Ward 8", budget: "NPR 182M", progress: 64, status: "On schedule" },
  { name: "Inner road blacktopping", ward: "Ward 14", budget: "NPR 41M", progress: 92, status: "Finishing" },
  { name: "Drainage + footpath upgrade", ward: "Ward 3", budget: "NPR 27M", progress: 18, status: "Delayed" },
  { name: "Bridge approach road", ward: "Ward 21", budget: "NPR 96M", progress: 41, status: "On schedule" },
];

const statusTone: Record<string, string> = {
  "On schedule": "bg-[#E6F4EA] text-[#1E6B35]",
  Finishing: "bg-[#E8F0FF] text-[#1F5FD1]",
  Delayed: "bg-[#FFF1E0] text-[#9A4A00]",
};

export function RoadAppMockup() {
  return (
    <figure className="relative" aria-label="Road Development App prototype with sample data">
      {/* Desktop dashboard */}
      <div className="overflow-hidden rounded-xl border border-line bg-white shadow-[0_30px_60px_-30px_rgba(31,95,209,0.35)]">
        <div className="flex items-center gap-2 border-b border-line bg-surface px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-[#E4E4EA]" />
          <span className="size-2.5 rounded-full bg-[#E4E4EA]" />
          <span className="size-2.5 rounded-full bg-[#E4E4EA]" />
          <span className="ml-3 truncate rounded bg-white px-3 py-0.5 font-mono text-[0.65rem] text-ink-muted">road-works.prototype · sample data</span>
        </div>
        <div className="grid gap-4 p-4 sm:p-5 md:grid-cols-[1.35fr_1fr]">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <Image src="/logos/emblem-of-nepal.png" alt="Emblem of Nepal" width={250} height={211} sizes="2.5rem" className="h-auto w-10 shrink-0" />
                <p className="text-[0.95rem] font-bold text-ink">Road works · Kathmandu (sample)</p>
              </div>
              <div className="flex gap-1.5 text-[0.65rem]">
                {["All wards", "Active", "2083/84"].map((c) => (
                  <span key={c} className="rounded-full border border-line px-2 py-0.5 text-ink-muted">{c}</span>
                ))}
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                ["24", "works tracked"],
                ["NPR 412M", "budget"],
                ["100%", "source-linked"],
              ].map(([v, l]) => (
                <div key={l} className="rounded-lg bg-surface px-3 py-2">
                  <p className="text-sm font-bold text-ink">{v}</p>
                  <p className="text-[0.62rem] text-ink-muted">{l}</p>
                </div>
              ))}
            </div>
            <ul className="mt-3 divide-y divide-line rounded-lg border border-line">
              {works.map((w) => (
                <li key={w.name} className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1 px-3 py-2">
                  <span className="truncate text-[0.72rem] font-semibold text-ink">{w.name}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[0.6rem] font-semibold ${statusTone[w.status]}`}>{w.status}</span>
                  <span className="flex items-center gap-2 text-[0.62rem] text-ink-muted">
                    <span>{w.ward}</span>
                    <span>·</span>
                    <span>{w.budget}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-16 overflow-hidden rounded-full bg-line">
                      <span className="block h-full rounded-full bg-accent" style={{ width: `${w.progress}%` }} />
                    </span>
                    <span className="w-7 text-right text-[0.6rem] text-ink-muted">{w.progress}%</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          {/* Map panel */}
          <div className="relative hidden min-h-56 overflow-hidden rounded-lg bg-[#F3F6FB] md:block">
            <svg viewBox="0 0 220 240" className="absolute inset-0 h-full w-full" aria-hidden>
              <path d="M10 60 C 70 40, 120 90, 210 70" stroke="#CBD5E3" strokeWidth="7" fill="none" />
              <path d="M30 230 C 60 150, 120 140, 140 10" stroke="#CBD5E3" strokeWidth="5" fill="none" />
              <path d="M0 170 C 80 160, 150 200, 220 175" stroke="#DCE3EE" strokeWidth="4" fill="none" />
              <path d="M10 60 C 70 40, 120 90, 210 70" stroke="#1F5FD1" strokeWidth="2.5" strokeDasharray="5 4" fill="none" />
              {[
                [62, 52, "#1E6B35"],
                [128, 88, "#1F5FD1"],
                [96, 160, "#9A4A00"],
                [170, 182, "#1E6B35"],
              ].map(([x, y, c], i) => (
                <g key={i}>
                  <circle cx={x} cy={y} r="9" fill={c as string} opacity="0.15" />
                  <circle cx={x} cy={y} r="4" fill={c as string} />
                </g>
              ))}
            </svg>
            <span className="absolute bottom-2 left-2 rounded bg-white/90 px-2 py-0.5 font-mono text-[0.58rem] text-ink-muted">Map: illustrative</span>
          </div>
        </div>
      </div>

      {/* Phone: one work, with its official source */}
      <div className="anim-float absolute -right-2 -bottom-10 hidden w-44 rounded-[1.6rem] border-[5px] border-[#1E2533] bg-white p-3 shadow-[0_24px_50px_-20px_rgba(15,23,42,0.45)] sm:block lg:-right-8 lg:w-48">
        <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-line" />
        <p className="font-mono text-[0.55rem] tracking-wider text-accent uppercase">Ward 8 · sample</p>
        <p className="mt-1 text-[0.72rem] leading-tight font-bold text-ink">Ring Road widening, section 4</p>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
          <div className="h-full w-[64%] rounded-full bg-accent" />
        </div>
        <p className="mt-1 text-[0.58rem] text-ink-muted">64% complete · due Asar 2084</p>
        <div className="mt-2.5 space-y-1.5 text-[0.58rem]">
          <p className="flex justify-between"><span className="text-ink-muted">Budget</span><span className="font-semibold text-ink">NPR 182M</span></p>
          <p className="flex justify-between"><span className="text-ink-muted">Contractor</span><span className="font-semibold text-ink">Contractor A</span></p>
          <p className="flex justify-between"><span className="text-ink-muted">Responsible</span><span className="font-semibold text-ink">Ward office</span></p>
        </div>
        <div className="mt-2.5 rounded-md bg-surface px-2 py-1.5 text-[0.55rem] text-ink-muted">
          Source: municipal notice ↗<br />read 2 days ago
        </div>
      </div>

      <figcaption className="mt-4 flex items-start gap-2 font-mono text-[0.7rem] text-ink-muted sm:pr-48 lg:pr-44">
        <span className="anim-pulse mt-1 inline-block size-2 shrink-0 rounded-full bg-[#F59E0B]" aria-hidden />
        UI prototype · all names, figures and places are sample data
      </figcaption>
    </figure>
  );
}
