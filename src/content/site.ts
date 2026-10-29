export const site = {
  name: "Swostik Nepal",
  shortName: "Swostik",
  monogram: "S",
  jobTitle: "Software Developer & SAP Business One Consultant",
  headline: "I build reliable systems for organisations.",
  subline: "ERP and payments · APIs and integrations · public-service platforms",
  location: { city: "Kathmandu", country: "Nepal", countryCode: "NP" },
  /** Public address (Cloudflare Email Routing forwards it to Gmail). */
  email: "hello@swostikn.com.np",
  currently: "SAP Business One Consultant, Saurabh Group",
  /** Set NEXT_PUBLIC_SITE_URL in production; this is the fallback. */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://swostikn.com.np").replace(/\/$/, ""),
  description:
    "Swostik Nepal is a software developer and SAP Business One consultant in Kathmandu, Nepal, building ERP portals, APIs, connectIPS integrations and public platforms.",
  intro:
    "I build and maintain the software organisations run on: features and APIs, the integrations between systems, and the tests that keep them working.",
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
    { step: "Build", text: "Implement features and APIs from the agreed requirements, with validation and clear error handling." },
    { step: "Test", text: "Unit and integration tests written with the code and run automatically on every push." },
    { step: "Review", text: "Read every change before it ships, mine included; fix QA and security findings first." },
    { step: "Deploy", text: "Release, verify it in production, and keep the technical documentation current." },
    { step: "Fix", text: "Investigate defects from real users and fix the cause without breaking what already works." },
    { step: "Understand", text: "Start from how people actually work, so what gets built is what they need." },
  ],
  keywords: [
    "Swostik Nepal",
    "Software developer Nepal",
    "Full-stack developer Kathmandu",
    "API and integration developer Nepal",
    "SAP Business One consultant Nepal",
    "SAP B1 Kathmandu",
    "ERP developer Nepal",
    "connectIPS integration",
    "Software developer Kathmandu",
  ],
} as const;

export type Site = typeof site;
