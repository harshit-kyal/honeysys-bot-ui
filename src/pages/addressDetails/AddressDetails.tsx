import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddressDetails = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("option1");

  function handleChange(event: any) {
    setSelectedOption(event.target.value);
  }
  return (
    <div>
      <div className="sticky top-0 w-full z-50">
        <div className="bg-primary flex items-center justify-between gap-3 max-[350px]:px-2 min-[350px]:px-4 py-[10px]">
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
      <div className="text-sm text-[#0D1282] font-normal flex mx-4 my-3" onClick={()=>navigate("/address")}>
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
  return (
    <div>
      <label className="flex items-start my-3 px-5" >
        <input
          type="radio"
          className="mt-2"
          value="option1"
          checked={props.selectedOption === "option1"}
          onChange={props.handleChange}
          style={{opacity:"1"}}
        />
        <div className="ms-2">
          <div className="text-black text-sm font-medium">Jiya Sharma</div>
          <div className="text-black text-sm font-normal">+91 123-4567890</div>
          <div className="text-black text-sm font-normal mt-3">
            1234221 Test Street, Tested lane, Near Confirmed Park road, Tested
            State - 12345{" "}
          </div>
        </div>
      </label>
      <div className=" border-b-[1px] border-[#E6E6E6]"></div>
      <label className="flex items-start my-3 px-5" >
        <input
          type="radio"
          className="mt-2"
          value="option2"
          checked={props.selectedOption === "option2"}
          onChange={props.handleChange}
          style={{opacity:"1"}}
        />
        <div className="ms-2">
          <div className="text-black text-sm font-medium">Jiya Sharma</div>
          <div className="text-black text-sm font-normal">+91 123-4567890</div>
          <div className="text-black text-sm font-normal mt-3">
            1234221 Test Street, Tested lane, Near Confirmed Park road, Tested
            State - 12345{" "}
          </div>
        </div>
      </label>
      <div className=" border-b-[1px] border-[#E6E6E6]"></div>
    </div>
  );
}
