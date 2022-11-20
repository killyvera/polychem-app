import { Tabs, Tab } from "@mui/material";
import FactoryIcon from "@mui/icons-material/Factory";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ScienceIcon from "@mui/icons-material/Science";
import GroupsIcon from "@mui/icons-material/Groups";

// Components
import ProductionDetail from "../components/ProductionDetail";
import FormulaElementsList from "../components/FormulaElementsList";
import RowMaterialForm from "../components/RowMaterialForm";
import RowMaterialsAbstract from "../components/RowMaterialsAbstract";

export default function ProductionDetailTabs({
  activeTab,
  setActiveTab,
  productionDetail,
}) {
  return (
    <>
      <Tabs
        centered
        value={activeTab}
        onChange={(event, value) => setActiveTab(value)}
      >
        <Tab label={<FactoryIcon fontSize="large" />} variant="contained" />
        <Tab label={<ScienceIcon fontSize="large" />} />
        <Tab label={<ShoppingBasketIcon fontSize="large" />} />
        <Tab label={<GroupsIcon fontSize="large" />} />
      </Tabs>
      <TabPanel
        value={activeTab}
        index={0}
        children={<ProductionDetail data={productionDetail} />}
      />
      <TabPanel
        value={activeTab}
        index={1}
        children={
          <FormulaElementsList
            productID={productionDetail?.productionProductId}
          />
        }
      />
      <TabPanel value={activeTab} index={2} children={<RowMaterialForm />} />
      <TabPanel
        value={activeTab}
        index={3}
        children={<RowMaterialsAbstract />}
      />
    </>
  );
}

function TabPanel(props) {
  const { children, value, index } = props;
  return <div>{value === index && <div>{children}</div>}</div>;
}
