import type { Education, Experience, MediaItem, Publication, Talk } from "@/lib/types";

export const experience: Experience[] = [
  {
    organisation: "Saurabh Group",
    place: "Tinkune, Kathmandu",
    logo: "/logos/saurabh-group.png",
    url: "https://saurabhgroup.com",
    more: { href: "/work/sarbo360", label: "Read the Sarbo360 case study" },
    role: "Technical Consultant, SAP Business One",
    start: "2025-09",
    summary:
      "Developer of Sarbo360, the group's in-house ERP portal, and SAP Business One consultant for a manufacturing group.",
    highlights: [
      "Developed and deployed **Sarbo360**, an ERP portal on SAP Business One used by about 200 staff at Sarbottam Steels and Sarbottam Spinning: React and TypeScript web app, mobile app, and a Node.js API with a posting engine over the SAP Service Layer.",
      "Built the **connectIPS** bill-payment integration, and made SAP posting idempotent per company so a retried request never creates a duplicate document.",
      "Investigate and fix production defects, e.g. payment totals that covered only the first page of results, exports that counted cancelled documents, and purchase-order edits that matched lines by position instead of SAP's line numbers.",
      "Built 50+ SQL queries, stored procedures and print layouts in SAP HANA for sales, purchasing, inventory, finance and production reporting.",
      "Built and deployed custom add-ons with C#/.NET and the SAP Service Layer; automated controls with Formatted Searches, user-defined objects, transaction notifications and approval procedures.",
      "Support 100+ SAP users (posting errors, authorisations, training and guides); manage company databases, backups and upgrades, and bulk-load master data with the Data Transfer Workbench.",
    ],
  },
  {
    organisation: "Nepal Rastra Bank",
    place: "Baluwatar, Kathmandu",
    role: "Economic Research Intern, Research Department",
    start: "2025-05",
    end: "2025-07",
    summary: "Research internship at Nepal's central bank, contributing to a published working paper.",
    highlights: [
      "Built Python and Selenium data-collection pipelines to assemble search-volume series for Nepal's Economic Policy Uncertainty (EPU) index.",
      "Developed R routines for statistical modelling and visualisation, contributing to **NRB Working Paper No. 65**.",
    ],
    url: "https://www.nrb.org.np",
    logo: "/logos/nepal-rastra-bank.png",
    more: { href: "/research", label: "Read the research" },
  },
  {
    organisation: "Cubit Incorporated",
    place: "Anamnagar, Kathmandu",
    logo: "/logos/cubit.svg",
    url: "https://cubit.com.np",
    more: { href: "/work/documed-ai", label: "See where this led: DocuMed AI" },
    role: "Artificial Intelligence Intern",
    start: "2024-06",
    end: "2024-12",
    summary: "Applied AI internship.",
    highlights: [
      "Built a document question-answering and summarisation tool (React frontend, Python backend) using retrieval-augmented generation.",
      "Implemented Monte Carlo pricing simulations; built and evaluated regression models with held-out test sets.",
    ],
  },
];

export const education: Education[] = [
  {
    institution: "The British College, Kathmandu",
    qualification: "BSc (Hons) Computing, First Class Honours",
    detail:
      "Validated by Leeds Beckett University, UK. Dissertation: MediRAG, a guardrailed clinical retrieval-augmented generation system.",
    start: "2023-01",
    end: "2026-09",
  },
  {
    institution: "University of the West of England, Bristol",
    qualification: "Certificate of Credit, Level 0 (Foundation Year)",
    start: "2022-09",
    end: "2023-08",
  },
  {
    institution: "Kathmandu Model College, Bagbazar",
    qualification: "Higher Secondary Education (Science)",
    start: "2020-08",
    end: "2022-06",
  },
];

