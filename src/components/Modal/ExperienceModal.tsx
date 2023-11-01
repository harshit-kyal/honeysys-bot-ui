import { Button } from "@polynomialai/alpha-react";
import React from "react";
import { useNavigate } from "react-router-dom";
const ExperienceModal = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="blur"></div>
      <div
        id="loading"
        className="absolute top-[50%] left-[50%] w-[88%] md:w-[50%] lg:w-[40%] bg-white p-5 md:p-7 z-50 blurcss"
        style={{ transform: " translate(-50%, -50%)" }}
      >
        <div className="text-center text-sm">Please Change Your Location</div>
        <div className="text-xs text-primary mt-2">
          we are sorry...you won't be able to place any order from our
          experience store.{" "}
        </div>
        <div className="text-xs text-primary my-3">
          So plese change your location
        </div>
        <div className="flex justify-center">
          <Button
            className="text-white !bg-primary px-7 text-xs py-2 mt-2"
            onClick={() => navigate("/address")}
          >
            Change Location
          </Button>
        </div>
      </div>
    </>
  );
};

export default ExperienceModal;
