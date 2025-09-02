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

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Database & Auth:** Supabase
- **Styling:** Tailwind CSS + shadcn/ui components
- **Forms:** react-hook-form with zod validation

---

## Folder Structure Rules

- `/app` → Next.js App Router pages and routes  
    - `/app/polls/` → Poll creation, listing, and voting UI  
    - `/app/api/` → API endpoints  
- `/components/ui` → shadcn/ui components  
- `/lib` → Supabase client setup & helpers  
- `/types` → TypeScript types  

---

## Supabase Rules

1. Always use the **Supabase client** from `/lib/supabase.ts`.
2. Store all environment variables in `.env.local`.
3. Use **Server Actions** for mutations instead of client-side fetch.
4. Avoid hardcoding Supabase URLs or keys.

---

## 🤖 AI-Assisted Development Workflow

To speed up development and maintain consistency, follow this AI-driven workflow:

### **1. Generate Components with Zed**
Use **Zed AI** to scaffold new components or refactor existing ones.  
Example:  
```bash
Ask Zed: Generate a new PollResultChart.tsx using @symbol:PollResults
2. Align Styling with @docs

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

Verification Checklist

Before merging changes, ensure:

✅ Uses Next.js App Router
✅ Supabase client used for DB/auth
✅ Server Actions for mutations
✅ Styling follows Tailwind + shadcn/ui
✅ Secrets loaded from .env.local

@symbol:PollResults  
Generate a React component `PollResultChart.tsx` that displays poll results using Recharts.
- Input: pollResults: { option: string, votes: number }[]
- Show a bar chart with Tailwind + shadcn/ui styling.
- Include hover tooltips showing vote counts.
- Follow project folder structure and rules from rules.md.
