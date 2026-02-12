// src/app/tools/constraint-validity-check/page.tsx
"use client";

import React, { useMemo, useState } from "react";

type Verdict = "A" | "B" | "TIE";

type Output = {
  verdict: Verdict;
  becauseConstraint: string; // constraint verbatim
  nextStep: string;
} | null;

function normalize(s: string) {
  return (s ?? "").trim();
}

function countSentences(s: string): number {
  // Deterministic "single sentence" check: count end punctuation marks.
  // Treat newline as not a sentence boundary by itself.
  const t = normalize(s);
  if (!t) return 0;

  const matches = t.match(/[.!?]+/g);
  const count = matches ? matches.length : 0;

  // If no explicit terminator, treat as 1 sentence (still a sentence-like entry).
  // If multiple terminators appear, treat as multiple sentences.
  return count === 0 ? 1 : count;
}

function startsWithRequiredPrefixConstraint(s: string): boolean {
  const t = normalize(s).toLowerCase();
  return t.startsWith("i must") || t.startsWith("i can’t") || t.startsWith("i can't");
}

function startsWithRequiredPrefixScenario(s: string): boolean {
  const t = normalize(s).toLowerCase();
  return t.startsWith("when");
}

function startsWithRequiredPrefixRegret(s: string): boolean {
  const t = normalize(s).toLowerCase();
  return t.startsWith("if");
}

function containsNumericOrTriggerOperatorsScenario(s: string): boolean {
  const t = normalize(s).toLowerCase();
  const triggerPhrases = ["more than", "less than", "at least", "within", "before", "after"];
  const hasTriggerPhrase = triggerPhrases.some((p) => t.includes(p));
  const hasNumber = /\d/.test(t);
  return hasTriggerPhrase || hasNumber;
}

function containsConsequenceVerbRegret(s: string): boolean {
  const t = normalize(s).toLowerCase();
  const verbs = ["lose", "miss", "pay", "exceed", "break", "fail", "cancel", "refund", "delay"];
  return verbs.some((v) => t.includes(v));
}

function containsConcreteNounConstraint(s: string): boolean {
  const t = normalize(s).toLowerCase();

  // Concrete noun dictionary (deterministic)
  const nouns = [
    // time / quantity
    "minute",
    "minutes",
    "hour",
    "hours",
    "day",
    "days",
    "week",
    "weeks",
    "month",
    "months",
    "year",
    "years",
    "deadline",
    "due",
    "date",
    "time",
    "today",
    "tomorrow",
    // money
    "dollar",
    "dollars",
    "usd",
    "budget",
    "price",
    "cost",
    "fee",
    "payment",
    // number / count
    "number",
    "limit",
    "max",
    "minimum",
    "maximum",
    // features / tools / platforms
    "offline",
    "iphone",
    "ipad",
    "android",
    "windows",
    "mac",
    "web",
    "browser",
    "app",
    "tool",
    "api",
    "sync",
    "export",
    "import",
    "pdf",
    "calendar",
    "email",
    "notion",
    "airtable",
    "google",
    "apple",
    // location / person
    "home",
    "office",
    "school",
    "work",
    "client",
    "boss",
    "team",
    "partner",
    "family",
    "person",
    "location",
  ];

  // Also accept presence of any digit as a concrete indicator.
  const hasDigit = /\d/.test(t);
  const hasNoun = nouns.some((n) => t.includes(n));
  return hasDigit || hasNoun;
}

