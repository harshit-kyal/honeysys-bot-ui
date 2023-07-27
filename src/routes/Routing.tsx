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
        <Route path="/splash" element={<Home />} />
        <Route path="/login" element={<Home />} />
        <Route path="/otp" element={<Home />} />
        <Route path="/success" element={<Home />} />
        <Route path="/catalog" element={<Home />} />
        <Route path="/categories/:id" element={<Home />} />
        <Route path="/addProduct/:id" element={<Home />} />
        <Route path="/viewProduct/:id" element={<Home />} />
        <Route path="/cart" element={<Home />} />
        <Route path="/address" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default Routing;
