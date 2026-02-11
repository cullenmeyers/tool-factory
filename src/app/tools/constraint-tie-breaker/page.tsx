// src/app/tools/constraint-tie-breaker/page.tsx
"use client";

import React, { useMemo, useState } from "react";

type MeetsValue = "yes" | "no" | "not_sure";

type DecisionOutput = {
  verdict: "A" | "B" | "TIE";
  becauseConstraint: string; // raw constraint text (no "Because:" prefix)
  nextStep: string;
};

function normalize(s: string) {
  return (s ?? "").trim();
}

function isHighStakes(text: string): boolean {
  // Deterministic heuristic for "high-stakes medical/legal/financial"
  const t = text.toLowerCase();
  const keywords = [
    // medical
    "medical",
    "diagnos",
    "symptom",
    "surgery",
    "medication",
    "dose",
    "pregnan",
    "chest pain",
    "suicid",
    "self-harm",
    "therapy",
    // legal
    "legal",
    "law",
    "lawsuit",
    "attorney",
    "contract",
    "court",
    "divorce",
    "custody",
    "immigration",
    "criminal",
    // financial (high-stakes)
    "investment",
    "investing",
    "stocks",
    "crypto",
    "loan",
    "mortgage",
    "bankrupt",
    "tax",
    "irs",
    "debt",
    "retirement",
  ];
  return keywords.some((k) => t.includes(k));
}

function indicatesBestOverall(text: string): boolean {
  const t = text.toLowerCase();
  const phrases = [
    "best overall",
    "overall best",
    "which is best",
    "what's best",
    "optimize",
    "maximize",
    "most optimal",
    "perfect",
    "ideal",
    "rank",
    "score",
    "weigh",
    "compare everything",
    "pros and cons",
    "multiple criteria",
  ];
  return phrases.some((p) => t.includes(p));
}

function asEffectiveYesNo(v: MeetsValue): "yes" | "no" {
  // Rule: “Not sure” is treated as “No” unless verified within 15 minutes.
  // This tool cannot verify; therefore treat not_sure as no deterministically.
  return v === "yes" ? "yes" : "no";
}

export default function Page() {
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [constraint, setConstraint] = useState("");
  const [aMeets, setAMeets] = useState<MeetsValue>("not_sure");
  const [bMeets, setBMeets] = useState<MeetsValue>("not_sure");

  const [submitted, setSubmitted] = useState(false);
  const [output, setOutput] = useState<DecisionOutput | null>(null);

  const labels = useMemo(() => {
    const a = normalize(optionA) || "Option A";
    const b = normalize(optionB) || "Option B";
    return { a, b };
  }, [optionA, optionB]);

  function refuse(message: string) {
    // True refusal: no Verdict-format output is produced.
    setSubmitted(false);
    setOutput(null);
    window.alert(message);
  }

  function decide() {
    const aLabelRaw = normalize(optionA);
    const bLabelRaw = normalize(optionB);
    const c = normalize(constraint);

    // Failure conditions: refuse to answer (no decision output).
    if (!c) {
      refuse('Refusal: You must name one non-negotiable constraint (one sentence: "I must..." or "I can’t...").');
      return;
    }

    const combined = [aLabelRaw, bLabelRaw, c].filter(Boolean).join(" | ");
    if (isHighStakes(combined)) {
      refuse("Refusal: This appears to be a high-stakes medical/legal/financial decision. Get qualified professional advice.");
      return;
    }

    if (indicatesBestOverall(c)) {
      refuse('Refusal: This tool does not optimize for "best overall." Rewrite one must-have constraint (dealbreaker) and rerun.');
      return;
    }

    // From here on, we produce exactly the 3-line Verdict format.
    setSubmitted(true);

    const aEff = asEffectiveYesNo(aMeets);
    const bEff = asEffectiveYesNo(bMeets);

    // v0 deterministic logic (in order)
    if (aEff === "yes" && bEff !== "yes") {
      setOutput({
        verdict: "A",
        becauseConstraint: c,
        nextStep: `Choose ${labels.a} and do one real task with it right now (≤15 minutes).`,
      });
      return;
    }

    if (bEff === "yes" && aEff !== "yes") {
      setOutput({
        verdict: "B",
        becauseConstraint: c,
        nextStep: `Choose ${labels.b} and do one real task with it right now (≤15 minutes).`,
      });
      return;
    }

    if (aEff === "yes" && bEff === "yes") {
      setOutput({
        verdict: "TIE",
        becauseConstraint: c,
        nextStep: `Run a 15-minute mini-test: use ${labels.a} or ${labels.b} right now for one real task and note friction (time/effort/errors).`,
      });
      return;
    }

    // aEff !== yes and bEff !== yes
    setOutput({
      verdict: "TIE",
      becauseConstraint: c,
      nextStep: "Replace one option or loosen the constraint by one notch (rewrite it), then rerun.",
    });
  }

  function reset() {
    setOptionA("");
    setOptionB("");
    setConstraint("");
    setAMeets("not_sure");
    setBMeets("not_sure");
    setSubmitted(false);
    setOutput(null);
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Constraint Tie-Breaker</h1>
      <p className="mt-2 text-sm text-neutral-600">
        Decide between two options using one non-negotiable constraint.
      </p>

      <form
        className="mt-6 space-y-5 rounded-lg border border-neutral-200 bg-white p-5"
        onSubmit={(e) => {
          e.preventDefault();
          decide();
        }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium" htmlFor="optionA">
              Option A (1 short label)
            </label>
            <input
              id="optionA"
              value={optionA}
              onChange={(e) => setOptionA(e.target.value)}
              className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400"
              placeholder="e.g., Notion"
            />
          </div>

          <div>
            <label className="block text-sm font-medium" htmlFor="optionB">
              Option B (1 short label)
            </label>
            <input
              id="optionB"
              value={optionB}
              onChange={(e) => setOptionB(e.target.value)}
              className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400"
              placeholder="e.g., Apple Notes"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium" htmlFor="constraint">
            One deciding constraint (one sentence)
          </label>
          <input
            id="constraint"
            value={constraint}
            onChange={(e) => setConstraint(e.target.value)}
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400"
            placeholder='e.g., "I must be able to use it offline."'
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium" htmlFor="aMeets">
              For Option A: Does it meet the constraint?
            </label>
            <select
              id="aMeets"
              value={aMeets}
              onChange={(e) => setAMeets(e.target.value as MeetsValue)}
              className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400"
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="not_sure">Not sure</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium" htmlFor="bMeets">
              For Option B: Does it meet the constraint?
            </label>
            <select
              id="bMeets"
              value={bMeets}
              onChange={(e) => setBMeets(e.target.value as MeetsValue)}
              className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400"
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="not_sure">Not sure</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
          >
            Decide
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
          {!submitted || !output ? (
            <div className="text-sm text-neutral-600">Fill the form and click Decide.</div>
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
