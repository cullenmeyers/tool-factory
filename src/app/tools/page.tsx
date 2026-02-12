import Link from "next/link";
import { TOOL_INDEX } from "@/lib/toolIndex";

export default function ToolsIndexPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold">All tools</h1>
        <p className="mt-2 text-sm text-gray-600">
          Pick one and run it. Deterministic inputs, fixed rules, consistent outputs.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {TOOL_INDEX.map((t) => (
          <Link
            key={t.slug}
            href={`/tools/${t.slug}`}
            className="rounded border p-3 hover:bg-gray-50"
          >
            <div className="font-medium">{t.name}</div>
            <div className="mt-1 text-sm text-gray-600">{t.oneLiner}</div>
            <div className="mt-2 text-xs text-gray-500">Open →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}


