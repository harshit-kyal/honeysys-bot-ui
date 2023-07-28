import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("accessToken");

  return true ? <Outlet /> : <Navigate to="/auth" />;
};

export default ProtectedRoute;
