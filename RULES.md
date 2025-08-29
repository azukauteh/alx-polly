---
description: "Project-specific coding rules for the Polling App with QR Code Sharing, guiding folder structure, forms, Supabase usage, and AI-assisted patterns."
globs:
  - "/app/**"
  - "/components/**"
  - "/lib/**"
alwaysApply: true
version: 1
---

## Polling App Project Rules

### 1. Folder Structure
- Routes live inside `/app/polls/` and `/app/api/`.
- UI components live in `/components/ui/` (shadcn/ui components) or `/components/` (custom components).
- Utilities, Supabase client setup, and server actions live in `/lib/`.

### 2. Forms & UI
- Use `react-hook-form` for form handling wherever forms are required (e.g., create poll, submit vote).
- Use shadcn/ui components for buttons, inputs, cards, dialogs, etc.
- Every form should call a Server Action rather than doing fetch on the client side.
- Ensure all inputs and buttons have clear labels and accessible focus states.

### 3. Supabase Usage
- Use Supabase for user authentication (sign-up, login) and database CRUD.
- Never hardcode Supabase keys; always use `.env.local` with `process.env`.
- All database interactions (poll creation, voting, fetching results) must use the Supabase client in server components or server actions.

### 4. AI-Assisted Patterns
- Use AI to scaffold forms, pages, and utilities, but always check against existing rules.
- Example rule: “Create a form to submit a new poll” — the form must be inside `/app/polls/create`, use `react-hook-form`, and submit via a Server Action to Supabase.

### 5. Verification
- Before committing, check:
  - Are routes in `/app/polls` and `/app/api`?
  - Are forms using `react-hook-form` and shadcn/ui components?
  - Are Supabase keys and operations secure and correct?
  - Does AI-generated code follow the existing folder structure and server/client component rules?
