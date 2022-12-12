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

const tabsList = (activeTab) => [
  {
    label: <InventoryIcon fontSize="large" />,
    variant: "contained",
    disabled: activeTab < 0,
  },
  {
    label: <AssignmentLateIcon fontSize="large" />,
    variant: "contained",
    disabled: activeTab < 1,
  },
  {
    label: <DeleteForeverIcon fontSize="large" />,
    variant: "contained",
    disabled: activeTab < 2,
  },
  {
    label: <AssignmentTurnedInIcon fontSize="large" />,
    variant: "contained",
    disabled: activeTab < 3,
  },
];

export default function PackagingTabs({
  productionDetail,
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
        {tabsList(activeTab).map((tab, i) => (
          <Tab
            key={`packaging-tab-${i}`}
            label={tab.label}
            variant={tab.variant}
            disabled={tab.disabled}
          />
        ))}
      </Tabs>
      <TabPanel
        value={activeTab}
        index={0}
        children={
          <ProductionDetails
            productionDetail={productionDetail}
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
