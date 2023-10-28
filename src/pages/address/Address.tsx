import React, { useEffect, useRef, useState } from "react";
import { Button, Text } from "@polynomialai/alpha-react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useJsApiLoader,
  GoogleMap,
  Autocomplete,
} from "@react-google-maps/api";
import {
  getChatData,
  setCartId,
  setDeniedModal,
  setStoreData,
  setStoreId,
  setUserPincode,
} from "../../slices/homeSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import DeniedModal from "../../components/Modal/DeniedModal";
import toast, { Toaster } from "react-hot-toast";
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
  const zoom = 16;
  const location = useLocation();
  const navigateData =
    location && location?.state?.navigate ? location?.state?.navigate : "";
  const formatCustomAddress = (addressComponents: any) => {
    let formattedAddress = "";
    const streetNumber = addressComponents.find((component: any) =>
      component.types.includes("street_number")
    );
    const route = addressComponents.find((component: any) =>
      component.types.includes("route")
    );
    const landMark = addressComponents.find((component: any) =>
      component.types.includes("landmark")
    );
    const city = addressComponents.find((component: any) =>
      component.types.includes("locality")
    );
    const state = addressComponents.find((component: any) =>
      component.types.includes("administrative_area_level_1")
    );
    const postalCode = addressComponents.find((component: any) =>
      component.types.includes("postal_code")
    );

    if (streetNumber) formattedAddress += streetNumber.long_name + " ";
    if (landMark) formattedAddress += landMark.long_name + ", ";
    if (route) formattedAddress += route.long_name + " ";
    // if (city) formattedAddress += city.long_name + ", ";
    // if (state) formattedAddress += state.short_name + " ";
    // if (postalCode) formattedAddress += postalCode.long_name;
    setAddress({
      id: "",
      customerId: "",
      addressId: 0,
      name: "",
      mobile: "",
      email: "",
      addressName: "",
      flatNo: "",
      buildingName: "",
      address2: "",
      countryId: "",
      country: "",
      stateId: "",
      cityId: "",
      locality: "",
      localityId: "",
      latitude: "",
      longitude: "",
      defaultAddress: false,
      societyId: "",
      pincode: postalCode ? postalCode.long_name : "",
      address1:
        streetNumber && route
          ? `${streetNumber.long_name},${route.long_name}`
          : streetNumber
          ? streetNumber.long_name
          : route
          ? route.long_name
          : "",
      landmark: landMark ? landMark.long_name : "",
      city: city ? city.long_name : "",
      state: state ? state.long_name : "",
    });
    return formattedAddress;
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAc7Ky1gAkw_g-HoZM9eOhmvqBFOCqGL-c",
    libraries: ["places"],
  });
  const toastModal = ({ text = "" }: { text: string }) => {
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
              const formattedAddress = formatCustomAddress(addressComponents);
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
      alert("Sorry Not available!");
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
      let botType = "e-comm";
      const newData = {
        conversationId: convId,
        text: "findstores",
        voiceFlag: false,
        isChatVisible: false,
        data: {
          // pincode: "500084",
          // lat: "17.469857630687827",
          // lag: "78.35782449692486",
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
            if (data && storeData?.type === "storeCheck") {
              if (storeData?.value?.data[0]?.status_code === 500) {
                toastModal({ text: "Not found" });
              } else if (storeData?.value?.data[0]?.status_code === 200) {
                dispatch(setStoreData(storeData?.value?.data[0]));
                dispatch(setStoreId(storeData?.value?.data[0]?.id));
                let storeIds = storeData?.value?.data[0]?.id;
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

                  if (convId && botType && convId !== "" && botType !== "") {
                    dispatch(getChatData({ newData, botType }))
                      .then((data) => {
                        let cartData = data?.payload?.data?.activities[0][0];
                        if (data && cartData?.type === "storeCheck") {
                          let cartId = cartData?.value?.data?.cartId;
                          dispatch(setCartId(cartId));
                        }
                      })
                      .catch((error) => {
                        setLoading(false);
                        console.log("err", error);
                      });
                  }
                }

                // dispatch(setUserPincode(500084));

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
          })
          .catch((error) => {
            console.log("err", error);
          });
      }
    } else {
      toastModal({ text: "Please enter the address" });
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
      <Toaster />
      <DeniedModal />
    </div>
  );
};

export default Address;
