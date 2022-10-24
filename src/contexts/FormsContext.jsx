import React, { createContext, useState } from 'react'
import Images from '../constants/Images'

export const FormsContext = createContext();

export const FormsContextProvider = (props) => {
    const [usersFormList, setUsersFormList] = useState([])
    const [usersProfile, setUsersProfile] = useState([])
    const [toggle, setToggle] = useState(true)

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
            toggle
        }}>
            {props.children}
        </FormsContext.Provider>
    )
}
