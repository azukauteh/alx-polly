/**
 * Authentication utilities for the ALX Polling App.
 *
 * This module centralizes all authentication-related operations,
 * including signing in, signing up, and managing sessions.
 *
 * Why: Keeping authentication logic in one place makes the app easier
 * to maintain, debug, and extend when adding providers or middleware.
 */

import { supabase } from "./supabaseClient";

/**
 * Registers a new user with Supabase authentication.
 *
 * @param email - The user's email address.
 * @param password - The user's password.
 * @returns The Supabase user object or throws on failure.
 */
export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) {
    // 🔹 Handle invalid emails, weak passwords, or conflicts
    throw new Error(`Sign-up failed: ${error.message}`);
  }
  return data;
}

/**
 * Signs an existing user into the app.
 *
 * @param email - The user's email.
 * @param password - The user's password.
 * @returns Session info if successful, otherwise throws.
 */
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    // 🔹 Covers incorrect credentials or blocked accounts
    throw new Error(`Sign-in failed: ${error.message}`);
  }
  return data;
}

/**
 * Logs the user out and clears session data.
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(`Sign-out failed: ${error.message}`);
}
