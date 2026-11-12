import type { Project } from "@/lib/types";

export const documed: Project = {
  slug: "documed-ai",
  title: "DocuMed AI",
  seoTitle: "DocuMed AI: safety-first medical question answering",
  summary:
    "A Nepali consumer-health chatbot that cites its sources (dissertation title: MediRAG). Auditing it led to my first research paper.",
  description:
    "Case study: DocuMed AI (dissertation title: MediRAG), a medical RAG chatbot, and the audit of its retrieval gate that became the preprint Refusal Is Not Safety.",
  kind: "Applied AI",
  status: "Dissertation (2026); continued as research",
  year: "2025–2026",
  timeline: "Dissertation 2025 – 2026; continued as research",
  role: "Designed, developed and evaluated",
  stack: ["Python", "FastAPI", "React", "Supabase", "pgvector", "BM25 + MedCPT", "Cohere Rerank", "Llama 3.3 70B", "GitHub Actions"],
  links: { code: "https://github.com/SwostikN/MediRAG" },
  featured: true,
  order: 3,
  metrics: [
    { value: "44 → 91", label: "of the same 92 messages refused by its gate: English vs Romanized Nepali" },
    { value: "6", label: "gate designs then audited across four Nepali language forms" },
    { value: "0", label: "refusal-only emergency replies once triage runs before the gate" },
  ],
  engineering: [
    { area: "Testing", detail: "454 labelled English cases and 10 pytest modules for the guardrails, run by GitHub Actions on every change." },
    { area: "APIs", detail: "Python FastAPI service behind a React front end." },
    { area: "Data", detail: "Supabase PostgreSQL with pgvector and 17 versioned migrations." },
    { area: "Safety", detail: "45 deterministic emergency rules run before the model; every sentence is checked against its citation." },
  ],
  artefacts: [
    "Acceptance suite (454 cases, 10 task families)",
    "Safety rule set with clinical sources",
    "Data model (17 versioned migrations)",
    "Evaluation reports per release",
    "Engineering log",
  ],
  keywords: ["medical RAG", "LLM guardrails", "healthcare AI Nepal", "MediRAG", "retrieval-augmented generation", "Refusal Is Not Safety", "Romanized Nepali"],
  sections: [
    {
      id: "context",
      title: "Context",
      blocks: [
        {
          type: "p",
          text: "People search for health answers online and get confident, unsourced text. In a medical setting a wrong answer can be dangerous, and missing an emergency is worse. DocuMed answers health questions only from trusted sources (WHO, NHS, Nepal's health authorities), cites them, and is built to say **\"I don't know\"** or **\"go to a hospital now\"** when that is the right answer.",
        },
        {
          type: "p",
          text: "DocuMed AI and MediRAG are the same project: MediRAG is the title of my BSc dissertation (2026), and DocuMed is the name of the chatbot. I continued it as research after the degree.",
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
      title: "Dissertation results, and what the audit found",
      blocks: [
        {
          type: "p",
          text: "**Dissertation version (2026), English test set only.** On the 454-case acceptance suite, written in English, the rule layer flagged all 69 emergency cases with no false alarms, and the guardrails refused 40 of 40 adversarial requests (33 of 40 for an unguarded model).",
        },
        {
          type: "p",
          text: "**The audit that followed.** Those results did not cover Nepali as people actually write it. On the same 92 messages, DocuMed's reranker gate refused 44 in English and 91 in Romanized Nepali. Testing six gate designs across English, Devanagari, Romanized and code-mixed Nepali showed that five of them left most of 41 test emergencies with only a refusal, and that putting triage ahead of the gate removed those refusals. That work is my preprint, [Refusal Is Not Safety](/research).",
        },
        {
          type: "callout",
          tone: "note",
          text: "So the 69/69 figure holds for the dissertation's English test set, not for the deployed system across scripts. The preprint is the current, broader result.",
        },
      ],
    },
  ],
};
