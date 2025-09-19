import QRCode from "qrcode";

/**
 * Generates a QR code data URL for a given poll URL.
 *
 * @param url - The full URL to the poll (e.g., https://alxpolly.com/poll/abc123)
 * @returns A base64-encoded image string (data URL)
 */
export async function generateQrCode(url: string): Promise<string> {
  try {
    return await QRCode.toDataURL(url, {
      margin: 2,
      width: 300,
    });
  } catch (error) {
    console.error("QR code generation failed:", error);
    throw new Error("Unable to generate QR code");
  }
}
