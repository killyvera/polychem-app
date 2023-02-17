import { useState } from "react";
import { QrReader } from "react-qr-reader";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import CameraswitchIcon from "@mui/icons-material/Cameraswitch";

const QRReaderContainer = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  width: "100%",
  margin: "0 auto",
  marginTop: theme.spacing(6),
  marginBottom: theme.spacing(2),
  flex: 1,
  position: "relative",
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

const CameraSwitchIconContainer = styled(IconButton)(({ theme }) => ({
  ...theme.typography.body2,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#1976d2",
  position: "absolute",
  top: -22.5,
  width: 45,
  height: 45,
  left: 0,
  right: 0,
  margin: "0 auto",
  zIndex: 1,
  "&:hover": {
    backgroundColor: "#1976d2",
  },
}));

export default function QRContainer({ setQRResult }) {
  const [qrError, setQRError] = useState("");
  const [facingMode, setFacingMode] = useState("user");
  const [loading, setLoading] = useState(false);

  return (
    <QRReaderContainer>
      {!qrError ? (
        <>
          {!loading ? (
            <QrReader
              containerStyle={{ display: "flex", justifyContent: "flex-end" }}
              videoContainerStyle={{
                paddingTop: "75%",
                borderRadius: "1rem",
              }}
              constraints={{
                facingMode,
              }}
              scanDelay={1500}
              onResult={(result, error, codeReader) => {
                if (error) {
                  setQRError(error.message);
                } else {
                  setQRResult(result.text);
                  setQRError("");
                }
              }}
            />
          ) : (
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
              sx={{ minHeight: 246 }}
            />
          )}
          <CameraSwitchIconContainer
            onClick={() => {
              setLoading(true);
              setFacingMode(facingMode === "user" ? "environment" : "user");
              setTimeout(() => {
                setLoading(false);
              }, 500);
            }}
          >
            <CameraswitchIcon sx={{ fontSize: "2rem", color: "#fff" }} />
          </CameraSwitchIconContainer>
        </>
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
