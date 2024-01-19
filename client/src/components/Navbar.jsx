import React from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from "react-redux";
import { logoutUserSuccess } from "../redux/features/userSlice";

const Navbar = () => {
  
  const { currentUser } = useSelector((state) => state.user)
  const disptach = useDispatch()
  const handleLogoOut = () => {
    disptach(logoutUserSuccess())
  }
  
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand/logo */}
        <a href="#" className="text-white font-bold text-xl">
          Mobigic Test
        </a>

        {/* Navigation links */}
        <div className="hidden md:flex space-x-4 items-center">
          <Link className="text-white hover:text-gray-300" to={"/"}>
            Home
          </Link>
          <Link className="text-white hover:text-gray-300" to={"/files"}>
            files
          </Link>
          <Link className="text-white hover:text-gray-300" to={"/profile"}>
            Profile
          </Link>
          {currentUser ? (
            <button className="bg-white p-2 rounded-sm" onClick={handleLogoOut}>Logout</button>
          ) : (
            <Link className="text-white hover:text-gray-300" to={"/signin"}>
              SignIn
            </Link>
          )}
        </div>

        {/* Responsive menu button (shown on smaller screens) */}
      </div>
    </nav>
  );
};

export default Navbar;
