 //Reusable QR code generator

 "use client"

import { QRCodeCanvas } from "qrcode.react"

export default function QRCodeGenerator({ url }: { url: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <QRCodeCanvas value={url} size={150} />
      <p className="text-xs text-muted-foreground">Scan to vote</p>
    </div>
  )
}
