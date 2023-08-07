import React from "react";
import BackButton from "../../components/BackButton";
import { CheckBox, Text } from "@polynomialai/alpha-react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const navigation = useNavigate();
  const handleGetStartedClick = () => {
    navigation("/otp");
  };
  return (
    <div className="login px-2 py-4">
      <BackButton />
      <div className="text-[26px] font-bold -mt-4">
        Log in and Embrace the{" "}
        <span className="text-primary">Retail Revolution</span>
      </div>
      <div className="text-[14px] font-normal">Provide Your Mobile Number</div>
      <div className="mt-4 flex">
        <select className="px-3">
          <option className="px-3">{`+91 (IND)`}</option>
        </select>
        <input
          type="tel"
          name="phoneno"
          id="phoneno"
          placeholder="Enter your mobile number"
          className="ml-2"
          required
          max={10}
          min={10}
        ></input>
      </div>
      <div className="mt-8">
        <CheckBox
          onChange={function Ha() {}}
          selected={true}
          className="login-chk w-full items-start"
        >
          <Text
            type="body"
            size="md"
            className="whitespace-pre-line text-gray-400 font-normal"
          >
            By clicking on “Send Verification Code” you accept our{" "}
            <Text type="body" size="md" className="inline-block text-primary underline underline-offset-[1.5px] font-normal">
              <a href="#">Terms & Conditions</a>
            </Text>
            {" "}and authorize us for your future support and guidance.
          </Text>
        </CheckBox>
      </div>
      <div className="flex justify-center mt-8 w-100">
        <Button
          title="Send Verification Code"
          handleClick={handleGetStartedClick}
        />
      </div>
    </div>
  );
};

export default Login;
