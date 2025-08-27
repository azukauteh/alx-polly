"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 shadow-md bg-white">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold">
        Alx polly
      </Link>

      {/* Actions */}
      <div className="flex gap-4">
        <Link href="/polls/create">
          <Button>Create Poll</Button>
        </Link>
        <Link href="/auth/login">
          <Button variant="outline">Login</Button>
        </Link>
      </div>
    </nav>
  );
}
