import { Button } from "@polynomialai/alpha-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getChatData,
  setGetStartDisplay,
  setUserPincode,
  setUserSavedAddres,
} from "../../slices/homeSlice";
import { ToastPopup } from "../../utils/TosterPopup";

const AddressDetails = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("0");
  function handleChange(event: any) {
    setSelectedOption(event.target.value);
  }

  return (
    <div>
      <div className="sticky top-0 w-full z-50">
        <div className="bg-primary flex items-center justify-between gap-3 max-[350px]:px-2 min-[350px]:px-4 py-[10px]">
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
            />
            {/* <Text type="body" size="lg" className="inline-block text-white ml-2"> */}
            <div
              className=" whitespace-nowrap text-ellipsis overflow-hidden max-[350px]:text-[0.875rem] min-[350px]:text-[1.125rem] inline-block text-white ml-2"
              style={{ width: "calc(100vw - 172px)" }}
            >
              Address
            </div>
            {/* </Text> */}
          </div>
        </div>
      </div>

      <div
        className="text-sm text-primary font-normal flex mx-4 my-3"
        onClick={() => navigate("/address")}
      >
        <img
          src="/images/add_circle.svg"
          className="me-2"
          height="20px"
          width="20px"
        ></img>
        Add New Address
      </div>
      <div className=" border-b-[1px] border-[#E6E6E6]"></div>
      <div className="">
        <RadioButtonGroup
          selectedOption={selectedOption}
          handleChange={handleChange}
          setSelectedOption={setSelectedOption}
        />
      </div>
    </div>
  );
};
export default AddressDetails;
export function RadioButtonGroup(props: any) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const convId = useAppSelector((state) => state.bot.convId);
  const botType = useAppSelector((state) => state.bot.botType);
  const storeId = useAppSelector((state) => state.home.storeId);
  const storeData = useAppSelector((state) => state.home.storeData);
  const getStartDisplay = useAppSelector((state) => state.home.getStartDisplay);
  const [addressArray, setAddressArray] = useState([]);
  const [selectedAddress, setSelectedAdress] = useState<any>({});
  const [Error, setError] = useState(false);
  const cartData = () => {
    const newData = {
      conversationId: convId,
      text: "getAddress",
      voiceFlag: false,
      isChatVisible: false,
      data: {
        storeId: storeId,
        pincode: storeData?.location?.pincode,
        lat: storeData?.location?.latitude,
        lag: storeData?.location?.longitude,
      },
    };
    // if (convId && botType && convId !== "" && botType !== "") {
    if (convId && botType && botType !== "") {
      dispatch(getChatData({ newData, botType }))
        .then((data) => {
          let addressData = data?.payload?.data?.activities[0][0];
          if (data && addressData?.type === "getAddress" && addressData) {
            if (addressData?.value?.data) {
              setAddressArray(addressData?.value?.data);
              props.setSelectedOption(addressData?.value?.data.length - 1);
              setSelectedAdress(
                addressData?.value?.data[addressData?.value?.data.length - 1]
              );
              setError(false);
            } else {
              setError(true);
            }
          }
        })
        .catch((error) => {
          setError(true);
          ToastPopup({ text: "something went wrong" });
          console.log("err", error);
        });
    }
  };
  useEffect(() => {
    cartData();
  }, []);
  const loading = useAppSelector((state) => state.home.loading);
  return (
    <>
      {!Error && !loading ? (
        <div>
          <div className="h-[calc(100vh-159px)] md:h-[calc(100vh-164px)] overflow-auto">
            {addressArray.map((item: any, index: any) => {
              return (
                <>
                  <label
                    className="flex items-start mt-2 mb-3 px-5"
                    key={index}
                  >
                    <input
                      type="radio"
                      className="mt-[22px]"
                      value={index}
                      checked={
                        props?.selectedOption?.toString() &&
                        parseInt(props?.selectedOption) === index
                      }
                      onClick={() => {
                        setSelectedAdress(item);
                      }}
                      onChange={props?.handleChange && props?.handleChange}
                      style={{ opacity: "1" }}
                    />
                    <div className="ms-2 w-full">
                      <div
                        className="flex justify-end"
                        onClick={() => {
                          navigate("/contactDetails", {
                            state: {
                              address: item,
                            },
                          });
                        }}
                      >
                        <img
                          src="/images/edit.svg"
                          height="16px"
                          width="16px"
                        ></img>
                      </div>
                      <div className="text-black text-sm font-medium">
                        {item?.name}
                      </div>
                      <div className="text-black text-sm font-normal">
                        {item?.mobile}
                      </div>
                      <div className="text-black text-sm font-normal mt-3">
                        {`${
                          item?.buildingName ? item?.buildingName + "/" : ""
                        }${item?.flatNo ? item?.flatNo + "," : ""}${
                          item?.address1 ? item?.address1 + "," : ""
                        } ${item?.locality ? item?.locality + "," : ""} ${
                          item?.city ? item?.city + "," : ""
                        } ${item?.state ? item?.state + "," : ""} ${
                          item?.pincode ? item?.pincode : ""
                        }`}
                        {/* {`${item.address.address},${item.address.landMark},${item.address.city}-${item.address.pincode},${item.address.state}`} */}
                      </div>
                    </div>
                  </label>
                  <div className=" border-b-[1px] border-[#E6E6E6]"></div>
                </>
              );
            })}
          </div>
          <div className=" w-full h-[43px] flex justify-end items-center flex-col mt-[10px]">
            <Button
              className=" !bg-primary text-white text-xs mx-5 max-[500px]:w-[90%] min-[500px]:w-[40%] min-[1024px]:w-[20%] text-center py-[10px]  "
              onClick={() => {
                if (getStartDisplay) {
                  navigate("/");
                  const newData = {
                    conversationId: convId,
                    text: "saveaddress",
                    voiceFlag: false,
                    isChatVisible: false,
                    data: selectedAddress,
                  };
                  dispatch(getChatData({ newData, botType }))
                    .then(() => {
                      dispatch(setUserSavedAddres(selectedAddress));
                      dispatch(setUserPincode(selectedAddress?.pincode));
                    })
                    .catch((error) => {
                      ToastPopup({ text: "something went wrong" });
                      console.log("err", error);
                    });
                } else {
                  dispatch(setGetStartDisplay(true));
                  navigate("/");
                }
              }}
            >
              Save
            </Button>
          </div>
        </div>
      ) : loading && !Error ? (
        <div className="mx-2 mt-2">Loading...</div>
      ) : (
        <div className="mx-2 mt-2">something went wrong</div>
      )}
    </>
  );
}
