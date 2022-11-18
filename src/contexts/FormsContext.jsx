import React, { useEffect, createContext, useState } from 'react'
import { DataStore } from '@aws-amplify/datastore';
import { Production } from '../models';
import Images from '../constants/Images'

export const FormsContext = createContext();

export const FormsContextProvider = (props) => {
    const [usersFormList, setUsersFormList] = useState([])
    const [usersProfile, setUsersProfile] = useState([])
    const [toggle, setToggle] = useState(true)
    const [pallets, setPallets] = useState([]);
    const [packages, setPackages] = useState([]);
    const [production, setProduction] = useState([]);


    useEffect(() => {
        getProduction();
    }, [])

    const getProduction = async () => {
        const productions = await DataStore.query(Production);
        setProduction(productions)
        console.log({ productions });
    }

    const handleView = () => {
        setToggle(!toggle)
        //console.log(toggle)
    }

    const ingredients = [
        {
            name: 'Sal rosa del Himalaya',
            image: Images.ingredient,
            quantity: 2000,
        },
        {
            name: 'Sal rosa del Himalaya',
            image: Images.ingredient,
            quantity: 2000,

        },
        {
            name: 'Sal rosa del Himalaya',
            image: Images.ingredient,
            quantity: 2000,
        }
    ]


    return (
        <FormsContext.Provider value={{
            ingredients,
            usersFormList,
            setUsersFormList,
            handleView,
            usersProfile,
            setUsersProfile,
            toggle,
            pallets,
            setPallets,
            packages,
            setPackages
        }}>
            {props.children}
        </FormsContext.Provider>
    )
}
