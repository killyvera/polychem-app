import { useState, useEffect, useCallback } from "react";
import QRCode from "qrcode";
import { Stack } from "@mui/system";

export function QrCodeGenerator({ userId }) {
  const [src, setSrc] = useState("");

  const generateQRCode = useCallback(async () => {
    try {
      const userQR = await QRCode.toDataURL(userId);
      setSrc(userQR);
    } catch (error) {
      console.log("User QR Code Error: ", error);
    }
  }, [userId]);

  useEffect(() => {
    generateQRCode();
  }, [generateQRCode]);

  return (
    <Stack>
      <img src={src} alt="QR Usuario" />
    </Stack>
  );
}
