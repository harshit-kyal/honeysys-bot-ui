import { useState } from "react";
import BackButton from "../../components/Button/BackButton";
import { CheckBox, Input, Text, Button } from "@polynomialai/alpha-react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { botApi } from "../../api";
import { useDispatch } from "react-redux";
import { setMobileNo, setOtp } from "../../slices/homeSlice";
import { useAppSelector } from "../../app/hooks";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const Mobile = useAppSelector((state) => state.home.mobileNo);
  const [TnC, setTnC] = useState<boolean>(false);
  const [Loading, setLoading] = useState<boolean>(false);

  const wrongOTP = ({ text = "" }: { text: string }) => {
    toast(text, {
      style: {
        padding: " 16px 10px",
        borderRadius: "8px",
        background: "#C25E5E",
        color: "#FFF",
      },
    });
  };

  const navigation = useNavigate();
  const handleGetStartedClick = () => {
    if (!Mobile || Mobile === "") {
      wrongOTP({ text: "Enter Mobile No" });
    } else if (Mobile.length !== 10) {
      wrongOTP({ text: "Enter Valid Mobile No" });
    } else if (!TnC) {
      wrongOTP({ text: "Check Term and conditions" });
    } else {
      setLoading(true);
      botApi({
        loginId: Mobile,
        action: "login",
        clientName: "honeySys",
      }).then((response) => {
        setLoading(false);
        if (response.data?.code === 200) {
          dispatch(setOtp(response.data?.data?.otp));
          toast.success(`OTP : ${response.data?.data?.otp}`);
          setTimeout(() => {
            navigation("/otp");
          }, 2000);
        }
      });
    }
  };

  return (
    <div className="login px-5 py-3">
      <BackButton />
      <div className="text-[26px] font-bold -mt-4">
        Log in and Embrace the{" "}
        <span className="text-primary">Retail Revolution</span>
      </div>
      <div className="text-[14px] font-normal">Provide Your Mobile Number</div>
      <div className="mt-4 flex pr-4">
        <select className="px-2">
          <option className="px-2">{`+91 (IND)`}</option>
        </select>
        <input
          type="number"
          name="phoneno"
          id="phoneno"
          placeholder="Enter your mobile number"
          className="ml-2 sm:w-full md:w-52 !text-sm"
          required
          value={Mobile}
          onChange={(e) => {
            if (Mobile.length <= 9) {
              dispatch(setMobileNo(e.target.value));
            }
          }}
          onKeyDown={(e) => {
            if (Mobile.length === 10 && e.key === "Backspace") {
              e.preventDefault();
              dispatch(setMobileNo(Mobile.slice(0, -1)));
            }
          }}
        ></input>
      </div>
      <div className="mt-8">
        <CheckBox
          onChange={() => {
            setTnC(!TnC);
          }}
          selected={TnC}
          className="login-chk w-full items-start"
        >
          <Text
            type="body"
            size="md"
            className="whitespace-pre-line text-gray-400 font-normal text-[12px]"
          >
            By clicking on “Send Verification Code” you accept our{" "}
            <Text
              type="body"
              size="md"
              className="inline-block text-primary underline underline-offset-[1.5px] font-normal text-[12px]"
            >
              <a href="#">Terms & Conditions</a>
            </Text>{" "}
            and authorize us for your future support and guidance.
          </Text>
        </CheckBox>
      </div>
      <div className="flex justify-center mt-8 w-100">
        <Button
          isLoading={Loading}
          onClick={handleGetStartedClick}
          className="flex justify-center items-center !bg-primary text-background px-6 py-2 rounded-3xl min-h-[46px] min-w-[165px]"
        >
          <span className="text-white text-[14px] flex">
            <span className="mt-1">Get Started</span>
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
      <Toaster />
    </div>
  );
};

export default Login;