export default function Page() {
  const [constraint, setConstraint] = useState("");
  const [scenario, setScenario] = useState("");
  const [regret, setRegret] = useState("");

  const [refused, setRefused] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [output, setOutput] = useState<Output>(null);

  const nextStepFor = useMemo(() => {
    return {
      A: "Run Constraint Tie-Breaker using this constraint.",
      B: "Rewrite into one measurable rule (time/money/frequency/platform) and rerun.",
      TIE: "Rewrite into one measurable rule (time/money/frequency/platform) and rerun.",
    } as const;
  }, []);

  function reset() {
    setConstraint("");
    setScenario("");
    setRegret("");
    setRefused(false);
    setSubmitted(false);
    setOutput(null);
  }

  function validate() {
    setRefused(false);
    setSubmitted(false);
    setOutput(null);

    const c = normalize(constraint);
    const s = normalize(scenario);
    const r = normalize(regret);

    // Failure condition: REFUSE when inputs are not provided as single sentences
    // or exceed one sentence per field.
    const cSent = countSentences(c);
    const sSent = countSentences(s);
    const rSent = countSentences(r);

    // If any field is empty, sentence count is 0; that is NOT refusal per spec (Rule 1 returns TIE).
    // Refuse only when a field exceeds one sentence.
    if ((cSent > 1 && c) || (sSent > 1 && s) || (rSent > 1 && r)) {
      setRefused(true);
      return;
    }

    // Rule 1: missing/empty OR does not start with required word -> TIE
    const startsOk =
      c &&
      s &&
      r &&
      startsWithRequiredPrefixConstraint(c) &&
      startsWithRequiredPrefixScenario(s) &&
      startsWithRequiredPrefixRegret(r);

    if (!startsOk) {
      setSubmitted(true);
      setOutput({
        verdict: "TIE",
        becauseConstraint: c || constraint, // verbatim as written (even if empty, keep original)
        nextStep: nextStepFor.TIE,
      });
      return;
    }

    // Rule 2: constraint must contain at least one concrete noun (dictionary or digit)
    if (!containsConcreteNounConstraint(c)) {
      setSubmitted(true);
      setOutput({
        verdict: "B",
        becauseConstraint: c,
        nextStep: nextStepFor.B,
      });
      return;
    }

    // Rule 3: scenario must include trigger condition or numeric value
    if (!containsNumericOrTriggerOperatorsScenario(s)) {
      setSubmitted(true);
      setOutput({
        verdict: "B",
        becauseConstraint: c,
        nextStep: nextStepFor.B,
      });
      return;
    }

    // Rule 4: regret test must contain a concrete consequence verb
    if (!containsConsequenceVerbRegret(r)) {
      setSubmitted(true);
      setOutput({
        verdict: "B",
        becauseConstraint: c,
        nextStep: nextStepFor.B,
      });
      return;
    }

    // Rule 5: all satisfied -> A
    setSubmitted(true);
    setOutput({
      verdict: "A",
      becauseConstraint: c,
      nextStep: nextStepFor.A,
    });
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Constraint Validity Check</h1>
      <p className="mt-2 text-sm text-neutral-600">
        Structural check only. This does not judge meaning or option quality.
      </p>

      <form
        className="mt-6 space-y-5 rounded-lg border border-neutral-200 bg-white p-5"
        onSubmit={(e) => {
          e.preventDefault();
          validate();
        }}
      >
        <div>
          <label className="block text-sm font-medium" htmlFor="constraint">
            Constraint (one sentence starting with “I must” or “I can’t”)
          </label>
          <input
            id="constraint"
            value={constraint}
            onChange={(e) => setConstraint(e.target.value)}
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400"
            placeholder='e.g., "I must work offline on iPhone."'
          />
        </div>

        <div>
          <label className="block text-sm font-medium" htmlFor="scenario">
            Scenario (one sentence starting with “When”)
          </label>
          <input
            id="scenario"
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400"
            placeholder='e.g., "When I travel, I need access without internet within 5 minutes."'
          />
        </div>

        <div>
          <label className="block text-sm font-medium" htmlFor="regret">
            Regret test (one sentence starting with “If”)
          </label>
          <input
            id="regret"
            value={regret}
            onChange={(e) => setRegret(e.target.value)}
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400"
            placeholder='e.g., "If it fails offline, I will miss a deadline and lose time."'
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
          >
            Validate
          </button>
          <button
            type="button"
            onClick={reset}
            className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50"
          >
            Reset
          </button>
        </div>
      </form>

      <section className="mt-6">
        <h2 className="sr-only">Output</h2>

        <div className="rounded-lg border border-neutral-200 bg-white p-5">
          {refused ? (
            // REFUSE behavior: no Verdict-format output, per spec.
            <div className="text-sm font-medium text-neutral-900">REFUSE</div>
          ) : !submitted || !output ? (
            <div className="text-sm text-neutral-600">Fill the form and click Validate.</div>
          ) : (
            <pre className="whitespace-pre-wrap text-sm leading-6 text-neutral-900">
{`Verdict: ${output.verdict}
Because: ${output.becauseConstraint}
Next step: ${output.nextStep}`}
            </pre>
          )}
        </div>
      </section>
    </main>
  );
}