export const publications: Publication[] = [
  {
    slug: "nrb-working-paper-65",
    title: "Macroeconomic Effects of Economic Policy Uncertainty: Evidence from Nepal",
    authors: ["Budha, B. B.", "Byanjankar, R.", "Nepal, S."],
    series: "NRB Working Paper No. 65",
    publisher: "Economic Research Department, Nepal Rastra Bank",
    date: "2026-07",
    contribution:
      "Designed the keyword set, normalised search-volume series against a benchmark, applied Hodrick–Prescott decomposition to the aggregate index, and contributed to the study's framing (Sections 1–2).",
    abstract:
      "The paper builds an Economic Policy Uncertainty index for Nepal from search-volume data and examines how policy uncertainty affects the wider economy.",
    url: "https://www.nrb.org.np/contents/uploads/2026/07/nrb-wp-65-2026-07-1.pdf",
    pdf: "/research/nrb-wp-65-macroeconomic-effects-of-economic-policy-uncertainty-nepal.pdf",
    cover: "/research/nrb-wp-65-cover.jpg",
    reader: { href: "/research/paper", dir: "/research/wp65-pages", pages: 18, width: 1400, height: 1995 },
    findings: [
      { value: "−2%", label: "GDP at peak, in the 3rd quarter after a one-standard-deviation rise in uncertainty" },
      { value: "−15%", label: "real imports at peak impact" },
      { value: "−5%", label: "real private-sector credit at peak impact" },
      { value: "−10%", label: "NEPSE index at peak (−5% on impact)" },
    ],
    sameAs: ["https://ideas.repec.org/p/nrb/wpaper/nrbwp202665.html"],
    coverage: [
      {
        outlet: "Republica",
        title: "Economic and policy uncertainty hits Nepal's macroeconomic progress hard: NRB",
        url: "https://myrepublica.nagariknetwork.com/news/economic-and-policy-uncertainty-hit-hard-nepals-macroeconomic-progress-nrb-67-87.html",
        date: "2026-08-01",
      },
      {
        outlet: "Onlinekhabar",
        title: "विशेष घटनाको प्रभाव सेयर बजारमा पहिले : अध्ययन",
        translation: "Special events hit the share market first: study",
        lang: "ne",
        url: "https://www.onlinekhabar.com/2026/08/1987662/impact-of-special-events-on-stock-market-first-study",
        date: "2026-08-02",
      },
      {
        outlet: "Kantipur",
        title: "नीतिगत अनिश्चितताले अर्थतन्त्रमा नकारात्मक असर, नेप्से र आयात व्यापार बढी प्रभावित",
        translation: "Policy uncertainty hurts the economy; NEPSE and imports hit hardest",
        lang: "ne",
        url: "https://ekantipur.com/business/2026/08/04/policy-uncertainty-negatively-impacts-the-economy-nepse-and-import-trade-are-most-affected-26-27.html",
        date: "2026-08-04",
      },
      {
        outlet: "The Kathmandu Post",
        title: "Policy uncertainty hits economy as stock market and imports suffer most",
        url: "https://kathmandupost.com/money/2026/08/02/policy-uncertainty-hit-economy-as-stocks-and-imports-suffer-most",
        date: "2026-08-02",
      },
    ],
  },
];

export const talks: Talk[] = [
  {
    slug: "caice-2026",
    title: "Macroeconomic Effects of Economic Policy Uncertainty: Evidence from Nepal",
    event: "CAICE 2026",
    eventFull: "Conference on Applied and Innovative Economics (CEDECON's Annual International Conference in Economics)",
    host: "Central Department of Economics, Tribhuvan University",
    hostUrl: "https://cdec.tu.edu.np",
    theme: "Economic Stability, Resilience, and Sustainable Development",
    startDate: "2026-10-02",
    endDate: "2026-10-03",
    venue: "Marriott Kathmandu",
    city: "Kathmandu",
    summary:
      "Shared the findings of our Nepal Rastra Bank working paper with researchers, policymakers and practitioners, followed by questions and discussion from the floor.",
    video: {
      src: "/media/caice-2026-talk.mp4",
      poster: "/media/caice-2026-talk-poster.jpg",
      caption: "Presenting the results and robustness checks at CAICE 2026 (33-second excerpt).",
    },
    photos: [
      { src: "/images/caice-2026-stage.jpg", alt: "Swostik Nepal presenting the Economic Policy Uncertainty index for Nepal on stage at CAICE 2026, with the slide on the main screen", width: 2048, height: 1365 },
      { src: "/images/caice-2026-podium.jpg", alt: "Swostik Nepal speaking at the podium at CAICE 2026 in Kathmandu", width: 2048, height: 1365 },
      { src: "/images/caice-2026-group.jpg", alt: "Presenters and session chairs at CAICE 2026, Tribhuvan University's Central Department of Economics conference", width: 2048, height: 1365 },
      { src: "/images/caice-2026-handshake.jpg", alt: "Swostik Nepal being thanked on stage after his presentation at CAICE 2026", width: 2048, height: 1365 },
    ],
  },
];

