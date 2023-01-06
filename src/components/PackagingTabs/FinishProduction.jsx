import { useContext } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { styled } from "@mui/material/styles";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { FormsContext } from "../../contexts/FormsContext";
import { numberToCommas } from "../../utils";

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
            {data.rawMaterialName}
          </Typography>
          {data.status ? (
            <TaskAltIcon sx={{ color: "#40b300" }} />
          ) : (
            <HighlightOffIcon sx={{ color: "red" }} />
          )}
        </Box>
        <Box display="flex" alignItems="center" marginTop="1rem">
          <RawMaterialReportItem
            title="Quantity"
            qty={numberToCommas(data.totalQty)}
          />
          <RawMaterialReportItem
            title="Production"
            qty={numberToCommas(data.productionQty)}
          />
          <RawMaterialReportItem
            title="Not Used"
            qty={numberToCommas(data.notUsedQty)}
          />
          <RawMaterialReportItem
            title="Wasted"
            qty={numberToCommas(data.wastedQty)}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default function FinishProduction({ productionDetail }) {
  const { rawMaterialsList } = useContext(FormsContext);

  const finalReport = rawMaterialsList.map((rawMaterial) => {
    const { rawMaterialId, rawMaterialName, lrmList } = rawMaterial;
    const totalQty = lrmList.reduce((sum, acc) => sum + acc.quantity, 0);
    const productionQty = lrmList.reduce(
      (sum, acc) => sum + acc.useQuantity,
      0
    );
    const notUsedQty = lrmList.reduce(
      (sum, acc) => sum + acc.notUsedQuantity,
      0
    );
    const wastedQty = lrmList.reduce((sum, acc) => sum + acc.wasteQuantity, 0);

    return {
      rawMaterialId,
      rawMaterialName,
      totalQty,
      productionQty,
      notUsedQty,
      wastedQty,
      status: totalQty === productionQty + notUsedQty + wastedQty,
    };
  });

  const isPassed = finalReport.every((item) => item.status);

  console.log(productionDetail, "productionDetail");

  return (
    <FinishProductionContainer>
      {finalReport.length ? (
        <>
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
          <Typography
            variant="p"
            component="p"
            textAlign="center"
            marginTop="1rem"
          >
            {isPassed
              ? "Successfully added the quantities of the Production"
              : "Input the correct quantities to finish the Production Form"}
          </Typography>
          {finalReport.map((data, i) => (
            <RawMaterialReport key={`raw-material-report-${i}`} data={data} />
          ))}
        </>
      ) : (
        <Typography variant="p" fontWeight="bold" textAlign="center">
          No data!
        </Typography>
      )}
    </FinishProductionContainer>
  );
}
