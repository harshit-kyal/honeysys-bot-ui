import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import HeaderBar from "../components/header/Header";

const ProtectedRoute = () => {
  const token = localStorage.getItem("accessToken");

  return token ? (
    <div className="">
      <HeaderBar />
      <Outlet />
    </div>
  ) : (
    <Navigate to="/splash" />
  );
};

export default ProtectedRoute;