export const media: MediaItem[] = [
  {
    title: "Binayak Kuikel on our research paper",
    by: "Binayak Kuikel",
    platform: "Instagram",
    url: "https://www.instagram.com/p/Dbo726FzUtY/",
    embed: "https://www.instagram.com/p/Dbo726FzUtY/embed",
    summary: "A short video discussing our NRB working paper on economic policy uncertainty in Nepal.",
  },
];

export const portrait = {
  src: "/images/swostik-nepal.jpg",
  alt: "Portrait of Swostik Nepal",
  width: 800,
  height: 800,
};

export const leadership = [
  {
    organisation: "Rotaract Club of Patan Heritage, District 3292",
    roles: [
      { title: "Treasurer", period: "2026–2027" },
      { title: "International Service Director", period: "2025–2026" },
    ],
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Development",
    items: ["TypeScript", "React & Next.js", "Node.js", "C# / .NET", "Python & FastAPI", "React Native (Expo)", "SQL", "R"],
  },
  {
    group: "APIs & integration",
    items: ["REST APIs", "OpenAPI (contract-first)", "SAP Service Layer", "connectIPS", "Supabase", "Resend (email)"],
  },
  {
    group: "Testing & delivery",
    items: ["Unit & integration tests", "Vitest", "pytest", "GitHub Actions CI", "Git & pull requests", "Docker", "nginx", "Vercel"],
  },
  {
    group: "ERP & data",
    items: ["SAP Business One", "SAP HANA", "Stored procedures", "Print layouts", "Data Transfer Workbench", "PostgreSQL"],
  },
  {
    group: "Design & docs",
    items: ["Requirements & acceptance criteria", "Data modelling (ERD)", "Technical documentation", "User guides"],
  },
];

export const languages = [
  { name: "Nepali", level: "Native" },
  { name: "English", level: "Professional" },
];

export const bio = [
  "I'm Swostik Nepal, a software developer and SAP Business One consultant based in Kathmandu.",
  "At Saurabh Group I look after SAP Business One for 100+ users and developed Sarbo360, the ERP portal about 200 staff at Sarbottam Steels and Sarbottam Spinning use every day: purchasing, finance, inventory and connectIPS bill payments, built on top of SAP. I also developed and deployed the Rotaract District 3292 platform, which serves more than 6,000 members across Nepal and Bhutan.",
  "Before that I worked in the Research Department of Nepal Rastra Bank, where I built the data pipelines behind an Economic Policy Uncertainty index for Nepal and co-authored NRB Working Paper No. 65, which I presented at CAICE 2026, Tribhuvan University's international conference in economics. My dissertation, MediRAG, is a medical question-answering system with a safety layer I could measure: every emergency in the test set caught, and every unsafe request refused.",
  "The thread through all of it: understand how people actually work, build what they need with tests that prove it works, and stay with it after go-live."
];

export const now = {
  updated: "2026-10-26",
  items: [
    "Running SAP Business One and Sarbo360 at Saurabh Group, and extending Sarbo360 to more of the group's companies.",
    "Building VESTIQ, a personal wardrobe app (Expo, Python, Supabase), in the evenings.",
    "Studying how Nepal's public bodies publish works, budgets and officials, for a civic-data project.",
    "Serving as Treasurer of the Rotaract Club of Patan Heritage.",
  ],
};
