"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TOOL_INDEX } from "@/lib/toolIndex";

export default function ToolsSidebar() {
  const pathname = usePathname();

  const activeSlug =
    pathname?.startsWith("/tools/") ? pathname.split("/")[2] || null : null;

  return (
    <aside className="md:sticky md:top-6 md:h-[calc(100vh-88px)] md:overflow-auto">
      <div className="rounded border p-3">
        <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
          Tools
        </div>

        <ul className="space-y-1">
          {TOOL_INDEX.map((t) => {
            const isActive = t.slug === activeSlug;

            return (
              <li key={t.slug}>
                <Link
                  href={`/tools/${t.slug}`}
                  className={`block rounded px-2 py-2 text-sm hover:bg-gray-50 ${
                    isActive ? "bg-gray-50" : ""
                  }`}
                >
                  <div className="font-medium">{t.name}</div>
                  <div className="mt-0.5 text-xs text-gray-500">
                    {t.oneLiner}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}

