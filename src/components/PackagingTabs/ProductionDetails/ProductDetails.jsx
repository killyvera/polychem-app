import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FilledInput from "@mui/material/FilledInput";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Tooltip from "@mui/material/Tooltip";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

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
  flexDirection: "column"
};

const ExtraUnitsAndNotesContainer = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  border: `2px solid #1976D2`,
  borderRadius: "0.75rem",
  marginTop: theme.spacing(2),
}));

const HeadingContainer = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const ExtraUnitsAndNotes = ({ data, handleRemoveExtraUnitsAndNotes }) => {
  return (
    <Card sx={{ marginTop: "1rem", position: "relative" }}>
      <CardHeader
        sx={{ position: "absolute", right: 0 }}
        action={
          <IconButton
            aria-label="remove"
            onClick={() => handleRemoveExtraUnitsAndNotes(data.itemIndex)}
          >
            <CloseIcon />
          </IconButton>
        }
      />
      <CardContent>
        <Typography variant="p" component="p" fontWeight="bold" color="#1976D2">
          Extra Units
        </Typography>
        <Typography variant="h6" component="h6" fontWeight="bold">
          {data.extraUnits}
        </Typography>
        <Typography
          sx={{ marginTop: "0.5rem" }}
          variant="p"
          component="p"
          fontWeight="bold"
          color="#1976D2"
        >
          Notes
        </Typography>
        <Typography variant="body2">{data.notes}</Typography>
      </CardContent>
    </Card>
  );
};

const ExtraUnitsAndNotesForm = (props) => {
  const { handleAddExtraUnitsAndNotes } = props;

  const [formData, updateFormData] = useState({ extraUnits: "", notes: "" });

  const handleUpdateChange = (ev) => {
    const { name, value } = ev.target;
    updateFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    handleAddExtraUnitsAndNotes(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <FormControl
        sx={{ marginTop: "1rem" }}
        fullWidth
        variant="filled"
        required
      >
        <InputLabel htmlFor="extra-units">Extra Units</InputLabel>
        <FilledInput
          id="extra-units"
          value={formData.extraUnits}
          name="extraUnits"
          onChange={handleUpdateChange}
        />
      </FormControl>
      <FormControl
        sx={{ marginTop: "1rem" }}
        fullWidth
        variant="filled"
        required
      >
        <InputLabel htmlFor="pallets-produced">Notes</InputLabel>
        <FilledInput
          id="notes"
          multiline
          rows={4}
          value={formData.notes}
          name="notes"
          onChange={handleUpdateChange}
        />
      </FormControl>
      <Button
        variant="contained"
        sx={{ marginTop: "1rem", alignSelf: "flex-end" }}
        type="submit"
      >
        Add
      </Button>
    </form>
  );
};

export default function ProductDetails({ productDetail }) {
  const [extraUnitsAndNotes, updateExtraUnitsAndNotes] = useState([]);
  const [addNewModal, setAddNewModal] = useState(false);

  const handleAddExtraUnitsAndNotes = (formData) => {
    const updatedExtraUnitsAndNotes = [...extraUnitsAndNotes];
    updatedExtraUnitsAndNotes.push(formData);
    updateExtraUnitsAndNotes(updatedExtraUnitsAndNotes);
    setAddNewModal(false);
  };

  const handleRemoveExtraUnitsAndNotes = (itemIndex) => {
    const updatedExtraUnitsAndNotes = [...extraUnitsAndNotes];
    updatedExtraUnitsAndNotes.splice(itemIndex, 1);
    updateExtraUnitsAndNotes(updatedExtraUnitsAndNotes);
  };

  return (
    <>
      <FormControl fullWidth variant="filled" focused>
        <InputLabel htmlFor="product-code">Product Code</InputLabel>
        <FilledInput
          id="product-code"
          value={productDetail.id}
          name="productCode"
          readOnly
        />
      </FormControl>
      <FormControl sx={{ marginTop: "1rem" }} fullWidth variant="filled">
        <InputLabel htmlFor="units-produced">Units Produced</InputLabel>
        <FilledInput id="units-produced" value={0} name="unitsProduced" />
      </FormControl>
      <FormControl sx={{ marginTop: "1rem" }} fullWidth variant="filled">
        <InputLabel htmlFor="packages-produced">Packages Produced</InputLabel>
        <FilledInput id="packages-produced" value={0} name="packagesProduced" />
      </FormControl>
      <FormControl sx={{ marginTop: "1rem" }} fullWidth variant="filled">
        <InputLabel htmlFor="pallets-produced">Pallets Produced</InputLabel>
        <FilledInput id="pallets-produced" value={0} name="palletsProduced" />
      </FormControl>
      <ExtraUnitsAndNotesContainer>
        <HeadingContainer>
          <Typography
            variant="p"
            component="p"
            fontWeight="bold"
            color="#1976D2"
          >
            Extra Units & Notes
          </Typography>
          {!!extraUnitsAndNotes.length && (
            <Tooltip title="Add Extra Units and Lots">
              <IconButton onClick={() => setAddNewModal(true)}>
                <AddCircleOutlineIcon />
              </IconButton>
            </Tooltip>
          )}
        </HeadingContainer>
        {extraUnitsAndNotes.length ? (
          extraUnitsAndNotes.map((item, i) => (
            <ExtraUnitsAndNotes
              key={`euan-${i}`}
              data={{ ...item, itemIndex: i }}
              handleRemoveExtraUnitsAndNotes={handleRemoveExtraUnitsAndNotes}
            />
          ))
        ) : (
          <ExtraUnitsAndNotesForm
            handleAddExtraUnitsAndNotes={handleAddExtraUnitsAndNotes}
          />
        )}
        {addNewModal && (
          <Modal open={addNewModal} onClose={() => setAddNewModal(false)}>
            <Box sx={style}>
              <Typography
                variant="p"
                component="p"
                fontWeight="bold"
                color="#1976D2"
              >
                Extra Units & Notes
              </Typography>
              <ExtraUnitsAndNotesForm
                handleAddExtraUnitsAndNotes={handleAddExtraUnitsAndNotes}
              />
            </Box>
          </Modal>
        )}
      </ExtraUnitsAndNotesContainer>
    </>
  );
}
