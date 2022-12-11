import { useState, useEffect, useCallback, useContext } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DataStore } from "@aws-amplify/datastore";
import { Production, ProdutionLot } from "../models";
import { FormsContext } from "../contexts/FormsContext";

// Components
import PackagingTabs from "../components/PackagingTabs";

export default function Packaging() {
  const [activeTab, setActiveTab] = useState(0);
  const { updateProductionLots } = useContext(FormsContext);
  // const [productDetail, updateProductDetail] = useState(null);
  const [productionDetail, updateProductionDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // const { productId } = useParams();
  const { productionId } = useParams();

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

  const getProductionLots = useCallback(async () => {
    try {
      const productionLotsList = await DataStore.query(ProdutionLot, (item) =>
        item.productionID("eq", productionId)
      );
      const updatedList = productionLotsList.map((productionLot) => ({
        productionLotId: productionLot.id,
        lotName: productionLot.name,
        expireDate: productionLot.expirationDate,
        units: productionLot.units,
        lotCode: productionLot.code,
        productionID: productionId,
      }));
      updateProductionLots(updatedList);
      setIsLoading(false);
    } catch (error) {
      console.log("ERROR FORM DETAIL: ", error);
      setIsLoading(false);
    }
  }, [productionId, updateProductionLots]);

  const getProductionDetails = useCallback(async () => {
    try {
      const productionDetail = await DataStore.query(Production, productionId);
      updateProductionDetail(productionDetail);
      setIsLoading(false);
    } catch (error) {
      console.log("ERROR FORM DETAIL: ", error);
      setIsLoading(false);
    }
  }, [productionId]);

  // useEffect(() => {
  //   getProductDetails();
  // }, [getProductDetails]);

  // const getProductDetails = useCallback(async () => {
  //   try {
  //     const productDetail = await DataStore.query(Product, productId);
  //     updateProductDetail(productDetail);
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.log("ERROR FORM DETAIL: ", error);
  //     setIsLoading(false);
  //   }
  // }, [productId]);

  useEffect(() => {
    getProductionDetails();
    getProductionLots();
  }, [getProductionDetails, getProductionLots]);

  // useEffect(() => {
  //   getProductDetails();
  // }, [getProductDetails]);

  if (isLoading) {
    return <Typography variant="p">getting production data...</Typography>;
  } else if (!productionDetail) {
    return (
      <Typography variant="p" fontWeight="bold" textAlign="center">
        Production not found!
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
        {productionDetail?.name || ""}
      </Typography>
      <PackagingTabs
        productionDetail={productionDetail}
        // productDetail={productDetail}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </Box>
  );
}
