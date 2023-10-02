import React from "react";
import { Button, Text } from "@polynomialai/alpha-react";
import { useNavigate } from "react-router-dom";
import GoogleMapReact from "google-map-react";

const Address = () => {
  const navigate = useNavigate();

  const center = { lat: 21.1588329, lng: 72.7688111 };
  const zoom = 16;

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
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAc7Ky1gAkw_g-HoZM9eOhmvqBFOCqGL-c" }}
          defaultCenter={center}
          defaultZoom={zoom}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControlOptions: false,
            fullscreenControl: false,
          }}
        />
        <div className="absolute top-[50%] left-[50%]">
          <img src="/images/mapMarker.svg" height="30px" width="30px"></img>
        </div>
      </div>
      <div className="px-[20px] py-[10px] ">
        <div className="text-[#505050] text-[10px]">Your Location</div>
        <div className="mt-[10px] mb-5">
          <img src="/images/location1.svg" height="24px" width="24px"></img>
        </div>
        <Button className=" bg-[#09215B] text-white text-xs text-center w-full py-3">
          Enter Complete Address
        </Button>
      </div>
    </div>
  );
};

export default Address;
