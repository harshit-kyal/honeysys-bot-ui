import { useEffect, useState } from "react";
import BackButton from "../../components/Button/BackButton";
import { Text, VerificationInput } from "@polynomialai/alpha-react";
import "./index.css";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../app/hooks";
import { botApi } from "../../api";

const OTP = () => {
  const Mobile = useAppSelector((state) => state.home.mobileNo);
  const [OTP, setOTP] = useState<string>("");
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(10);
  const navigate = useNavigate();
  const CorrectOTP = useAppSelector((state) => state.home.otp);

  const wrongOTP = () => {
    const cssEle = document.getElementsByClassName("ring-primary-color");

    const cssArray = Array.from(cssEle);

    cssArray.forEach((element) => {
      (element as HTMLElement).style.cssText =
        "--tw-ring-opacity: 1;--tw-ring-color: var(--error);";
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
        <span className="text-primary font-[500]">+9178XXXXXX03</span>. Check
        your SMS for the following.
      </div>
      <div className="mt-10 flex justify-center">
        <Button
          title="Verify & Continue"
          handleClick={() => {
            console.log(OTP);
            if (OTP === "") {
              alert("Enter OTP");
            }
            // else if (parseInt(OTP) !== CorrectOTP) {
            //   alert("Enter OTP is incorrect");
            // }
            else {
              // botApi({
              //   loginId: Mobile,
              //   otp: OTP,
              //   action: "genrateAccessToken",
              //   clientName: "honeySys",
              // }).then((response) => {
              //   if (response.data?.code === 200) {
              //     console.log(response);
              //     localStorage.setItem(
              //       "accessToken",
              //       response.data?.data.access_token
              //     );
              localStorage.setItem(
                "accessToken",
                "response.data?.data.access_token"
              );
              navigate("/success");
              // }
              // });
            }
          }}
        />
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
    </div>
  );
};

export default OTP;
