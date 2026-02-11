import Link from "next/link";
import { TOOL_INDEX } from "@/lib/toolIndex";

export default function ToolsIndexPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold">All tools</h1>
      <p className="mt-2 text-sm text-gray-600">
        A small library of deterministic judgment tools. Pick one and run it.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {TOOL_INDEX.map((t) => (
          <Link
            key={t.slug}
            href={`/tools/${t.slug}`}
            className="rounded border p-3 hover:bg-gray-50"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="font-medium">{t.name}</div>
            </div>
            <div className="mt-1 text-sm text-gray-600">{t.oneLiner}</div>
            <div className="mt-2 text-xs text-gray-500">Open →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
