import { useState, useEffect, useCallback, useContext } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { DataStore } from "@aws-amplify/datastore";
import { FormsContext } from "../contexts/FormsContext";
import { FormulaElement } from "../models";
import Images from "../constants/Images";
import { numberToCommas } from "../utils";

// Components
import NavigationButton from "./NavigationButton";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: "white",
  display: "flex",
  alignItems: "center",
  backgroundColor: "#F0F8FF",
}));

const DetailItem = ({ title, count, unit }) => {
  return (
    <Item>
      <Avatar
        alt="Product Element"
        src={Images.ingredient}
        sx={{ width: 56, height: 56 }}
      />
      <Box marginLeft={2}>
        <Typography component="h6" color="black" fontWeight="bold">
          {title}
        </Typography>
        <Typography
          component="p"
          color="#1976D2"
          marginTop={1}
          fontSize={28}
          fontWeight="bold"
        >
          {numberToCommas(count)} {unit}
        </Typography>
      </Box>
    </Item>
  );
};

const FormulaElementsList = ({ productDetail, setActiveTab }) => {
  const { productElements, setProductElements } = useContext(FormsContext);
  const [isLoading, setIsLoading] = useState(true);

  const getFormulaElements = useCallback(async () => {
    try {
      const productElements = await DataStore.query(FormulaElement);
      setProductElements(
        productElements.filter(
          (productElement) => productElement.productID === productDetail.id
        )
      );
      setIsLoading(false);
    } catch (error) {
      console.log("ERROR PRODUCT ELEMENTS LIST: ", error);
      setIsLoading(false);
    }
  }, [productDetail, setProductElements]);

  useEffect(() => {
    getFormulaElements();
  }, [getFormulaElements]);

  if (isLoading) {
    return <Typography variant="p">getting product elements...</Typography>;
  } else if (!productElements.length) {
    return (
      <Typography variant="p" fontWeight="bold" textAlign="center">
        Product elements not found!
      </Typography>
    );
  }

  return (
    <Stack spacing={2} marginTop={2}>
      {productElements.map((productElement) => (
        <DetailItem
          key={productElement.id}
          title={productElement.name}
          count={productElement.quantity}
          unit="kg"
        />
      ))}

      <NavigationButton
        text="Add Raw Material"
        onClick={() => setActiveTab(2)}
      />
    </Stack>
  );
};

export default FormulaElementsList;
