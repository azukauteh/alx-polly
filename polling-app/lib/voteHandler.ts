
// lib/voteHandler.ts
import { supabase } from "./supabaseClient";

export async function voteOnPoll(pollId: string, optionId: string, userId: string) {
  try {
    // Check for existing vote in a single optimized query
    const { data: existingVote, error: existingVoteError } = await supabase
      .from("votes")
      .select("id")
      .eq("poll_id", pollId)
      .eq("user_id", userId)
      .maybeSingle();

    if (existingVoteError) throw existingVoteError;

    if (existingVote) {
      return { success: false, message: "You have already voted" };
    }

    // Insert vote and update count in a transaction-like flow
    const { error: insertError } = await supabase.from("votes").insert([
      {
        poll_id: pollId,
        option_id: optionId,
        user_id: userId,
      },
    ]);

    if (insertError) throw insertError;

    // Use Supabase RPC for efficient atomic updates
    const { error: updateError } = await supabase.rpc("increment_vote", {
      option_id_input: optionId,
    });

    if (updateError) throw updateError;

    return { success: true, message: "Vote submitted successfully" };
  } catch (error: any) {
    return { success: false, message: error.message || "Something went wrong" };
  }
}
