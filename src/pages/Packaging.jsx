import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DataStore } from "@aws-amplify/datastore";
import { Product } from "../models";

// Components
import PackagingTabs from "../components/PackagingTabs";

export default function Packaging() {
  const [activeTab, setActiveTab] = useState(0);
  const [productDetail, updateProductDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { productId } = useParams();

  const getPageTitle = () => {
    let pageTitle = "Production Details";
    switch (activeTab) {
      case 0:
        pageTitle = "Production Details";
        break;
      case 1:
        pageTitle = "Unused Raw Material";
        break;
      case 2:
        pageTitle = "Wasted Raw Materials";
        break;
      case 3:
        pageTitle = "Finish Production";
        break;
      default:
        pageTitle = "Production Details";
        break;
    }
    return pageTitle;
  };

  const getProductDetails = useCallback(async () => {
    try {
      const productDetail = await DataStore.query(Product, productId);
      updateProductDetail(productDetail);
      setIsLoading(false);
    } catch (error) {
      console.log("ERROR FORM DETAIL: ", error);
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    getProductDetails();
  }, [getProductDetails]);

  if (isLoading) {
    return <Typography variant="p">getting product data...</Typography>;
  } else if (!productDetail) {
    return (
      <Typography variant="p" fontWeight="bold" textAlign="center">
        Product not found!
      </Typography>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h5" fontWeight="bold">
        {getPageTitle()}
      </Typography>
      <Typography component="p" marginTop={2} color="#1976D2">
        <span style={{ fontWeight: "bold" }}>Product Name: </span>
        {productDetail?.name || ""}
      </Typography>
      <PackagingTabs
        productDetail={productDetail}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </Box>
  );
}
