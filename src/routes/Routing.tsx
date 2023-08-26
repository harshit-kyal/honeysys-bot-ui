import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
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
import SearchProduct from "../pages/searchProduct/SearchProduct";
import PDP from "../pages/PDP/PDP";

const Routing = () => {
  return (
    <Routes>
      <Route path="/splash" element={<Splash />} />
      <Route path="/login" element={<Login />} />
      <Route path="/otp" element={<OTP />} />
      <Route path="/success" element={<Success />} />
      <Route path="/" element={<ProtectedRoute />}>
        <Route index element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/categories/:id" element={<Categories />} />
        <Route path="/addProduct/:id" element={<AddProduct />} />
        <Route path="/viewProduct/:id" element={<ViewProduct />} />
        <Route path="/pdp/:id" element={<PDP />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/address" element={<Address />} />
        <Route path="/search" element={<SearchProduct />} />
      </Route>
    </Routes>
  );
};

export default Routing;
