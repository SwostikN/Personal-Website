import type { Project } from "@/lib/types";

export const rotaract: Project = {
  slug: "rotaract-district-3292",
  title: "Rotaract District 3292 Platform",
  seoTitle: "Rotaract District 3292 platform: web, mobile & portal",
  summary:
    "Public website and member platform for 6,000+ Rotaractors in 198 clubs across Nepal and Bhutan.",
  description:
    "Case study: the Rotaract District 3292 platform, a public site and role-based portal for 6,000+ members in 198 clubs across Nepal and Bhutan.",
  kind: "Platform",
  status: "Live",
  year: "2026",
  timeline: "2026",
  role: "Developed and deployed",
  organisation: "Rotaract District 3292 (Nepal & Bhutan)",
  stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Mobile app", "Node.js API", "Docker", "nginx"],
  links: { live: "https://rotaract3292.org.np" },
  featured: true,
  order: 2,
  metrics: [
    { value: "6,000+", label: "members" },
    { value: "198", label: "clubs in 20 zones" },
    { value: "2", label: "countries" },
  ],
  engineering: [
    { area: "APIs", detail: "Node.js API with a typed contract shared with the React frontend, so either side can change without breaking the other." },
    { area: "Access control", detail: "Roles for members, club officers and district admins; club officers only ever see their own club." },
    { area: "Delivery", detail: "Public site, member portal and API deployed with Docker and nginx; mobile app with push notifications." },
  ],
  artefacts: [
    "Project plan and requirements",
    "Role and permission model",
    "Typed API contract",
    "Data migration of clubs and members",
    "Deployment (Docker, nginx)",
  ],
  keywords: ["Rotaract District 3292", "Rotaract Nepal portal", "membership management system Nepal"],
  sections: [
    {
      id: "context",
      title: "Context",
      blocks: [
        {
          type: "p",
          text: "Rotaract District 3292 covers Nepal and Bhutan: 198 clubs, 20 zones and more than 6,000 members aged 18–30. The district needed one public face for anyone curious about Rotaract, and one place to run itself: clubs, members, events, officers and finance.",
        },
      ],
    },
    {
      id: "stakeholders",
      title: "Stakeholders and needs",
      blocks: [
        {
          type: "table",
          caption: "Who uses the platform, and what they can do",
          columns: ["Role", "Needs", "Access"],
          rows: [
            ["Public visitor", "Find a club, see projects and events, register interest", "Public site"],
            ["Member", "Directory, events, own bills", "Member portal"],
            ["Club officer", "Manage their own club's board, members and events", "Own club only"],
            ["District admin", "Run the whole district: clubs, officers, finance, meetings", "Everything"],
          ],
        },
      ],
    },
    {
      id: "requirements",
      title: "Requirements",
      blocks: [
        {
          type: "requirements",
          rows: [
            { id: "FR-01", kind: "Functional", text: "Searchable club directory by name, place and zone, with each club's board." },
            { id: "FR-02", kind: "Functional", text: "Projects and events filterable by cause, with upcoming events and interest registration." },
            { id: "FR-03", kind: "Functional", text: "District team listing for the current Rotary year." },
            { id: "FR-04", kind: "Functional", text: "Role-based portal for members, club officers and district admins, including finance and meetings." },
            { id: "FR-05", kind: "Functional", text: "Mobile app with push notifications." },
            { id: "NFR-01", kind: "Non-functional", text: "Each role sees only what it should: club officers are limited to their own club." },
            { id: "NFR-02", kind: "Non-functional", text: "A typed contract between frontend and API, so either side can change without breaking the other." },
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
          title: "One codebase, three apps",
          layers: [
            { name: "Clients", items: ["Public website", "Member portal", "Mobile app"] },
            { name: "Shared", items: ["Typed contract", "Types & validation"] },
            { name: "Server", items: ["API", "Database", "Push notifications"] },
          ],
          side: { name: "Hosting", items: ["Docker", "nginx", "rotaract3292.org.np"] },
        },
      ],
    },
    {
      id: "build",
      title: "What I built",
      blocks: [
        {
          type: "list",
          items: [
            "The public website: hero, district statistics, projects and events with cause filters, upcoming events, district team, and a club finder across all 20 zones.",
            "The member portal with three roles and their permissions, written first against a typed contract so the real API slotted in without a rewrite.",
            "Migration of the district's club and member records into the new system.",
            "Production deployment with Docker and nginx on the district's own domain.",
          ],
        },
      ],
    },
    {
      id: "outcome",
      title: "Outcome",
      blocks: [
        {
          type: "stats",
          items: [
            { value: "6,000+", label: "Rotaractors served" },
            { value: "198", label: "clubs listed with their boards" },
            { value: "Nepal & Bhutan", label: "one district, one platform" },
          ],
        },
      ],
    },
  ],
};
