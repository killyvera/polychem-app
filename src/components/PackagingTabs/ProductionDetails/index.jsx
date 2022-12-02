import { useState } from "react";

// Components
import ProductionStepper from "./ProductionStepper";

export default function ProductionDetails({ productDetail, setActiveTab }) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <ProductionStepper
      productDetail={productDetail}
      activeStep={activeStep}
      setActiveStep={setActiveStep}
      setActiveTab={setActiveTab}
    />
  );
}
