import type { Project } from "@/lib/types";

export const sarbo360: Project = {
  slug: "sarbo360",
  title: "Sarbo360",
  seoTitle: "Sarbo360: SAP Business One ERP portal & connectIPS",
  summary:
    "An ERP portal on top of SAP Business One, with connectIPS bill payments, used daily by about 200 staff.",
  description:
    "Case study: Sarbo360, an ERP portal on SAP Business One with connectIPS bill payments, used by ~200 staff at Sarbottam Steels and Sarbottam Spinning.",
  kind: "Enterprise",
  status: "In production",
  year: "2026",
  timeline: "2026 – present",
  role: "Developed and deployed",
  organisation: "Saurabh Group · Sarbottam Steels & Sarbottam Spinning",
  stack: ["TypeScript", "React", "Node.js", "SAP Business One", "SAP HANA", "Service Layer", "connectIPS", "Mobile app"],
  links: { private: true },
  featured: true,
  order: 1,
  metrics: [
    { value: "~200", label: "staff using it daily" },
    { value: "2", label: "group companies" },
    { value: "4", label: "SAP documents posted in one step" },
  ],
  engineering: [
    { area: "APIs", detail: "Node.js API with a posting engine over the SAP Service Layer (REST): one form posts four linked SAP documents." },
    { area: "Integration", detail: "connectIPS bill payments. SAP posting keys are scoped per company, so a retried request never posts twice." },
    { area: "Data", detail: "SAP HANA queries and stored procedures, with multi-company tenancy across the group." },
    { area: "Defect fixes", detail: "Report totals and exports corrected to match SAP's own figures; PO edits now match SAP's line numbers." },
    { area: "Delivery", detail: "Web portal and mobile app in production, used by about 200 staff every day." },
  ],
  artefacts: [
    "Requirements and screen inventory",
    "Process flows (purchase-to-pay, payments)",
    "User-permission matrix",
    "Integration design (SAP Service Layer, connectIPS)",
    "Pre-deployment checklist",
    "User guides",
  ],
  keywords: [
    "SAP Business One portal",
    "SAP B1 integration Nepal",
    "connectIPS integration",
    "ERP portal Nepal",
    "Sarbo360",
  ],
  sections: [
    {
      id: "context",
      title: "Context",
      blocks: [
        {
          type: "p",
          text: "Saurabh Group runs its companies, including **Sarbottam Steels** and **Sarbottam Spinning**, on SAP Business One. Purchasing, stores and finance staff needed one place to raise, approve, track and report on their daily work, on the web and on their phones, with every document still landing correctly in SAP.",
        },
        {
          type: "callout",
          tone: "private",
          text: "Sarbo360 is a private, in-house system. Screens on this page are redrawn with sample data; no company records are shown.",
        },
      ],
    },
    {
      id: "requirements",
      title: "Requirements",
      blocks: [
        {
          type: "p",
          text: "A selection of what the system had to do, written the way it was agreed with users:",
        },
        {
          type: "requirements",
          rows: [
            { id: "FR-01", kind: "Functional", text: "Trace every purchase requisition through purchase order and goods receipt, and export the trail to Excel with the requester's remarks." },
            { id: "FR-02", kind: "Functional", text: "Post a vendor transaction to **four linked SAP documents in one step**, with a vendor reference carried onto each." },
            { id: "FR-03", kind: "Functional", text: "Manage loans with per-row exchange rates; **lock the loan header once its journal entry is posted**." },
            { id: "FR-04", kind: "Functional", text: "Issue stock from the bins that actually hold it, not from a default bin." },
            { id: "FR-05", kind: "Functional", text: "Pay bills through **connectIPS** from inside Sarbo360." },
            { id: "FR-06", kind: "Functional", text: "Report raw-material lead time from PO date to production date." },
            { id: "NFR-01", kind: "Non-functional", text: "One gateway to SAP: every read and write goes through a single, configured integration layer." },
            { id: "NFR-02", kind: "Non-functional", text: "Idempotent posting: a retried request never creates a duplicate SAP document, scoped per company." },
            { id: "NFR-03", kind: "Non-functional", text: "Audit: record who signed in and when." },
            { id: "NFR-04", kind: "Non-functional", text: "Reports total on SAP's own basis (cancelled documents excluded, whole periods, not just the first page)." },
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
          title: "Purchase-to-pay in Sarbo360",
          steps: [
            { label: "Purchase request", detail: "Raised by a department; stays editable" },
            { label: "Purchase order", detail: "Approved, sent to vendor" },
            { label: "Goods receipt", detail: "Received into the right bins" },
            { label: "A/P invoice", detail: "Matched to receipt" },
            { label: "Payment", detail: "Settled via connectIPS" },
          ],
          caption: "Each step posts the matching SAP Business One document through the Service Layer.",
        },
      ],
    },
    {
      id: "integration",
      title: "Integration design",
      blocks: [
        {
          type: "layers",
          title: "How Sarbo360 connects",
          layers: [
            { name: "People", items: ["Purchasing", "Stores", "Finance", "Management"] },
            { name: "Sarbo360", items: ["Web portal", "Mobile app", "API & posting engine", "Audit log"] },
            { name: "SAP Business One", items: ["Service Layer (REST)", "SAP HANA database"] },
          ],
          side: { name: "Payments", items: ["connectIPS", "Bank"] },
          caption: "Simplified. One integration layer talks to SAP; payments go out through connectIPS.",
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
            "**Posting Wizard**: one form that creates four linked SAP documents, with credit-memo reasons and vendor references.",
            "**Requisition-to-receipt tracing**: a report that follows each request to its goods receipt, opened by default for buyers.",
            "**Loan management**: per-row exchange rates, bank names instead of codes, and a header that locks once posted.",
            "**Inventory**: stock issued from the bins that hold it; material requisitions close automatically when fulfilled.",
            "**connectIPS bill payments** inside the portal.",
            "**Multi-company tenancy** so the portal can serve more of the group's companies, with SAP posting keys scoped per company.",
            "**Audit log, recurring tasks with reminders, print layouts** with whole amounts and the currency once in the column head.",
          ],
        },
      ],
    },
    {
      id: "validation",
      title: "Validation and deployment",
      blocks: [
        {
          type: "p",
          text: "Changes were checked against the agreed behaviour on SAP itself, not just in the portal: a report total had to match SAP's own figure, and a posted document had to appear in SAP with the right links. A pre-deployment checklist gated each release, and fixes came straight from users. One example: editing a purchase order once matched rows by their **position** instead of SAP's `LineNum`, which could update the wrong line, so I changed it to match on `LineNum`.",
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
            { value: "~200", label: "staff in daily use" },
            { value: "2", label: "companies: Sarbottam Steels and Sarbottam Spinning" },
            { value: "1", label: "integration layer to SAP" },
          ],
        },
      ],
    },
  ],
};
