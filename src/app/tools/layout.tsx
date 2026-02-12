import ToolsSidebar from "@/components/tools/ToolsSidebar";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div className="mx-auto grid max-w-5xl gap-6 px-4 py-6 md:grid-cols-[240px_1fr]">
        <ToolsSidebar />

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


