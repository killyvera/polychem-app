import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { styled } from "@mui/material/styles";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

// dummy content
const dataArr = [
  {
    rName: "Raw Material 01",
    status: true,
    quantity: 60,
    production: 68,
    notUsed: 1.8,
    wasted: 0.2,
  },
  {
    rName: "Raw Material 02",
    status: true,
    quantity: 50,
    production: 48,
    notUsed: 0.8,
    wasted: 0.1,
  },
  {
    rName: "Raw Material 03",
    status: false,
    quantity: 80,
    production: 75,
    notUsed: 1.6,
    wasted: 0.9,
  },
];

const FinishProductionContainer = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

const RawMaterialReportItem = ({ title, qty }) => {
  return (
    <Box
      flex={1}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="p" component="p" fontWeight="bold">
        {title}
      </Typography>
      <Typography variant="p" component="p" marginTop="0.25rem">
        {qty} kg
      </Typography>
    </Box>
  );
};

const RawMaterialReport = ({ data }) => {
  return (
    <Card sx={{ marginTop: "1rem", width: "100%", maxWidth: 600 }}>
      <CardContent sx={{ paddingBottom: "1rem !important" }}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography
            variant="p"
            component="p"
            fontWeight="bold"
            color="#1976D2"
            marginRight="1rem"
          >
            {data.rName}
          </Typography>
          {data.status ? (
            <TaskAltIcon sx={{ color: "#40b300" }} />
          ) : (
            <HighlightOffIcon sx={{ color: "red" }} />
          )}
        </Box>
        <Box display="flex" alignItems="center" marginTop="1rem">
          <RawMaterialReportItem title="Quantity" qty={data.quantity} />
          <RawMaterialReportItem title="Production" qty={data.production} />
          <RawMaterialReportItem title="Not Used" qty={data.notUsed} />
          <RawMaterialReportItem title="Wasted" qty={data.wasted} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default function FinishProduction() {
  const isPassed = dataArr.every((item) => item.status);

  return (
    <FinishProductionContainer>
      <Box
        marginTop="1rem"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {isPassed && (
          <Button variant="contained" sx={{ marginRight: "1rem" }}>
            Finish Production
          </Button>
        )}
        {isPassed ? (
          <TaskAltIcon sx={{ color: "#40b300", fontSize: "3rem" }} />
        ) : (
          <HighlightOffIcon sx={{ color: "red", fontSize: "3rem" }} />
        )}
      </Box>
      <Typography variant="p" component="p" textAlign="center" marginTop="1rem">
        {isPassed
          ? "Successfully added the quantities of the Production"
          : "Input the correct quantities to finish the Production Form"}
      </Typography>
      {dataArr.map((data, i) => (
        <RawMaterialReport key={`raw-material-report-${i}`} data={data} />
      ))}
    </FinishProductionContainer>
  );
}
