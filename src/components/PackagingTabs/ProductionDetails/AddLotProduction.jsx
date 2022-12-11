import { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { DataStore } from "@aws-amplify/datastore";
import { ProdutionLot } from "../../../models";
import { FormsContext } from "../../../contexts/FormsContext";

// Components
import ProductionLotForm from "./ProductionLotForm";
import ProductionLots from "./ProductionLots";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};

const AddLotProductionContainer = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  marginTop: theme.spacing(2),
}));

const HeadingContainer = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
}));

export default function AddLotProduction({ productionId }) {
  const { productionLots, updateProductionLots } = useContext(FormsContext);
  const [addNewModal, setAddNewModal] = useState(false);

  const handleAddProductionLot = async (formData) => {
    const updatedProductionLots = [...productionLots];
    try {
      const savedProductionLot = await DataStore.save(
        new ProdutionLot({
          name: formData.lotName,
          code: formData.lotCode,
          expirationDate: formData.expireDate,
          units: parseFloat(formData.units),
          productionID: productionId,
        })
      );
      updatedProductionLots.push({
        ...formData,
        productionID: productionId,
        productionLotId: savedProductionLot.id,
      });
      updateProductionLots(updatedProductionLots);
    } catch (error) {
      console.log("ADD PRODUCTION LOT ERROR: ", error);
    }
    setAddNewModal(false);
  };

  const handleRemoveProductionLot = async (itemIndex, productionLotId) => {
    const updatedProductionLots = [...productionLots];
    try {
      await DataStore.delete(ProdutionLot, productionLotId);
      updatedProductionLots.splice(itemIndex, 1);
      updateProductionLots(updatedProductionLots);
    } catch (error) {
      console.log("DELETE PRODUCTION LOT ERROR: ", error);
    }
  };

  return (
    <AddLotProductionContainer>
      <HeadingContainer>
        {!!productionLots.length && (
          <Tooltip title="Add New Production Lot">
            <IconButton onClick={() => setAddNewModal(true)}>
              <AddCircleOutlineIcon />
            </IconButton>
          </Tooltip>
        )}
      </HeadingContainer>
      {productionLots.length ? (
        productionLots.map((item, i) => (
          <ProductionLots
            key={`production-lot-${i}`}
            data={{ ...item, itemIndex: i }}
            handleRemoveProductionLot={handleRemoveProductionLot}
          />
        ))
      ) : (
        <ProductionLotForm handleAddProductionLot={handleAddProductionLot} />
      )}
      {addNewModal && (
        <Modal open={addNewModal} onClose={() => setAddNewModal(false)}>
          <Box sx={style}>
            <Typography
              variant="p"
              component="p"
              fontWeight="bold"
              color="#1976D2"
              marginBottom={2}
            >
              Add Lot Production
            </Typography>
            <ProductionLotForm
              handleAddProductionLot={handleAddProductionLot}
            />
          </Box>
        </Modal>
      )}
    </AddLotProductionContainer>
  );
}
