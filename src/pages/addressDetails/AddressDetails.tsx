import { Button } from "@polynomialai/alpha-react";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getChatData, setUserPincode } from "../../slices/homeSlice";

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
        className="text-sm text-[#0D1282] font-normal flex mx-4 my-3"
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
  const [addressArray, setAddressArray] = useState([]);
  const [selectedAddress, setSelectedAdress] = useState({});
  const cartData = () => {
    const newData = {
      conversationId: convId,
      text: "address",
      voiceFlag: false,
    };
    if (convId && botType && convId !== "" && botType !== "") {
      dispatch(getChatData({ newData, botType })).then((data) => {
        if (data && data?.payload?.data?.activities[0]?.type === "address") {
          setAddressArray(data?.payload?.data?.activities[0]?.value?.data);
          setSelectedAdress(data?.payload?.data?.activities[0]?.value?.data[0]);
        }
      });
    }
  };
  useEffect(() => {
    cartData();
  }, []);
  const loading = useAppSelector((state) => state.home.loading);
  const error = useAppSelector((state) => state.home.error);

  return (
    <>
      {!error && !loading ? (
        <div>
          <div className="h-[calc(100vh-150px)] md:h-[calc(100vh-153px)] overflow-auto">
            {addressArray.map((item: any, index: any) => (
              <>
                <label className="flex items-start mt-2 mb-3 px-5" key={index}>
                  <input
                    type="radio"
                    className="mt-[22px]"
                    value={index}
                    checked={
                      props?.selectedOption && props?.selectedOption == index
                    }
                    onClick={() => {
                      setSelectedAdress(item);
                      dispatch(setUserPincode(item?.address?.pincode));
                    }}
                    onChange={props?.handleChange && props?.handleChange}
                    style={{ opacity: "1" }}
                  />
                  <div className="ms-2 w-full">
                    <div
                      className="flex justify-end"
                      onClick={() =>
                        navigate("/contactDetails", {
                          state: {
                            address: item.address,
                            name: item.name,
                            mobileNumber: item.mobileNumber,
                          },
                        })
                      }
                    >
                      <img
                        src="/images/edit.svg"
                        height="16px"
                        width="16px"
                      ></img>
                    </div>
                    <div className="text-black text-sm font-medium">
                      {item.name}
                    </div>
                    <div className="text-black text-sm font-normal">
                      {item.mobileNumber}
                    </div>
                    <div className="text-black text-sm font-normal mt-3">
                      {`${item.address.address},${item.address.landMark},${item.address.city}-${item.address.pincode},${item.address.state}`}
                    </div>
                  </div>
                </label>
                <div className=" border-b-[1px] border-[#E6E6E6]"></div>
              </>
            ))}
          </div>
          <div className="flex items-center justify-center w-full">
            <Button
              className=" bg-[#09215B] text-white text-xs mx-5 max-[500px]:w-[90%] min-[500px]:w-[40%] min-[1024px]:w-[20%] text-center py-[8px] mt-3  "
              onClick={() => {
                navigate("/");
                const newData = {
                  conversationId: convId,
                  text: "addressAction",
                  voiceFlag: false,
                };
                dispatch(getChatData({ newData, botType }))
                  .then(() => {})
                  .catch(() => {});
              }}
            >
              Save
            </Button>
          </div>
        </div>
      ) : loading && !error ? (
        <div className="mx-2 mt-2">Loading...</div>
      ) : (
        <div className="mx-2 mt-2">something went wrong</div>
      )}
    </>
  );
}
