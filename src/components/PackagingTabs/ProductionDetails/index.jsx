import { useState } from "react";

// Components
import ProductionStepper from "./ProductionStepper";

export default function ProductionDetails({ productionDetail, setActiveTab }) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <ProductionStepper
      productionDetail={productionDetail}
      activeStep={activeStep}
      setActiveStep={setActiveStep}
      setActiveTab={setActiveTab}
    />
  );
}
