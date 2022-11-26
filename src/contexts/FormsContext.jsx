import React, { useEffect, createContext, useState } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Production } from "../models";
import { ingredientsList } from "../mock";
import { usersList } from "../services/UserServices";

export const FormsContext = createContext();

export const FormsContextProvider = (props) => {
  const [usersFormList, setUsersFormList] = useState([]);
  const [ingredients, setIngredientsList] = useState([]);
  const [usersProfile, setUsersProfile] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [pallets, setPallets] = useState([]);
  const [packages, setPackages] = useState([]);
  const [productionList, setProduction] = useState([]);
  const [productElements, setProductElements] = useState([]);
  const [rawMaterialsList, updateRawMaterialsList] = useState([]);
  const [selectedEmployee, updateSelectedEmployee] = useState(null);

  const getProduction = async () => {
    const productions = await DataStore.query(Production);
    setProduction(productions);
  };

  const getUsers = async () => {
    try {
      const users = await usersList();
      const filteredUsers =
        users && users.length
          ? users
              .filter((user) => user.UserStatus === "CONFIRMED" && user.Enabled)
              .map((user) => ({
                userInfo: user.Attributes,
                userId: user.Username,
              }))
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
    getProduction();
    getUsers();
    setIngredientsList(ingredientsList);
    setPallets([]);
    setPackages([]);
  }, []);

  return (
    <FormsContext.Provider
      value={{
        ingredients,
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
        selectedEmployee,
        updateSelectedEmployee,
      }}
    >
      {props.children}
    </FormsContext.Provider>
  );
};
