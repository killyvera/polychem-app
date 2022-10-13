import React, { createContext, useState } from 'react'

export const FormsContext = createContext();

export const FormsContextProvider = (props) => {
    const [usersFormList, setUsersFormList] = useState([])
    const [usersProfile, setUsersProfile] = useState([])
    const [toggle, setToggle] = useState(true)

    const handleView = () => {
        setToggle(!toggle)
        //console.log(toggle)
    }

    return (
        <FormsContext.Provider value={{
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
