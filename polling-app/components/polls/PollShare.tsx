/**
 * PollShare Component – QR Code Generator for Polls
 *
 * Renders a shareable QR code for a specific poll, allowing users to scan
 * and access the poll URL from any device. Ideal for mobile voting, live events,
 * and cross-platform sharing.
 *
 * 🔧 Props:
 * - `pollId: string` – Unique identifier for the poll (used to build the URL)
 *
 * 🧠 Behavior:
 * - On mount, constructs the full poll URL using `window.location.origin`
 * - Calls `generateQrCode(url)` to produce a base64-encoded QR image
 * - Displays the QR code with a caption
 *
 * 🧪 Example Usage:
 * ```tsx
 * <PollShare pollId="abc123" />
 * ```
 *
 * 📁 Location:
 * - `components/polls/PollShare.tsx`
 *
 * 🔐 Notes:
 * - Runs client-side only (`use client`)
 * - QR code is generated dynamically; consider caching for performance
 *
 * 🧩 Extension Ideas:
 * - Add "Copy Link" or "Download QR" button
 * - Support static rendering for pre-generated QR codes
 * - Embed QR in email templates or admin dashboards
 *
 * 
 */



"use client";

import { useEffect, useState } from "react";
import { generateQrCode } from "@/lib/utils/generateQrCode";

export default function PollShare({ pollId }: { pollId: string }) {
  const [qrCode, setQrCode] = useState<string>("");

  useEffect(() => {
    const url = `${window.location.origin}/poll/${pollId}`;
    generateQrCode(url).then(setQrCode);
  }, [pollId]);

  return (
    <div className="mt-4 text-center">
      <p className="mb-2 text-sm text-muted-foreground">Scan to vote:</p>
      {qrCode && <img src={qrCode} alt="QR code for poll" className="mx-auto w-48" />}
    </div>
  );
}
