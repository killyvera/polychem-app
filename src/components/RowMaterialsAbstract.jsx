import { useContext } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { FormsContext } from "../contexts/FormsContext";
import Images from "../constants/Images";
import { numberToCommas } from "../utils";

// Components
import NavigationButton from "./NavigationButton";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: "white",
  display: "flex",
  alignItems: "center",
  backgroundColor: "#F0F8FF",
}));

const DetailItem = ({ title, count, unit }) => {
  return (
    <Item>
      <Avatar
        alt="Product Element"
        src={Images.ingredient}
        sx={{ width: 56, height: 56 }}
      />
      <Box marginLeft={2}>
        <Typography component="h6" color="black" fontWeight="bold">
          {title}
        </Typography>
        <Typography
          component="p"
          color="#1976D2"
          marginTop={1}
          fontSize={28}
          fontWeight="bold"
        >
          {numberToCommas(count)} {unit}
        </Typography>
      </Box>
    </Item>
  );
};

const RowMaterialsAbstract = ({ setActiveTab }) => {
  const { rawMaterialsList } = useContext(FormsContext);

  if (!rawMaterialsList.length) {
    return (
      <Typography variant="p" fontWeight="bold" textAlign="center">
        Please Add Raw Material First to See the Abstract!
      </Typography>
    );
  }

  return (
    <Stack spacing={2} marginTop={2}>
      {rawMaterialsList.map((rawMaterial, i) => {
        const { rawMaterialName, lrmList } = rawMaterial;
        const lrmListQuantity = lrmList.reduce(
          (sum, x) => sum + parseInt(x.quantity),
          0
        );

        return (
          <DetailItem
            key={`raw-material-${i}`}
            title={rawMaterialName}
            count={lrmListQuantity}
            unit="kg"
          />
        );
      })}

      <NavigationButton
        text="Add Staff Member"
        onClick={() => setActiveTab(4)}
      />
    </Stack>
  );
};

export default RowMaterialsAbstract;
