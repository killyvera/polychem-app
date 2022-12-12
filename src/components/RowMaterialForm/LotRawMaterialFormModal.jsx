import { useContext, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { DataStore } from "@aws-amplify/datastore";
import { MaterialRaw, RawMaterialLot } from "../../models";
import { FormsContext } from "../../contexts/FormsContext";

// Components
import LotRawMaterialStepper from "./LotRawMaterialStepper";

const initialLRMList = () => [
  {
    name: "",
    description: "",
    lotCode: "",
    quantity: 0,
    notUsedQuantity: 0,
    wasteQuantity: 0,
    useQuantity: 0,
  },
];

const RowMaterialCount = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

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

function LotRawMaterialFormModal({ modalStatus, handleClose, productionId }) {
  const { title, count, unit, productElementId } = modalStatus.data;
  const { rawMaterialsList, updateRawMaterialsList } = useContext(FormsContext);

  const [currentWeight, updateCurrentWeight] = useState(0);
  const [rawMaterialData, updateRawMaterialData] = useState({
    rawMaterialId: "",
    rawMaterialName: "",
    productionId,
    productElementId,
    lrmList: initialLRMList(),
  });
  const [activeStep, setActiveStep] = useState(0);
  const [rmLoading, setRMLoading] = useState(false);

  const handleSaveData = async () => {
    setRMLoading(true);
    try {
      const updatedRawMaterialsList = [...rawMaterialsList];

      if (rawMaterialData.rawMaterialId) {
        const original = await DataStore.query(
          MaterialRaw,
          rawMaterialData.rawMaterialId
        );
        await DataStore.save(
          MaterialRaw.copyOf(original, (updated) => {
            updated.name = rawMaterialData.rawMaterialName;
          })
        );
        await DataStore.delete(RawMaterialLot, (rmLot) =>
          rmLot.materialrawID("eq", rawMaterialData.rawMaterialId)
        );
        const lotRMPromises = rawMaterialData.lrmList.map((lrm) =>
          DataStore.save(
            new RawMaterialLot({
              name: lrm.name,
              description: "",
              lotCode: lrm.lotCode,
              notUsedQuantity: 0,
              wasteQuantity: 0,
              useQuantity: parseFloat(lrm.quantity),
              quantity: parseFloat(lrm.quantity),
              materialrawID: rawMaterialData.rawMaterialId,
            })
          )
        );
        const savedLRMList = await Promise.all(lotRMPromises);
        const rIndex = updatedRawMaterialsList.findIndex(
          (rawMaterial) =>
            rawMaterial.rawMaterialId === rawMaterialData.rawMaterialId
        );
        updatedRawMaterialsList[rIndex] = {
          rawMaterialId: rawMaterialData.rawMaterialId,
          rawMaterialName: rawMaterialData.rawMaterialName,
          productionId,
          productElementId,
          lrmList: savedLRMList,
        };
      } else {
        const rawMaterial = await DataStore.save(
          new MaterialRaw({
            name: rawMaterialData.rawMaterialName,
            productionID: rawMaterialData.productionId,
            formulaelementID: rawMaterialData.productElementId,
          })
        );
        const lotRMPromises = rawMaterialData.lrmList.map((lrm) =>
          DataStore.save(
            new RawMaterialLot({
              name: lrm.name,
              description: "",
              lotCode: lrm.lotCode,
              notUsedQuantity: 0,
              wasteQuantity: 0,
              useQuantity: parseFloat(lrm.quantity),
              quantity: parseFloat(lrm.quantity),
              materialrawID: rawMaterial.id,
            })
          )
        );
        const savedLRMList = await Promise.all(lotRMPromises);
        updatedRawMaterialsList.push({
          rawMaterialId: rawMaterial.id,
          rawMaterialName: rawMaterial.name,
          productionId: rawMaterial.productionID,
          productElementId: rawMaterial.formulaelementID,
          lrmList: savedLRMList,
        });
      }
      updateRawMaterialsList(updatedRawMaterialsList);
      setRMLoading(false);
      handleClose();
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleChangeInput = (ev) => {
    const { value } = ev.target;
    updateRawMaterialData({ ...rawMaterialData, rawMaterialName: value });
  };

  const handleUpdateInputs = (index, name, value) => {
    const updatedLRMList = [...rawMaterialData.lrmList];
    updatedLRMList[index] = { ...updatedLRMList[index], [name]: value };
    updateRawMaterialData({ ...rawMaterialData, lrmList: updatedLRMList });
  };

  useEffect(() => {
    const currentCount = rawMaterialData.lrmList.reduce(
      (sum, curr) => sum + (curr.quantity ? parseInt(curr.quantity) : 0),
      0
    );
    updateCurrentWeight(currentCount);
  }, [rawMaterialData]);

  const handleUpdateLRMList = () => {
    const updatedLRMList = [...rawMaterialData.lrmList, initialLRMList()[0]];
    updateRawMaterialData({ ...rawMaterialData, lrmList: updatedLRMList });
    setActiveStep(updatedLRMList.length - 1);
  };

  const handleRemoveLRMList = (index) => {
    const updatedLRMList = [...rawMaterialData.lrmList];
    updatedLRMList.splice(index, 1);
    updateRawMaterialData({ ...rawMaterialData, lrmList: updatedLRMList });
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
    const currentData = rawMaterialsList.find(
      (rawMaterial) => rawMaterial.productElementId === productElementId
    );
    if (currentData) {
      updateRawMaterialData(currentData);
    }
  }, [rawMaterialsList, productElementId]);

  return (
    <Modal open={modalStatus.isOpen}>
      <ModalContent>
        <IconButton onClick={handleClose} style={{ alignSelf: "flex-end" }}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h5" component="h5" fontWeight="bold">
          {title}
        </Typography>
        <RowMaterialCount>
          <Typography
            variant="p"
            component="p"
            marginTop={1}
            fontSize="1rem"
            fontWeight={500}
            color="#1976D2"
          >
            Needed at least: {count} {unit}
          </Typography>
          <Typography
            variant="p"
            component="p"
            marginTop={1}
            fontSize="1rem"
            fontWeight={500}
            color={currentWeight >= count ? "#2aa33e" : "#f13737"}
          >
            Current Weight: {currentWeight} {unit}
          </Typography>
        </RowMaterialCount>
        <Box marginTop={2}>
          <FormControl fullWidth variant="filled">
            <InputLabel htmlFor="row-material-name">
              Raw Material Name
            </InputLabel>
            <FilledInput
              id="row-material-name"
              value={rawMaterialData.rawMaterialName}
              onChange={handleChangeInput}
            />
          </FormControl>
          <LotRawMaterialStepper
            lrmList={rawMaterialData.lrmList}
            activeStep={activeStep}
            handleUpdateInputs={handleUpdateInputs}
            handleUpdateLRMList={handleUpdateLRMList}
            handleRemoveLRMList={handleRemoveLRMList}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        </Box>
        <Button
          variant="contained"
          disabled={
            currentWeight < count ||
            !rawMaterialData.rawMaterialName ||
            rmLoading
          }
          onClick={handleSaveData}
        >
          Save
        </Button>
      </ModalContent>
    </Modal>
  );
}

export default LotRawMaterialFormModal;
