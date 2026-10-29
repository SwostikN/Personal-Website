import type { Metadata } from "next";
import { Container, Eyebrow, PageIntro } from "@/components/ui";
import { site } from "@/lib/content";
import { breadcrumbJsonLd, JsonLd, absolute, pageMetadata } from "@/lib/seo";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = pageMetadata({
  title: "Contact Swostik Nepal",
  description: "Get in touch with Swostik Nepal, software developer and SAP Business One consultant in Kathmandu, Nepal.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Contact", path: "/contact" }]),
          { "@type": "ContactPage", name: "Contact", url: absolute("/contact"), about: { "@id": `${site.url}/#person` } },
        ]}
      />
      <PageIntro eyebrow="Contact" title="Let's talk." intro="About a role, a system that needs building, or an ERP that needs to work the way your organisation does." />
      <Container className="grid gap-14 pb-24 lg:grid-cols-[1.6fr_1fr]">
        <ContactForm email={site.email} />
        <div className="space-y-8 border-t border-line pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
          <div>
            <Eyebrow>Email</Eyebrow>
            <a href={`mailto:${site.email}`} className="mt-2 block text-lg text-ink hover:text-accent">{site.email}</a>
          </div>
          <div>
            <Eyebrow>Based in</Eyebrow>
            <p className="mt-2 text-lg text-ink">{site.location.city}, {site.location.country}</p>
          </div>
          <div>
            <Eyebrow>Currently</Eyebrow>
            <p className="mt-2 text-lg text-ink">{site.currently}</p>
          </div>
        </div>
      </Container>
    </>
  );
}
