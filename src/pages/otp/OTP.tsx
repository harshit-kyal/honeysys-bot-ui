import { useEffect, useState } from "react";
import BackButton from "../../components/Button/BackButton";
import { Text, VerificationInput, Button } from "@polynomialai/alpha-react";
import "./index.css";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { botApi } from "../../api";
import { setTheme } from "../../slices/rootSlice";
import toast, { Toaster } from "react-hot-toast";
import { useJsApiLoader } from "@react-google-maps/api";
import {
  addToCartArray,
  getChatData,
  setCartId,
  setStoreData,
  setStoreId,
  setUserPincode,
} from "../../slices/homeSlice";

const OTP = () => {
  const dispatch = useAppDispatch();

  const Mobile = useAppSelector((state) => state.home.mobileNo);
  const storeId = useAppSelector((state) => state.home.storeId);
  const convId = useAppSelector((state) => state.bot.convId);
  const botType = useAppSelector((state) => state.bot.botType);
  const cartId = useAppSelector((state) => state.home.cartId);
  const [OTP, setOTP] = useState<string>("");
  const [Loading, setLoading] = useState<boolean>(false);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(30);
  const correctOTP = useAppSelector((state) => state.home.otp);
  const [CorrectOTP, setCorrectOTP] = useState<number>(correctOTP);
  const navigate = useNavigate();

  const wrongOTPModal = ({ text = "" }: { text: string }) => {
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
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAc7Ky1gAkw_g-HoZM9eOhmvqBFOCqGL-c",
    libraries: ["places"],
  });
  const cartData = async () => {
    if (storeId) {
      const newData = {
        conversationId: convId,
        text: "viewCart",
        voiceFlag: false,
        isChatVisible: false,
        data: {
          storeId: storeId,
        },
      };
      if (convId && botType && convId !== "" && botType !== "") {
        await dispatch(getChatData({ newData, botType }))
          .then((data) => {
            if (
              data &&
              data?.payload?.data?.activities[0][0]?.type === "viewCart"
            ) {
              let cartData =
                data?.payload?.data?.activities[0][0]?.value?.data?.cartProduct;
              cartData?.map((item: any, index: number) => {
                let cartItem = {
                  productId: item.variants[0]?.productId,
                  varientId: item.variants[0]?._id,
                  storeId: storeId,
                  productVariantIndex: item.variants[0]?.productVariantIndex,
                  quantity: item?.quantity,
                  cartId: cartId,
                };
                dispatch(addToCartArray(cartItem));
              });
              // setCartList(data?.payload?.data?.activities[0]?.value.data);
              // setLoading(false);
              // setAmountLoader(false);
            }
          })
          .catch((error) => {
            console.log("err", error);
          });
      }
    }
  };
  useEffect(() => {
    cartData();
  }, [storeId, cartId]);
  const resend = () => {
    botApi({
      loginId: Mobile,
      action: "login",
      clientName: "honeySys",
    }).then((response) => {
      setLoading(false);
      if (response.data?.code === 200) {
        setCorrectOTP(parseInt(response?.data?.data?.otp));
        toast.success(`OTP : ${response?.data?.data?.otp}`);
      }
    });
  };
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
            if (OTP === "") {
              wrongOTPModal({ text: "Please enter OTP" });
            } else if (parseInt(OTP) !== CorrectOTP) {
              wrongOTPModal({ text: "You have entered incorrect OTP" });
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
                  setLoading(false);
                });
            }
          }}
        >
          Verify & Continue
        </Button>
      </div>
      <div className="flex justify-center gap-1 mt-5">
        <div className="text-[14px]">Didn’t get the code?</div>
        <div className="text-primary text-[14px]" onClick={()=>{resend()}}>
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
        </div>
      </div>
      {/* <Toaster /> */}
    </div>
  );
};

export default OTP;
