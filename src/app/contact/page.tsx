export const metadata = {
  title: "Contact | Judgment Tools",
  description: "Contact the maker of Judgment Tools.",
};

export default function ContactPage() {
  const email = "cullen.meyers.work@gmail.com"; // TODO: replace with your real email

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>

      <p className="mt-4 text-base text-gray-700">
        Questions, feedback, or a tool request? Email:
      </p>

      <p className="mt-4">
        <a
          href={`mailto:${email}`}
          className="text-blue-600 underline underline-offset-4"
        >
          {email}
        </a>
      </p>

      <p className="mt-10 text-sm text-gray-500">
        Note: These tools are deterministic and intentionally minimal. Bug
        reports are the most helpful feedback.
      </p>
    </main>
  );
}
