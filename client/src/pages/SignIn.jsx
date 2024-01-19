import React, { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'

import { signInFailure, signInStart, signInSuccess } from "../redux/features/userSlice";
const Login = () => {
  const [userName, setUserName] = useState('')
  const [password,setPassword]=useState('')
  const disptach = useDispatch()
  const navigate = useNavigate();
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      disptach(signInStart())
      const res = await fetch("http://localhost:8080/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({username:userName,password:password})
      });
      const data = await res.json();
      if (data.error) {
        return
      }
      disptach(signInSuccess(data))
      navigate('/')
    
    } catch (error) {
      disptach(signInFailure(error))
     
     }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4">SignIn</h1>

        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={userName}
              className="w-full p-3 border rounded"
              placeholder="Enter your username"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-3 border rounded"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Login
          </button>
          <Link className="mt-4" to={"/signup"}>
            SignUp
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
