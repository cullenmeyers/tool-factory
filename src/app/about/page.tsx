export const metadata = {
  title: "About | Judgment Tools",
  description:
    "What Judgment Tools are, what they do, and what they do not do.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">About</h1>

      <p className="mt-4 text-base text-gray-700">
        Judgment Tools are small, deterministic tools designed to reduce
        re-thinking. They take fixed inputs, apply clear rules, and return a
        consistent output.
      </p>

      <h2 className="mt-10 text-xl font-semibold">What these tools are</h2>
      <ul className="mt-3 list-disc pl-6 text-gray-700 space-y-2">
        <li>Single-purpose decision helpers for recurring situations</li>
        <li>Deterministic: the same inputs produce the same output</li>
        <li>Simple: one form, one output</li>
      </ul>

      <h2 className="mt-10 text-xl font-semibold">What these tools are not</h2>
      <ul className="mt-3 list-disc pl-6 text-gray-700 space-y-2">
        <li>Medical, legal, or financial advice</li>
        <li>Personalized systems that learn about you</li>
        <li>Dashboards, accounts, or data collection products</li>
      </ul>

      <p className="mt-10 text-sm text-gray-500">
        If something feels high-stakes or irreversible, treat the output as a
        prompt to gather more information—not a final answer.
      </p>
    </main>
  );
}
