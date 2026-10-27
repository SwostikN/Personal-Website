import type { Block } from "@/lib/types";
import { Inline } from "./inline";

// Renders case-study and post content. Diagrams are plain HTML/CSS, so they
// reflow on phones, stay crisp at any zoom, and are read naturally by screen readers.

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose-body space-y-6 text-[1.0625rem] text-ink-muted">
      {blocks.map((block, i) => (
        <BlockView key={i} block={block} />
      ))}
    </div>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return (
        <p>
          <Inline text={block.text} />
        </p>
      );
    case "list":
      return (
        <ul className="space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="relative pl-6 leading-relaxed">
              <span aria-hidden className="absolute top-[0.7em] left-0 h-px w-3 bg-accent" />
              <Inline text={item} />
            </li>
          ))}
        </ul>
      );
    case "stats":
      return (
        <dl className="grid gap-px border border-line bg-line sm:grid-cols-3">
          {block.items.map((s) => (
            <div key={s.label} className="bg-canvas p-5">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-serif text-4xl text-ink">{s.value}</span>
                <span className="mt-2 block text-sm">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      );
    case "requirements":
      return (
        <div className="overflow-x-auto border border-line">
          <table className="w-full min-w-[34rem] text-left text-[0.95rem]">
            <caption className="sr-only">Requirements</caption>
            <thead className="bg-surface font-mono text-xs tracking-wide text-ink uppercase">
              <tr>
                <th scope="col" className="px-4 py-3">ID</th>
                <th scope="col" className="px-4 py-3">Type</th>
                <th scope="col" className="px-4 py-3">Requirement</th>
              </tr>
            </thead>
            <tbody>
              {block.rows.map((r) => (
                <tr key={r.id} className="border-t border-line align-top">
                  <th scope="row" className="px-4 py-3 font-mono text-xs whitespace-nowrap text-accent">{r.id}</th>
                  <td className="px-4 py-3 text-xs whitespace-nowrap">{r.kind}</td>
                  <td className="px-4 py-3 leading-relaxed"><Inline text={r.text} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "flow":
      return (
        <figure className="border border-line bg-surface p-5 sm:p-6">
          <figcaption className="mb-5 font-mono text-xs tracking-wide text-ink uppercase">{block.title}</figcaption>
          <ol className="grid gap-3 md:grid-flow-col md:auto-cols-fr">
            {block.steps.map((step, i) => (
              <li key={step.label} className="relative">
                <div className="h-full border border-line bg-canvas p-4">
                  <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mt-1 block font-semibold text-ink">{step.label}</span>
                  {step.detail && <span className="mt-1 block text-sm leading-snug">{step.detail}</span>}
                </div>
                {i < block.steps.length - 1 && (
                  <span aria-hidden className="absolute -bottom-3 left-6 h-3 w-px bg-ink md:top-1/2 md:-right-3 md:bottom-auto md:left-auto md:h-px md:w-3" />
                )}
              </li>
            ))}
          </ol>
          {block.caption && <p className="mt-4 text-sm">{block.caption}</p>}
        </figure>
      );
    case "layers":
      return (
        <figure className="border border-line bg-surface p-5 sm:p-6">
          <figcaption className="mb-5 font-mono text-xs tracking-wide text-ink uppercase">{block.title}</figcaption>
          <div className="grid gap-4 md:grid-cols-[1fr_auto]">
            <ol className="space-y-3">
              {block.layers.map((layer, i) => (
                <li key={layer.name}>
                  <div className="border border-line bg-canvas p-4">
                    <span className="font-semibold text-ink">{layer.name}</span>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {layer.items.map((item) => (
                        <li key={item} className="border border-line px-2.5 py-1 font-mono text-xs text-ink-muted">{item}</li>
                      ))}
                    </ul>
                  </div>
                  {i < block.layers.length - 1 && <span aria-hidden className="mx-auto block h-3 w-px bg-ink" />}
                </li>
              ))}
            </ol>
            {block.side && (
              <div className="border border-dashed border-accent bg-canvas p-4 md:w-48 md:self-center">
                <span className="font-semibold text-ink">{block.side.name}</span>
                <ul className="mt-3 space-y-2">
                  {block.side.items.map((item) => (
                    <li key={item} className="font-mono text-xs">{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {block.caption && <p className="mt-4 text-sm">{block.caption}</p>}
        </figure>
      );
    case "table":
      return (
        <div className="overflow-x-auto border border-line">
          <table className="w-full min-w-[32rem] text-left text-[0.95rem]">
            {block.caption && <caption className="bg-surface px-4 py-3 text-left font-mono text-xs tracking-wide text-ink uppercase">{block.caption}</caption>}
            <thead className="border-t border-line text-ink">
              <tr>
                {block.columns.map((c) => (
                  <th key={c} scope="col" className="px-4 py-3 font-semibold">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-t border-line align-top">
                  {row.map((cell, j) =>
                    j === 0 ? (
                      <th key={j} scope="row" className="px-4 py-3 font-medium text-ink"><Inline text={cell} /></th>
                    ) : (
                      <td key={j} className="px-4 py-3 leading-relaxed"><Inline text={cell} /></td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "acceptance":
      return (
        <ol className="space-y-3">
          {block.rows.map((r, i) => (
            <li key={i} className="border-l-2 border-accent bg-surface p-4 text-[0.95rem] leading-relaxed">
              <span className="font-mono text-xs text-accent">AC-{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-1"><strong className="text-ink">Given</strong> {r.given}, <strong className="text-ink">when</strong> {r.when}, <strong className="text-ink">then</strong> {r.then}.</p>
            </li>
          ))}
        </ol>
      );
    case "callout":
      return (
        <div
          role="note"
          className={
            block.tone === "private"
              ? "flex gap-3 border border-line bg-surface p-4 text-[0.95rem]"
              : "border-l-2 border-ink bg-surface p-4 text-[0.95rem]"
          }
        >
          {block.tone === "private" && <LockIcon className="mt-0.5 size-4 shrink-0 text-ink" />}
          <span><Inline text={block.text} /></span>
        </div>
      );
  }
}

export function LockIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
      <rect x="4" y="10" width="16" height="11" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}
