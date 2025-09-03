// lib/voteHandler.ts
import { supabase } from "./supabaseClient";

export async function voteOnPoll(pollId: string, optionId: string, userId: string) {
  // Check if user has already voted
  const { data: existingVote, error: voteError } = await supabase
    .from("votes")
    .select("*")
    .eq("poll_id", pollId)
    .eq("user_id", userId)
    .single();

  if (voteError && voteError.code !== "PGRST116") {
    throw new Error("Failed to check existing vote");
  }

  if (existingVote) {
    throw new Error("You have already voted on this poll");
  }

  // Insert new vote
  const { error: insertError } = await supabase
    .from("votes")
    .insert([{ poll_id: pollId, option_id: optionId, user_id: userId }]);

  if (insertError) {
    throw new Error("Failed to submit vote");
  }

  // Update vote count
  const { error: updateError } = await supabase.rpc("increment_vote", {
    option_id_input: optionId,
  });

  if (updateError) {
    throw new Error("Failed to update vote count");
  }

  return { success: true, message: "Vote submitted successfully" };
}
