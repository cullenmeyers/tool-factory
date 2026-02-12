import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Judgment Tools",
    template: "%s | Judgment Tools",
  },
  description: "Deterministic tools that reduce thinking.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    title: "Judgment Tools",
    description: "Deterministic tools that reduce thinking.",
    url: siteUrl,
    siteName: "Judgment Tools",
  },
  twitter: {
    card: "summary",
    title: "Judgment Tools",
    description: "Deterministic tools that reduce thinking.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        {/* Navigation */}
        <nav className="border-b border-gray-200">
          <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
            <Link href="/" className="font-semibold tracking-tight">
              Judgment Tools
            </Link>

            <div className="flex gap-6 text-sm">
  <Link href="/tools" className="hover:underline">
    Tools
  </Link>
  <Link href="/about" className="hover:underline">
    About
  </Link>
  <Link href="/contact" className="hover:underline">
    Contact
  </Link>
</div>

          </div>
        </nav>

        {/* Page Content */}
        <main>{children}</main>

        <Analytics />
      </body>
    </html>
  );
}
