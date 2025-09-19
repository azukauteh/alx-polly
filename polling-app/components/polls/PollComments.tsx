/**
 * PollComments Component
 *
 * Displays all comments for a given poll, supports replies and nesting.
 */

"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

export default function PollComments({ pollId }: { pollId: string }) {
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    async function fetchComments() {
      const { data, error } = await supabase
        .from("poll_comments")
        .select("*")
        .eq("poll_id", pollId)
        .order("created_at", { ascending: true });

      if (!error) setComments(data);
    }

    fetchComments();
  }, [pollId]);

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">Discussion</h2>
      <CommentForm pollId={pollId} />
      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
