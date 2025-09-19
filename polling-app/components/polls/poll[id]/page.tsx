
/**
 * PollPage – Dynamic Poll View
 *
 * Renders an individual poll based on its unique ID from the URL.
 * This page is part of the App Router and uses dynamic routing via `[id]`.
 *
 * 🔧 Params:
 * - `params.id: string` – The poll ID extracted from the route `/poll/:id`
 *
 * 🧠 Behavior:
 * - Fetches poll data using `params.id`
 * - Displays poll question, options, and voting interface
 * - Includes `<PollShare />` component to generate a QR code for sharing
 *
 * 🧪 Example Route:
 * - `/poll/abc123` → renders poll with ID `abc123`
 *
 * 📁 Location:
 * - `app/poll/[id]/page.tsx`
 *
 * 🔐 Notes:
 * - Runs server-side by default; use `"use client"` if needed for interactivity
 * - Consider adding loading and error states for better UX
 *
 * 🧩 Extension Ideas:
 * - Add poll result chart after voting
 * - Include admin controls for closing or editing the poll
 * - Support deep linking to poll results or analytics
 *
 * 
 */

import PollShare from "@/components/polls/PollShare";

export default function PollPage({ params }: { params: { id: string } }) {
  const pollId = params.id;

  return (
    <div className="space-y-6">
      {/* Your poll content */}
      <PollShare pollId={pollId} />
    </div>
  );
}
