import { Tabs, Tab, Box } from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

// Components
import ProductionDetails from "./ProductionDetails";
import UnusedRawMaterial from "./UnusedRawMaterial";
import WastedRawMaterial from "./WastedRawMaterial";
import FinishProduction from "./FinishProduction";

export default function PackagingTabs({
  productDetail,
  activeTab,
  setActiveTab,
}) {
  return (
    <Box marginTop={2}>
      <Tabs
        centered
        value={activeTab}
        onChange={(_, value) => setActiveTab(value)}
      >
        <Tab label={<InventoryIcon fontSize="large" />} variant="contained" />
        <Tab label={<AssignmentLateIcon fontSize="large" />} />
        <Tab label={<DeleteForeverIcon fontSize="large" />} />
        <Tab label={<AssignmentTurnedInIcon fontSize="large" />} />
      </Tabs>
      <TabPanel
        value={activeTab}
        index={0}
        children={
          <ProductionDetails
            productDetail={productDetail}
            setActiveTab={setActiveTab}
          />
        }
      />
      <TabPanel
        value={activeTab}
        index={1}
        children={<UnusedRawMaterial setActiveTab={setActiveTab} />}
      />
      <TabPanel
        value={activeTab}
        index={2}
        children={<WastedRawMaterial setActiveTab={setActiveTab} />}
      />
      <TabPanel
        value={activeTab}
        index={3}
        children={<FinishProduction setActiveTab={setActiveTab} />}
      />
    </Box>
  );
}

function TabPanel(props) {
  const { children, value, index } = props;
  return <div>{value === index && <div>{children}</div>}</div>;
}
