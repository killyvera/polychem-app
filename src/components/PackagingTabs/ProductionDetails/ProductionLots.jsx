import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";

const ProductionLots = ({ data, handleRemoveProductionLot }) => {
  return (
    <Card sx={{ position: "relative", marginBottom: "1rem" }}>
      <CardHeader
        sx={{ position: "absolute", right: 0 }}
        action={
          <IconButton
            aria-label="remove"
            onClick={() => handleRemoveProductionLot(data.itemIndex, data?.productionLotId)}
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
            Lot Name
          </Typography>
          <Typography variant="h6" component="h6" fontWeight="bold">
            {data.lotName}
          </Typography>
          <Typography
            variant="p"
            component="p"
            fontWeight="bold"
            color="#1976D2"
            marginTop={2}
          >
            Expiration Date
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
            Lot Code
          </Typography>
          <Typography variant="h6" component="h6" fontWeight="bold">
            {data.lotCode}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductionLots;
