
import { QRCodeCanvas } from "qrcode.react";

/* ---------- 1. QR GENERATE COMPONENT  ---------- */
export function PaymentQR({ upiURL, canvasId = "payment-qr" }) {
  return (
    <QRCodeCanvas
      id={canvasId}          
      value={upiURL}
      size={180}
      bgColor="#ffffff"
      fgColor="#000000"
      level="H"
      includeMargin={true}
    />
  );
}


export function downloadCanvasAsImage(canvasId, fileName = "qr-code.png") {
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.error("Canvas not found for id:", canvasId);
    return;
  }

  const dataUrl = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = fileName;
  link.click();
}