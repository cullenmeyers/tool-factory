import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">
        Judgment Tools
      </h1>

      <p className="mt-4 text-lg text-gray-700">
        A small library of deterministic tools that reduce thinking.
      </p>

      <p className="mt-2 text-sm text-gray-600">
        No accounts. No feeds. No recommendations. Just clear outputs.
      </p>

      <div className="mt-8 flex gap-3">
        <Link
          href="/tools"
          className="rounded bg-black px-4 py-2 text-sm font-medium text-white"
        >
          View tools
        </Link>
        <Link
          href="/tools/constraint-tie-breaker"
          className="rounded border px-4 py-2 text-sm font-medium"
        >
          Try one
        </Link>
      </div>
    </div>
  );
}

