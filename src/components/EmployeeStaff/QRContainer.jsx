import { useState } from "react";
import { QrReader } from "react-qr-reader";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const QRReaderContainer = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  width: "100%",
  margin: "0 auto",
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  flex: 1,
}));

const ErrorContainer = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}));

export default function QRContainer({ setQRResult }) {
  const [qrError, serQRError] = useState("");

  return (
    <QRReaderContainer>
      {!qrError ? (
        <QrReader
          containerStyle={{ display: "flex", justifyContent: "flex-end" }}
          videoContainerStyle={{
            paddingTop: "75%",
            borderRadius: "1rem",
          }}
          scanDelay={1500}
          onResult={(result, error, codeReader) => {
            if (error) {
              serQRError(error.message);
            } else {
              setQRResult(result.text);
              serQRError("");
            }
          }}
        />
      ) : (
        <ErrorContainer
          sx={
            qrError
              ? {
                  width: "100%",
                  height: "456px",
                  display: "flex",
                  justifyContent: "center",
                }
              : null
          }
        >
          <Typography variant="p" fontWeight="bold" color="#f13737">
            {qrError}: Please allow camera to read QR Code
          </Typography>
        </ErrorContainer>
      )}
    </QRReaderContainer>
  );
}
