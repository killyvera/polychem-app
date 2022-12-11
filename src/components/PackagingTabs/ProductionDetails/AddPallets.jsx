import { useState, useContext, useEffect, useCallback } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import { DataStore } from "@aws-amplify/datastore";
import { Pallet, Package } from "../../../models";
import { FormsContext } from "../../../contexts/FormsContext";

// Components
import PalletListItem from "./PalletListItem";
import AddNewPalletModal from "./AddNewPalletModal";

const AddLotProductionContainer = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  height: "fit-content",
  marginBottom: theme.spacing(2),
}));

const HeadingContainer = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
}));

const getParsedData = (palletPackages) => {
  return palletPackages.map((item) => ({
    packageId: item.id,
    packageName: item.name,
    packageCode: item.code,
    units: item.units,
    palletId: item.palletID,
  }));
};

export default function AddPallets({ productionDetail }) {
  const { palletsList, updatePalletsList } = useContext(FormsContext);

  const [isLoading, setIsLoading] = useState(true);
  const [modalStatus, setModalStatus] = useState({
    isOpen: false,
    data: null,
    palletIndex: 0,
  });

  const handleModalOpen = () => {
    setModalStatus({ isOpen: true, data: null, palletIndex: 0 });
  };

  const handleModalClose = () => {
    setModalStatus({ isOpen: false, data: null, palletIndex: 0 });
  };

  const handleEditPallet = (palletIndex) => {
    setModalStatus({
      isOpen: true,
      data: palletsList[palletIndex],
      palletIndex,
    });
  };

  const handleRemovePallet = async (palletIndex, palletId) => {
    const updatedPalletsList = [...palletsList];
    try {
      await DataStore.delete(Pallet, palletId);
      updatedPalletsList.splice(palletIndex, 1);
      updatePalletsList(updatedPalletsList);
    } catch (error) {
      console.log("DELETE PALLET ERROR: ", error);
    }
  };

  const handleRemovePalletPackage = (palletIndex, packageIndex) => {
    const updatedPalletsList = [...palletsList];
    updatedPalletsList[palletIndex].palletPackagesList.splice(packageIndex, 1);
    updatePalletsList(updatedPalletsList);
    if (!updatedPalletsList[palletIndex].palletPackagesList.length) {
      handleRemovePallet(palletIndex);
    }
  };

  const packagesCount = palletsList.reduce(
    (sum, curr) => sum + curr.palletPackagesList.length,
    0
  );

  const getPallets = useCallback(async () => {
    try {
      const palletsList = await DataStore.query(Pallet, (item) =>
        item.productionID("eq", productionDetail.id)
      );
      const packagesPromise = palletsList.map((pallet) =>
        DataStore.query(Package, (item) => item.palletID("eq", pallet.id))
      );
      const palletPackages = await Promise.all(packagesPromise);
      const updatedPalletsList = palletsList.map((pallet, i) => ({
        palletId: pallet.id,
        palletName: pallet.name,
        productionId: pallet.productionID,
        palletPackagesList: getParsedData(palletPackages[i]),
      }));
      updatePalletsList(updatedPalletsList);
      setIsLoading(false);
    } catch (error) {
      console.log("ERROR RAW MATERIALS LIST: ", error);
      setIsLoading(false);
    }
  }, [productionDetail, updatePalletsList]);

  useEffect(() => {
    getPallets();
  }, [getPallets]);

  return (
    <AddLotProductionContainer>
      <HeadingContainer>
        <Button
          variant="contained"
          size="small"
          disabled={palletsList.length === productionDetail.expectedPallets}
          onClick={handleModalOpen}
        >
          Add New Pallet
        </Button>
      </HeadingContainer>
      <Divider sx={{ margin: "1rem 0" }} />
      {isLoading ? (
        <Typography variant="p">getting pallets...</Typography>
      ) : (
        <AddLotProductionContainer>
          {!!palletsList.length ? (
            <>
              {palletsList.map((item, i) => (
                <PalletListItem
                  key={`pallet-${i}`}
                  data={{ ...item, itemIndex: i }}
                  handleEditPallet={handleEditPallet}
                  handleRemovePallet={handleRemovePallet}
                  handleRemovePalletPackage={handleRemovePalletPackage}
                />
              ))}
              <Accordion>
                <AccordionSummary
                  // expandIcon={<ExpandMoreIcon />}
                  aria-controls="total-packages"
                  id="total-packages"
                >
                  <Box display="flex" alignItems="center" width="100%">
                    <Typography flex={1} fontWeight="bold" color="#1976D2">
                      <span>Total Packages: </span> {packagesCount}
                    </Typography>
                    <Typography flex={1} fontWeight="bold" color="#1976D2">
                      <span>Max Pallets: </span>{" "}
                      {productionDetail.expectedPallets}
                    </Typography>
                    <Typography flex={1} fontWeight="bold" color="#1976D2">
                      <span>Max Packages: </span>{" "}
                      {productionDetail.expectedPackages}
                    </Typography>
                  </Box>
                </AccordionSummary>
                {/* <AccordionDetails>
                <FormControl fullWidth variant="filled">
                  <InputLabel htmlFor="code">Code</InputLabel>
                  <FilledInput
                    id="code"
                    name="code"
                    value=""
                    // onChange={handleChangeInput}
                  />
                </FormControl>
                <FormControl
                  fullWidth
                  variant="filled"
                  sx={{ marginTop: "1rem" }}
                >
                  <InputLabel htmlFor="units">Units</InputLabel>
                  <FilledInput
                    id="units"
                    name="units"
                    value=""
                    type="number"
                    // onChange={handleChangeInput}
                  />
                </FormControl>
              </AccordionDetails> */}
              </Accordion>
            </>
          ) : (
            <Typography variant="p" fontWeight="bold" textAlign="center">
              Please Add New Pallet!
            </Typography>
          )}
          {modalStatus.isOpen && (
            <AddNewPalletModal
              modalStatus={modalStatus}
              handleClose={handleModalClose}
              productionId={productionDetail.id}
              currentPackagesCount={packagesCount}
              maxPackages={productionDetail.expectedPackages}
            />
          )}
        </AddLotProductionContainer>
      )}
    </AddLotProductionContainer>
  );
}
