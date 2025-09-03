
import { createPoll } from "../lib/polls";

// ✅ Mock Supabase client with table-specific behavior
jest.mock("../lib/supabaseClient", () => {
  const mockPollInsert = jest.fn((data) => ({
    select: () => ({
      single: () => ({
        data: { id: "poll123", title: data[0].title, user_id: data[0].user_id },
        error: null,
      }),
    }),
  }));

  const mockOptionsInsert = jest.fn(() => ({
    error: null,
  }));

  return {
    supabase: {
      from: jest.fn((table) => {
        if (table === "polls") {
          return { insert: mockPollInsert };
        }
        if (table === "poll_options") {
          return { insert: mockOptionsInsert };
        }
        return { insert: jest.fn(() => ({ error: null })) };
      }),
    },
  };
});

describe("createPoll", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ✅ Test 1 — Successful poll creation
  it("should create a poll successfully", async () => {
    const result = await createPoll({
      title: "Best Language",
      options: ["JS", "Python"],
      userId: "user123",
    });

    expect(result).toEqual({
      id: "poll123",
      title: "Best Language",
      user_id: "user123",
    });
  });

  // ✅ Test 2 — Missing title
  it("should throw an error if title is missing", async () => {
    await expect(
      createPoll({ title: "", options: ["JS", "Python"], userId: "user123" })
    ).rejects.toThrow("Poll must have a title and at least two options");
  });

  // ✅ Test 3 — Supabase error
  it("should handle Supabase error gracefully", async () => {
    // Override poll insert to simulate error
    const { supabase } = require("../lib/supabaseClient");
    supabase.from.mockImplementationOnce((table) => {
      if (table === "polls") {
        return {
          insert: () => ({
            select: () => ({
              single: () => ({
                data: null,
                error: new Error("Insert failed"),
              }),
            }),
          }),
        };
      }
      return { insert: jest.fn(() => ({ error: null })) };
    });

    await expect(
      createPoll({
        title: "Best Language",
        options: ["JS", "Python"],
        userId: "user123",
      })
    ).rejects.toThrow("Insert failed");
  });
});
