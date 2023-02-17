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

const PalletPackageFormItem = ({ activeStep, data, handleUpdateInputs }) => (
  <div key={`pallet-package-${activeStep}`}>
    {/* <FormControl fullWidth variant="filled" required>
      <InputLabel htmlFor="packageName">Package Name</InputLabel>
      <FilledInput
        id="packageName"
        value={data.packageName}
        name="packageName"
        onChange={(ev) => {
          const { name, value } = ev.target;
          handleUpdateInputs(activeStep, name, value);
        }}
      />
    </FormControl> */}
    <FormControl fullWidth variant="filled" required>
      <InputLabel htmlFor="units">Units</InputLabel>
      <FilledInput
        id="units"
        value={data.units}
        name="units"
        onChange={(ev) => {
          const { name, value } = ev.target;
          handleUpdateInputs(activeStep, name, value);
        }}
        type="number"
      />
    </FormControl>
    <FormControl sx={{ marginTop: "1rem" }} fullWidth variant="filled" required>
      <InputLabel htmlFor="packageCode">Package Code</InputLabel>
      <FilledInput
        id="packageCode"
        value={data.packageCode}
        name="packageCode"
        onChange={(ev) => {
          const { name, value } = ev.target;
          handleUpdateInputs(activeStep, name, value);
        }}
      />
    </FormControl>
  </div>
);

export default function PalletPackagesStepper({
  palletPackagesList,
  activeStep,
  handleUpdateInputs,
  handleAddPalletPackage,
  handleRemovePalletPackage,
  handleNext,
  handleBack,
  currentPackagesCount,
  maxPackages,
}) {
  const theme = useTheme();

  const maxSteps = palletPackagesList.length;

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
          Add Packages
        </Typography>
        <div>
          {palletPackagesList.length > 1 && (
            <Tooltip title="Remove Current Package">
              <IconButton
                onClick={() => handleRemovePalletPackage(activeStep)}
                style={{ color: "#f13737" }}
              >
                <RemoveCircleOutlineIcon sx={{ fontSize: "2.25rem" }} />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Add Package">
            <IconButton
              title={
                currentPackagesCount === maxPackages
                  ? "Max Packages Count Reached!"
                  : ""
              }
              disabled={currentPackagesCount === maxPackages}
              onClick={() => handleAddPalletPackage(activeStep)}
            >
              <AddCircleOutlineIcon sx={{ fontSize: "2.25rem", color: "#2aa33e" }} />
            </IconButton>
          </Tooltip>
        </div>
      </Paper>
      <Box sx={{ height: 130, width: "100%" }}>
        <PalletPackageFormItem
          activeStep={activeStep}
          data={palletPackagesList[activeStep]}
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
