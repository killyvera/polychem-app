import { useState } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

// Components
import QRContainer from "./QRContainer";
import SearchEmployee from "./SearchEmployee";

const EmployeeStaffContainer = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  margin: "0 auto",
  width: "75%",
  display: "flex",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    width: "100%",
  },
}));

export default function EmployeeStaff({ productId, productionId }) {
  const [qrResult, setQRResult] = useState("");

  return (
    <EmployeeStaffContainer>
      <QRContainer qrResult={qrResult} setQRResult={setQRResult} />
      <SearchEmployee
        productId={productId}
        productionId={productionId}
        qrResult={qrResult}
        setQRResult={setQRResult}
      />
    </EmployeeStaffContainer>
  );
}
