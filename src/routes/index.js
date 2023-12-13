import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Quiz from "../pages/Quiz";
import Yönet from "../pages/onlystuff/Murathoca"

const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Quiz />} />
      <Route path="/murathoca" element={<Yönet />} />
    </Routes>
  );
};

export default ProtectedRoutes;
