import { AddDialog, Button, Text } from "@polynomialai/alpha-react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setLocationPermission } from "../../slices/homeSlice";
import { useNavigate } from "react-router-dom";

const LocationPermission = () => {
  const dispatch = useAppDispatch();
  const locationPermission = useAppSelector(
    (state) => state.home.locationPermission
  );
  const navigate = useNavigate();
  const onCloseModal = () => {
    dispatch(setLocationPermission(false));
  };
  return (
    <>
      {locationPermission ? (
        <>
          <div className="blur"></div>
          <div
            id="loading"
            className="absolute top-[50%] left-[50%] w-[88%] md:w-[50%] lg:w-[40%] bg-white p-5 md:p-7 z-50 blurcss"
            style={{ transform: " translate(-50%, -50%)" }}
          >
            <div className="flex align-middle items-center justify-center w-full mb-5">
              <img
                src="/images/location-pink.svg"
                height="40px"
                width="28px"
              ></img>
            </div>
            <div className="text-[14px] text-center text-black font-medium">
              Allow “Honeysys Bot” to access this device’s location?
            </div>
            <div className="text-[12px] text-center text-black font-normal mt-2">
              Let us access the location of this device to show products
              available near you.
            </div>
            <div className="flex mt-5 justify-evenly">
              <Button
                className="text-[red] bg-white border border-[red] px-7"
                onClick={() => dispatch(setLocationPermission(false))}
              >
                Deny
              </Button>
              <Button
                className="text-white bg-[#09215B] px-7"
                onClick={() => {
                  if (navigator.geolocation) {
                    navigator.permissions
                      .query({ name: "geolocation" })
                      .then(function (result) {
                        navigate("/address");
                        dispatch(setLocationPermission(false));
                        if (result.state === "granted") {
                          // alert("granted");
                          navigator.geolocation.getCurrentPosition(function (
                            position
                          ) {});
                        } else if (result.state === "prompt") {
                          navigator.geolocation.getCurrentPosition(function (
                            position
                          ) {});
                          // alert("prompt");
                        } else if (result.state === "denied") {
                          // alert("denied");
                        }
                        result.onchange = function () {};
                      });
                  } else {
                    alert("Sorry Not available!");
                  }
                }}
              >
                Allow
              </Button>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
    // <AddDialog
    //   title=""
    //   children={
    //     <div className="flex flex-col items-center gap-5">
    //       <img
    //         src="/images/colored_location.svg"
    //         alt="location"
    //         width={40}
    //         height={40}
    //       />
    //       <Text
    //         type="body"
    //         size="md"
    //         className="font-semibold text-center px-5"
    //       >
    //         Allow “Honeysys Bot” to access this device’s location?
    //       </Text>
    //       <Text type="body" size="sm" className="font-normal text-center px-2">
    //         Let us access the location of this device to show products available
    //         near you.
    //       </Text>
    //       <div className="flex gap-5">
    //         <Button
    //           onClick={() => {
    //             dispatch(setLocationPermission(false));
    //           }}
    //           type="secondary"
    //           className="border-[#C90303] text-[#C90303] w-36 py-3 drop-shadow-xl"
    //         >
    //           Deny
    //         </Button>
    //         <Button
    //           onClick={() => {
    //             if (navigator.geolocation) {
    //               navigator.permissions
    //                 .query({ name: "geolocation" })
    //                 .then(function (result) {
    //                   navigate("/address")
    //                   dispatch(setLocationPermission(false));
    //                   if (result.state === "granted") {
    //                     // alert("granted");
    //                     navigator.geolocation.getCurrentPosition(function (
    //                       position
    //                     ) {

    //                     });
    //                   } else if (result.state === "prompt") {
    //                     navigator.geolocation.getCurrentPosition(function (
    //                       position
    //                     ) {});
    //                     alert("prompt");
    //                   } else if (result.state === "denied") {
    //                     alert("denied");
    //                   }
    //                   result.onchange = function () {};
    //                 });
    //             } else {
    //               alert("Sorry Not available!");
    //             }
    //           }}
    //           type="secondary"
    //           className="!bg-primary border-none text-white w-36 py-3 drop-shadow-xl"
    //         >
    //           Allow
    //         </Button>
    //       </div>
    //     </div>
    //   }
    //   isOpen={locationPermission}
    //   onClose={() => {
    //     dispatch(setLocationPermission(false));
    //   }}
    // />
  );
};

export default LocationPermission;
