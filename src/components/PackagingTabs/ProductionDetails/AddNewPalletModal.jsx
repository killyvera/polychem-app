import { useState, useContext, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FilledInput from "@mui/material/FilledInput";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { DataStore } from "@aws-amplify/datastore";
import { Pallet, Package } from "../../../models";
import { FormsContext } from "../../../contexts/FormsContext";

// Components
import PalletPackagesStepper from "./PalletPackagesStepper";

const initialPPList = () => ({
  packageId: "",
  packageName: undefined,
  units: undefined,
  packageCode: undefined,
});

const ModalContent = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  boxShadow: 24,
  borderRadius: "0.25rem",
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  width: 600,
  [theme.breakpoints.down("sm")]: {
    width: "90%",
  },
}));

function AddNewPalletModal({
  modalStatus,
  handleClose,
  productionId,
  currentPackagesCount,
  maxPackages,
}) {
  const { palletsList, updatePalletsList } = useContext(FormsContext);

  const [palletData, updatePalletData] = useState({
    productionId,
    palletId: "",
    palletName: "",
    palletPackagesList: [initialPPList()],
  });
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveData = async () => {
    setIsLoading(true);
    try {
      const updatedPalletsList = [...palletsList];

      if (palletData.palletId) {
        const original = await DataStore.query(Pallet, palletData.palletId);
        await DataStore.save(
          Pallet.copyOf(original, (updated) => {
            updated.name = palletData.palletName;
          })
        );
        await DataStore.delete(Package, (packageData) =>
          packageData.palletID("eq", palletData.palletId)
        );
        const lotRMPromises = palletData.palletPackagesList.map(
          (palletPackage) =>
            DataStore.save(
              new Package({
                name: palletPackage.packageName,
                code: palletPackage.packageCode,
                units: parseFloat(palletPackage.units),
                palletID: palletData.palletId,
              })
            )
        );
        const savedPPList = await Promise.all(lotRMPromises);
        const rIndex = updatedPalletsList.findIndex(
          (pallet) => pallet.palletId === palletData.palletId
        );
        const palletPackagesList = savedPPList.map((item) => ({
          packageId: item.id,
          packageName: item.name,
          packageCode: item.code,
          units: item.units,
          palletId: item.palletID,
        }));
        updatedPalletsList[rIndex] = {
          palletId: palletData.palletId,
          palletName: palletData.palletName,
          productionId: palletData.productionId,
          palletPackagesList,
        };
      } else {
        const newPallet = await DataStore.save(
          new Pallet({
            name: palletData.palletName,
            productionID: palletData.productionId,
          })
        );
        const pelletPackagePromises = palletData.palletPackagesList.map(
          (palletPackage) =>
            DataStore.save(
              new Package({
                name: palletPackage.packageName,
                code: palletPackage.packageCode,
                units: parseFloat(palletPackage.units),
                palletID: newPallet.id,
              })
            )
        );
        const savedPPList = await Promise.all(pelletPackagePromises);
        const palletPackagesList = savedPPList.map((item) => ({
          packageId: item.id,
          packageName: item.name,
          packageCode: item.code,
          units: item.units,
          palletId: item.palletID,
        }));
        updatedPalletsList.push({
          palletId: newPallet.id,
          palletName: newPallet.name,
          productionId: newPallet.productionID,
          palletPackagesList,
        });
      }
      updatePalletsList(updatedPalletsList);
      handleClose();
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleChangeInput = (ev) => {
    const { name, value } = ev.target;
    updatePalletData({ ...palletData, [name]: value });
  };

  const handleUpdateInputs = (index, name, value) => {
    const updatedPalletData = {
      ...palletData,
      palletPackagesList: [...palletData.palletPackagesList],
    };
    updatedPalletData.palletPackagesList[index] = {
      ...updatedPalletData.palletPackagesList[index],
      [name]: value,
    };
    updatePalletData(updatedPalletData);
  };

  const handleAddPalletPackage = (index) => {
    const updatedPalletData = {
      ...palletData,
      palletPackagesList: [...palletData.palletPackagesList],
    };
    updatedPalletData.palletPackagesList.push(initialPPList());
    updatePalletData(updatedPalletData);
    setActiveStep(updatedPalletData.palletPackagesList.length - 1);
  };

  const handleRemovePalletPackage = (index) => {
    const updatedPalletData = {
      ...palletData,
      palletPackagesList: [...palletData.palletPackagesList],
    };
    updatedPalletData.palletPackagesList.splice(index, 1);
    updatePalletData(updatedPalletData);
    if (activeStep !== 0) {
      handleBack();
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    if (modalStatus.data) {
      updatePalletData(modalStatus.data);
    }
  }, [modalStatus]);

  return (
    <Modal open={modalStatus.isOpen}>
      <ModalContent>
        <IconButton onClick={handleClose} style={{ alignSelf: "flex-end" }}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h5" component="h5" fontWeight="bold">
          Add New Pallet
        </Typography>
        <Box marginTop={2}>
          <FormControl fullWidth variant="filled">
            <InputLabel htmlFor="pallet-name">Pallet Name</InputLabel>
            <FilledInput
              id="pallet-name"
              name="palletName"
              value={palletData.palletName}
              onChange={handleChangeInput}
            />
          </FormControl>
          <PalletPackagesStepper
            palletPackagesList={palletData.palletPackagesList}
            activeStep={activeStep}
            handleUpdateInputs={handleUpdateInputs}
            handleAddPalletPackage={handleAddPalletPackage}
            handleRemovePalletPackage={handleRemovePalletPackage}
            handleNext={handleNext}
            handleBack={handleBack}
            currentPackagesCount={currentPackagesCount}
            maxPackages={maxPackages}
          />
        </Box>
        <Button
          variant="contained"
          disabled={!palletData.palletName || isLoading}
          onClick={handleSaveData}
        >
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </ModalContent>
    </Modal>
  );
}

export default AddNewPalletModal;
