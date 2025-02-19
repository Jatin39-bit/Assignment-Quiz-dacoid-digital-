/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { createContext, useState } from 'react'

export const dataContext= createContext()
const ContextApi = ({children}) => {

    const [data,setData]=useState(null)
    const [loggedIn, setLoggedIn] = useState(false)

  return (
    <dataContext.Provider value={{data, setData, loggedIn, setLoggedIn}}>
    {children}
    </dataContext.Provider>
  )
}

export default ContextApi