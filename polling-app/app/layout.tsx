import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Polling App",
  description: "Create, share, and vote on polls easily",
};

/**
 * RootLayout – Global layout wrapper
 *
 * - Applies font and background styling
 * - Includes Navbar across all pages
 * - Adds semantic structure and responsive container
 * - Improves accessibility with language and landmark tags
 */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <header role="banner">
          <Navbar />
        </header>
        <main
          role="main"
          className="min-h-screen max-w-screen-md mx-auto px-4 py-6"
        >
          {children}
        </main>
      </body>
    </html>
  );
}
