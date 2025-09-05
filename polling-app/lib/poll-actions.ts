/**
 * Voting handlers for the ALX Polling App.
 *
 * Why: These actions manage votes, ensure users can't vote twice,
 * and provide centralized error handling for voting logic.
 */

import { supabase } from "./supabaseClient";

/**
 * Records a user's vote for a specific poll option.
 *
 * @param pollId - The poll to vote on.
 * @param option - The selected option.
 * @param userId - The voter ID (to enforce single-vote rule).
 */
export async function castVote(pollId: string, option: string, userId: string) {
  // 🔹 Check for duplicate votes before inserting
  const { data: existing } = await supabase
    .from("votes")
    .select("*")
    .eq("poll_id", pollId)
    .eq("user_id", userId)
    .single();

  if (existing) {
    throw new Error("You have already voted on this poll.");
  }

  const { data, error } = await supabase
    .from("votes")
    .insert([{ poll_id: pollId, option, user_id: userId }]);

  if (error) throw new Error(`Vote failed: ${error.message}`);
  return data;
}

/**
 * Calculates the result of a poll based on vote counts.
 *
 * @param pollId - The poll ID.
 * @returns An array of options with vote counts.
 */
export async function getPollResults(pollId: string) {
  const { data, error } = await supabase
    .from("votes")
    .select("option, count")
    .eq("poll_id", pollId);

  if (error) throw new Error(`Failed to fetch poll results: ${error.message}`);
  return data;
}
