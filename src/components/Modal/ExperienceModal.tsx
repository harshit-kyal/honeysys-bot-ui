import { Button } from "@polynomialai/alpha-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setExperienceModal } from "../../slices/homeSlice";
const ExperienceModal = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const experienceModal = useAppSelector((state) => state.home.experienceModal);
  return (
    <>
      {experienceModal ? (
        <>
          <div className="blur"></div>
          <div
            id="loading"
            className="absolute top-[50%] left-[50%] w-[88%] md:w-[50%] lg:w-[40%] bg-white px-5 md:px-7 pb-5 md:pb-7 pt-3 md:pt-5 z-50 blurcss"
            style={{ transform: " translate(-50%, -50%)" }}
          >
            <div className="flex justify-end align-middle">
              <img
                onClick={() => dispatch(setExperienceModal(false))}
                src="/images/close.svg"
                height="12px"
                width="12px"
              ></img>
            </div>
            <div className="text-center text-sm">
              Please Change Your Location
            </div>
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
                onClick={() => {
                  dispatch(setExperienceModal(false));
                  navigate("/address");
                }}
              >
                Change Location
              </Button>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default ExperienceModal;
