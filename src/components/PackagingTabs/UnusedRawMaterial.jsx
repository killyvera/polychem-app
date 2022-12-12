import { useContext, useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import Button from "@mui/material/Button";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import InputAdornment from "@mui/material/InputAdornment";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DataStore } from "@aws-amplify/datastore";
import { RawMaterialLot } from "../../models";
import { FormsContext } from "../../contexts/FormsContext";
import Images from "../../constants/Images";

// Components
import NavigationButton from "../NavigationButton";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: "white",
  display: "flex",
  alignItems: "center",
  backgroundColor: "#F0F8FF",
  marginBottom: theme.spacing(2),
}));

const InputContainer = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const DetailItem = ({ rmIndex, lrmIndex, data }) => {
  const { rawMaterialsList, updateRawMaterialsList } = useContext(FormsContext);

  const [newQty, updateNewQty] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateQty = async () => {
    setIsLoading(true);
    try {
      const original = await DataStore.query(RawMaterialLot, data.id);
      await DataStore.save(
        RawMaterialLot.copyOf(original, (updated) => {
          updated.notUsedQuantity = newQty;
          updated.useQuantity = data.quantity - data.wasteQuantity - newQty;
        })
      );
      const updatedRawMaterialsList = [...rawMaterialsList];
      updatedRawMaterialsList[rmIndex].lrmList[lrmIndex] = {
        ...updatedRawMaterialsList[rmIndex].lrmList[lrmIndex],
        notUsedQuantity: newQty,
      };
      updatedRawMaterialsList[rmIndex].lrmList[lrmIndex] = {
        ...updatedRawMaterialsList[rmIndex].lrmList[lrmIndex],
        useQuantity: data.quantity - data.wasteQuantity - newQty,
      };
      updateRawMaterialsList(updatedRawMaterialsList);
      setIsLoading(false);
    } catch (error) {
      console.log("ERROR UNUSED MATERIAL: ", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    updateNewQty(parseFloat(data.notUsedQuantity));
  }, [data]);

  return (
    <Item>
      <Avatar
        alt="Lot Raw Material"
        src={Images.ingredient}
        sx={{ width: 56, height: 56 }}
      />
      <Box marginLeft={2} width="100%" display="flex" flexDirection="column">
        <Typography component="h6" color="black" fontWeight="bold">
          Lot Name: <span style={{ color: "#1976D2" }}> {data.name}</span>
        </Typography>
        <Typography component="h6" color="black" fontWeight="bold">
          Lot Code: <span style={{ color: "#1976D2" }}> {data.lotCode}</span>
        </Typography>
        <Typography component="h6" color="black" fontWeight="bold">
          Total Quantity:{" "}
          <span style={{ color: "#1976D2" }}> {data.quantity} kg</span>
        </Typography>
        <Typography component="h6" color="black" fontWeight="bold">
          Waste Quantity:{" "}
          <span style={{ color: "#1976D2" }}> {data.wasteQuantity} kg</span>
        </Typography>
        <InputContainer>
          <FormControl variant="filled">
            <InputLabel htmlFor="pallet-name">Unused Quantity</InputLabel>
            <FilledInput
              value={newQty}
              onChange={(ev) => {
                const { value } = ev.target;
                const limit = data.quantity - data.wasteQuantity;
                if (
                  !parseFloat(value) ||
                  parseFloat(value) < parseFloat(limit)
                ) {
                  updateNewQty(parseFloat(value || 0));
                } else {
                  updateNewQty(parseFloat(limit));
                }
              }}
              disabled={data.quantity === data.wasteQuantity}
              InputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
              endAdornment={<InputAdornment position="end">kg</InputAdornment>}
            />
            <Typography component="p" variant="p" fontSize={12} color="black">
              Max: {data.quantity - data.wasteQuantity}
            </Typography>
          </FormControl>
          <Button
            size="small"
            variant="contained"
            disabled={data.notUsedQuantity === newQty || isLoading}
            onClick={handleUpdateQty}
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </InputContainer>
      </Box>
    </Item>
  );
};

const SingleWRM = ({ rmIndex, data }) => {
  return (
    <Accordion sx={{ width: "100%", maxWidth: 600 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="pallet-list-item"
        id="pallet-list-item"
      >
        <Typography
          variant="h6"
          component="h6"
          fontWeight="bold"
          color="#1976D2"
        >
          {data.rawMaterialName}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {data?.lrmList?.length ? (
          data.lrmList.map((lrmItem, lrmIndex) => (
            <DetailItem
              key={`lrm-item-${lrmIndex}`}
              rmIndex={rmIndex}
              lrmIndex={lrmIndex}
              data={lrmItem}
            />
          ))
        ) : (
          <Typography>Lot materials not found!</Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default function UnusedRawMaterial({ setActiveTab }) {
  const { rawMaterialsList } = useContext(FormsContext);

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginTop="1.5rem"
        marginBottom="1.5rem"
      >
        {rawMaterialsList.map((rawMaterial, i) => (
          <SingleWRM key={`single-urm-${i}`} rmIndex={i} data={rawMaterial} />
        ))}
      </Box>

      <NavigationButton
        text="See Wasted Raw Materials"
        onClick={() => setActiveTab(2)}
      />
    </>
  );
}
