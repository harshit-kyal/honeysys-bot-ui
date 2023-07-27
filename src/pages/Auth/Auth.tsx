import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate("/spalsh");
    }
  }, []);

  return <div className="bg-background text-primary text-[40px] font-bold">Auth</div>;
};

export default Auth;
