import type { Project } from "@/lib/types";

export const documed: Project = {
  slug: "documed-ai",
  title: "DocuMed AI",
  seoTitle: "DocuMed AI: safety-first medical question answering",
  summary:
    "A medical assistant that cites its sources, flags emergencies before the AI runs, and refuses unsafe requests.",
  description:
    "Case study: DocuMed AI (MediRAG), a guardrailed medical RAG system. 69/69 emergencies caught, 40/40 unsafe requests refused, 454-case acceptance suite.",
  kind: "Applied AI",
  status: "Ongoing",
  year: "2025–2026",
  timeline: "2025 – 2026 · Dissertation",
  role: "Designed, developed and evaluated",
  stack: ["Python", "FastAPI", "React", "Supabase", "pgvector", "BM25 + MedCPT", "Cohere Rerank", "Llama 3.3 70B", "GitHub Actions"],
  links: { code: "https://github.com/SwostikN/MediRAG" },
  featured: true,
  order: 3,
  metrics: [
    { value: "69/69", label: "emergencies caught, 0 false alarms" },
    { value: "40/40", label: "unsafe requests refused (baseline 33/40)" },
    { value: "454", label: "labelled acceptance cases" },
  ],
  artefacts: [
    "Acceptance suite (454 cases, 10 task families)",
    "Safety rule set with clinical sources",
    "Data model (17 versioned migrations)",
    "Evaluation reports per release",
    "Engineering log",
  ],
  keywords: ["medical RAG", "LLM guardrails", "healthcare AI Nepal", "MediRAG", "retrieval-augmented generation"],
  sections: [
    {
      id: "context",
      title: "Context",
      blocks: [
        {
          type: "p",
          text: "People search for health answers online and get confident, unsourced text. In a medical setting a wrong answer can be dangerous, and missing an emergency is worse. DocuMed answers health questions only from trusted sources (WHO, NHS, Nepal's health authorities), cites them, and is built to say **\"I don't know\"** or **\"go to a hospital now\"** when that is the right answer.",
        },
      ],
    },
    {
      id: "requirements",
      title: "Requirements and acceptance criteria first",
      blocks: [
        {
          type: "p",
          text: "Before tuning anything, I wrote down how the system would be judged, as labelled test cases that run automatically on every change:",
        },
        {
          type: "acceptance",
          rows: [
            { given: "a message describing stroke symptoms", when: "it is submitted", then: "an emergency banner with the ambulance number appears before any AI-generated text" },
            { given: "a request for unsafe dosing advice", when: "it is submitted", then: "the system refuses and points to a professional" },
            { given: "a question the sources don't cover", when: "retrieval finds nothing relevant", then: "the system says so instead of guessing" },
            { given: "a generated sentence citing source [2]", when: "the answer streams", then: "the sentence is shown only if source [2] supports it" },
          ],
        },
      ],
    },
    {
      id: "architecture",
      title: "Safety cascade",
      blocks: [
        {
          type: "flow",
          title: "Four layers, in order",
          steps: [
            { label: "Emergency rules", detail: "45 deterministic rules, before the AI" },
            { label: "Retrieval gate", detail: "Refuse when sources don't cover it" },
            { label: "Generate", detail: "Llama 3.3 70B with cited sources" },
            { label: "Verify", detail: "Each sentence checked against its citation" },
            { label: "Policy filter", detail: "Final check before display" },
          ],
          caption: "The language model is never in the emergency path.",
        },
        {
          type: "list",
          items: [
            "Hybrid retrieval: BM25 keyword search plus MedCPT medical embeddings, fused and re-ranked, with source, recency and country filters.",
            "Sentence-level verification while streaming, so text that would later be retracted is never shown.",
            "English and Nepali interface; lab-report explainer with OCR.",
          ],
        },
      ],
    },
    {
      id: "results",
      title: "Results",
      blocks: [
        {
          type: "stats",
          items: [
            { value: "69/69", label: "emergency cases caught, zero false alarms" },
            { value: "33 → 40", label: "of 40 adversarial requests refused, vs an unguarded model" },
            { value: "37.5% → 75%", label: "emergency-tier accuracy after targeted overrides" },
          ],
        },
        {
          type: "callout",
          tone: "note",
          text: "Honest limits: the broader hallucination measurements need a larger, independently judged test set before they can be claimed. That work is in progress.",
        },
      ],
    },
  ],
};
