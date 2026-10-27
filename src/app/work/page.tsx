import type { Metadata } from "next";
import { Container, PageIntro, ProjectCard } from "@/components/ui";
import { getProjects } from "@/lib/content";
import { breadcrumbJsonLd, JsonLd, absolute, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Work: ERP, platforms, applied AI and analysis",
  description:
    "Case studies by Swostik Nepal: Sarbo360 (SAP Business One + connectIPS), the Rotaract District 3292 platform, DocuMed AI, VESTIQ and civic data.",
  path: "/work",
});

export default function WorkPage() {
  const projects = getProjects();
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Work", path: "/work" }]),
          {
            "@type": "CollectionPage",
            name: "Work",
            url: absolute("/work"),
            hasPart: projects.map((p) => ({ "@type": "CreativeWork", name: p.title, url: absolute(`/work/${p.slug}`) })),
          },
        ]}
      />
      <PageIntro
        eyebrow="Work"
        title="Systems people use every day."
        intro="Each case study follows the same path: the people and the problem, the requirements, the models, what I built, how it was validated and deployed, and what changed."
      />
      <Container className="pb-24">
        <ul className="grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <li key={p.slug} className={p.order === 1 ? "md:col-span-2" : ""}>
              <ProjectCard project={p} large={p.featured} headingLevel="h2" />
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
