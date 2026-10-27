export const site = {
  name: "Swostik Nepal",
  shortName: "Swostik",
  monogram: "S",
  jobTitle: "System Analyst & SAP Business One Consultant",
  headline: "I build reliable systems for organisations.",
  subline: "ERP and payments · public-service platforms · data & AI",
  location: { city: "Kathmandu", country: "Nepal", countryCode: "NP" },
  /** Public address (Cloudflare Email Routing forwards it to Gmail). */
  email: "hello@swostikn.com.np",
  currently: "SAP Business One Consultant, Saurabh Group",
  /** Set NEXT_PUBLIC_SITE_URL in production; this is the fallback. */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://swostikn.com.np").replace(/\/$/, ""),
  description:
    "Swostik Nepal is a System Analyst and SAP Business One consultant in Kathmandu, Nepal, building ERP portals, connectIPS integrations and public platforms.",
  intro:
    "I turn how an organisation actually works into software it can rely on: from requirements and process models to deployment and support.",
  social: {
    github: "https://github.com/SwostikN",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/in/swostik-nepal-641392268/",
  },
  cvPdf: "/swostik-nepal-cv.pdf",
  /** Organisations the systems on this site are built for; each links to its proof. */
  builtFor: [
    { name: "Saurabh Group", href: "/work/sarbo360" },
    { name: "Sarbottam Steels", href: "/work/sarbo360" },
    { name: "Sarbottam Spinning", href: "/work/sarbo360" },
    { name: "Rotaract District 3292", href: "/work/rotaract-district-3292" },
    { name: "Cloud Bird India", href: "/work/client-websites" },
    { name: "Nritya Sanjiwani", href: "/work/client-websites" },
    { name: "Moodlines", href: "/work/client-websites#moodlines" },
  ],
  method: [
    { step: "Understand", text: "Interview users, walk the current process, find the real constraint." },
    { step: "Specify", text: "Write requirements and acceptance criteria before any code." },
    { step: "Model", text: "Process flows, data models and API contracts that teams can build from." },
    { step: "Build", text: "Develop the system: web, mobile, ERP and payment integrations." },
    { step: "Validate", text: "Test against the agreed criteria, with real data and real users." },
    { step: "Deploy", text: "Ship to production, train people, and support it after go-live." },
  ],
  keywords: [
    "Swostik Nepal",
    "System Analyst Nepal",
    "SAP Business One consultant Nepal",
    "SAP B1 Kathmandu",
    "ERP developer Nepal",
    "connectIPS integration",
    "Software developer Kathmandu",
  ],
} as const;

export type Site = typeof site;
