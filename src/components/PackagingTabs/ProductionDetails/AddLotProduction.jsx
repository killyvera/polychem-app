import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FilledInput from "@mui/material/FilledInput";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close";

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

const LotProductionFormContainer = styled("form")(({ theme }) => ({
  ...theme.typography.body2,
  display: "flex",
  flexDirection: "column",
}));

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

const initialFormData = () => ({
  lot: undefined,
  expireDate: new Date().getTime(),
  units: undefined,
  code: undefined,
});

const ProductionLotForm = (props) => {
  const { handleAddProductionLot } = props;

  const [formData, updateFormData] = useState(initialFormData());

  const handleUpdateChange = (ev) => {
    const { name, value } = ev.target;
    updateFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    handleAddProductionLot(formData);
  };

  return (
    <LotProductionFormContainer onSubmit={handleSubmit}>
      <FormControl fullWidth variant="filled" required>
        <InputLabel htmlFor="lot">Lot</InputLabel>
        <FilledInput
          id="lot"
          value={formData.lot}
          name="lot"
          onChange={handleUpdateChange}
        />
      </FormControl>
      <FormControl
        sx={{ marginTop: "1rem" }}
        fullWidth
        variant="filled"
        required
        focused
      >
        <InputLabel htmlFor="expire-date">Expire Date</InputLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            InputAdornmentProps={{ id: "expire-date" }}
            value={formData.expireDate}
            onChange={(value) => {
              handleUpdateChange({ target: { name: "expireDate", value } });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="filled"
              />
            )}
          />
        </LocalizationProvider>
      </FormControl>
      <FormControl
        sx={{ marginTop: "1rem" }}
        fullWidth
        variant="filled"
        required
      >
        <InputLabel htmlFor="units">Units</InputLabel>
        <FilledInput
          id="units"
          value={formData.units}
          name="units"
          onChange={handleUpdateChange}
          type="number"
        />
      </FormControl>
      <FormControl
        sx={{ marginTop: "1rem" }}
        fullWidth
        variant="filled"
        required
      >
        <InputLabel htmlFor="code">Code</InputLabel>
        <FilledInput
          id="code"
          value={formData.code}
          name="code"
          onChange={handleUpdateChange}
        />
      </FormControl>
      <Button
        variant="contained"
        sx={{ margin: "1rem 0", alignSelf: "flex-end" }}
        type="submit"
      >
        Add
      </Button>
    </LotProductionFormContainer>
  );
};

const ProductionLots = ({ data, handleRemoveProductionLot }) => {
  return (
    <Card sx={{ position: "relative", marginBottom: "1rem" }}>
      <CardHeader
        sx={{ position: "absolute", right: 0 }}
        action={
          <IconButton
            aria-label="remove"
            onClick={() => handleRemoveProductionLot(data.itemIndex)}
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
            {data.lot}
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
            {new Date(data.expireDate).toLocaleDateString()}
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
            {data.units}
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
            {data.code}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default function AddLotProduction({
  productionLots,
  updateProductionLots,
}) {
  const [addNewModal, setAddNewModal] = useState(false);

  const handleAddProductionLot = (formData) => {
    const updatedProductionLots = [...productionLots];
    updatedProductionLots.push(formData);
    updateProductionLots(updatedProductionLots);
    setAddNewModal(false);
  };

  const handleRemoveProductionLot = (itemIndex) => {
    const updatedProductionLots = [...productionLots];
    updatedProductionLots.splice(itemIndex, 1);
    updateProductionLots(updatedProductionLots);
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
