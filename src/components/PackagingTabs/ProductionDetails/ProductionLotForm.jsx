import { useState } from "react";
import moment from "moment";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FilledInput from "@mui/material/FilledInput";
import TextField from "@mui/material/TextField";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const LotProductionFormContainer = styled("form")(({ theme }) => ({
  ...theme.typography.body2,
  display: "flex",
  flexDirection: "column",
}));

const initialFormData = () => ({
  lotName: undefined,
  expireDate: new Date().toDateString(),
  units: undefined,
  lotCode: undefined,
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
        <InputLabel htmlFor="lotName">Lot Name</InputLabel>
        <FilledInput
          id="lotName"
          value={formData.lotName}
          name="lotName"
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
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            InputAdornmentProps={{ id: "expire-date" }}
            value={formData.expireDate}
            onChange={(value) => {
              handleUpdateChange({
                target: {
                  name: "expireDate",
                  value: moment(value).format("MM-DD-YYYY"),
                },
              });
            }}
            renderInput={(params) => <TextField {...params} variant="filled" />}
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
        <InputLabel htmlFor="lotCode">Lot Code</InputLabel>
        <FilledInput
          id="lotCode"
          value={formData.lotCode}
          name="lotCode"
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

export default ProductionLotForm;
