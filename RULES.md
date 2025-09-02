---
description: "Project-specific rules, coding conventions, and architectural guidelines for the Polling App."
globs:
  - "/app/"
  - "/components/"
  - "/lib/"
  - "/types/"
alwaysApply: true
version: 1
---

# Polling App — Project Rules & Conventions

You are an AI pair programmer assisting on the ALX Polling App codebase.  
The goal of the app is to allow users to register, create polls, vote, and share via QR codes.  

Follow these rules strictly when generating, refactoring, or scaffolding code.

---

## Technology Stack

- Framework: Next.js 14 (App Router)
- Language: TypeScript
- Database & Auth: Supabase

---

## Folder Structure Rules

- `/app` → Next.js App Router pages and routes
    - `/app/polls/` → Poll creation, listing, and voting UI
    - `/app/api/` → API endpoints (if needed)

---

## Supabase Rules

1. Always use the Supabase client from `/lib/supabaseClient.ts` instead of creating new instances.
2. Use Supabase authentication for sign-up, login, and session handling.
3. All database queries must:

### .1 Generate Components with Zed
Use **Zed AI** to scaffold new components or refactor existing ones.  
Example:  
```bash
Ask Zed: Generate a new PollResultChart.tsx using @symbol:PollResults

. Align Styling with @docs
After generating a component, cross-check with styling docs:
Use @docs to ensure Tailwind + shadcn/ui styles are consistent.

3. Preview & Commit in Cursor

Switch to Cursor to review and commit changes:

@Commit: Preview diff for PollResultChart.tsx before committing.

4. Write Tests in Trae

Use Trae AI to generate tests:

#File:PollResultChart.tsx
#Docs:polls-api.md

5. Keep Rules Updated

If AI-generated code violates our patterns, update this rules.md so all tools stay in sync.

@symbol:PollResults  
Generate a React component `PollResultChart.tsx` that displays poll results using Recharts.
- Input: pollResults: { option: string, votes: number }[]
- Show a bar chart with Tailwind + shadcn/ui styling.
- Include hover tooltips showing vote counts.
- Follow project folder structure and rules from rules.md.

Verification Checklist

Before merging changes, ensure:

✅ Uses Next.js App Router
✅ Supabase client used for DB/auth
✅ Server Actions for mutations
✅ Styling follows Tailwind + shadcn/ui
✅ Secrets loaded from .env.local

