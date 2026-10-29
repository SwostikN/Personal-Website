import type { Project } from "@/lib/types";

export const vestiq: Project = {
  slug: "vestiq",
  title: "VESTIQ",
  seoTitle: "VESTIQ: privacy-first AI wardrobe app",
  summary:
    "A wardrobe app that digitises your clothes, picks outfits for the weather and the occasion, and tells you when not to buy.",
  description:
    "Case study: VESTIQ, an AI wardrobe app built with Expo, Python and Supabase. Contract-first API, row-level security on every table, no third-party AI on photos.",
  kind: "Side project",
  status: "In development",
  year: "2026",
  timeline: "Oct 2026 – present",
  role: "Designed and developed",
  stack: ["Expo (React Native)", "TypeScript", "Python", "FastAPI", "Supabase", "PostgreSQL", "pgvector", "OpenAPI"],
  links: { private: true },
  featured: false,
  order: 4,
  metrics: [
    { value: "120", label: "garment archetypes" },
    { value: "10", label: "architecture decision records" },
    { value: "0", label: "photos sent to third-party AI" },
  ],
  engineering: [
    { area: "APIs", detail: "Contract-first: one OpenAPI spec generates the TypeScript and Python types, and CI fails if they drift." },
    { area: "Testing", detail: "109 test files. GitHub Actions runs the Python tests (pytest), database security tests and contract checks on every push." },
    { area: "Security", detail: "Row-level security on every table, with tests proving users can't read each other's data." },
    { area: "Decisions", detail: "10 architecture decision records." },
  ],
  artefacts: [
    "Product and engineering plan",
    "OpenAPI contract",
    "10 architecture decision records",
    "Row-level security tests",
    "Architecture map",
  ],
  keywords: ["AI wardrobe app", "Expo React Native", "privacy by design", "Supabase row level security"],
  sections: [
    {
      id: "context",
      title: "Context",
      blocks: [
        {
          type: "p",
          text: "Most people wear a fraction of what they own and still feel they have nothing to wear. VESTIQ photographs your clothes, recognises each garment, and suggests outfits for your actual day (occasion and weather), learning from what you wear. Before you buy something it answers one question honestly: **will this work with what you already have?**",
        },
      ],
    },
    {
      id: "requirements",
      title: "Key requirements",
      blocks: [
        {
          type: "requirements",
          rows: [
            { id: "FR-01", kind: "Functional", text: "Capture a garment photo, cut it out on the phone, and tag type, colour and pattern." },
            { id: "FR-02", kind: "Functional", text: "Suggest today's outfits from the occasion and the forecast, including rain and out-of-season rules." },
            { id: "FR-03", kind: "Functional", text: "\"Should I buy this?\": score a candidate item against the existing wardrobe." },
            { id: "NFR-01", kind: "Non-functional", text: "Privacy: user photos are never sent to a third-party AI service; tagging runs on our own engine." },
            { id: "NFR-02", kind: "Non-functional", text: "Isolation: every table has row-level security and a test proving users can't read each other's data." },
            { id: "NFR-03", kind: "Non-functional", text: "Contracts first: API shapes are defined once in OpenAPI; CI fails if generated types drift." },
          ],
        },
      ],
    },
    {
      id: "architecture",
      title: "Architecture",
      blocks: [
        {
          type: "layers",
          title: "Responsibilities are split on purpose",
          layers: [
            { name: "Mobile app", items: ["Capture", "On-device segmentation", "Offline cache", "Feedback"] },
            { name: "Supabase", items: ["Auth", "Postgres + RLS", "Private storage", "Queues"] },
            { name: "Fashion engine", items: ["Outfit scoring", "Garment tagging", "Purchase evaluation", "Workers"] },
          ],
          side: { name: "External", items: ["Weather provider", "Store search links"] },
          caption: "The app never computes a recommendation; all business logic lives in the engine.",
        },
      ],
    },
    {
      id: "outcome",
      title: "Status",
      blocks: [
        {
          type: "p",
          text: "In personal use on Android with a standalone build; free hosting on Supabase and Render for use away from home. Store release depends on how it performs in daily use.",
        },
      ],
    },
  ],
};
