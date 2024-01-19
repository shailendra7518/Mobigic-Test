import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const SignUp = () => {
   const [userName, setUserName] = useState("");
   const [password, setPassword] = useState("");
   const navigate = useNavigate();
   const handleSignUp = async (e) => {
     e.preventDefault();
     try {
       if (userName.length <= 3 || password.length <= 3) {
         alert('username or password too short')
         return;
      }
       const res = await fetch("http://localhost:8080/api/auth/signup", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({ username: userName, password: password }),
       });
       const data = await res.json();
       console.log(data)
        
       navigate("/signin");
     } catch (error) {
       console.log(error)
     }
   };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4">SignUp</h1>

        <form onSubmit={handleSignUp}>
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            SignUp
          </button>
          <Link to={"/signin"}>SignIn</Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
