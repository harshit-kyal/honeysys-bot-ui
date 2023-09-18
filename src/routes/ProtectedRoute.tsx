import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import HeaderBar from "../components/header/Header";

const ProtectedRoute = () => {
  const token = localStorage.getItem("accessToken");
  const reviewToken = localStorage.getItem("reviewToken");
  console.log(reviewToken);

  const [isHeader, setIsHeader] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setIsHeader(true);
    } else {
      setIsHeader(false);
    }
  }, [location.pathname, localStorage.getItem("reviewToken")]);

  return token || reviewToken ? (
    <div className="">
      {isHeader && <HeaderBar />}
      <Outlet />
    </div>
  ) : !reviewToken ? (
    <Navigate to="/splash" />
    // <></>
  ) : (
    <></>
  );
};

export default ProtectedRoute;
