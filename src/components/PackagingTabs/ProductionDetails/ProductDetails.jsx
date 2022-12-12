import { useContext } from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FilledInput from "@mui/material/FilledInput";
import { FormsContext } from "../../../contexts/FormsContext";

export default function ProductDetails({ productDetail }) {
  const { productStepDetails, updateProductStepDetails } =
    useContext(FormsContext);

  const handleFormInputUpdate = (ev) => {
    const { name, value } = ev.target;
    const updatedProductStepDetails = { ...productStepDetails };
    updatedProductStepDetails[name] = value;
    updateProductStepDetails(updatedProductStepDetails);
  };

  return (
    <>
      <FormControl fullWidth variant="filled" focused required>
        <InputLabel htmlFor="product-code">Product Code</InputLabel>
        <FilledInput
          id="product-code"
          value={productDetail.id}
          name="productCode"
          readOnly
        />
      </FormControl>
      <FormControl
        sx={{ marginTop: "1rem" }}
        fullWidth
        variant="filled"
        required
      >
        <InputLabel htmlFor="units-produced">Units Produced</InputLabel>
        <FilledInput
          id="units-produced"
          value={productStepDetails.unitsProduced}
          name="unitsProduced"
          type="number"
          onChange={handleFormInputUpdate}
        />
      </FormControl>
      <FormControl
        sx={{ marginTop: "1rem" }}
        fullWidth
        variant="filled"
        required
      >
        <InputLabel htmlFor="packages-produced">Packages Produced</InputLabel>
        <FilledInput
          id="packages-produced"
          value={productStepDetails.packagesProduced}
          name="packagesProduced"
          type="number"
          onChange={handleFormInputUpdate}
        />
      </FormControl>
      <FormControl
        sx={{ marginTop: "1rem" }}
        fullWidth
        variant="filled"
        required
      >
        <InputLabel htmlFor="pallets-produced">Pallets Produced</InputLabel>
        <FilledInput
          id="pallets-produced"
          value={productStepDetails.palletsProduced}
          name="palletsProduced"
          type="number"
          onChange={handleFormInputUpdate}
        />
      </FormControl>
      <FormControl
        sx={{ marginTop: "1rem" }}
        fullWidth
        variant="filled"
        required
      >
        <InputLabel htmlFor="extra-units">Extra Units</InputLabel>
        <FilledInput
          id="extra-units"
          value={productStepDetails.extraUnits}
          name="extraUnits"
          type="number"
          onChange={handleFormInputUpdate}
        />
      </FormControl>
      <FormControl
        sx={{ margin: "1rem 0" }}
        fullWidth
        variant="filled"
        required
      >
        <InputLabel htmlFor="pallets-produced">Notes</InputLabel>
        <FilledInput
          id="notes"
          multiline
          rows={4}
          value={productStepDetails.notes}
          name="notes"
          onChange={handleFormInputUpdate}
        />
      </FormControl>
    </>
  );
}
