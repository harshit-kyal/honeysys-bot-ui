import React, { useEffect, useRef, useState } from "react";
import { Button, SearchInput, Text } from "@polynomialai/alpha-react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useJsApiLoader,
  GoogleMap,
  Autocomplete,
} from "@react-google-maps/api";
const Address = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [latLng, setLatLng] = useState<any>({
    lat: 21.1588329,
    lng: 72.7688111,
  });
  const [formattedAdd, setFormattedAdd] = useState<string>("");
  const [formattedShortAdd, setFormattedShortAdd] = useState<string>("");
  const [address, setAddress] = useState<any>({
    pincode: "",
    // address: "",
    landMark: "",
    city: "",
    state: "",
  });
  const destinationRef = useRef<any | null>();
  const zoom = 16;

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
      pincode: postalCode ? postalCode.long_name : "",
      address:
        streetNumber && route
          ? `${streetNumber.long_name},${route.long_name}`
          : streetNumber
          ? streetNumber.long_name
          : route
          ? route.long_name
          : "",
      landMark: landMark ? landMark.long_name : "",
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
  useEffect(() => {
    if (isLoaded) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: latLng }, (results: any, status: any) => {
        console.log("result", results[0]);
        setFormattedAdd(results[0].formatted_address);
        if (status === "OK") {
          if (results.length > 0) {
            const addressComponents = results[0].address_components;
            const formattedAddress = formatCustomAddress(addressComponents);
            setFormattedShortAdd(formattedAddress);
          } else {
            console.error("No results found");
          }
        } else {
          console.error("Geocoder failed due to: " + status);
        }
      });
    }
  }, [latLng]);
  const [mapref, setMapRef] = React.useState<any>(null);
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLatLng({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  };
  const handleOnLoad = (map: any) => {
    setMapRef(map);
    getCurrentLocation();
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
      console.log(typeof newCenter.lat(), newCenter.lng());
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
        .catch((error) => {
          console.error("Geocoding error:", error);
        });
    }
  };

  return (
    <div className="h-screen">
      <div className="bg-primary flex items-center justify-center gap-3 px-5 py-2">
        <div className="inline-block">
          <div
            className="flex"
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
          <Autocomplete>
            <input
              onBlur={btnClick}
              ref={destinationRef}
              className="search border absolute top-[0%] left-[0%] z-10 mt-[10px] mx-5 text-[10px] p-[10px] rounded-lg border-[#969696]"
              type="text"
              placeholder="Search for your location"
              style={{ width: "-webkit-fill-available" }}
            />
          </Autocomplete>
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
        <div className="absolute top-[50%] left-[50%]">
          <div className="relative flex flex-col items-center group">
            <img
              src="/images/mapMarker.svg"
              alt="marker"
              height="30px"
              width="30px"
              style={{ transform: "translate(-15px, -20px)" }}
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
        <div
          className=" text-center absolute bottom-[0%] left-[0%] bg-white mb-[10px] text-[12px] text-[#09215B] py-[10px] border border-black mx-24 rounded-xl flex items-center justify-center"
          style={{ width: "-webkit-fill-available" }}
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
      <div className="px-[20px] py-[10px] relative">
        <div className="text-[#505050] text-[10px]">Your Location</div>
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
        <div
          className="fixed bottom-3 left-5 me-5"
          style={{ width: "-webkit-fill-available" }}
        >
          <Button
            className=" bg-[#09215B] text-white text-xs w-full text-center py-3 "
            onClick={() =>
              navigate("/contactDetails", { state: { address: address } })
            }
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
    </div>
  );
};

export default Address;
