import { useState, useContext, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FilledInput from "@mui/material/FilledInput";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Accordion from "@mui/material/Accordion";
import Tooltip from "@mui/material/Tooltip";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FormsContext } from "../../../contexts/FormsContext";

// Components
import PalletPackagesStepper from "./PalletPackagesStepper";

const initialPPList = () => ({
  lot: undefined,
  expireDate: new Date().getTime(),
  units: undefined,
  code: undefined,
});

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

const PalletListItem = ({
  data,
  handleEditPallet,
  handleRemovePallet,
  handleRemovePalletPackage,
}) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="pallet-list-item"
        id="pallet-list-item"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Typography>{data.palletName}</Typography>
          <Box display="flex" justifyContent="flex-end" alignItems="center">
            <Tooltip title="Edit Pallet">
              <IconButton
                aria-label="edit pallet"
                sx={{ color: "#1976d2", marginRight: "0.25rem" }}
                onClick={() => handleEditPallet(data.itemIndex)}
              >
                <EditIcon sx={{ fontSize: "1rem" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Remove Pallet">
              <IconButton
                aria-label="remove pallet"
                sx={{ color: "red", marginRight: "0.25rem" }}
                onClick={() => handleRemovePallet(data.itemIndex)}
              >
                <CloseIcon sx={{ fontSize: "1rem" }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {data.palletPackagesList.map((palletPackage, packageIndex) => (
          <Card
            sx={{ position: "relative", marginBottom: "1rem" }}
            key={`pallet-package-${packageIndex}`}
          >
            <CardHeader
              sx={{ position: "absolute", right: 0 }}
              action={
                <IconButton
                  aria-label="remove"
                  onClick={() =>
                    handleRemovePalletPackage(data.itemIndex, packageIndex)
                  }
                >
                  <CloseIcon />
                </IconButton>
              }
            />
            <CardContent sx={{ display: "flex" }}>
              <Box flex={1}>
                <Typography
                  variant="p"
                  component="p"
                  fontWeight="bold"
                  color="#1976D2"
                >
                  Lot
                </Typography>
                <Typography variant="h6" component="h6" fontWeight="bold">
                  {palletPackage.lot}
                </Typography>
                <Typography
                  variant="p"
                  component="p"
                  fontWeight="bold"
                  color="#1976D2"
                  marginTop={2}
                >
                  Expire Date
                </Typography>
                <Typography variant="h6" component="h6" fontWeight="bold">
                  {new Date(palletPackage.expireDate).toLocaleDateString()}
                </Typography>
              </Box>
              <Box flex={1}>
                <Typography
                  variant="p"
                  component="p"
                  fontWeight="bold"
                  color="#1976D2"
                >
                  Units
                </Typography>
                <Typography variant="h6" component="h6" fontWeight="bold">
                  {palletPackage.units}
                </Typography>
                <Typography
                  variant="p"
                  component="p"
                  fontWeight="bold"
                  color="#1976D2"
                  marginTop={2}
                >
                  Code
                </Typography>
                <Typography variant="h6" component="h6" fontWeight="bold">
                  {palletPackage.code}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

function AddNewPalletModal({ modalStatus, handleClose, productId }) {
  const { palletsList, updatePalletsList } = useContext(FormsContext);

  const [palletData, updatePalletData] = useState({
    productId,
    palletName: "",
    palletPackagesList: [initialPPList()],
  });
  const [activeStep, setActiveStep] = useState(0);

  const handleSaveData = () => {
    const updatedPalletsList = [...palletsList];
    if (modalStatus.data) {
      updatedPalletsList[modalStatus.palletIndex] = palletData;
    } else {
      updatedPalletsList.push(palletData);
    }
    updatePalletsList(updatedPalletsList);
    handleClose();
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
          />
        </Box>
        <Button
          variant="contained"
          disabled={!palletData.palletName}
          onClick={handleSaveData}
        >
          Save
        </Button>
      </ModalContent>
    </Modal>
  );
}

export default function AddPallets({ productId }) {
  const { palletsList, updatePalletsList } = useContext(FormsContext);

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

  const handleRemovePallet = (palletIndex) => {
    const updatedPalletsList = [...palletsList];
    updatedPalletsList.splice(palletIndex, 1);
    updatePalletsList(updatedPalletsList);
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

  return (
    <AddLotProductionContainer>
      <HeadingContainer>
        <Button variant="contained" size="small" onClick={handleModalOpen}>
          Add New Pallet
        </Button>
      </HeadingContainer>
      <Divider sx={{ margin: "1rem 0" }} />
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
                expandIcon={<ExpandMoreIcon />}
                aria-controls="total-packages"
                id="total-packages"
              >
                <Box display="flex" alignItems="center" width="100%">
                  <Typography flex={1} fontWeight="bold" color="#1976D2">
                    <span>Total Packages: </span> {packagesCount}
                  </Typography>
                  <Typography flex={1} fontWeight="bold" color="#1976D2">
                    <span>Max: </span> 70
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
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
              </AccordionDetails>
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
            productId={productId}
          />
        )}
      </AddLotProductionContainer>
    </AddLotProductionContainer>
  );
}
