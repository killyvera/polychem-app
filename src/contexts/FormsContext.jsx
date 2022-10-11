import React, { createContext, useEffect, useState } from 'react'

export const FormsContext = createContext();

export const FormsContextProvider = (props) => {
    const [usersFormList, setUsersFormList] = useState([])

    const Hello=()=>{
        return 'hii'
    }

    return (
        <FormsContext.Provider value={{
            usersFormList,
            setUsersFormList,
            Hello
        }}>
            {props.children}
        </FormsContext.Provider>
  )
}
