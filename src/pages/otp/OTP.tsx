import React, { useEffect, useState } from "react";
import BackButton from "../../components/BackButton";
import { VerificationInput } from "@polynomialai/alpha-react";
import "./index.css";
import Button from "../../components/Button";
import { useNavigate } from "react-router";

const OTP = () => {
  const [OTP, setOTP] = useState<string>("");
  const navigate = useNavigate();

  const wrongOTP = () => {
    const cssEle = document.getElementsByClassName("ring-primary-color");

    const cssArray = Array.from(cssEle);

    cssArray.forEach((element) => {
      (element as HTMLElement).style.cssText =
        "--tw-ring-opacity: 1;--tw-ring-color: var(--error);";
    });
  };

  return (
    <div className="w-screen h-screen px-5 py-3">
      <BackButton />
      <div className="text-2xl font-semibold">
        <div>Enter Verification Code and </div>
        <div className="text-primary">Experience The Future</div>
      </div>
      <div className="mt-4">
        <div className="mb-2 text-sm font-normal">
          Enter The Verification Code
        </div>
        <div className="flex justify-around otp-div">
          <VerificationInput
            onChange={(e: any) => {
              setOTP(e);
            }}
          />
        </div>
      </div>
      <div className="text-sm font-normal mt-10">
        Enter the verification code has been sent to your provided mobile number
        <span className="text-primary font-[500]">+9178XXXXXX03</span>. Check
        your SMS for the following.
      </div>
      <div className="mt-10 flex justify-center">
        <Button
          title="Verify & Continue"
          handleClick={() => {
            if (OTP !== "") {
              navigate("/success");
            }
          }}
        />
      </div>
    </div>
  );
};

export default OTP;
