import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Auth from "../pages/Auth/Auth";
import ProtectedRoute from "./ProtectedRoute";
import Splash from "../pages/splash/Splash";
import Login from "../pages/login/Login";
import OTP from "../pages/otp/OTP";
import Success from "../pages/success/Success";
import Catalog from "../pages/catalog/Catalog";
import Categories from "../pages/categories/Categories";
import AddProduct from "../pages/addProduct/AddProduct";
import ViewProduct from "../pages/viewProduct/ViewProduct";
import Cart from "../pages/cart/Cart";
import Address from "../pages/address/Address";

const Routing = () => {
  return (
    <Routes>
      <Route path="auth" element={<Auth />} />
      <Route path="/splash" element={<Splash />} />
      <Route path="/login" element={<Login />} />
      <Route path="/otp" element={<OTP />} />
      <Route path="/" element={<ProtectedRoute />}>
        <Route index element={<Home />} />
        <Route path="/success" element={<Success />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/categories/:id" element={<Categories />} />
        <Route path="/addProduct/:id" element={<AddProduct />} />
        <Route path="/viewProduct/:id" element={<ViewProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/address" element={<Address />} />
      </Route>
    </Routes>
  );
};

export default Routing;
