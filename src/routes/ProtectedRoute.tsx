import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import HeaderBar from "../components/header/Header";
import { useAppSelector } from "../app/hooks";

const ProtectedRoute = () => {
  const token = localStorage.getItem("accessToken");
  const storeId = useAppSelector((state) => state.home.storeId);
  const reviewToken = localStorage.getItem("reviewToken");

  const [isHeader, setIsHeader] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setIsHeader(true);
    } else {
      setIsHeader(false);
    }
  }, [location.pathname, reviewToken]);
  const [render, setrender] = useState(false);
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const reviewToken = searchParams.get("token");
    reviewToken && localStorage.setItem("reviewToken", reviewToken);
  }, [window.location.search]);
  useEffect(() => {
    setTimeout(() => {
      setrender(true);
    }, 500);
  }, []);
  return render ? (
    // token || reviewToken ? (
    <div className="">
      {isHeader && <HeaderBar />}
      <Outlet />
    </div>
  ) : (
    // )
    // : !reviewToken ? (
    //   <Navigate to="/splash" />
    // )
    // : (
    //   // <></>
    //   <></>
    // )
    <></>
  );
};

export default ProtectedRoute;
