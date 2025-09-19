/**
 * Unit Tests – createPoll()
 *
 * Validates the behavior of the `createPoll` function, which inserts a new poll
 * and its options into Supabase. Uses Jest to mock Supabase client behavior
 * and simulate success and failure scenarios.
 *
 * 🔧 Mocks:
 * - `supabase.from("polls").insert(...)`: Simulates poll creation
 * - `supabase.from("poll_options").insert(...)`: Simulates option insertion
 *
 * 🧪 Test Cases:
 * 1. ✅ Successful poll creation with valid title and options
 * 2. ❌ Error thrown when title is missing
 * 3. ❌ Supabase insert failure is handled gracefully
 *
 * 🧠 Usage:
 * ```bash
 * npm test
 * ```
 *
 * 📁 Location:
 * - `__tests__/createPoll.test.ts`
 *
 * 🔐 Security Notes:
 * - Tests use mock data only; no real Supabase calls
 * - Ensure mocks are cleared between tests to avoid bleed
 *
 * 🧩 Extension Ideas:
 * - Add tests for duplicate titles or invalid option formats
 * - Validate user ownership and role-based restrictions
 * - Include audit logging verification
 *
 * 
 */



import { createPoll } from "../lib/polls";

// ✅ Mock Supabase client with table-specific behavior
jest.mock("../lib/supabaseClient", () => {
  const mockPollInsert = jest.fn((data: any[]) => ({
    select: () => ({
      single: () => ({
        data: {
          id: "poll123",
          title: data[0].title,
          user_id: data[0].user_id,
        },
        error: null,
      }),
    }),
  }));

  const mockOptionsInsert = jest.fn(() => ({
    error: null,
  }));

  return {
    supabase: {
      from: jest.fn((table: string) => {
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
  it("creates a poll successfully", async () => {
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
  it("throws an error if title is missing", async () => {
    await expect(
      createPoll({
        title: "",
        options: ["JS", "Python"],
        userId: "user123",
      })
    ).rejects.toThrow("Poll must have a title and at least 2 options");
  });

  // ✅ Test 3 — Supabase insert error
  it("handles Supabase insert error gracefully", async () => {
    const { supabase } = require("../lib/supabaseClient");

    supabase.from.mockImplementationOnce((table: string) => {
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
