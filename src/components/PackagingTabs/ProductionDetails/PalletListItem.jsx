import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
// import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Accordion from "@mui/material/Accordion";
import Tooltip from "@mui/material/Tooltip";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { numberToCommas } from "../../../utils";

const PalletListItem = ({
  data,
  handleEditPallet,
  handleRemovePallet,
  //   handleRemovePalletPackage,
}) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="pallet-list-item"
        id="pallet-list-item"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Typography>{data.palletName}</Typography>
          <Box display="flex" justifyContent="flex-end" alignItems="center">
            <Tooltip title="Edit Pallet">
              <IconButton
                aria-label="edit pallet"
                sx={{ color: "#1976d2", marginRight: "0.25rem" }}
                onClick={() => handleEditPallet(data.itemIndex)}
              >
                <EditIcon sx={{ fontSize: "1rem" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Remove Pallet">
              <IconButton
                aria-label="remove pallet"
                sx={{ color: "red", marginRight: "0.25rem" }}
                onClick={() =>
                  handleRemovePallet(data.itemIndex, data?.palletId)
                }
              >
                <CloseIcon sx={{ fontSize: "1rem" }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Typography fontWeight="bold" color="#1976D2" marginBottom="1rem">
          Packages:
        </Typography>
        {data.palletPackagesList.map((palletPackage, packageIndex) => (
          <Card
            sx={{ position: "relative", marginBottom: "1rem" }}
            key={`pallet-package-${packageIndex}`}
          >
            {/* <CardHeader
              sx={{ position: "absolute", right: 0 }}
              action={
                <IconButton
                  aria-label="remove"
                  onClick={() =>
                    handleRemovePalletPackage(data.itemIndex, packageIndex)
                  }
                >
                  <CloseIcon />
                </IconButton>
              }
            /> */}
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
                  {palletPackage.packageName}
                </Typography>
                {/* <Typography
                  variant="p"
                  component="p"
                  fontWeight="bold"
                  color="#1976D2"
                  marginTop={2}
                >
                  Expire Date
                </Typography>
                <Typography variant="h6" component="h6" fontWeight="bold">
                  {new Date(palletPackage.expireDate).toLocaleDateString()}
                </Typography> */}
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
                  {numberToCommas(palletPackage.units)}
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
                  {palletPackage.packageCode}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default PalletListItem;
