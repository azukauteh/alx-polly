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