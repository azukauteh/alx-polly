/**
 * Auth Context – Global User Access
 *
 * Provides a React context for accessing authenticated user data across
 * client components. Enables role-based rendering, personalization, and
 * secure UI logic.
 *
 * 🔧 Structure:
 * - `user`: Contains `id`, `email`, and `role` ("admin" | "user")
 * - `useAuth()`: Hook to access the current user from context
 *
 * 🧠 Usage:
 * ```tsx
 * import { useAuth } from "@/lib/context/auth-context";
 *
 * const { user } = useAuth();
 * if (user?.role === "admin") {
 *   // Show admin tools
 * }
 * ```
 *
 * 📁 Location:
 * - `lib/context/auth-context.ts`
 *
 * 🔐 Security Notes:
 * - Context is client-side only; do not rely on it for secure backend logic
 * - Always validate roles server-side before performing sensitive actions
 * - Extend with `AuthProvider` for dynamic auth integration (e.g., Supabase)
 *
 * 🧩 Extension Ideas:
 * - Add `isAuthenticated`, `logout()`, or `loading` state
 * - Integrate with Supabase or NextAuth for real auth flow
 *
 * 
 */


"use client";

import { createContext, useContext } from "react";

interface User {
  id: string;
  email: string;
  role: "admin" | "user";
}

interface AuthContextType {
  user: User | null;
}

const AuthContext = createContext<AuthContextType>({ user: null });

export const useAuth = () => useContext(AuthContext);
