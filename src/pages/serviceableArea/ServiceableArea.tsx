import { Button } from "@polynomialai/alpha-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const ServiceableArea = () => {
  const navigate = useNavigate();
  let storeData = [
    {
      id: "648beef8f65367341ca5f066",
      locationName: "Kondapur ",
      orderValue: 1,
      activeFlag: true,
      deleteFlag: false,
      createdBy: "admin",
      creationDate: "2023-06-16T05:11:20.809Z",
    },
    {
      id: "648bef05f65367341ca5f067",
      locationName: "Gachibowli",
      orderValue: 2,
      activeFlag: true,
      deleteFlag: false,
      createdBy: "admin",
      creationDate: "2023-06-16T05:11:33.330Z",
    },
    {
      id: "648beef8f65367341ca5f066",
      locationName: "Kondapur ",
      orderValue: 1,
      activeFlag: true,
      deleteFlag: false,
      createdBy: "admin",
      creationDate: "2023-06-16T05:11:20.809Z",
    },
    {
      id: "648bef05f65367341ca5f067",
      locationName: "Gachibowli",
      orderValue: 2,
      activeFlag: true,
      deleteFlag: false,
      createdBy: "admin",
      creationDate: "2023-06-16T05:11:33.330Z",
    },
    {
      id: "648beef8f65367341ca5f066",
      locationName: "Kondapur ",
      orderValue: 1,
      activeFlag: true,
      deleteFlag: false,
      createdBy: "admin",
      creationDate: "2023-06-16T05:11:20.809Z",
    },
    {
      id: "648bef05f65367341ca5f067",
      locationName: "Gachibowli",
      orderValue: 2,
      activeFlag: true,
      deleteFlag: false,
      createdBy: "admin",
      creationDate: "2023-06-16T05:11:33.330Z",
    },
    {
      id: "648beef8f65367341ca5f066",
      locationName: "Kondapur ",
      orderValue: 1,
      activeFlag: true,
      deleteFlag: false,
      createdBy: "admin",
      creationDate: "2023-06-16T05:11:20.809Z",
    },
    {
      id: "648bef05f65367341ca5f067",
      locationName: "Gachibowli",
      orderValue: 2,
      activeFlag: true,
      deleteFlag: false,
      createdBy: "admin",
      creationDate: "2023-06-16T05:11:33.330Z",
    },
    {
      id: "648beef8f65367341ca5f066",
      locationName: "Kondapur ",
      orderValue: 1,
      activeFlag: true,
      deleteFlag: false,
      createdBy: "admin",
      creationDate: "2023-06-16T05:11:20.809Z",
    },
    {
      id: "648bef05f65367341ca5f067",
      locationName: "Gachibowli",
      orderValue: 2,
      activeFlag: true,
      deleteFlag: false,
      createdBy: "admin",
      creationDate: "2023-06-16T05:11:33.330Z",
    },
  ];
  return (
    <div>
      <div className="h-[32vh] bg-[#d3d3df] py-3">
        <img
          src="/images/black_back.svg"
          className="cursor-pointer ms-2"
          alt="back"
          height={24}
          width={24}
          onClick={() => navigate(-1)}
        />
        <div className="flex items-center justify-center flex-col">
          <img src="/images/not_serviceable.png" height={120} width={120}></img>
          <div className="text-center">Sorry, This area is not serviceable</div>
          <div className="text-center text-xs mt-2 mx-5">
            We are working to bring the seemless online shooping experience to
            your location very soon. <u>GET NOTIFIED</u>
          </div>
        </div>
      </div>
      <div className="h-[68vh]">
        <div className="px-3 py-3">
          <div className="h-[52vh] relative ">
            <div className="text-primary  text-[11px]">
              FIND US BELOW SERVICEABLE AREA
            </div>
            <div
              className="mt-2 overflow-auto"
              style={{ height: "calc(52vh - 23px)" }}
            >
              {storeData.map((items: any, index: number) => (
                <div className="flex border-b-2 pb-2 mt-1" key={index}>
                  <img src="/images/location1.svg" height={35} width={27}></img>
                  <div className="ms-3">
                    <div className="text-base">{items?.locationName}</div>
                    <div className="text-xs text-[gray]">
                      {items?.locationName}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className=" w-full flex justify-end items-center flex-col mt-[12px]">
            <Button
              className="!bg-primary text-white text-xs mx-5 max-[500px]:w-[90%] min-[500px]:w-[40%] min-[1024px]:w-[20%] text-center py-[10px]"
              onClick={() => navigate("/address")}
            >
              Change Location
            </Button>
            <div className="text-primary mt-2 text-sm cursor-pointer">
              Skip & Browse
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceableArea;
