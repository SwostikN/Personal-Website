import type { Project } from "@/lib/types";

export const clientWebsites: Project = {
  slug: "client-websites",
  title: "Client websites",
  seoTitle: "Client websites: Nritya Sanjiwani, Cloud Bird India & Moodlines",
  summary:
    "Three client sites with admin portals, working forms and email delivery: two rebuilt in Next.js, one given a full CMS.",
  description:
    "Client work: nrityasanjiwani.com, cloudbirdindia.com and the Moodlines design portfolio, with admin portals, role-based access, validated forms and email delivery.",
  kind: "Client website",
  status: "Live",
  year: "2026",
  timeline: "Aug – Oct 2026",
  role: "Developed and deployed",
  stack: ["Next.js", "React", "Vite", "TypeScript", "Supabase", "PostgreSQL", "Resend", "Vitest"],
  links: {},
  featured: false,
  order: 6,
  metrics: [
    { value: "3", label: "client sites live" },
    { value: "10", label: "pages ported with identical output" },
    { value: "2", label: "admin roles" },
  ],
  engineering: [
    { area: "Testing", detail: "Cloud Bird India: Vitest suites for the contact flow and the content." },
    { area: "Integration", detail: "Email through Resend, with a pre-filled draft as fallback so no message is lost; Moodlines alerts sent by a database trigger." },
    { area: "Access control", detail: "Admin and editor roles enforced by row-level security in PostgreSQL, not just hidden buttons." },
    { area: "Delivery", detail: "Each site deployed on Vercel, with setup and handover guides for the client." },
  ],
  artefacts: ["Requirements from the client's PRD", "Content model", "Setup and handover guides", "Database access rules"],
  keywords: ["Next.js developer Nepal", "website developer Kathmandu", "Nritya Sanjiwani", "Cloud Bird India", "Moodlines", "CMS developer Nepal"],
  sections: [
    {
      id: "nritya",
      title: "Nritya Sanjiwani: nrityasanjiwani.com",
      link: { label: "Visit nrityasanjiwani.com", href: "https://www.nrityasanjiwani.com" },
      blocks: [
        {
          type: "p",
          text: "A single-file website moved to Next.js with real routes, so every page has its own title and description for search engines. I verified the port by diffing every page's rendered output against the original.",
        },
        {
          type: "list",
          items: [
            "Three forms (partnership, applications, newsletter) validated on the server, with honeypot spam protection and only the agreed fields stored.",
            "An admin portal with sign-in, two roles, content editing, image uploads that **require alt text**, and a submissions inbox with CSV export.",
            "Content falls back gracefully, so the site renders correctly before, during and after the database migration.",
          ],
        },
      ],
    },
    {
      id: "cloudbird",
      title: "Cloud Bird India: cloudbirdindia.com",
      link: { label: "Visit cloudbirdindia.com", href: "https://www.cloudbirdindia.com" },
      blocks: [
        {
          type: "p",
          text: "A multilingual marketing site rebuilt in Next.js with the original layout, copy and translations intact.",
        },
        {
          type: "list",
          items: [
            "Contact form delivered to the company inbox through Resend, with the visitor as reply-to.",
            "If email delivery fails, the form offers a pre-filled email draft, so a visitor never loses what they typed.",
            "Typed, linted and unit-tested (Vitest).",
          ],
        },
      ],
    },
    {
      id: "moodlines",
      title: "Moodlines: a design studio portfolio",
      link: { label: "Visit Moodlines", href: "https://bob-design-canvas.vercel.app" },
      blocks: [
        {
          type: "p",
          text: "A graphic design, UI/UX, sketch art and videography portfolio. The design was already in place; I made every part of it editable by the owner and put it live on Vercel.",
        },
        {
          type: "list",
          items: [
            "A CMS at /admin: case studies with drafts, reordering and a live preview, every page section editable or switched off, and an image library.",
            "Two roles (administrator and editor) enforced by row-level security in PostgreSQL, so the database itself refuses what a role may not do.",
            "The contact form, which showed a success message without sending anything, now saves to an enquiries inbox with statuses, notes and CSV export.",
            "A database trigger emails each new enquiry through Resend. A failed alert never loses the enquiry, and the email key stays in Supabase Vault, not in the code.",
            "The site renders from built-in content if the database is empty or unreachable, so it is never blank.",
          ],
        },
      ],
    },
  ],
};

export const greToolkit: Project = {
  slug: "gre-toolkit",
  title: "GRE Toolkit",
  seoTitle: "GRE Toolkit: offline GRE Quant & writing practice apps",
  summary: "Two offline study apps: 328 GRE Quant questions with spaced repetition, and an essay-practice tool.",
  description:
    "GRE Quant Mastery and Issue Pool: offline study apps with 328 questions, spaced repetition, a 960-word vocabulary trainer and timed essays.",
  kind: "Side project",
  status: "Live",
  year: "2026",
  timeline: "Jun – Aug 2026",
  role: "Designed and developed",
  stack: ["JavaScript", "HTML", "CSS", "Python"],
  links: { live: "https://gre-prep-seven.vercel.app", code: "https://github.com/SwostikN/GRE_Prep" },
  featured: false,
  order: 7,
  metrics: [
    { value: "328", label: "practice questions" },
    { value: "960", label: "vocabulary words" },
    { value: "0", label: "dependencies" },
  ],
  artefacts: ["Question bank with a validating build script", "8-week study plan"],
  keywords: ["GRE practice app", "spaced repetition"],
  sections: [
    {
      id: "overview",
      title: "Overview",
      blocks: [
        {
          type: "list",
          items: [
            "**GRE Quant Mastery**: 12 modules, 328 questions in all four GRE formats with worked solutions, timed tests, spaced repetition and a weak-topic dashboard. Runs offline.",
            "**Issue Pool**: draws from the official essay prompt pool, times the essay under exam conditions, then shows a debrief of what a top answer would cover. [Open it](https://awa-black-three.vercel.app).",
            "A Python build step validates every question and checks that self-tests never repeat practice items.",
          ],
        },
      ],
    },
  ],
};
