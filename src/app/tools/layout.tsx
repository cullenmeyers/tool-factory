import Link from "next/link";
import { TOOL_INDEX } from "@/lib/toolIndex";

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <header className="border-b">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm font-semibold">
              Judgment Tools
            </Link>
            <span className="text-xs text-gray-500">/ tools</span>
          </div>

          <nav className="flex items-center gap-3 text-sm">
            <Link href="/tools" className="text-gray-700 hover:text-black">
              All tools
            </Link>
            <Link href="/" className="text-gray-700 hover:text-black">
              Home
            </Link>
          </nav>
        </div>
      </header>

      {/* Two-column shell */}
      <div className="mx-auto grid max-w-5xl gap-6 px-4 py-6 md:grid-cols-[240px_1fr]">
        {/* Left nav */}
        <aside className="md:sticky md:top-6 md:h-[calc(100vh-88px)] md:overflow-auto">
          <div className="rounded border p-3">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Tools
            </div>

            <ul className="space-y-1">
              {TOOL_INDEX.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/tools/${t.slug}`}
                    className="block rounded px-2 py-1 text-sm hover:bg-gray-50"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium">{t.name}</span>
                     
                    </div>
                    <div className="mt-0.5 text-xs text-gray-500">{t.oneLiner}</div>
                  </Link>
                </li>
              ))}
            </ul>

          </div>
        </aside>

        {/* Main content (tool page) */}
        <main className="min-w-0">
          <div className="rounded border bg-white p-4">{children}</div>

          <footer className="mt-6 text-xs text-gray-500">
            Built to reduce thinking. Tools are deterministic. No accounts.
          </footer>
        </main>
      </div>
    </div>
  );
}
