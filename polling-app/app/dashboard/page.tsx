/**
 * User Dashboard Component.
 *
 * Displays the list of polls created by the user, along with real-time stats.
 * 
 * Why: The dashboard centralizes poll management and offers users insights
 * into their engagement metrics without leaving the app.
 */

"use client";

import { useEffect, useState } from "react";
import { getUserPolls } from "@/lib/polls";

export default function DashboardPage() {
  const [polls, setPolls] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPolls() {
      try {
        const userId = "current-user-id"; // TODO: Replace with session context
        const polls = await getUserPolls(userId);
        setPolls(polls);
      } catch (error) {
        console.error("Failed to fetch polls:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPolls();
  }, []);

  if (loading) return <p>Loading your dashboard...</p>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Your Polls</h1>
      {polls.length === 0 ? (
        <p>You haven't created any polls yet.</p>
      ) : (
        <ul className="space-y-2">
          {polls.map((poll) => (
            <li key={poll.id} className="border p-2 rounded">
              {poll.title} — {poll.options.length} options
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
