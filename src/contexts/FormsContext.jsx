import { useEffect, createContext, useState, useCallback } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Production } from "../models";
import { usersList } from "../services/UserServices";

export const FormsContext = createContext();

const initialProductDetails = () => ({
  unitsProduced: undefined,
  packagesProduced: undefined,
  palletsProduced: undefined,
  extraUnits: undefined,
  notes: undefined,
});

export const FormsContextProvider = (props) => {
  const [usersFormList, setUsersFormList] = useState([]);
  const [usersProfile, setUsersProfile] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [formDetail, updateFormDetail] = useState(null);
  const [productDetail, updateProductDetail] = useState(null);
  const [pallets, setPallets] = useState([]);
  const [packages, setPackages] = useState([]);
  const [productionList, setProduction] = useState([]);
  const [productElements, setProductElements] = useState([]);
  const [rawMaterialsList, updateRawMaterialsList] = useState([]);
  const [selectedEmployees, updateSelectedEmployees] = useState([]);
  const [productStepDetails, updateProductStepDetails] = useState(
    initialProductDetails()
  );
  const [productionLots, updateProductionLots] = useState([]);
  const [palletsList, updatePalletsList] = useState([]);

  const getProduction = useCallback(() => {
    try {
      const subscription = DataStore.observeQuery(Production).subscribe(
        (snapshot) => {
          const { items } = snapshot;
          setProduction(items);
        }
      );
      return subscription;
    } catch (error) {
      console.log("Error Getting Production: ", error);
    }
  }, []);

  const getUsers = async () => {
    try {
      const users = await usersList();
      const filteredUsers =
        users && users.length
          ? users
              .filter((user) => user.UserStatus === "CONFIRMED" && user.Enabled)
              .map((user) => {
                const userAttributes = [
                  ...user.Attributes,
                  { name: "turn", Value: "morning" },
                ];
                return {
                  userInfo: userAttributes,
                  userId: user.Username,
                };
              })
          : [];
      setUsersProfile(filteredUsers);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleView = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    const subscription = getProduction();

    getUsers();
    setPallets([]);
    setPackages([]);

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [getProduction]);

  return (
    <FormsContext.Provider
      value={{
        usersFormList,
        setUsersFormList,
        handleView,
        usersProfile,
        setUsersProfile,
        toggle,
        pallets,
        packages,
        productionList,
        productElements,
        setProductElements,
        rawMaterialsList,
        updateRawMaterialsList,
        selectedEmployees,
        updateSelectedEmployees,
        productStepDetails,
        updateProductStepDetails,
        productionLots,
        updateProductionLots,
        palletsList,
        updatePalletsList,
        formDetail,
        updateFormDetail,
        productDetail,
        updateProductDetail,
      }}
    >
      {props.children}
    </FormsContext.Provider>
  );
};
