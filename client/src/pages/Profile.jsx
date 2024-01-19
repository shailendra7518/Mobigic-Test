// Profile.js

import { jwtDecode } from "jwt-decode";
import React from "react";
import { useSelector } from "react-redux";
const Profile = () => {
    const { currentUser } = useSelector((state) => state.user)
    const decode = () => {
        if (currentUser) {
                return jwtDecode(currentUser.token);
         }

    }
   
  return (
    <div className="bg-gray-100 mt-10 p-6 rounded-md shadow-md max-w-md mx-auto">
      <img
        src="https://lh3.googleusercontent.com/a/ACg8ocJJxyA7j5EwzHcI2Kv8zboqfahfHnbsgh0ytO5iev4lmw4=s432-c-no" // Replace with your profile image URL
        alt="Profile"
        className="w-20 h-20 rounded-full mx-auto mb-4"
      />
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        {decode().username}
      </h2>
      <p className="text-gray-600 mb-4">Web Developer</p>
      <div className="flex justify-between text-gray-600">
        <p>UserId: {decode().userId}</p>
        <p>Location: City, Country</p>
      </div>
    </div>
  );
};

export default Profile;
