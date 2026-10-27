import type { Project } from "@/lib/types";

export const clientWebsites: Project = {
  slug: "client-websites",
  title: "Client websites",
  seoTitle: "Client websites: Nritya Sanjiwani & Cloud Bird India",
  summary:
    "Two client sites rebuilt in Next.js, with an admin portal, working forms and email delivery.",
  description:
    "Client work: nrityasanjiwani.com and cloudbirdindia.com, rebuilt in Next.js with an admin portal, role-based access, validated forms and email delivery.",
  kind: "Client website",
  status: "Live",
  year: "2026",
  timeline: "Aug – Sep 2026",
  role: "Developed and deployed",
  stack: ["Next.js", "TypeScript", "Supabase", "Resend", "Vitest"],
  links: { live: "https://www.nrityasanjiwani.com" },
  featured: false,
  order: 6,
  metrics: [
    { value: "2", label: "client sites live" },
    { value: "10", label: "pages ported with identical output" },
    { value: "2", label: "admin roles" },
  ],
  artefacts: ["Requirements from the client's PRD", "Content model", "Setup and handover guides"],
  keywords: ["Next.js developer Nepal", "website developer Kathmandu", "Nritya Sanjiwani", "Cloud Bird India"],
  sections: [
    {
      id: "nritya",
      title: "Nritya Sanjiwani: nrityasanjiwani.com",
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
