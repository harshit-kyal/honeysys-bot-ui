import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button1 from "../../components/Button/Button";
import { Text, VerificationInput, Button } from "@polynomialai/alpha-react";
import { botApi } from "../../api";
import { useAppSelector } from "../../app/hooks";
import { ToastPopup } from "../../utils/TosterPopup";

const Splash = () => {
  const navigation = useNavigate();
  const Error = useAppSelector((state) => state.home.error);
  const [Loading, setLoading] = useState(false);
  const handleGetStartedClick = React.useCallback(() => {
    setLoading(true);
    botApi(
      {
        loginId: "7013721300",
        otp: "8409",
        action: "genrateGuestToken",
        clientName: "honeySys",
      },
      "splash"
    )
      .then((response) => {
        setLoading(false);
        const accessToken = response?.data?.data?.access_token;
        if (accessToken) {
          localStorage.setItem("token", accessToken);
          navigation("/login");
        }
      })
      .catch(() => {
        ToastPopup({ text: "something went wrong" });
        setLoading(false);
      });
  }, [navigation]);

  return (
    <div className="px-4 py-5 text-center w-100">
      <div className="w-100 flex justify-center mt-3">
        <img src="/images/Logo.svg" alt="logo" height={250} width={250}></img>
      </div>
      <div className="mt-8 font-semibold text-[24px]">
        Unleash the Future with Our
        <span className="text-primary"> Bot Powered </span> Ecommerce Platform!
      </div>
      <div className="w-100 flex justify-center mt-6">
        <img
          src="/images/landingImage.svg"
          alt="landingimage"
          width={300}
          height={300}
        ></img>
      </div>
      <div className="text-[12px] font-light px-4 mt-6">
        Introducing the cutting-edge Bot Powered Ecommerce Platform – the next
        evolution in online shopping!
      </div>
      <div className="flex justify-center mt-8 w-100">
        <Button
          isLoading={Loading}
          className="flex justify-center items-center !bg-primary text-background px-6 py-2 rounded-3xl min-h-[46px] min-w-[165px]"
          onClick={() => handleGetStartedClick()}
        >
          <span className="text-white text-[14px] flex">
            <span className="mt-1"> Get Started</span>
            <img
              src="/images/arrow_circle_right.svg"
              alt="right"
              width={30}
              height={30}
              className="ml-2"
            ></img>
          </span>
        </Button>
      </div>
    </div>
  );
};

export default Splash;
