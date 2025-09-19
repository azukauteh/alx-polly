
/**
 * Resend Email Client
 *
 * Initializes the Resend API client for sending transactional emails.
 * Used across the app to deliver notifications such as poll closing alerts,
 * vote confirmations, and admin messages.
 *
 * 🔧 Configuration:
 * - Requires `RESEND_API_KEY` to be set in `.env`
 * - API key should never be hardcoded or exposed in logs
 *
 * 🧠 Usage:
 * ```ts
 * import { resend } from "@/lib/email/client";
 *
 * await resend.emails.send({
 *   from: "polls@alxpolly.com",
 *   to: "user@example.com",
 *   subject: "Your poll is closing soon",
 *   react: <PollClosingEmail pollTitle="Best Snack" />,
 * });
 * ```
 *
 * 📁 Location:
 * - `lib/email/client.ts`
 *
 * 🔐 Security Notes:
 * - Store API key in `.env` and `.env.example`
 * - Rotate keys periodically and monitor usage
 * - Avoid sending sensitive data in email bodies
 *
 * 
 */

import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);
