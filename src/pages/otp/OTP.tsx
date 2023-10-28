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
  const [latLng, setLatLng] = useState<any>({
    lat: 0,
    lng: 0,
  });
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
                data?.payload?.data?.activities[0][0]?.value?.data?.cartProduct[0];
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

  useEffect(() => {
    if (isLoaded && latLng.lat !== 0 && latLng.lng !== 0) {
      const geocoder = new google.maps.Geocoder();
      geocoder
        .geocode({ location: latLng }, (results: any, status: any) => {
          if (status === "OK" && results) {
            if (results?.length > 0) {
              const addressComponents = results[1]?.address_components;
              console.log("results", addressComponents);
              const postalCode = addressComponents.find((component: any) =>
                component?.types?.includes("postal_code")
              );
              if (postalCode) {
                const pincode = postalCode?.long_name;
                let botType = "e-comm";
                const newData = {
                  conversationId: convId,
                  text: "findstores",
                  voiceFlag: false,
                  isChatVisible: false,
                  data: {
                    pincode: "500084",
                    lat: "17.469857630687827",
                    lag: "78.35782449692486",
                    // pincode: pincode,
                    // lat: latLng?.lat,
                    // lag: latLng?.lng,
                    type: "location",
                  },
                };
                if (convId && botType) {
                  dispatch(getChatData({ newData, botType }))
                    .then((data) => {
                      let actiVitiesData =
                        data?.payload?.data?.activities[0][0];
                      if (data && actiVitiesData?.type === "storeCheck") {
                        if (
                          actiVitiesData?.value?.data[0]?.status_code === 500
                        ) {
                          navigate("/serviceableArea");
                        } else if (
                          actiVitiesData?.value?.data[0]?.status_code === 200
                        ) {
                          dispatch(
                            setStoreData(actiVitiesData?.value?.data[0])
                          );
                          dispatch(
                            setStoreId(actiVitiesData?.value?.data[0]?.id)
                          );
                          let storeIds = actiVitiesData?.value?.data[0]?.id;
                          if (storeIds) {
                            let botType = "e-comm";
                            const newData = {
                              conversationId: convId,
                              text: "getcartid",
                              voiceFlag: false,
                              isChatVisible: false,
                              data: {
                                storeId: storeIds,
                              },
                            };
                            if (convId && botType) {
                              dispatch(getChatData({ newData, botType }))
                              .then((data) => {
                                  let cartActivity =
                                    data?.payload?.data?.activities[0][0];
                                  if (
                                    data &&
                                    cartActivity?.type === "storeCheck"
                                  ) {
                                    let cartId =
                                      cartActivity?.value?.data?.cartId;
                                    dispatch(setCartId(cartId));
                                  }
                                })
                                .catch((err) => console.log("err", err));
                            }
                          }

                          dispatch(setUserPincode(500084));
                          // dispatch(setUserPincode(pincode));
                          navigate("/success");
                        }
                      }
                    })
                    .catch((err) => console.log("err", err));
                }
              }
            } else {
              console.error("ress", results);
            }
          } else {
            console.error("Geocoder failed due to: " + status);
          }
        })
        .catch((err) => console.log("err", err));
    }
  }, [latLng]);
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
                    localStorage.setItem(
                      "accessToken",
                      response.data?.data.access_token
                    );
                    dispatch(setTheme(response.data.data.customiseUI));
                    if (navigator.geolocation) {
                      navigator.permissions
                        .query({ name: "geolocation" })
                        .then(function (result) {
                          if (result.state === "granted") {
                            navigator.geolocation.getCurrentPosition(function (
                              position
                            ) {
                              const latLng = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude,
                              };
                              setLatLng(latLng);
                            });
                          } else if (result.state === "prompt") {
                            navigator.geolocation.getCurrentPosition(function (
                              position
                            ) {});
                          } else if (result.state === "denied") {
                            navigate("/address", {
                              state: { navigate: "home" },
                            });
                          }
                          result.onchange = function () {};
                        });
                    } else {
                      alert("Sorry Not available!");
                    }

                    // navigate("/success");
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
