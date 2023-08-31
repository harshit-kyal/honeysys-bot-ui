import React from "react";
import { Text } from "@polynomialai/alpha-react";
import { useNavigate } from "react-router-dom";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import MyMapComponent from "../../components/MyMapComponent";

const Address = () => {
  const navigate = useNavigate();

  const render = (status: Status): React.ReactElement => {
    if (status === Status.FAILURE) return <div>Error</div>;
    return <div>Loading ...</div>;
  };

  const center = { lat: -34.397, lng: 150.644 };
  const zoom = 4;

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
      <div className="bg-slate-100" style={{ height: "calc(100% - 40px)" }}>
        <Wrapper
          apiKey={"AIzaSyAUWdjoeM1tSvhlkB9LPywwsWCli2lQxxY"}
          render={render}
        >
          <MyMapComponent center={center} zoom={zoom} />
        </Wrapper>
      </div>
    </div>
  );
};

export default Address;
