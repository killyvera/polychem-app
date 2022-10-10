import React, { createContext, useEffect, useState } from 'react'

export const FormsContext = createContext();

export const FormsContextProvider = () => {

    const form = [
        {
            users: [
                {
                    userId:'',
                    shift:''
                },
            ]
        }
    ]
    const [usersForm, setUsersForm] = useState({})
    return (
        'hi'
  )
}
