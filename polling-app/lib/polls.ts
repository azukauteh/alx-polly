// lib/polls.ts
import { supabase } from "./supabaseClient";

export interface CreatePollInput {
  title: string;
  options: string[];
  userId: string;
}

export async function createPoll({ title, options, userId }: CreatePollInput) {
  if (!title || options.length < 2) {
    throw new Error("Poll must have a title and at least two options");
  }

  const { data: poll, error } = await supabase
    .from("polls")
    .insert([{ title, user_id: userId }])
    .select()
    .single();

  if (error) throw error;

  const pollOptions = options.map((option) => ({
    poll_id: poll.id,
    option,
  }));

  const { error: optionError } = await supabase.from("poll_options").insert(pollOptions);
  if (optionError) throw optionError;

  return poll;
}
