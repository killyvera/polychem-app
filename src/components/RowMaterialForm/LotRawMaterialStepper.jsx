import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FilledInput from "@mui/material/FilledInput";
import Tooltip from "@mui/material/Tooltip";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

const LotRawMaterialFormItem = ({ activeStep, data, handleUpdateInputs }) => (
  <div key={`lrm-item-${activeStep}`}>
    {/* <FormControl fullWidth variant="filled">
      <InputLabel htmlFor="lot-row-material-name">Name</InputLabel>
      <FilledInput
        id="lot-row-material-name"
        value={data.name}
        name="name"
        onChange={(ev) => {
          const { name, value } = ev.target;
          handleUpdateInputs(activeStep, name, value);
        }}
      />
    </FormControl> */}
    <FormControl fullWidth variant="filled">
      <InputLabel htmlFor="lot-row-material-code">Lot Code</InputLabel>
      <FilledInput
        id="lot-row-material-code"
        value={data.lotCode}
        name="lotCode"
        onChange={(ev) => {
          const { name, value } = ev.target;
          handleUpdateInputs(activeStep, name, value);
        }}
      />
    </FormControl>
    <FormControl fullWidth variant="filled" style={{ marginTop: "1rem" }}>
      <InputLabel htmlFor="lot-row-material-qty">Quantity</InputLabel>
      <FilledInput
        id="lot-row-material-qty"
        value={data.quantity}
        name="quantity"
        type="number"
        onChange={(ev) => {
          const { name, value } = ev.target;
          handleUpdateInputs(activeStep, name, value);
        }}
      />
    </FormControl>
  </div>
);

export default function LotRawMaterialStepper({
  lrmList,
  activeStep,
  handleUpdateInputs,
  handleUpdateLRMList,
  handleRemoveLRMList,
  handleNext,
  handleBack,
}) {
  const theme = useTheme();

  const maxSteps = lrmList.length;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 50,
          bgcolor: "background.default",
        }}
      >
        <Typography
          variant="h6"
          component="h6"
          fontWeight="bold"
          color="#1976D2"
        >
          Add Lot Raw Materials
        </Typography>
        <div>
          {lrmList.length > 1 && (
            <Tooltip title="Remove Current Lot Raw Material">
              <IconButton
                onClick={() => handleRemoveLRMList(activeStep)}
                style={{ color: "#f13737" }}
              >
                <RemoveCircleOutlineIcon sx={{ fontSize: "2.25rem" }} />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Add Lot Raw Material">
            <IconButton onClick={handleUpdateLRMList}>
              <AddCircleOutlineIcon sx={{ fontSize: "2.25rem", color: "#2aa33e" }} />
            </IconButton>
          </Tooltip>
        </div>
      </Paper>
      <Box sx={{ height: 130, width: "100%" }}>
        <LotRawMaterialFormItem
          activeStep={activeStep}
          data={lrmList[activeStep]}
          handleUpdateInputs={handleUpdateInputs}
        />
      </Box>
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
}
