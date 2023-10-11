import { Button, Input } from "@polynomialai/alpha-react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ContactDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const nameData = location?.state?.name;
  const mobileNumberData = location?.state?.mobileNumber;
  const adressData = location?.state?.address;
  const [name, setName] = useState(nameData ? nameData : "");
  const [mobileNumber, setMobileNumber] = useState(
    mobileNumberData ? mobileNumberData : ""
  );
  const [pincode, setPincode] = useState(
    adressData?.pincode ? adressData?.pincode : ""
  );
  const [address, setAddress] = useState(
    adressData?.address ? adressData?.address : ""
  );
  const [landmark, setLandmark] = useState(
    adressData?.landMark ? adressData?.landMark : ""
  );
  const [city, setCity] = useState(adressData?.city ? adressData?.city : "");
  const [state, setState] = useState(
    adressData?.state ? adressData?.state : ""
  );
  console.log("adressData",nameData,mobileNumberData);
  return (
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
          <div className="text-black text-base font-medium px-5">
            Contact Details
          </div>
          <div className="text-[#505050] text-sm font-normal mt-2 mb-0 !h-6 px-5">
            Name
          </div>
          <div className="px-5">
            <input
              className="border-0 !p-0 shadow-none px-5 w-full text-xs"
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
          <div className="text-[#505050] text-sm font-normal mt-4 mb-0 !h-6 px-5">
            Mobile Number
          </div>
          <div className="px-5">
            <input
              className="border-0 !p-0 shadow-none w-full text-xs"
              placeholder="Enter your mobile number"
              value={mobileNumber}
              onChange={(e: any) => setMobileNumber(e.target.value)}
              style={{
                borderBottom: "1px solid #0D1282",
                borderRadius: "0px",
                height: "24px",
              }}
            ></input>
          </div>
          <div className="mt-5 mb-3 border-b-[1px] border-[#E6E6E6]"></div>
          <div className="text-black text-base font-medium px-5">
            Address Details
          </div>
          <div className="text-[#505050] text-sm font-normal mt-2 mb-0 !h-6 px-5">
            Pincode
          </div>
          <div className="px-5">
            <input
              className="border-0 !p-0 shadow-none px-5 w-full text-xs"
              placeholder="Enter pincode"
              value={pincode}
              onChange={(e: any) => setPincode(e.target.value)}
              style={{
                borderBottom: "1px solid #0D1282",
                borderRadius: "0px",
                height: "24px",
              }}
            ></input>
          </div>
          <div className="text-[#505050] text-sm font-normal mt-4 mb-0 !h-6 px-5">
            Address
          </div>
          <div className="px-5">
            <input
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
          <div className="text-[#505050] text-sm font-normal mt-4 mb-0 !h-6 px-5">
            Landmark
          </div>
          <div className="px-5">
            <input
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
          <div className="text-[#505050] text-sm font-normal mt-4 mb-0 !h-6 px-5">
            City
          </div>
          <div className="px-5">
            <input
              className="border-0 !p-0 shadow-none w-full text-xs"
              placeholder="Enter city"
              value={city}
              onChange={(e: any) => setCity(e.target.value)}
              style={{
                borderBottom: "1px solid #0D1282",
                borderRadius: "0px",
                height: "24px",
              }}
            ></input>
          </div>
          <div className="text-[#505050] text-sm font-normal mt-4 mb-0 !h-6 px-5">
            state
          </div>
          <div className="px-5">
            <input
              className="border-0 !p-0 shadow-none w-full text-xs"
              placeholder="Enter state"
              value={state}
              onChange={(e: any) => setState(e.target.value)}
              style={{
                borderBottom: "1px solid #0D1282",
                borderRadius: "0px",
                height: "24px",
              }}
            ></input>
          </div>
          <div className="flex justify-center items-center">
          <Button
            className=" bg-[#09215B] text-white text-xs mx-5 max-[500px]:w-[70%] min-[500px]:w-[35%] min-[1024px]:w-[20%] text-center py-[10px] mt-5"
            onClick={() => navigate("/addressDetails")}
          >
            Save & Send Address
          </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactDetails;
