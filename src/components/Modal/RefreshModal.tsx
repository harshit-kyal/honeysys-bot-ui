import { Button } from "@polynomialai/alpha-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setRefreshModal } from "../../slices/homeSlice";
const RefreshModal = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const refreshModal = useAppSelector((state) => state.home.refreshModal);
  return (
    <>
      {refreshModal ? (
        <>
          <div className="blur"></div>
          <div
            id="loading"
            className="absolute top-[50%] left-[50%] w-[88%] md:w-[50%] lg:w-[40%] bg-white px-5 md:px-7 pb-5 md:pb-7 pt-3 md:pt-5 z-50 blurcss"
            style={{ transform: " translate(-50%, -50%)" }}
          >
            <div className="text-center text-sm">
              something went wrong please try again
            </div>
            <div className="flex justify-center">
              <Button
                className="text-white !bg-primary px-7 text-xs py-2 mt-5"
                onClick={() => {
                  dispatch(setRefreshModal(false));
                  window.location.reload();
                  //   navigate("/success");
                }}
              >
                Refresh
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

export default RefreshModal;
