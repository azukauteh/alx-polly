/**
 * PollForm Component
 *
 * Allows users to create a new poll by entering a question and multiple options.
 * 
 * 🔒 Security: Validates input before submission.
 * 🧩 UX: Prevents empty options and duplicate entries.
 * ➕ Feature: Allows removing options and limits total options.
 * 📜 Docs: Inline comments for contributor clarity.
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const MAX_OPTIONS = 10;

export default function PollForm() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [error, setError] = useState("");

  // Add a new empty option
  const addOption = () => {
    if (options.length >= MAX_OPTIONS) {
      setError(`Maximum of ${MAX_OPTIONS} options allowed.`);
      return;
    }
    setOptions([...options, ""]);
    setError("");
  };

  // Remove an option by index
  const removeOption = (index: number) => {
    const updated = options.filter((_, i) => i !== index);
    setOptions(updated);
  };

  // Update option value
  const handleChange = (index: number, value: string) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  // Validate and submit poll
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedOptions = options.map((opt) => opt.trim()).filter(Boolean);
    const uniqueOptions = new Set(trimmedOptions);

    if (!question.trim()) {
      setError("Poll question is required.");
      return;
    }

    if (trimmedOptions.length < 2) {
      setError("At least two options are required.");
      return;
    }

    if (uniqueOptions.size !== trimmedOptions.length) {
      setError("Options must be unique.");
      return;
    }

    setError("");
    console.log({ question: question.trim(), options: trimmedOptions });

    // TODO: Submit to backend
  };

  return (
    <Card className="p-6 max-w-lg">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Poll question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />

          {options.map((opt, i) => (
            <div key={i} className="flex gap-2 items-center">
              <Input
                placeholder={`Option ${i + 1}`}
                value={opt}
                onChange={(e) => handleChange(i, e.target.value)}
                required
              />
              {options.length > 2 && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => removeOption(i)}
                >
                  ✕
                </Button>
              )}
            </div>
          ))}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button
            type="button"
            variant="secondary"
            onClick={addOption}
            disabled={options.length >= MAX_OPTIONS}
          >
            Add Option
          </Button>

          <Button type="submit" className="w-full">
            Create Poll
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
