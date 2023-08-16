import { AddDialog, Button, Text } from "@polynomialai/alpha-react";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setLocationPermission } from "../../slices/homeSlice";

const LocationPermission = () => {
  const dispatch = useAppDispatch();
  const locationPermission = useAppSelector(
    (state) => state.home.locationPermission
  );

  return (
    <AddDialog
      title=""
      children={
        <div className="flex flex-col items-center gap-5">
          <img
            src="/images/colored_location.svg"
            alt="location"
            width={40}
            height={40}
          />
          <Text
            type="body"
            size="md"
            className="font-semibold text-center px-5"
          >
            Allow “Honeysys Bot” to access this device’s location?
          </Text>
          <Text type="body" size="sm" className="font-normal text-center px-2">
            Let us access the location of this device to show products available
            near you.
          </Text>
          <div className="flex gap-5">
            <Button
              onClick={() => {
                dispatch(setLocationPermission(false));
              }}
              type="secondary"
              className="border-[#C90303] text-[#C90303] w-36 py-3 drop-shadow-xl"
            >
              Deny
            </Button>
            <Button
              onClick={() => {
                if (navigator.geolocation) {
                  // alert("Location data received: ");
                  console.log(navigator.permissions);
                  navigator.permissions
                    .query({ name: "geolocation" })
                    .then(function (result) {
                      if (result.state === "granted") {
                        console.log(result.state);
                        alert("granted");
                        navigator.geolocation.getCurrentPosition(function (
                          position
                        ) {
                          console.log(position);
                        });
                      } else if (result.state === "prompt") {
                        navigator.geolocation.getCurrentPosition(function (
                          position
                        ) {
                          console.log(position);
                        });
                        alert("prompt");
                        console.log(result.state);
                      } else if (result.state === "denied") {
                        alert("denied");
                      }
                      result.onchange = function () {
                        console.log(result.state);
                      };
                    });
                } else {
                  alert("Sorry Not available!");
                }
              }}
              type="secondary"
              className="!bg-primary border-none text-white w-36 py-3 drop-shadow-xl"
            >
              Allow
            </Button>
          </div>
        </div>
      }
      // Header={<></>}
      // Footer={<></>}
      isOpen={locationPermission}
      onClose={() => {
        dispatch(setLocationPermission(false));
      }}
    />
  );
};

export default LocationPermission;
