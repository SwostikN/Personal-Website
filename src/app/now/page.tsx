import type { Metadata } from "next";
import { Container, PageIntro } from "@/components/ui";
import { now } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { breadcrumbJsonLd, JsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Now: what Swostik Nepal is working on",
  description: "What Swostik Nepal is working on right now: SAP Business One and Sarbo360, VESTIQ, and Nepal civic data.",
  path: "/now",
});

export default function NowPage() {
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd([{ name: "Now", path: "/now" }])]} />
      <PageIntro eyebrow={`Now · updated ${formatDate(now.updated)}`} title="What I'm working on." />
      <Container className="max-w-3xl pb-24">
        <ul className="divide-y divide-line border-y border-line">
          {now.items.map((item) => (
            <li key={item} className="py-6 text-lg leading-relaxed text-ink">{item}</li>
          ))}
        </ul>
      </Container>
    </>
  );
}
