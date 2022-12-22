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
import { numberToCommas } from "../../utils";

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
          updated.wasteQuantity = newQty;
          updated.useQuantity = data.quantity - data.notUsedQuantity - newQty;
        })
      );
      const updatedRawMaterialsList = [...rawMaterialsList];
      updatedRawMaterialsList[rmIndex].lrmList[lrmIndex] = {
        ...updatedRawMaterialsList[rmIndex].lrmList[lrmIndex],
        wasteQuantity: newQty,
      };
      updatedRawMaterialsList[rmIndex].lrmList[lrmIndex] = {
        ...updatedRawMaterialsList[rmIndex].lrmList[lrmIndex],
        useQuantity: data.quantity - data.notUsedQuantity - newQty,
      };
      updateRawMaterialsList(updatedRawMaterialsList);
      setIsLoading(false);
    } catch (error) {
      console.log("ERROR UNUSED MATERIAL: ", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    updateNewQty(parseFloat(data.wasteQuantity));
  }, [data]);

  const wastePercentage = (newQty / data.quantity) * 100;

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
          Waste Percentage:{" "}
          <span style={{ color: "#1976D2" }}>
            {wastePercentage.toFixed(2)}% of Material
          </span>
        </Typography>
        <Typography component="h6" color="black" fontWeight="bold">
          Total Quantity:{" "}
          <span style={{ color: "#1976D2" }}>
            {" "}
            {numberToCommas(data.quantity)}
          </span>
        </Typography>
        <Typography component="h6" color="black" fontWeight="bold">
          Unused Quantity:{" "}
          <span style={{ color: "#1976D2" }}>
            {" "}
            {numberToCommas(data.notUsedQuantity)} kg
          </span>
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          marginTop="1rem"
        >
          <FormControl variant="filled">
            <InputLabel htmlFor="pallet-name">Wasted Quantity</InputLabel>
            <FilledInput
              value={newQty}
              onChange={(ev) => {
                const { value } = ev.target;
                const limit = data.quantity - data.notUsedQuantity;
                if (
                  !parseFloat(value) ||
                  parseFloat(value) < parseFloat(limit)
                ) {
                  updateNewQty(parseFloat(value || 0));
                } else {
                  updateNewQty(parseFloat(limit));
                }
              }}
              disabled={data.quantity === data.notUsedQuantity}
              InputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
              endAdornment={<InputAdornment position="end">kg</InputAdornment>}
            />
            <Typography component="p" variant="p" fontSize={12} color="black">
              Max: {numberToCommas(data.quantity - data.notUsedQuantity)}
            </Typography>
          </FormControl>
          <Button
            size="small"
            variant="contained"
            disabled={data.wasteQuantity === newQty || isLoading}
            onClick={handleUpdateQty}
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </Box>
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

export default function WastedRawMaterial({ setActiveTab }) {
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
          <SingleWRM key={`single-wrm-${i}`} rmIndex={i} data={rawMaterial} />
        ))}
      </Box>

      <NavigationButton
        text="See Final Report"
        onClick={() => setActiveTab(3)}
      />
    </>
  );
}
