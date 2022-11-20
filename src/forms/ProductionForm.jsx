import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DataStore } from "@aws-amplify/datastore";
import { Form } from "../models";

// Components
import ProductionDetailTabs from "./ProductionDetailTabs";

export function ProductionForm() {
  const [activeTab, setActiveTab] = useState(0);
  const [formDetail, updateFormDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { formId } = useParams();

  const getPageTitle = () => {
    let pageTitle = "Production Details";
    switch (activeTab) {
      case 0:
        pageTitle = "Production Details";
        break;
      case 1:
        pageTitle = "Formula Elements";
        break;
      case 2:
        pageTitle = "Row Materials";
        break;
      case 3:
        pageTitle = "Row Materials Abstract";
        break;
      default:
        pageTitle = "Production Details";
        break;
    }
    return pageTitle;
  };

  const getFormDetails = useCallback(async () => {
    try {
      const formDetail = await DataStore.query(Form, formId);
      updateFormDetail(formDetail);
      setIsLoading(false);
    } catch (error) {
      console.log("ERROR FORM DETAIL: ", error);
      setIsLoading(false);
    }
  }, [formId]);

  useEffect(() => {
    getFormDetails();
  }, [getFormDetails]);

  if (isLoading) {
    return <Typography variant="p">getting form data...</Typography>;
  } else if (!formDetail) {
    return (
      <Typography variant="p" fontWeight="bold" textAlign="center">
        Form not found!
      </Typography>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h5" fontWeight="bold">
        {getPageTitle()}
      </Typography>
      <Typography component="p" marginTop={2} color="#1976D2">
        <span style={{ fontWeight: "bold" }}>Form Name: </span>
        {formDetail.name}
      </Typography>
      <Typography component="p" color="#1976D2">
        <span style={{ fontWeight: "bold" }}>Form Description: </span>
        {formDetail?.description || ""}
      </Typography>
      <ProductionDetailTabs
        productionDetail={formDetail?.Production}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </Box>
  );
}
