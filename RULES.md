---
description: "Project-specific rules, coding conventions, and architectural guidelines for the Alx-polly Polling App."
globs:
  - "/app/**"
  - "/components/**
  - "/lib/**"
  - "/types/**"
alwaysApply: true
version: 1
---

# ALX Polling App — Project Rules & Conventions

You are an AI pair programmer assisting on the ALX Polling App codebase.  
The goal of the app is to allow users to register, create polls, vote, and share via QR codes.  
Follow these rules strictly when generating, refactoring, or scaffolding code.

---

## Technology Stack
- Framework: Next.js 14 (App Router)
- Language: TypeScript
- Database & Auth: Supabase
- Styling: Tailwind CSS + shadcn/ui
- Forms: react-hook-form (when needed)
- State Management: Prefer Server Components; use Client Components only where interactivity is required.
- QR Codes: Use the approved QR generation library (qrcode.react or equivalent).

---

## Folder Structure Rules
- `/app` → Next.js App Router pages and routes
    - `/app/polls/` → Poll creation, listing, and voting UI
    - `/app/api/` → API endpoints (if needed)
- `/components/ui/` → Reusable shadcn/ui components
- `/components/` → Custom project-specific components
- `/lib/` → Supabase client, server actions, and helper functions
- `/types/` → Centralized TypeScript types

Rule:  
Do not create new folders outside of these unless approved.

---

## Supabase Rules
1. Always use the Supabase client from `/lib/supabaseClient.ts` instead of creating new instances.
2. Use Supabase authentication for sign-up, login, and session handling.
3. All database queries must:
   - Be defined inside `/lib/` as helper functions OR
   - Be used inside Server Actions within the App Router.
4. Never hardcode API keys. Use `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-url.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-public-key
   SUPABASE_SERVICE_ROLE_KEY=your-secret-key
