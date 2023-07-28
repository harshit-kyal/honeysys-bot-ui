import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("accessToken");
  return false ? <Outlet /> : <Navigate to="/splash" />;
};

export default ProtectedRoute;
