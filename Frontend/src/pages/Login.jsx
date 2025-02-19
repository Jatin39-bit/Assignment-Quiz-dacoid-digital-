/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';


const Login = () => {
  const navigate=useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
    const response = await axios.post(import.meta.env.VITE_API_URL + "/user/login", {
      email,
      password,
    });
    if (response.status === 200) {
      localStorage.setItem('token', response.data.token)
      toast.success(response.data.message);
      navigate('/')
    }else{
      toast.error("Login failed");
    }
  }catch(error){
    if(error.response.data.message == 'User not found'){
      toast.error("Wrong email")
    }else{
    toast.error(error.response.data.message)
    }
  }
  };


  return (
     <div className="flex items-center justify-center min-h-screen bg-gray-800 text-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-900 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full p-2 mt-1 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full p-2 mt-1 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={password}
              minLength={8}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 mt-4 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            Login
          </button>
          <br />
            <p>Don't have an Account? <Link to="/register" className="text-blue-600">Register</Link> </p>
        </form>
      <ToastContainer />
      </div>
    </div>
  )
}

export default Login