"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const samplePolls = [
  {
    id: 1,
    question: "What programming language do you prefer?",
    options: ["Python", "C++", "Java", "Go", "Ruby"],
  },
  {
    id: 2,
    question: "Which front-end framework do you think is the best?",
    options: ["React", "Vue", "Angular", "Svelte"],
  },
  {
    id: 3,
    question: "Which database do you prefer to work with?",
    options: ["PostgreSQL", "MySQL", "MongoDB", "SQLite", "Firebase", "Supabase"],
  },
];

export default function PollsPage() {
  const [votes, setVotes] = useState<{ [key: number]: string | null }>({});

  const handleVote = (pollId: number, option: string) => {
    // If the user has already voted, do nothing
    if (votes[pollId]) return;

    setVotes((prev) => ({
      ...prev,
      [pollId]: option,
    }));
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Available Polls</h1>
      <p className="text-gray-600">
        Select a poll below and cast your vote!
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {samplePolls.map((poll) => (
          <Card key={poll.id} className="shadow-lg border rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {poll.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {poll.options.map((option, idx) => (
                <Button
                  key={idx}
                  variant={votes[poll.id] === option ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => handleVote(poll.id, option)}
                  disabled={!!votes[poll.id]}
                >
                  {votes[poll.id] === option ? (
                    <CheckCircle className="w-4 h-4 mr-2" />
                  ) : null}
                  {option}
                </Button>
              ))}

              {votes[poll.id] && (
                <p className="text-green-600 text-sm mt-3">
                  ✅ You voted for <strong>{votes[poll.id]}</strong>
                </p>
              )}

              <Button
                className="w-full mt-4"
                variant="secondary"
                onClick={() => alert("Results feature coming soon!")}
              >
                View Results
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
