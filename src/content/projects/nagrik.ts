import type { Project } from "@/lib/types";

export const nagrik: Project = {
  slug: "road-development-app",
  title: "Road Development App",
  seoTitle: "Road Development App: tracking public road works in Nepal",
  summary:
    "A prototype that puts Nepal's road works in one place: who is responsible, what was promised, what is being built, each record linked to its official source.",
  description:
    "Work in progress: a Road Development App for Nepal, with a feasibility study, SRS, data model and a clickable UI prototype using sample data.",
  kind: "Analysis",
  status: "In development",
  year: "2026",
  timeline: "Oct 2026 – present",
  role: "Concept, requirements, data model and UI prototype",
  stack: ["Feasibility study", "SRS", "Data model", "UI prototype", "Next.js", "PostgreSQL"],
  links: {},
  featured: false,
  order: 5,
  metrics: [
    { value: "8", label: "public data sources assessed" },
    { value: "1", label: "city for the first version" },
    { value: "WIP", label: "prototype with sample data" },
  ],
  artefacts: [
    "Feasibility study",
    "SRS excerpt (functional and non-functional)",
    "Entity-relationship model",
    "Ingest-to-publish process model",
    "Acceptance scenarios",
    "UI prototype (sample data)",
  ],
  audience: [
    { who: "Residents", gets: "See what is being built on their road, who is responsible, and who to call." },
    { who: "Ward offices", gets: "One clear place where published updates on works are easy to find." },
    { who: "Journalists and researchers", gets: "Records linked to official sources, ready to check and cite." },
    { who: "Planners", gets: "A view of delays and budgets across wards, to plan with evidence." },
  ],
  progress: {
    done: [
      "Feasibility study of 8 public data sources",
      "Requirements (SRS excerpt) and acceptance scenarios",
      "Data model and ingest-to-publish process",
      "UI prototype: dashboard and mobile views, with sample data",
    ],
    next: [
      "Ingest real road-works records for one city",
      "Archive every source document with a timestamp",
      "Ward pages with officially published contacts",
      "Read-only API for researchers and journalists",
    ],
  },
  keywords: ["road development app Nepal", "road works tracker Nepal", "civic data Nepal", "open government data Nepal", "Right to Information Act Nepal", "feasibility study", "system requirements specification"],
  sections: [
    {
      id: "context",
      title: "The question",
      blocks: [
        {
          type: "p",
          text: "Public bodies in Nepal already publish a lot: tender notices, audit reports, ward officials, quarterly disclosures under the Right to Information Act. It is spread across hundreds of sites, mostly in Nepali, often in scanned PDFs. Inspired by an independent civic-data site in India, I am building a Nepal tool starting with **road works**: who is responsible, what was promised, what is being built, with every record linked to its official source. The name is a working title, and everything shown so far uses sample data.",
        },
      ],
    },
    {
      id: "feasibility",
      title: "Feasibility",
      blocks: [
        {
          type: "table",
          caption: "Assessment, October 2026",
          columns: ["Dimension", "Rating", "Why"],
          rows: [
            ["Technical", "High", "Scraping, OCR, a relational model, a map and a read-only API are all proven pieces"],
            ["Data availability", "Medium", "The RTI Act obliges bodies to publish, but formats vary: Nepali text, legacy fonts, scanned PDFs"],
            ["Source reliability", "Medium-low", "Several sources were unreachable or blocked automated access during testing"],
            ["Legal", "Medium", "Republish official records verbatim with sources; official contact details only"],
            ["Cost", "Low", "Free tiers cover an MVP; the real cost is maintaining ingestion"],
          ],
        },
      ],
    },
    {
      id: "sources",
      title: "Data sources assessed",
      blocks: [
        {
          type: "list",
          items: [
            "**Public procurement (e-GP)**: tenders, awards, contractors, values",
            "**Office of the Auditor General**: annual audit findings by public body",
            "**Election Commission**: elected mayors, deputies and ward chairs",
            "**Metropolitan and municipal websites**: ward contacts, notices, procurement, RTI disclosures",
            "**Public Procurement Monitoring Office**: rules and debarred firms",
            "**Sub-national treasury reports**: local budgets and expenditure",
            "**Government grievance portal**: where complaints should go",
            "**RTI proactive disclosures**: published by public bodies every three months",
          ],
        },
      ],
    },
    {
      id: "requirements",
      title: "SRS excerpt",
      blocks: [
        {
          type: "requirements",
          rows: [
            { id: "FR-01", kind: "Functional", text: "Show every ward's elected officials with their **officially published** contact details." },
            { id: "FR-02", kind: "Functional", text: "List public works per ward: title, value, contractor, status and dates, each linked to its source document." },
            { id: "FR-03", kind: "Functional", text: "When a record isn't published, say \"not published\" and offer a ready-to-file RTI request." },
            { id: "FR-04", kind: "Functional", text: "Provide a read-only API so assistants and researchers can query the records." },
            { id: "NFR-01", kind: "Non-functional", text: "Archive every source document with a hash and the time it was read; serve from the archive if the source is down." },
            { id: "NFR-02", kind: "Non-functional", text: "Store Bikram Sambat and Gregorian dates; convert legacy Preeti text to Unicode." },
            { id: "NFR-03", kind: "Non-functional", text: "Never bypass logins or access controls; rate-limit and identify the crawler." },
          ],
        },
      ],
    },
    {
      id: "process",
      title: "Process model",
      blocks: [
        {
          type: "flow",
          title: "From official source to published record",
          steps: [
            { label: "Fetch", detail: "Polite crawler or manual import" },
            { label: "Archive", detail: "Hash + timestamp" },
            { label: "Extract", detail: "OCR, font conversion, BS dates" },
            { label: "Verify", detail: "Match to body, ward, official" },
            { label: "Publish", detail: "With source link and read time" },
          ],
        },
        {
          type: "table",
          caption: "Core entities",
          columns: ["Entity", "Key fields", "Relates to"],
          rows: [
            ["Public body", "name, level, district", "Wards, Works"],
            ["Ward", "number, body", "Officials, Works"],
            ["Official", "name, role, term, official contact", "Ward"],
            ["Work", "title, value, contractor, status, dates", "Ward, Documents"],
            ["Document", "source URL, type, published date", "Snapshots"],
            ["Snapshot", "hash, read at, archive copy", "Document"],
          ],
        },
      ],
    },
    {
      id: "acceptance",
      title: "Acceptance scenarios",
      blocks: [
        {
          type: "acceptance",
          rows: [
            { given: "a work record on a ward page", when: "a visitor opens it", then: "the official source link and the date it was read are shown" },
            { given: "a source site that is offline", when: "the record is requested", then: "the archived copy is served and marked \"source currently unreachable\"" },
            { given: "a ward with no published budget", when: "a visitor opens its budget tab", then: "the page says \"not published\" and offers an RTI request template" },
          ],
        },
      ],
    },
    {
      id: "scope",
      title: "MVP scope",
      blocks: [
        {
          type: "p",
          text: "One metropolitan city, three sections (People, Works, Sources), a read-only API, and an RTI helper. Out of scope for the MVP: complaints, user accounts, rating officials, and the other 752 local governments.",
        },
      ],
    },
  ],
};
