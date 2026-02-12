import type { Metadata } from "next";
import Link from "next/link";
import { TOOL_INDEX } from "@/lib/toolIndex";

export const metadata: Metadata = {
  title: "Judgment Tools",
  description:
    "Deterministic tools that reduce rethinking and enforce clear decision rules.",
};

export default function HomePage() {
  const featuredTools = TOOL_INDEX.slice(0, 3);

  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      {/* Hero */}
      <section>
        <h1 className="text-4xl font-semibold tracking-tight">
          Judgment Tools
        </h1>

        <p className="mt-6 text-lg text-gray-700 max-w-2xl">
          A small library of deterministic tools that eliminate re-thinking.
          Clear inputs. Fixed rules. Consistent outputs.
        </p>

        <p className="mt-4 text-sm text-gray-600">
          No accounts. No feeds. No personalization. Just structured decisions.
        </p>

        <div className="mt-10 flex gap-4">
          <Link
            href="/tools"
            className="rounded bg-black px-5 py-3 text-sm font-medium text-white"
          >
            View all tools
          </Link>
          {featuredTools[0] && (
            <Link
              href={`/tools/${featuredTools[0].slug}`}
              className="rounded border px-5 py-3 text-sm font-medium"
            >
              Try a tool
            </Link>
          )}
        </div>
      </section>

      {/* Divider */}
      <div className="my-16 border-t" />

      {/* Featured Tools */}
      <section>
        <h2 className="text-xl font-semibold">Featured tools</h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {featuredTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="rounded border p-4 hover:bg-gray-50"
            >
              <div className="font-medium">{tool.name}</div>
              <div className="mt-1 text-sm text-gray-600">
                {tool.oneLiner}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="my-16 border-t" />

      {/* Philosophy */}
      <section>
        <h2 className="text-xl font-semibold">How it works</h2>

        <ul className="mt-4 space-y-3 text-gray-700">
          <li>• Each tool solves one narrow recurring decision.</li>
          <li>• The same inputs always produce the same output.</li>
          <li>• If a decision cannot be made cleanly, the tool refuses.</li>
        </ul>
      </section>
    </main>
  );
}
