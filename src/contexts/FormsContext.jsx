import React, { useEffect, createContext, useState } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Production } from "../models";
import { formsList, ingredientsList } from "../mock";

export const FormsContext = createContext();

export const FormsContextProvider = (props) => {
  const [usersFormList, setUsersFormList] = useState([]);
  const [ingredients, setIngredientsList] = useState([]);
  const [usersProfile, setUsersProfile] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [pallets, setPallets] = useState([]);
  const [packages, setPackages] = useState([]);
  const [productionList, setProduction] = useState([]);

  const getProduction = async () => {
    const productions = await DataStore.query(Production);
    setProduction(productions);
  };

  const handleView = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    getProduction();
    setUsersFormList(formsList);
    setIngredientsList(ingredientsList);
    setPallets([]);
    setPackages([]);
  }, []);

  return (
    <FormsContext.Provider
      value={{
        ingredients,
        usersFormList,
        handleView,
        usersProfile,
        setUsersProfile,
        toggle,
        pallets,
        packages,
        productionList,
      }}
    >
      {props.children}
    </FormsContext.Provider>
  );
};
