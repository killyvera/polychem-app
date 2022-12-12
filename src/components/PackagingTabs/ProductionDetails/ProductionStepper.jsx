import { useContext } from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { FormsContext } from "../../../contexts/FormsContext";

// Components
// import ProductDetails from "./ProductDetails";
import AddLotProduction from "./AddLotProduction";
import AddPallets from "./AddPallets";

const stepsDetails = [
  // { stepName: "Product Details" },
  { stepName: "Add Lot Production" },
  { stepName: "Add Pallets" },
];

export default function ProductionStepper({
  productionDetail,
  activeStep,
  setActiveStep,
  setActiveTab,
}) {
  const theme = useTheme();

  const { productionLots, palletsList } = useContext(FormsContext);

  // const handleProductStepDetailsSubmit = (ev) => {
  //   ev.preventDefault();
  //   if (activeStep === 0) {
  //     handleNext();
  //   }
  // };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const _renderSteps = () => {
    switch (activeStep) {
      // case 0:
      //   return (
      //     <form onSubmit={handleProductStepDetailsSubmit}>
      //       <ProductDetails productDetail={productDetail} />
      //       <MobileStepper
      //         variant="progress"
      //         steps={maxSteps}
      //         position="static"
      //         activeStep={activeStep}
      //         nextButton={
      //           <Button
      //             size="small"
      //             disabled={activeStep === maxSteps - 1}
      //             type="submit"
      //           >
      //             Next
      //             {theme.direction === "rtl" ? (
      //               <KeyboardArrowLeft />
      //             ) : (
      //               <KeyboardArrowRight />
      //             )}
      //           </Button>
      //         }
      //         backButton={
      //           <Button
      //             size="small"
      //             onClick={handleBack}
      //             disabled={activeStep === 0}
      //           >
      //             {theme.direction === "rtl" ? (
      //               <KeyboardArrowRight />
      //             ) : (
      //               <KeyboardArrowLeft />
      //             )}
      //             Back
      //           </Button>
      //         }
      //       />
      //     </form>
      //   );
      case 0:
        return (
          <>
            <AddLotProduction productionId={productionDetail.id} />
            <MobileStepper
              variant="progress"
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  disabled={
                    activeStep === maxSteps - 1 || !productionLots.length
                  }
                  onClick={handleNext}
                >
                  Next
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  Back
                </Button>
              }
            />
          </>
        );
      case 1:
        return (
          <>
            <AddPallets productionDetail={productionDetail} />
            <MobileStepper
              variant="progress"
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  disabled={activeStep === maxSteps - 2 || !palletsList.length}
                  onClick={() => setActiveTab(1)}
                >
                  Next
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  Back
                </Button>
              }
            />
          </>
        );
      default:
        return null;
    }
  };

  const maxSteps = stepsDetails.length;

  return (
    <Box
      sx={{
        flexGrow: 1,
        margin: "2rem auto 0 auto",
        maxWidth: 600,
      }}
    >
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 35,
          bgcolor: "background.default",
        }}
      >
        <Typography
          variant="h6"
          component="h6"
          fontWeight="bold"
          color="#1976D2"
        >
          {stepsDetails[activeStep].stepName}
        </Typography>
      </Paper>
      <Box sx={{ width: "100%", margin: "1rem 0" }}>{_renderSteps()}</Box>
    </Box>
  );
}
