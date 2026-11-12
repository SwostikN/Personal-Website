import type { Post } from "@/lib/types";

export const posts: Post[] = [
  {
    slug: "emergency-detection-without-an-llm",
    title: "Why my medical AI's emergency detector doesn't use an LLM",
    description:
      "Missing an emergency is a medical AI's worst failure. Why I put 45 deterministic rules in front of the language model, and how they scored 69/69.",
    date: "2026-10-26",
    tags: ["AI safety", "Healthcare", "Requirements"],
    readingMinutes: 5,
    body: [
      {
        type: "p",
        text: "When I built DocuMed, a medical question-answering system for my dissertation, the first requirement I wrote down wasn't about answering questions at all. It was this: **if someone describes an emergency, tell them to get help before anything else happens.**",
      },
      {
        type: "p",
        text: "The obvious way to do that in 2026 is to ask the language model. I deliberately didn't. The emergency screen is 45 plain, deterministic rules that run *before* the model is ever called.",
      },
      { type: "p", text: "**The failure costs aren't symmetric**" },
      {
        type: "p",
        text: "A system that sends someone with a mild headache to a hospital has caused an inconvenience. A system that tells someone with stroke symptoms to rest and drink water has caused harm. I wrote this asymmetry into the design as a rule: telling someone their problem is less urgent than it is counts as a safety event, while telling them it is more urgent counts as an inconvenience. That makes the emergency layer's job narrow and strict: never miss, and accept some over-caution.",
      },
      { type: "p", text: "**Why rules beat a model for this one job**" },
      {
        type: "list",
        items: [
          "**Predictable.** The same message always gets the same answer. A model with any sampling temperature can't promise that.",
          "**Reviewable.** Each rule is a few lines of configuration with a clinical source attached, so a doctor can read and challenge it. Nobody can review a model's weights.",
          "**Testable.** Every rule has labelled examples that must trigger it, and look-alikes that must not.",
          "**Fast and available.** No network call, no rate limit, no outage. The emergency path works even when the AI provider is down.",
        ],
      },
      { type: "p", text: "**What the rules cover**" },
      {
        type: "p",
        text: "Stroke signs, cardiac chest pain, severe breathing difficulty, meningitis patterns, fever in infants under three months, snake bites, carbon-monoxide poisoning when several people in a room feel ill, altitude sickness at the levels that kill (very relevant in Nepal), diabetic emergencies and more. When one fires, the user sees an emergency banner with a one-tap call to **102**, Nepal's ambulance number, and a clear statement that this is not a diagnosis.",
      },
      { type: "p", text: "**How I knew it worked**" },
      {
        type: "p",
        text: "I wrote the acceptance test before the rules: a labelled set of emergency and non-emergency messages, run automatically on every change. The final rule set caught **69 out of 69** emergency cases with **zero false alarms** on that set. When I found a gap (diabetic ketoacidosis in someone who doesn't know they're diabetic, for example), the new rule went in together with test cases that prove it fires, and look-alikes that prove it doesn't.",
      },
      { type: "p", text: "**The general lesson**" },
      {
        type: "p",
        text: "This isn't really about AI. It's the same thing I do as a system analyst: identify the requirement whose failure is unacceptable, give it the simplest mechanism that can be fully specified and tested, and keep the clever parts of the system away from it. The language model still does what it's good at, which is explaining things in plain language from cited sources. It just isn't trusted with the decision that matters most.",
      },
    ],
  },
  {
    slug: "gitignore-hid-my-dataset",
    title: "A .gitignore line silently hid my dataset",
    description:
      "One innocent .gitignore pattern and a case-insensitive file system kept ten files out of every commit. What happened, and how to check your repo.",
    date: "2026-10-26",
    tags: ["Git", "Reproducibility", "Debugging"],
    readingMinutes: 4,
    body: [
      {
        type: "p",
        text: "I moved my dissertation project to a new machine and discovered it could no longer rebuild its own dataset. The folder describing exactly which documents went into the system's knowledge base (ten manifest files) was simply gone. It had never been committed. Not once.",
      },
      { type: "p", text: "**The culprit**" },
      {
        type: "p",
        text: "My `.gitignore` contained a line many Python projects carry without thinking: `MANIFEST`. It's meant for a single packaging file at the root of a repository. But a gitignore pattern with no slash in it matches **at any depth**, and the folder was called `ingest/manifest/`. On Windows, git runs with `core.ignorecase = true`, so `MANIFEST` matched `manifest` too.",
      },
      {
        type: "p",
        text: "No warning. No error. `git status` just never mentioned the files, so I never noticed.",
      },
      { type: "p", text: "**The fix**" },
      {
        type: "list",
        items: [
          "Anchor the pattern to the root: `/MANIFEST` matches only the packaging file it was meant for.",
          "Add an explicit re-include for the folder that matters: `!ingest/manifest/`.",
          "Verify: `git add --dry-run ingest/manifest/` should now list all ten files.",
        ],
      },
      { type: "p", text: "**Check your own repository**" },
      {
        type: "p",
        text: "Run `git status --ignored` and read the list. For anything surprising, `git check-ignore -v <path>` tells you exactly which line of which ignore file is responsible. It takes two minutes, and it's the kind of check that belongs on every release checklist.",
      },
      { type: "p", text: "**Why it matters beyond my project**" },
      {
        type: "p",
        text: "Nothing failed loudly. The project quietly lost the ability to reproduce itself, and nobody would have known until someone changed machines. That's the kind of failure worth designing against in any system that keeps records: not a crash, but a silent gap between what we think is recorded and what actually is.",
      },
    ],
  },
];
