import React from 'react'
import { Route, Routes } from 'react-router'
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Files from '../pages/Files';
import PrivateRoute from './PrivateRoute';
import Profile from '../pages/Profile';

export default function AllRoutes() {
    return (
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/files"
          element={
            <PrivateRoute>
              <Files />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
            <Profile/>
            </PrivateRoute>
          }
        />
      </Routes>
    );
}
