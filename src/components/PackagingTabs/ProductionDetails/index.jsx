import { useState } from "react";

// Components
import ProductionStepper from "./ProductionStepper";
import NavigationButton from "../../NavigationButton";

export default function ProductionDetails({ productDetail, setActiveTab }) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <>
      <ProductionStepper
        productDetail={productDetail}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />
      {activeStep === 2 && (
        <NavigationButton
          text="Add Unused Raw Materials"
          onClick={() => setActiveTab(1)}
        />
      )}
    </>
  );
}
