import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

const Splash = () => {
  const navigation = useNavigate();
  const handleGetStartedClick = () => {
    navigation("/login");
  };
  return (
    <div className="px-4 py-5 text-center w-100">
      <div className="w-100 flex justify-center">
        <img src="/images/Logo.svg" alt="logo" height={250} width={250}></img>
      </div>
      <div className="mt-8 font-bold text-[24px]">
        Unleash the Future with Our{" "}
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
        <Button title="Get Started" handleClick={handleGetStartedClick} />
      </div>
    </div>
  );
};

export default Splash;
