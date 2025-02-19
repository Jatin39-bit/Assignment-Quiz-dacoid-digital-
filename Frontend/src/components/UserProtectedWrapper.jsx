/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { dataContext } from '../context/ContextApi'
import axios from 'axios'

const UserProtectedWrapper = ({children}) => {
    const navigate = useNavigate()
    const {data,setData,setLoggedIn}=useContext(dataContext)
    const [token, setToken] = useState(localStorage.getItem('token'))
  

    useEffect(()=>{
      async function auth(){
      try{
        const response= await axios.get(import.meta.env.VITE_API_URL + '/user/profile',{
          headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.status === 200){
          setLoggedIn(true)
          setData(response.data)
        }
      }catch(error){
        localStorage.removeItem('token')
        navigate('/login')
        console.log(error)
      }
    }
    auth()
    },[token, navigate ])

  return <>{children}</>
}

export default UserProtectedWrapper