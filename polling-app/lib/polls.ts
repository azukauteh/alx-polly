// lib/polls.ts
/**
 * Handles poll creation, fetching, and deletion logic.
 *
 * Why: Separating poll operations from UI components ensures reusable,
 * testable, and maintainable code for database interactions.
 */

import { supabase } from "./supabaseClient";

export interface CreatePollInput {
  title: string;
  options: string[];
  userId: string;
}

/**
 * Creates a new poll in the database.
 *
 * @param input - Object containing poll title, options, and creator ID.
 * @returns The created poll record.
 */
export async function createPoll(input: CreatePollInput) {
  const { title, options, userId } = input;

  // 🔹 Input validation to prevent empty polls
  if (!title || options.length < 2) {
    throw new Error("Poll must have a title and at least 2 options.");
  }

  const { data, error } = await supabase
    .from("polls")
    .insert([{ title, options, user_id: userId }])
    .select()
    .single();

  if (error) throw new Error(`Poll creation failed: ${error.message}`);
  return data;
}

/**
 * Retrieves all polls created by a specific user.
 *
 * @param userId - The creator's ID.
 */
export async function getUserPolls(userId: string) {
  const { data, error } = await supabase
    .from("polls")
    .select("*")
    .eq("user_id", userId);

  if (error) throw new Error(`Failed to fetch polls: ${error.message}`);
  return data;
}
