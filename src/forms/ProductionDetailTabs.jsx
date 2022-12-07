import { Tabs, Tab } from "@mui/material";
import FactoryIcon from "@mui/icons-material/Factory";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ScienceIcon from "@mui/icons-material/Science";
import ListAltIcon from "@mui/icons-material/ListAlt";
import GroupsIcon from "@mui/icons-material/Groups";

// Components
import ProductionDetail from "../components/ProductionDetail";
import FormulaElementsList from "../components/FormulaElementsList";
import RowMaterialForm from "../components/RowMaterialForm";
import RowMaterialsAbstract from "../components/RowMaterialsAbstract";
import EmployeeStaff from "../components/EmployeeStaff";

const tabsList = (activeTab) => [
  {
    label: <FactoryIcon fontSize="large" />,
    variant: "contained",
    disabled: activeTab < 0,
  },
  {
    label: <ScienceIcon fontSize="large" />,
    variant: "contained",
    disabled: activeTab < 1,
  },
  {
    label: <ShoppingBasketIcon fontSize="large" />,
    variant: "contained",
    disabled: activeTab < 2,
  },
  {
    label: <ListAltIcon fontSize="large" />,
    variant: "contained",
    disabled: activeTab < 3,
  },
  {
    label: <GroupsIcon fontSize="large" />,
    variant: "contained",
    disabled: activeTab < 4,
  },
];

export default function ProductionDetailTabs({
  activeTab,
  setActiveTab,
  productionDetail,
  productDetail,
}) {
  return (
    <>
      <Tabs
        centered
        value={activeTab}
        onChange={(_, value) => setActiveTab(value)}
        style={{ marginTop: "1rem" }}
      >
        {tabsList(activeTab).map((tab, i) => (
          <Tab
            key={`production-detail-tab-${i}`}
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
          <ProductionDetail
            data={productionDetail}
            productDetail={productDetail}
            setActiveTab={setActiveTab}
          />
        }
      />
      <TabPanel
        value={activeTab}
        index={1}
        children={
          <FormulaElementsList
            productDetail={productDetail}
            setActiveTab={setActiveTab}
          />
        }
      />
      <TabPanel
        value={activeTab}
        index={2}
        children={
          <RowMaterialForm
            productId={productDetail?.id}
            productionDetail={productionDetail}
            setActiveTab={setActiveTab}
          />
        }
      />
      <TabPanel
        value={activeTab}
        index={3}
        children={<RowMaterialsAbstract setActiveTab={setActiveTab} />}
      />
      <TabPanel
        value={activeTab}
        index={4}
        children={<EmployeeStaff productId={productDetail?.id} />}
      />
    </>
  );
}

function TabPanel(props) {
  const { children, value, index } = props;
  return <div>{value === index && <div>{children}</div>}</div>;
}
