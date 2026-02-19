import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Providers } from "@/providers/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Simple Blog",
  description: "A simple blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-background text-foreground`}
      >
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
          <nav className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4 sm:px-6">
            <Link
              href="/"
              className="font-semibold text-foreground hover:opacity-80"
            >
              Simple Blog
            </Link>
            <Link
              href="/posts/create"
              className="font-semibold text-foreground hover:opacity-80"
            >
              <Button variant="default">
                <PlusIcon className="w-4 h-4" />
                <span>Create Post</span>
              </Button>
            </Link>
          </nav>
        </header>
        <main className="flex-1 w-full mx-auto max-w-3xl px-4 py-8 sm:px-6">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
