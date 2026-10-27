import type { Metadata } from "next";
import { stripInline } from "@/components/inline";
import { education, experience, portrait, publications, site, skills } from "./content";
import type { Post, Project, Publication, Talk } from "./types";

export const absolute = (path = "/") => `${site.url}${path === "/" ? "" : path}`;

type PageMeta = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  keywords?: readonly string[];
  absoluteTitle?: boolean;
};

/** Canonical URL, Open Graph and Twitter tags for one page. OG images come from opengraph-image files. */
const TITLE_SUFFIX = ` · ${site.name}`;

export function pageMetadata({ title, description, path, type = "website", publishedTime, keywords, absoluteTitle }: PageMeta): Metadata {
  // Skip the " · Swostik Nepal" suffix when it would push the title past ~60 characters
  // or when the title already names the person.
  const skipSuffix = absoluteTitle || title.includes(site.name) || title.length + TITLE_SUFFIX.length > 60;
  return {
    title: skipSuffix ? { absolute: title } : title,
    description,
    keywords: keywords ? [...keywords] : undefined,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: site.name,
      locale: "en_GB",
      type,
      // Default card; a route's own opengraph-image file takes precedence.
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name}: ${site.jobTitle}` }],
      ...(type === "article" && publishedTime ? { publishedTime, authors: [site.name] } : {}),
      ...(type === "profile" ? { firstName: "Swostik", lastName: "Nepal" } : {}),
    },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
  };
}

const PERSON_ID = `${site.url}/#person`;
const WEBSITE_ID = `${site.url}/#website`;

export function personJsonLd() {
  const current = experience.find((e) => !e.end);
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: site.name,
    // "Swastik Nepal" is how national press has spelled the name (Kathmandu Post, Aug 2026).
    alternateName: ["Swostik", "Swastik Nepal", "SwostikN"],
    givenName: "Swostik",
    familyName: "Nepal",
    url: site.url,
    image: absolute(portrait.src),
    email: `mailto:${site.email}`,
    jobTitle: site.jobTitle,
    description: site.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressCountry: site.location.countryCode,
    },
    nationality: { "@type": "Country", name: "Nepal" },
    knowsLanguage: ["ne", "en"],
    worksFor: current ? { "@type": "Organization", name: current.organisation } : undefined,
    alumniOf: education.map((e) => ({ "@type": "EducationalOrganization", name: e.institution })),
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: education[0].qualification,
    },
    knowsAbout: skills.flatMap((s) => s.items),
    sameAs: [site.social.github, site.social.linkedin].filter(Boolean),
  };
}

export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: "en",
    publisher: { "@id": PERSON_ID },
  };
}

export function profilePageJsonLd(path: string) {
  return {
    "@type": "ProfilePage",
    url: absolute(path),
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": PERSON_ID },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}

export function projectJsonLd(p: Project) {
  return {
    "@type": "CreativeWork",
    "@id": absolute(`/work/${p.slug}#work`),
    name: p.title,
    headline: p.seoTitle,
    description: p.description,
    url: absolute(`/work/${p.slug}`),
    creator: { "@id": PERSON_ID },
    keywords: [...p.keywords, ...p.stack].join(", "),
    genre: p.kind,
    ...(p.links.live ? { sameAs: p.links.live } : {}),
    ...(p.links.code ? { codeRepository: p.links.code } : {}),
    about: p.sections[0]?.blocks[0]?.type === "p" ? stripInline(p.sections[0].blocks[0].text) : p.summary,
  };
}

export function articleJsonLd(post: Post) {
  return {
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    url: absolute(`/writing/${post.slug}`),
    mainEntityOfPage: absolute(`/writing/${post.slug}`),
    image: absolute(`/writing/${post.slug}/opengraph-image`),
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    keywords: post.tags.join(", "),
    inLanguage: "en",
  };
}

export function publicationJsonLd(p: Publication = publications[0]) {
  return {
    "@type": "ScholarlyArticle",
    headline: p.title,
    name: p.title,
    // The site owner is "Nepal, S." on the paper: point that author at the Person entity.
    author: p.authors.map((a) => (a === "Nepal, S." ? { "@type": "Person", "@id": PERSON_ID, name: site.name } : { "@type": "Person", name: a })),
    datePublished: p.date,
    isPartOf: { "@type": "PublicationIssue", name: p.series },
    publisher: { "@type": "Organization", name: "Nepal Rastra Bank" },
    abstract: p.abstract,
    ...(p.url ? { url: p.url } : {}),
    ...(p.sameAs?.length ? { sameAs: p.sameAs } : {}),
    ...(p.coverage?.length
      ? {
          subjectOf: p.coverage.map((c) => ({
            "@type": "NewsArticle",
            headline: c.title,
            url: c.url,
            datePublished: c.date,
            publisher: { "@type": "Organization", name: c.outlet },
          })),
        }
      : {}),
  };
}

export function talkJsonLd(t: Talk) {
  return {
    "@type": "Event",
    name: `${t.event}: ${t.eventFull}`,
    startDate: t.startDate,
    endDate: t.endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: t.venue,
      address: { "@type": "PostalAddress", addressLocality: t.city, addressCountry: "NP" },
    },
    url: absolute("/research#talk"),
    description: `${t.summary} Theme: ${t.theme}.`,
    organizer: { "@type": "Organization", name: t.host, url: t.hostUrl },
    performer: { "@type": "Person", "@id": PERSON_ID, name: site.name },
    about: t.title,
    image: t.photos.map((p) => absolute(p.src)),
  };
}

/** One JSON-LD graph per page. `<` is escaped to keep the script tag safe. */
export function JsonLd({ data }: { data: Record<string, unknown>[] }) {
  const graph = { "@context": "https://schema.org", "@graph": data };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}
