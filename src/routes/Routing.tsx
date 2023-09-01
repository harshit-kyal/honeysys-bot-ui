import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

// Lazy-loaded components
const Splash = lazy(() => import("../pages/splash/Splash"));
const Login = lazy(() => import("../pages/login/Login"));
const OTP = lazy(() => import("../pages/otp/OTP"));
const Success = lazy(() => import("../pages/success/Success"));
const Catalog = lazy(() => import("../pages/catalog/Catalog"));
const Categories = lazy(() => import("../pages/categories/Categories"));
const AddProduct = lazy(() => import("../pages/addProduct/AddProduct"));
const ViewProduct = lazy(() => import("../pages/viewProduct/ViewProduct"));
const Cart = lazy(() => import("../pages/cart/Cart"));
const Address = lazy(() => import("../pages/address/Address"));
const SearchProduct = lazy(
  () => import("../pages/searchProduct/SearchProduct")
);
const PDP = lazy(() => import("../pages/PDP/PDP"));
const Home = lazy(() => import("../pages/Home/Home"));

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
