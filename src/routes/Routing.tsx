import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Auth from "../pages/Auth/Auth";
import ProtectedRoute from "./ProtectedRoute";

const Routing = () => {
  return (
    <Routes>
      <Route path="auth" element={<Auth />} />
      <Route path="/" element={<ProtectedRoute />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
};

export default Routing;
