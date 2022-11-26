import { useState } from "react";
import Box from "@mui/material/Box";

// Components
import QRContainer from "./QRContainer";
import SearchEmployee from "./SearchEmployee";

export default function EmployeeStaff({ productId }) {
  const [qrResult, setQRResult] = useState("");

  return (
    <Box margin="0 auto" width="75%" display="flex">
      <QRContainer setQRResult={setQRResult} />
      <SearchEmployee productId={productId} qrResult={qrResult} />
    </Box>
  );
}
