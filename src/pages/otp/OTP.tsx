import { useEffect, useState } from "react";
import BackButton from "../../components/Button/BackButton";
import { Text, VerificationInput, Button } from "@polynomialai/alpha-react";
import "./index.css";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { botApi } from "../../api";
import { setTheme } from "../../slices/rootSlice";
import toast, { Toaster } from "react-hot-toast";

const OTP = () => {
  const dispatch = useAppDispatch();

  const Mobile = useAppSelector((state) => state.home.mobileNo);
  const [OTP, setOTP] = useState<string>("");
  const [Loading, setLoading] = useState<boolean>(false);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(30);
  const navigate = useNavigate();
  const CorrectOTP = useAppSelector((state) => state.home.otp);

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

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  return (
    <div className="w-screen h-screen px-5 py-3">
      <BackButton />
      <div className="text-2xl font-semibold -mt-4">
        <div>Enter Verification Code and </div>
        <div className="text-primary">Experience The Future</div>
      </div>
      <div className="mt-4">
        <div className="mb-2 text-sm font-normal">
          Enter The Verification Code
        </div>
        <div className="flex justify-around otp-div">
          <VerificationInput
            inputType="number"
            length={4}
            onChange={(e: any) => {
              setOTP(e);
            }}
          />
        </div>
      </div>
      <div className="text-sm font-normal mt-10">
        Enter the verification code has been sent to your provided mobile number
        <span className="text-primary font-[500]">
          +91 {Mobile.slice(0, 2)}XXXXXX{Mobile.slice(8, 10)}
        </span>
        . Check your SMS for the following.
      </div>
      <div className="mt-10 flex justify-center">
        <Button
          className="flex justify-center items-center !bg-primary text-background px-6 py-2 rounded-3xl min-h-[46px] min-w-[187px]"
          isLoading={Loading}
          onClick={() => {
            console.log(OTP);
            if (OTP === "") {
              wrongOTP({ text: "Please enter OTP" });
            } else if (parseInt(OTP) !== CorrectOTP) {
              wrongOTP({ text: "You have entered incorrect OTP" });
            } else {
              setLoading(true);
              botApi({
                loginId: Mobile,
                otp: OTP,
                action: "genrateAccessToken",
                clientName: "honeySys",
              })
                .then((response) => {
                  if (response.data?.code === 200) {
                    console.log(response);
                    localStorage.setItem(
                      "accessToken",
                      response.data?.data.access_token
                    );
                    dispatch(setTheme(response.data.data.customiseUI));
                    navigate("/success");
                    setLoading(false);
                  }
                })
                .catch((error) => {
                  console.log(error);
                  setLoading(false);
                });
            }
          }}
        >
          Verify & Continue
        </Button>
      </div>
      <div className="flex justify-center gap-1 mt-5">
        <Text type="body" size="md">
          Didn’t get the code?
        </Text>
        <Text type="body" size="md" className="text-primary">
          {seconds > 0 || minutes > 0 ? (
            <>
              {minutes.toLocaleString("en-IN", { minimumIntegerDigits: 2 })}:
              {seconds.toLocaleString("en-IN", { minimumIntegerDigits: 2 })}
            </>
          ) : (
            <div
              onClick={() => {
                setMinutes(1);
                setSeconds(30);
              }}
            >
              Resend
            </div>
          )}
        </Text>
      </div>
      <Toaster />
    </div>
  );
};

export default OTP;
