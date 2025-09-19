"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/context/auth-context";
import { isAdmin } from "@/lib/roles";

/**
 * Navbar Component
 *
 * Displays navigation links based on user role.
 * - Shows "Admin Panel" if user is an admin
 * - Shows "Create Poll" and "Login" for all users
 * - Mobile-responsive and accessible
 */

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className="flex flex-col sm:flex-row items-center justify-between p-4 shadow-md bg-white gap-4 sm:gap-0"
    >
      {/* Logo */}
      <Link
        href="/"
        aria-label="Go to homepage"
        className="text-xl font-bold text-blue-600 hover:text-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        Alx Polly
      </Link>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
        <Link href="/polls/create">
          <Button className="w-full sm:w-auto">Create Poll</Button>
        </Link>

        {isAdmin(user?.role) && (
          <Link href="/admin/dashboard">
            <Button variant="outline" className="w-full sm:w-auto">
              Admin Panel
            </Button>
          </Link>
        )}

        <Link href="/auth/login">
          <Button variant="outline" className="w-full sm:w-auto">
            Login
          </Button>
        </Link>
      </div>
    </nav>
  );
}
