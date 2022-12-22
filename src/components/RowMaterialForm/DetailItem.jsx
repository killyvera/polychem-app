import { useContext } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { FormsContext } from "../../contexts/FormsContext";
import Images from "../../constants/Images";
import { numberToCommas } from "../../utils";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: "white",
  display: "flex",
  alignItems: "center",
  backgroundColor: "#F0F8FF",
}));

const ItemContent = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  marginLeft: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const DetailItem = ({
  title,
  count,
  unit,
  handleModalOpen,
  productElementId,
}) => {
  const { rawMaterialsList } = useContext(FormsContext);

  const currentData = rawMaterialsList.find(
    (rawMaterial) => rawMaterial.productElementId === productElementId
  );

  return (
    <Item>
      <Avatar
        alt="Product Element"
        src={Images.ingredient}
        sx={{ width: 56, height: 56 }}
      />
      <ItemContent>
        <Box flex={1}>
          <Typography component="h6" color="black" fontWeight="bold">
            {title}
          </Typography>
          <Typography
            component="p"
            color="#1976D2"
            marginTop={1}
            fontSize="1.25rem"
            fontWeight="bold"
          >
            are needed at least {numberToCommas(count)} {unit}
          </Typography>
          {currentData ? (
            <Typography
              component="p"
              variant="p"
              marginTop={1}
              color="#2aa33e"
              fontWeight="bold"
            >
              Successfully Added Raw Material
            </Typography>
          ) : (
            <Typography
              component="p"
              variant="p"
              marginTop={1}
              color="#f13737"
              fontWeight="bold"
            >
              Please Add Raw Material
            </Typography>
          )}
        </Box>
        <Box flex={1} marginTop={2} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            onClick={() =>
              handleModalOpen({
                title,
                count,
                unit,
                productElementId,
              })
            }
          >
            {currentData ? "Edit" : "Add"} Raw Material
          </Button>
        </Box>
      </ItemContent>
    </Item>
  );
};

export default DetailItem;
