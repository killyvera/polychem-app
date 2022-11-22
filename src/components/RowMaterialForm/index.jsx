import { useContext, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { FormsContext } from "../../contexts/FormsContext";
import Images from "../../constants/Images";

// Components
import LotRawMaterialStepper from "./LotRawMaterialStepper";

const initialLRMList = () => [{ name: "", code: "", quantity: 0 }];

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: "white",
  display: "flex",
  alignItems: "center",
  backgroundColor: "#F0F8FF",
}));

const ItemContent = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  marginLeft: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

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

const DetailItem = ({
  productElementId,
  title,
  count,
  unit,
  handleModalOpen,
}) => {
  return (
    <Item>
      <Avatar
        alt="Product Element"
        src={Images.ingredient}
        sx={{ width: 56, height: 56 }}
      />
      <ItemContent>
        <Box flex={1}>
          <Typography component="h6" color="black" fontWeight="bold">
            {title}
          </Typography>
          <Typography
            component="p"
            color="#1976D2"
            marginTop={1}
            fontSize="1.25rem"
            fontWeight="bold"
          >
            are needed at least {count} {unit}
          </Typography>
        </Box>
        <Box flex={1} marginTop={2} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            onClick={() =>
              handleModalOpen({ productElementId, title, count, unit })
            }
          >
            Add Row Material
          </Button>
        </Box>
      </ItemContent>
    </Item>
  );
};

function LotRawMaterialFormModal({ modalStatus, handleClose }) {
  const { productElementId, title, count, unit } = modalStatus.data;
  const { rawMaterialsList, updateRawMaterialsList } = useContext(FormsContext);

  const [currentWeight, updateCurrentWeight] = useState(0);
  const [rawMaterialName, updateRawMaterialName] = useState("");
  const [lrmList, updateLRMList] = useState(initialLRMList());
  const [activeStep, setActiveStep] = useState(0);

  const handleSaveDate = () => {
    updateRawMaterialsList([
      ...rawMaterialsList,
      { productElementId, rawMaterialName, lrmList },
    ]);
    handleClose();
  };

  const handleChangeInput = (ev) => {
    const { value } = ev.target;
    updateRawMaterialName(value);
  };

  const handleUpdateInputs = (index, name, value) => {
    const updatedLRMList = [...lrmList];
    updatedLRMList[index] = { ...updatedLRMList[index], [name]: value };
    updateLRMList(updatedLRMList);
  };

  useEffect(() => {
    const currentCount = lrmList.reduce(
      (sum, curr) => sum + (curr.quantity ? parseInt(curr.quantity) : 0),
      0
    );
    updateCurrentWeight(currentCount);
  }, [lrmList]);

  const handleUpdateLRMList = () => {
    const updatedLRMList = [...lrmList, initialLRMList()];
    updateLRMList(updatedLRMList);
    setActiveStep(updatedLRMList.length - 1);
  };

  const handleRemoveLRMList = (index) => {
    const updatedLRMList = [...lrmList];
    updatedLRMList.splice(index, 1);
    updateLRMList(updatedLRMList);
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
      updateRawMaterialName(currentData.rawMaterialName);
      updateLRMList(currentData.lrmList);
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
              value={rawMaterialName}
              onChange={handleChangeInput}
            />
          </FormControl>
          <LotRawMaterialStepper
            lrmList={lrmList}
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
          disabled={currentWeight < count || !rawMaterialName}
          onClick={handleSaveDate}
        >
          Save
        </Button>
      </ModalContent>
    </Modal>
  );
}

function RowMaterialForm({ productionDetail }) {
  const { productElements } = useContext(FormsContext);
  const [modalStatus, setOpen] = useState({ isOpen: false, data: null });

  const handleModalClose = () => {
    setOpen({ isOpen: false, data: null });
  };

  const handleModalOpen = (data) => {
    setOpen({ isOpen: true, data });
  };

  return (
    <Stack spacing={2} marginTop={2}>
      {productElements.map((productElement) => (
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
        />
      )}
    </Stack>
  );
}

export default RowMaterialForm;
