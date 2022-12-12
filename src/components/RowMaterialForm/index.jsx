import { useContext, useState, useEffect, useCallback } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { DataStore } from "@aws-amplify/datastore";
import { FormulaElement, MaterialRaw, RawMaterialLot } from "../../models";
import { FormsContext } from "../../contexts/FormsContext";

// Components
import DetailItem from "./DetailItem";
import LotRawMaterialFormModal from "./LotRawMaterialFormModal";
import NavigationButton from "../NavigationButton";

function RowMaterialForm({ productionDetail, productId, setActiveTab }) {
  const {
    productElements,
    setProductElements,
    rawMaterialsList,
    updateRawMaterialsList,
  } = useContext(FormsContext);
  const [isLoading, setIsLoading] = useState(true);
  const [modalStatus, setOpen] = useState({ isOpen: false, data: null });

  const handleModalClose = () => {
    setOpen({ isOpen: false, data: null });
  };

  const handleModalOpen = (data) => {
    setOpen({ isOpen: true, data });
  };

  const getRawMaterials = useCallback(async () => {
    try {
      const rawMaterials = await DataStore.query(MaterialRaw, (item) =>
        item.productionID("eq", productionDetail.id)
      );
      const rmLotsPromise = rawMaterials.map((rawMaterial) =>
        DataStore.query(RawMaterialLot, (item) =>
          item.materialrawID("eq", rawMaterial.id)
        )
      );
      const rawMaterialLots = await Promise.all(rmLotsPromise);
      const updatedRawMaterialsList = rawMaterials.map((rawMaterial, i) => ({
        rawMaterialId: rawMaterial.id,
        rawMaterialName: rawMaterial.name,
        productionId: rawMaterial.productionID,
        productElementId: rawMaterial.formulaelementID,
        lrmList: rawMaterialLots[i],
      }));
      updateRawMaterialsList(updatedRawMaterialsList);
      setIsLoading(false);
    } catch (error) {
      console.log("ERROR RAW MATERIALS LIST: ", error);
      setIsLoading(false);
    }
  }, [productionDetail, updateRawMaterialsList]);

  const getFormulaElements = useCallback(async () => {
    try {
      const productElements = await DataStore.query(FormulaElement);
      setProductElements(
        productElements.filter(
          (productElement) => productElement.productID === productId
        )
      );
      getRawMaterials();
    } catch (error) {
      console.log("ERROR PRODUCT ELEMENTS LIST: ", error);
      setIsLoading(false);
    }
  }, [productId, setProductElements, getRawMaterials]);

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

  const rmWithLRM = rawMaterialsList.map(
    (rawMaterial) => !!rawMaterial?.lrmList?.length
  );
  const isRMAdded = rmWithLRM.length === productElements.length;

  return (
    <Stack spacing={2} marginTop={2}>
      {productElements.map((productElement, itemIndex) => (
        <DetailItem
          key={productElement.id}
          productElementId={productElement.id}
          title={productElement.name}
          count={productionDetail.expectedUnits * productElement.quantity}
          unit="kg"
          handleModalOpen={handleModalOpen}
        />
      ))}
      {modalStatus.isOpen && (
        <LotRawMaterialFormModal
          modalStatus={modalStatus}
          handleClose={handleModalClose}
          productionId={productionDetail.id}
        />
      )}

      <NavigationButton
        text="See Raw Materials Abstract"
        onClick={() => setActiveTab(3)}
        disabled={!isRMAdded}
      />
    </Stack>
  );
}

export default RowMaterialForm;
