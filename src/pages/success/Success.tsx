import { useEffect, useMemo, useState } from "react";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useJsApiLoader } from "@react-google-maps/api";
import {
  addToCartArray,
  getChatData,
  setCartId,
  setStoreData,
  setStoreId,
  setUserPincode,
  setUserSavedAddres,
} from "../../slices/homeSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ToastPopup } from "../../utils/TosterPopup";
import { formatCustomAddress } from "../../utils/AddressFormate";

const Success = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const convId = useAppSelector((state) => state.bot.convId);
  const botType = useAppSelector((state) => state.bot.botType);
  const [latLng, setLatLng] = useState<any>({
    lat: 0,
    lng: 0,
  });
  const libraries: any = useMemo(() => ["places"], []);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAc7Ky1gAkw_g-HoZM9eOhmvqBFOCqGL-c",
    libraries,
  });
  // const [address, setAddress] = useState<any>({
  //   id: "",
  //   customerId: "",
  //   addressId: 0,
  //   name: "",
  //   mobile: "",
  //   email: "",
  //   addressName: "",
  //   flatNo: "",
  //   buildingName: "",
  //   address1: "",
  //   address2: "",
  //   countryId: "",
  //   country: "",
  //   stateId: "",
  //   state: "",
  //   cityId: "",
  //   city: "",
  //   locality: "",
  //   localityId: "",
  //   landmark: "",
  //   pincode: "",
  //   latitude: "",
  //   longitude: "",
  //   defaultAddress: false,
  //   societyId: "",
  // });
  // useEffect(() => {
  //   if (isLoaded && latLng.lat !== 0 && latLng.lng !== 0) {
  //     const geocoder = new google.maps.Geocoder();
  //     geocoder
  //       .geocode({ location: latLng }, (results: any, status: any) => {
  //         if (status === "OK" && results) {
  //           if (results?.length > 0) {
  //             let postalCode = results?.find((ele: any) =>
  //               ele.address_components?.find((component: any) =>
  //                 component?.types?.includes("postal_code")
  //               )
  //             );
  //             const postalCodeData = postalCode.address_components.find(
  //               (component: any) => component.types.includes("postal_code")
  //             );
  //             if (postalCode) {
  //               const addressComponents = results[0]?.address_components;
  //               formatCustomAddress(addressComponents, setAddress, latLng);
  //               const pincode = postalCodeData?.long_name;
  //               const newData = {
  //                 conversationId: convId,
  //                 text: "findstores",
  //                 voiceFlag: false,
  //                 isChatVisible: false,
  //                 data: {
  //                   // pincode: "500084",
  //                   // lat: "17.469857630687827",
  //                   // lag: "78.35782449692486",
  //                   pincode: pincode,
  //                   lat: `${latLng?.lat}`,
  //                   lag: `${latLng?.lng}`,
  //                   type: "location",
  //                 },
  //               };
  //               if (convId && botType) {
  //                 dispatch(getChatData({ newData, botType }))
  //                   .then((data) => {
  //                     let actiVitiesData =
  //                       data?.payload?.data?.activities[0][0];
  //                     if (data && actiVitiesData?.type === "findStores") {
  //                       if (
  //                         actiVitiesData?.value?.data[0]?.status_code === 500
  //                       ) {
  //                         navigate("/serviceableArea");
  //                       } else if (
  //                         actiVitiesData?.value?.data[0]?.status_code === 200
  //                       ) {
  //                         dispatch(
  //                           setStoreData(actiVitiesData?.value?.data[0])
  //                         );
  //                         dispatch(
  //                           setStoreId(actiVitiesData?.value?.data[0]?.id)
  //                         );
  //                         let storeIds = actiVitiesData?.value?.data[0]?.id;
  //                         if (storeIds) {
  //                           cartIdData(storeIds);
  //                         }
  //                         dispatch(setUserSavedAddres(address));
  //                         dispatch(setUserPincode(pincode));
  //                       }
  //                     }
  //                   })
  //                   .catch((err) => {
  //                     ToastPopup({ text: "something went wrong" });
  //                     console.log("err", err);
  //                   });
  //               }
  //             }
  //           } else {
  //             console.error("ress", results);
  //           }
  //         } else {
  //           console.error("Geocoder failed due to: " + status);
  //         }
  //       })
  //       .catch((err) => console.log("err", err));
  //   }
  // }, [latLng]);
  // const cartItems = async (storeIds: any, cartIds: any) => {
  //   if (storeIds) {
  //     const newData = {
  //       conversationId: convId,
  //       text: "viewCart",
  //       voiceFlag: false,
  //       isChatVisible: false,
  //       data: {
  //         storeId: storeIds,
  //       },
  //     };
  //     if (convId && botType && convId !== "" && botType !== "") {
  //       await dispatch(getChatData({ newData, botType }))
  //         .then((data) => {
  //           if (
  //             data &&
  //             data?.payload?.data?.activities[0][0]?.type === "viewCart"
  //           ) {
  //             let cartData =
  //               data?.payload?.data?.activities[0][0]?.value?.data?.cartProduct;
  //             cartData?.map((item: any, index: number) => {
  //               let cartItem = {
  //                 productId: item.variants[0]?.productId,
  //                 varientId: item.variants[0]?._id,
  //                 storeId: storeIds,
  //                 productVariantIndex: item.variants[0]?.productVariantIndex,
  //                 quantity: item?.quantity,
  //                 cartId: cartIds,
  //               };
  //               dispatch(addToCartArray(cartItem));
  //             });
  //             // setCartList(data?.payload?.data?.activities[0]?.value.data);
  //             // setLoading(false);
  //             // setAmountLoader(false);
  //           }
  //         })
  //         .catch((error) => {
  //           ToastPopup({ text: "something went wrong" });
  //           console.log("err", error);
  //         });
  //     }
  //   }
  // };
  // const cartIdData = (storeIds: any) => {
  //   if (storeIds) {
  //     const newData = {
  //       conversationId: convId,
  //       text: "getcartid",
  //       voiceFlag: false,
  //       isChatVisible: false,
  //       data: {
  //         storeId: storeIds,
  //       },
  //     };
  //     if (convId && botType) {
  //       dispatch(getChatData({ newData, botType }))
  //         .then((data) => {
  //           // setLoading(false);
  //           let cartActivity = data?.payload?.data?.activities[0][0];
  //           if (data && cartActivity?.type === "getCartId") {
  //             let cartIds = cartActivity?.value?.data?.cartId;
  //             cartItems(storeIds, cartIds);
  //             dispatch(setCartId(cartIds));
  //           }
  //         })
  //         .catch((err) => {
  //           // setLoading(false);
  //           ToastPopup({ text: "something went wrong" });
  //           console.log("err", err);
  //         });
  //     }
  //   }
  // };
  // const storeIdHandler=()=>{
  //   if (navigator.geolocation) {
  //     navigator.permissions
  //       .query({ name: "geolocation" })
  //       .then(function (result) {
  //         if (result.state === "granted") {
  //           navigator.geolocation.getCurrentPosition(function (
  //             position
  //           ) {
  //             const latLng = {
  //               lat: position.coords.latitude,
  //               lng: position.coords.longitude,
  //             };
  //             setLatLng(latLng);
  //           });
  //         } else if (result.state === "prompt") {
  //           navigator.geolocation.getCurrentPosition(
  //             function (position) {
  //               const latLng = {
  //                 lat: position.coords.latitude,
  //                 lng: position.coords.longitude,
  //               };
  //               setLatLng(latLng);
  //             },
  //             function (error) {
  //               navigate("/address", {
  //                 state: { navigate: "home" },
  //               });
  //             }
  //           );
  //         } else if (result.state === "denied") {
  //           navigate("/address", {
  //             state: { navigate: "home" },
  //           });
  //         }
  //         result.onchange = function () {};
  //       });
  //   } else {
  //     ToastPopup({ text: "Sorry Not available!" });
  //   }
  // }
  return (
    <div className="w-screen h-screen px-5 py-5">
      <div className="flex justify-center w-full mt-20">
        <img src="/images/success.svg" alt="happy_sun_image" />
      </div>
      <div className="text-center my-6 text-2xl font-semibold">
        <div className="text-primary">Congratulations!</div>
        <div>Your account has been</div>
        <div>successfully created</div>
      </div>
      <div className="px-5 text-sm font-normal flex text-justify justify-center">
        Our intuitive platform ensures that you find exactly what you're looking
        for, making your shopping experience delightful and efficient.
      </div>
      <div className="flex justify-center mt-5">
        <Button
          title="Let's Go"
          handleClick={() => {
            navigate("/");
          }}
        />
      </div>
    </div>
  );
};

export default Success;
