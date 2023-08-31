import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import HeaderBar from "../components/header/Header";

const ProtectedRoute = () => {
  const token = localStorage.getItem("accessToken");
  const [isHeader, setIsHeader] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setIsHeader(true);
    } else {
      setIsHeader(false);
    }
  }, [location.pathname]);

  return token ? (
    <div className="">
      {isHeader && <HeaderBar />}
      <Outlet />
    </div>
  ) : (
    <Navigate to="/splash" />
  );
};

export default ProtectedRoute;
