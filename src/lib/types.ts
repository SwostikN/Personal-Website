// Content shapes shared by every page. They mirror the Sanity schemas in
// `src/sanity/schemas`, so swapping the content source never touches a page.

export type Inline = string; // supports **bold** and [label](href)

export type Block =
  | { type: "p"; text: Inline }
  | { type: "list"; items: Inline[] }
  | { type: "stats"; items: { value: string; label: string }[] }
  | {
      type: "requirements";
      rows: { id: string; kind: "Functional" | "Non-functional"; text: Inline }[];
    }
  | {
      type: "flow";
      title: string;
      steps: { label: string; detail?: string }[];
      caption?: string;
    }
  | {
      type: "layers";
      title: string;
      layers: { name: string; items: string[] }[];
      side?: { name: string; items: string[] };
      caption?: string;
    }
  | {
      type: "table";
      caption?: string;
      columns: string[];
      rows: Inline[][];
    }
  | { type: "acceptance"; rows: { given: string; when: string; then: string }[] }
  | { type: "callout"; tone: "note" | "private"; text: Inline };

export type Section = {
  id: string;
  title: string;
  blocks: Block[];
  /** A live site this section describes, shown as a button under it. */
  link?: { label: string; href: string };
};

export type ProjectKind =
  | "Enterprise"
  | "Platform"
  | "Applied AI"
  | "Analysis"
  | "Client website"
  | "Side project";

export type Project = {
  slug: string;
  title: string;
  /** <title> and OG title; keep under ~60 chars */
  seoTitle: string;
  /** One line under the title */
  summary: string;
  /** Meta description, 140–160 chars */
  description: string;
  kind: ProjectKind;
  status: "Live" | "In production" | "In development" | "Ongoing";
  year: string;
  timeline: string;
  role: string;
  organisation?: string;
  stack: string[];
  links: {
    live?: string;
    code?: string;
    private?: boolean;
  };
  featured: boolean;
  order: number;
  metrics: { value: string; label: string }[];
  artefacts: string[];
  keywords: string[];
  sections: Section[];
  /** For work in progress: what exists now vs what comes next. */
  progress?: { done: string[]; next: string[] };
  /** Who a work-in-progress is designed for, and what it would give them. */
  audience?: { who: string; gets: string }[];
};

export type Experience = {
  organisation: string;
  place: string;
  role: string;
  start: string; // ISO yyyy-mm
  end?: string; // ISO yyyy-mm, undefined = present
  summary: string;
  highlights: Inline[];
  url?: string;
  logo?: string;
  /** Where to read more about this role on the site. */
  more?: { href: string; label: string };
};

export type Education = {
  institution: string;
  qualification: string;
  detail?: string;
  start: string;
  end: string;
};

export type Publication = {
  slug: string;
  title: string;
  authors: string[];
  series: string;
  publisher: string;
  date: string; // ISO
  contribution: string;
  abstract: string;
  url?: string;
  /** Copy hosted on this site, credited to the publisher. */
  pdf?: string;
  cover?: string;
  findings?: { value: string; label: string }[];
  /** Other authoritative listings of the same paper (e.g. RePEc). */
  sameAs?: string[];
  /** Press coverage that names the author. */
  coverage?: { outlet: string; title: string; url: string; date: string; lang?: "ne" | "en"; translation?: string }[];
};

export type Talk = {
  slug: string;
  title: string;
  event: string;
  eventFull: string;
  host: string;
  hostUrl: string;
  theme: string;
  startDate: string; // ISO
  endDate: string; // ISO
  venue: string;
  city: string;
  summary: string;
  photos: { src: string; alt: string; width: number; height: number }[];
  video?: { src: string; poster: string; caption: string };
};

export type MediaItem = {
  title: string;
  by: string;
  platform: string;
  url: string;
  embed?: string;
  poster?: string;
  summary: string;
  date?: string;
};

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  tags: string[];
  readingMinutes: number;
  body: Block[];
};
