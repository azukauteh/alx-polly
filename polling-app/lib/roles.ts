
/**
 * Role Utilities – User Access Control
 *
 * Provides helper functions and type definitions for managing user roles
 * across the application. Supports role-based UI rendering and backend
 * authorization logic.
 *
 * 🔧 Roles Supported:
 * - "admin": Full access to all features, moderation, and analytics
 * - "user": Standard access to create, vote, and manage own polls
 *
 * 🧠 Usage:
 * ```ts
 * import { isAdmin } from "@/lib/roles";
 * 
 * if (isAdmin(user.role)) {
 *   // Show admin dashboard
 * }
 * ```
 *
 * ✅ Features:
 * - Type-safe role definitions
 * - Simple role check utilities
 * - Can be extended for future roles (e.g., "moderator", "guest")
 *
 * 📁 Location:
 * - `lib/roles.ts`
 *
 * 🔐 Security Notes:
 * - Always enforce role checks server-side for sensitive actions
 * - Use in combination with Supabase RLS or backend guards
 *
 * 
 */

export type UserRole = "admin" | "user";

export const isAdmin = (role?: UserRole) => role === "admin";
export const isUser = (role?: UserRole) => role === "user";
