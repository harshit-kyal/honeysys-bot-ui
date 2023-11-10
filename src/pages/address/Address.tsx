import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button, Text } from "@polynomialai/alpha-react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useJsApiLoader,
  GoogleMap,
  Autocomplete,
  LoadScriptProps,
} from "@react-google-maps/api";
import {
  addToCartArray,
  getChatData,
  setCartId,
  setDeniedModal,
  setStoreData,
  setStoreId,
  setUserPincode,
  setUserSavedAddres,
} from "../../slices/homeSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import DeniedModal from "../../components/Modal/DeniedModal";
import toast, { Toaster } from "react-hot-toast";
import { formatCustomAddress } from "../../utils/AddressFormate";
import { ToastPopup } from "../../utils/TosterPopup";
const Address = () => {
  const navigate = useNavigate();
  const [latLng, setLatLng] = useState<any>({
    lat: 0,
    lng: 0,
  });
  const dispatch = useAppDispatch();
  const [formattedAdd, setFormattedAdd] = useState<string>("");
  const [formattedShortAdd, setFormattedShortAdd] = useState<string>("");
  const [Loading, setLoading] = useState(false);
  const [address, setAddress] = useState<any>({
    id: "",
    customerId: "",
    addressId: 0,
    name: "",
    mobile: "",
    email: "",
    addressName: "",
    flatNo: "",
    buildingName: "",
    address1: "",
    address2: "",
    countryId: "",
    country: "",
    stateId: "",
    state: "",
    cityId: "",
    city: "",
    locality: "",
    localityId: "",
    landmark: "",
    pincode: "",
    latitude: "",
    longitude: "",
    defaultAddress: false,
    societyId: "",
  });
  const destinationRef = useRef<any | null>();
  const convId = useAppSelector((state) => state.bot.convId);
  const botType = useAppSelector((state) => state.bot.botType);
  const zoom = 16;
  const location = useLocation();
  const navigateData =
    location && location?.state?.navigate ? location?.state?.navigate : "";
  const libraries: any = useMemo(() => ["places"], []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAc7Ky1gAkw_g-HoZM9eOhmvqBFOCqGL-c",
    libraries: libraries,
  });
  const addressToastModal = ({ text = "" }: { text: string }) => {
    toast(text, {
      style: {
        padding: " 16px 10px",
        borderRadius: "8px",
        background: "#0a4310",
        color: "#FFF",
      },
    });
  };
  useEffect(() => {
    if (isLoaded && latLng.lat !== 0 && latLng.lng !== 0) {
      const geocoder = new google.maps.Geocoder();
      geocoder
        .geocode({ location: latLng }, (results: any, status: any) => {
          if (status === "OK" && results) {
            if (results?.length > 0) {
              setFormattedAdd(results[0]?.formatted_address);
              const addressComponents = results[0]?.address_components;
              const formattedAddress = formatCustomAddress(
                addressComponents,
                setAddress,
                latLng
              );
              setFormattedShortAdd(formattedAddress);
            } else {
            }
          } else {
            setFormattedShortAdd("");
            setFormattedAdd("");
          }
        })
        .catch(() => {});
    }
  }, [latLng]);
  const [mapref, setMapRef] = React.useState<any>(null);
  const getCurrentLocationOnLoad = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLatLng({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  };
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            navigator.geolocation.getCurrentPosition(function (position) {
              const latLng = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              setLatLng(latLng);
            });
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(function (position) {});
          } else if (result.state === "denied") {
            dispatch(setDeniedModal(true));
          }
          result.onchange = function () {};
        });
    } else {
      addressToastModal({ text: "Sorry Not available!" });
    }
  };
  const handleOnLoad = (map: any) => {
    setMapRef(map);
    getCurrentLocationOnLoad();
  };
  const handleCenterChanged = () => {
    if (mapref && isLoaded) {
      const newCenter = mapref.getCenter();
      if (newCenter.lat() !== latLng.lat && newCenter.lng() !== latLng.lng) {
        setLatLng({
          lat: newCenter.lat(),
          lng: newCenter.lng(),
        });
      }
    }
  };
  const geocodeAddress = (address: any, geocoder: any) => {
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address }, (results: any, status: any) => {
        if (status === "OK" && results[0]) {
          const location = results[0].geometry.location;
          resolve({ lat: location.lat(), lng: location.lng() });
        } else {
          reject(
            "Geocode was not successful for the following reason: " + status
          );
        }
      });
    });
  };
  const btnClick = () => {
    const address = destinationRef.current.value;
    const geocoder = new google.maps.Geocoder();
    if (isLoaded) {
      geocodeAddress(address, geocoder)
        .then((coords) => {
          setLatLng(coords);
        })
        .catch((error) => {});
    }
  };

  const saveHandler = () => {
    if (address?.pincode !== "" && latLng.lat !== 0 && latLng.lng !== 0) {
      setLoading(true);
      const newData = {
        conversationId: convId,
        text: "findstores",
        voiceFlag: false,
        isChatVisible: false,
        data: {
          // pincode: "500084",
          // lat: "17.469857630687827",
          // lng: "78.35782449692486",
          pincode: address?.pincode,
          lat: `${latLng?.lat}`,
          lag: `${latLng?.lng}`,
          type: "location",
        },
      };

      if (convId && botType) {
        dispatch(getChatData({ newData, botType }))
          .then((data) => {
            setLoading(false);
            let storeData = data?.payload?.data?.activities[0][0];
            if (
              data?.payload?.data?.activities &&
              Array.isArray(data?.payload?.data?.activities[0]) &&
              storeData
            ) {
              if (data && storeData?.type === "findStores") {
                if (storeData?.value?.data[0]?.status_code === 500) {
                  addressToastModal({
                    text: `${storeData?.value?.data[0]?.msg}`,
                  });
                } else if (storeData?.value?.data[0]?.status_code === 200) {
                  dispatch(setStoreData(storeData?.value?.data[0]));
                  dispatch(setStoreId(storeData?.value?.data[0]?.id));
                  let storeIds = storeData?.value?.data[0]?.id;
                  if (storeIds) {
                    cartIdData(storeIds);
                  }
                  // dispatch(setUserPincode(500084));
                  dispatch(setUserSavedAddres(address));
                  dispatch(setUserPincode(address?.pincode));
                  {
                    navigateData && navigateData !== ""
                      ? navigate("/contactDetails", {
                          state: { address: address, navigate: "home" },
                        })
                      : navigate("/contactDetails", {
                          state: { address: address },
                        });
                  }
                }
              }
            } else {
              ToastPopup({
                text: "store data is not found something went wrong",
              });
            }
          })
          .catch((error) => {
            ToastPopup({ text: "something went wrong" });
            console.log("err", error);
          });
      }
    } else {
      addressToastModal({ text: "Please enter the address" });
    }
  };
  const cartItems = async (storeIds: any, cartId: any) => {
    if (storeIds && cartId) {
      const newData = {
        conversationId: convId,
        text: "viewCart",
        voiceFlag: false,
        isChatVisible: false,
        data: {
          storeId: storeIds,
          cartId: cartId,
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
              if (cartData && Array.isArray(cartData)) {
                cartData?.map((item: any, index: number) => {
                  let cartItem = {
                    productId: item.variants[0]?.productId,
                    varientId: item.variants[0]?._id,
                    storeId: storeIds,
                    productVariantIndex: item.variants[0]?.productVariantIndex,
                    quantity: item?.quantity,
                    cartId: cartId,
                  };
                  dispatch(addToCartArray(cartItem));
                });
              } else {
                ToastPopup({
                  text: "cart data is not found something went wrong",
                });
              }
              // setCartList(data?.payload?.data?.activities[0]?.value.data);
              // setLoading(false);
              // setAmountLoader(false);
            }
          })
          .catch((error) => {
            ToastPopup({ text: "something went wrong" });
            console.log("err", error);
          });
      }
    }
  };
  const cartIdData = (storeIds: any) => {
    if (storeIds) {
      const newData = {
        conversationId: convId,
        text: "getcartid",
        voiceFlag: false,
        isChatVisible: false,
        data: {
          storeId: storeIds,
        },
      };

      if (convId && botType && convId !== "" && botType !== "") {
        dispatch(getChatData({ newData, botType }))
          .then((data) => {
            let cartData = data?.payload?.data?.activities[0][0];
            if (data && cartData?.type === "getCartId" && cartData) {
              let cartId = cartData?.value?.data?.cartId;
              cartItems(storeIds, cartId);
              dispatch(setCartId(cartId));
            } else {
              ToastPopup({ text: "cartid not found something went wrong" });
            }
          })
          .catch((error) => {
            setLoading(false);
            ToastPopup({ text: "something went wrong" });
            console.log("err", error);
          });
      }
    }
  };
  return (
    <div className="h-screen">
      <div className="bg-primary flex items-center justify-center gap-3 px-5 py-2">
        <div className="inline-block">
          <div
            className="flex cursor-pointer"
            onClick={() => {
              navigate(-1);
            }}
          >
            <img
              src="/images/white_back.svg"
              alt="back"
              height={24}
              width={24}
              className="fill-white"
            />
          </div>
        </div>
        <Text
          type="body"
          size="lg"
          className="inline-block text-white flex-1 -ms-[24px] text-center"
        >
          Select Your Location
        </Text>
      </div>
      <div
        className="bg-slate-100 relative"
        style={{ height: "calc(100% - 190px)" }}
      >
        {isLoaded && (
          <div className="absolute top-[0%] left-[0%] flex justify-center w-full items-center z-10">
            <Autocomplete className="max-[500px]:w-[90%] min-[500px]:w-[40%] min-[1024px]:w-[30%]">
              <input
                onBlur={btnClick}
                ref={destinationRef}
                className="search border w-full mt-[12px]  text-[10px] p-[10px] rounded-lg border-[#969696]"
                type="text"
                placeholder="Search for your location"
                // style={{ width: "-webkit-fill-available" }}
              />
            </Autocomplete>
          </div>
        )}
        {isLoaded ? (
          <GoogleMap
            id="map-react"
            center={latLng}
            zoom={zoom}
            onIdle={handleCenterChanged}
            onLoad={(map) => handleOnLoad(map)}
            mapContainerStyle={{ height: "100%", width: "100%" }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              fullscreenControl: false,
              mapTypeControl: false,
            }}
          ></GoogleMap>
        ) : (
          <div>Loading...</div>
        )}
        <div
          className="absolute top-[50%] left-[50%]"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <div className="relative flex flex-col items-center group">
            <img
              src="/images/mapMarker.svg"
              alt="marker"
              height="30px"
              width="30px"
            ></img>
            <div className="absolute bottom-9 topflex flex-col items-center hidden mb-6 group-hover:flex">
              <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap w-[150px] bg-black shadow-lg">
                {formattedAdd}
              </span>
              <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
            </div>
          </div>
        </div>
        {/* <div className="absolute top-[50%] left-[50%] rounded-full h-[50%] w-[80%] translate-x-[-50%] translate-y-[-40%] flex justify-center items-center bg-[#1EA4D3] opacity-40"></div> */}
        <div className="absolute bottom-0 left-0 w-full flex justify-center items-center">
          <div
            className=" text-center bg-white mb-[10px] max-[500px]:w-[70%] min-[500px]:w-[35%] min-[1024px]:w-[20%] text-[12px] text-primary py-[10px] border border-black  rounded-xl flex items-center justify-center"
            onClick={getCurrentLocation}
          >
            <img
              src="/images/location_searching.svg"
              height="20px"
              width="20px"
              className="me-2"
            ></img>{" "}
            Use Current Location
          </div>
        </div>
      </div>
      <div className="px-[20px] py-[10px] relative">
        <div className="text-[#505050] max-[425px]:text-[10px] min-[425px]:!text-[14px]">
          Your Location
        </div>
        <div className="mt-[10px] mb-5 flex">
          <img src="/images/location1.svg" height="24px" width="24px"></img>
          <div className="ms-2">
            <div className="text-black text-[14px] font-semibold">
              {formattedShortAdd}
            </div>
            <div className="text-[#505050] text-[15px]">
              {" "}
              {formattedAdd.length > 33 ? (
                <div className="flex">
                  <div> {formattedAdd.slice(0, 33)}</div>{" "}
                  <div className="relative flex flex-col items-center group">
                    ...
                    <div className="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex">
                      <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap w-[150px] bg-black shadow-lg">
                        {formattedAdd}
                      </span>
                      <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                    </div>
                  </div>
                </div>
              ) : (
                formattedAdd
              )}
            </div>
          </div>
        </div>
        <div className="fixed bottom-3 left-0 w-full flex justify-center items-center">
          <Button
            isLoading={Loading}
            className=" !bg-primary max-[500px]:w-[90%] min-[500px]:w-[40%] min-[1024px]:w-[30%] text-white text-xs  text-center py-[10px] "
            onClick={() => {
              saveHandler();
            }}
          >
            Enter Complete Address
          </Button>
        </div>
      </div>
      <div className="relative flex flex-col items-center group">
        <div className="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex">
          <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg">
            A top aligned tooltip.
          </span>
          <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
        </div>
      </div>
      {/* <Toaster /> */}
      <DeniedModal />
    </div>
  );
};

export default Address;
