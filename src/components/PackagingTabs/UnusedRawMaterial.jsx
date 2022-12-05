import { useContext } from "react";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
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

const DetailItem = ({ data }) => {
  return (
    <Item>
      <Avatar
        alt="Lot Raw Material"
        src={Images.ingredient}
        sx={{ width: 56, height: 56 }}
      />
      <Box marginLeft={2} display="flex" flexDirection="column">
        <Typography component="h6" color="black" fontWeight="bold">
          Lot Name: <span style={{ color: "#1976D2" }}> {data.name}</span>
        </Typography>
        <Typography component="h6" color="black" fontWeight="bold">
          Lot Code: <span style={{ color: "#1976D2" }}> {data.code}</span>
        </Typography>
        {/* <Typography component="h6" color="black" fontWeight="bold">
          Unused Lot Quantity:
          <span style={{ color: "#1976D2" }}> {data.quantity}</span>
        </Typography> */}
        <FormControl variant="filled" sx={{ marginTop: "1rem" }}>
          <InputLabel htmlFor="pallet-name">Unused Quantity</InputLabel>
          <FilledInput
            value=""
            onChange={() => {}}
            endAdornment={<InputAdornment position="end">kg</InputAdornment>}
          />
        </FormControl>
      </Box>
    </Item>
  );
};

const SingleWRM = ({ data }) => {
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
            <DetailItem key={`lrm-item-${lrmIndex}`} data={lrmItem} />
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
          <SingleWRM key={`single-urm-${i}`} data={rawMaterial} />
        ))}
      </Box>

      <NavigationButton
        text="See Wasted Raw Materials"
        onClick={() => setActiveTab(2)}
      />
    </>
  );
}
