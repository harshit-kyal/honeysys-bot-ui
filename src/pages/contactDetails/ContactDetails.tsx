import { Button } from "@polynomialai/alpha-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getChatData } from "../../slices/homeSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const ContactDetails = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigateData = location?.state?.navigate;

  const [errorLabel, setErrorLabel] = useState<any>({});
  const pincodeData = useAppSelector((state) => state.home.userPincode);
  const mobileNumber = useAppSelector((state) => state.home.mobileNo);
  const storeInfo = useAppSelector((state) => state.home.storeData);
  const convId = useAppSelector((state) => state.bot.convId);
  const addressData = location?.state?.address;
  const [name, setName] = useState(addressData?.name ? addressData?.name : "");
  const [pincode, setPincode] = useState(
    addressData?.pincode ? addressData?.pincode : pincodeData
  );
  const [address, setAddress] = useState(
    addressData?.address1 ? addressData?.address1 : ""
  );
  const [landmark, setLandmark] = useState(
    addressData?.landmark ? addressData?.landmark : ""
  );
  const [city, setCity] = useState(addressData?.city ? addressData?.city : "");
  const [addAddressLoading, setAddAddressLoading] = useState(false);
  const [state, setState] = useState(
    addressData?.state ? addressData?.state : ""
  );
  const saveHandler = () => {
    let error = {
      userName: "",
      mobileNumber: "",
      pincode: "",
      address: "",
      landmark: "",
      city: "",
      state: "",
    };
    if (name === "") {
      error.userName = "Please enter name";
    }
    // if (mobileNumber === "") {
    //   error.mobileNumber = "Please enter mobile number";
    // } else if (mobileNumber.length !== 10) {
    //   error.mobileNumber = "Please enter valid mobile number";
    // }
    // if (pincode === "") {
    //   error.pincode = "Please enter pincode";
    // } else if (pincode.length !== 6) {
    //   error.pincode = "Please enter valid pincode";
    // }
    if (address === "") {
      error.address = "Please enter address";
    }
    if (landmark === "") {
      error.landmark = "Please enter landMark";
    }
    // if (city == "") {
    //   error.city = "Please enter city";
    // }
    // if (state === "") {
    //   error.state = "Please enter state";
    // }
    if (
      error.userName === "" &&
      // error.mobileNumber === "" &&
      // error.pincode === "" &&
      error.address === "" &&
      error.landmark === ""
      // error.city === "" &&
      // error.state === ""
    ) {
      let botType = "e-comm";
      const newData = {
        conversationId: convId,
        text: "addAddress",
        isChatVisible: false,
        voiceFlag: false,
        data: {
          addressId: addressData?.addressId ? addressData?.addressId : 0, //0 for new,
          address1: address,
          address2: "",
          addressName: "Home",
          defaultAddress: false,
          latitude: storeInfo?.location?.longitude,
          longitude: storeInfo?.location?.longitude,
          pincode: pincode.toString(),
          buildingName: "",
          city: city,
          cityId: storeInfo?.location?.cityId,
          email: "",
          flatNo: "",
          landmark: landmark,
          locality: "",
          localityId: storeInfo?.location?.localityId,
          mobile: mobileNumber,
          name: name,
          state: state,
          stateId: storeInfo?.location?.stateId,
        },
      };
      setAddAddressLoading(true);
      if (convId && botType) {
        dispatch(getChatData({ newData, botType }))
          .then((data) => {
            if (
              data &&
              data?.payload?.data?.activities[0][0]?.type === "addAddress"
            ) {
              setAddAddressLoading(false);
              navigate("/addressDetails")
              // navigateData && navigateData === "home"
              //   ? navigate("/")
              //   : navigate("/addressDetails");
            }
          })
          .catch((error) => {
            setAddAddressLoading(false);
            console.log("err", error);
          });
      }
    }
    setErrorLabel(error);
  };
  let pageError = useAppSelector((state) => state.home.error);
  // let loading = useAppSelector((state) => state.home.loading);

  return (
    <>
      {!pageError ? (
        <div className="">
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
                  Provide Address
                </div>
                {/* </Text> */}
              </div>
            </div>
          </div>
          <div className="mt-2 ">
            <form>
              <div className="h-[calc(100vh-115px)] overflow-auto">
                <div className="text-black text-base font-medium px-5">
                  Contact Details
                </div>
                <div className="text-[#505050] text-sm font-normal mt-2 mb-0 !h-6 px-5">
                  Name
                </div>
                <div className="px-5">
                  <input
                    type="text"
                    className={`border-0 !p-0 shadow-none px-5 w-full text-xs
                
                `}
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e: any) => setName(e.target.value)}
                    style={{
                      borderBottom: "1px solid #0D1282",
                      borderRadius: "0px",
                      height: "24px",
                    }}
                  ></input>
                </div>
                {errorLabel?.userName ? (
                  <div className="text-[red] text-xs px-5">
                    {errorLabel?.userName}
                  </div>
                ) : (
                  <></>
                )}
                <div
                  className="text-[#505050] text-sm font-normal mt-4 mb-0 !h-6 px-5"
                  style={{}}
                >
                  Mobile Number
                </div>
                <div className="px-5">
                  <input
                    type="number"
                    disabled
                    className={`border-0 !p-0 shadow-none px-5 w-full text-xs`}
                    placeholder="Enter your mobile number"
                    value={mobileNumber}
                    // onChange={(e: any) => {
                    //   if (mobileNumber.length <= 9) {
                    //     setMobileNumber(e.target.value);
                    //   }
                    // }}
                    // onKeyDown={(e) => {
                    //   if (mobileNumber.length === 10 && e.key === "Backspace") {
                    //     e.preventDefault();
                    //     setMobileNumber(mobileNumber.slice(0, -1));
                    //   }
                    // }}
                    style={{
                      borderBottom: "1px solid #0D1282",
                      borderRadius: "0px",
                      height: "24px",
                    }}
                  ></input>
                </div>
                {errorLabel?.mobileNumber ? (
                  <div className="text-[red] text-xs px-5">
                    {errorLabel?.mobileNumber}
                  </div>
                ) : (
                  <></>
                )}
                <div className="mt-5 mb-3 border-b-[1px] border-[#E6E6E6]"></div>
                <div className="text-black text-base font-medium px-5">
                  Address Details
                </div>
                <div className="text-[#505050] text-sm font-normal mt-2 mb-0 !h-6 px-5">
                  Pincode
                </div>
                <div className="px-5">
                  <input
                    type="number"
                    className="border-0 !p-0 shadow-none px-5 w-full text-xs"
                    placeholder="Enter pincode"
                    value={pincode}
                    disabled={true}
                    // onChange={(e: any) => {
                    //   if (pincode.length <= 5) {
                    //     setPincode(e.target.value);
                    //   }
                    // }}
                    // onKeyDown={(e) => {
                    //   if (pincode.length === 6 && e.key === "Backspace") {
                    //     e.preventDefault();
                    //     setPincode(pincode.slice(0, -1));
                    //   }
                    // }}
                    style={{
                      borderBottom: "1px solid #0D1282",
                      borderRadius: "0px",
                      height: "24px",
                    }}
                  ></input>
                </div>
                {errorLabel?.pincode ? (
                  <div className="text-[red] text-xs px-5">
                    {errorLabel?.pincode}
                  </div>
                ) : (
                  <></>
                )}
                <div className="text-[#505050] text-sm font-normal mt-4 mb-0 !h-6 px-5">
                  Address
                </div>
                <div className="px-5">
                  <input
                    type="text"
                    className="border-0 !p-0 shadow-none w-full text-xs "
                    placeholder="Enter your address"
                    value={address}
                    onChange={(e: any) => setAddress(e.target.value)}
                    style={{
                      borderBottom: "1px solid #0D1282",
                      borderRadius: "0px",
                      height: "24px",
                    }}
                  ></input>
                </div>
                {errorLabel?.address ? (
                  <div className="text-[red] text-xs px-5">
                    {errorLabel?.address}
                  </div>
                ) : (
                  <></>
                )}
                <div className="text-[#505050] text-sm font-normal mt-4 mb-0 !h-6 px-5">
                  Landmark
                </div>
                <div className="px-5">
                  <input
                    type="text"
                    className="border-0 !p-0 shadow-none w-full text-xs"
                    placeholder="Enter landmark"
                    value={landmark}
                    onChange={(e: any) => setLandmark(e.target.value)}
                    style={{
                      borderBottom: "1px solid #0D1282",
                      borderRadius: "0px",
                      height: "24px",
                    }}
                  ></input>
                </div>
                {errorLabel?.landmark ? (
                  <div className="text-[red] text-xs px-5">
                    {errorLabel?.landmark}
                  </div>
                ) : (
                  <></>
                )}
                <div className="text-[#505050] text-sm font-normal mt-4 mb-0 !h-6 px-5">
                  City
                </div>
                <div className="px-5">
                  <input
                    type="text"
                    className="border-0 !p-0 shadow-none w-full text-xs"
                    placeholder="Enter city"
                    value={city}
                    disabled
                    onChange={(e: any) => setCity(e.target.value)}
                    style={{
                      borderBottom: "1px solid #0D1282",
                      borderRadius: "0px",
                      height: "24px",
                    }}
                  ></input>
                </div>
                {errorLabel?.city ? (
                  <div className="text-[red] text-xs px-5">
                    {errorLabel?.city}
                  </div>
                ) : (
                  <></>
                )}
                <div className="text-[#505050] text-sm font-normal mt-4 mb-0 !h-6 px-5">
                  state
                </div>
                <div className="px-5">
                  <input
                    type="text"
                    className="border-0 !p-0 shadow-none w-full text-xs"
                    placeholder="Enter state"
                    value={state}
                    onChange={(e: any) => setState(e.target.value)}
                    disabled
                    style={{
                      borderBottom: "1px solid #0D1282",
                      borderRadius: "0px",
                      height: "24px",
                    }}
                  ></input>
                </div>
                {errorLabel?.state ? (
                  <div className="text-[red] text-xs px-5">
                    {errorLabel?.state}
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className=" w-full h-[37px] flex justify-end items-center flex-col mt-[10px]">
                <Button
                  className=" !bg-primary text-white text-xs mx-5 max-[500px]:w-[70%] min-[500px]:w-[35%] min-[1024px]:w-[20%] py-[10px] text-center"
                  onClick={() => saveHandler()}
                >
                  Save & Send Address
                </Button>
              </div>
            </form>
          </div>
          {addAddressLoading && (
            <div className="cartLoader">
              <div className="cartLoader-text">Loading...</div>
            </div>
          )}
        </div>
      ) : (
        <div className="mx-2 mt-2">something went wrong</div>
      )}
    </>
  );
};

export default ContactDetails;
