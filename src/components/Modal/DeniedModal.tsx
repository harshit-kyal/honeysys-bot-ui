import { AddDialog, Button, Text } from "@polynomialai/alpha-react";
import { setDeniedModal } from "../../slices/homeSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const DeniedModal = () => {
  const dispatch = useAppDispatch();
  const deniedModal = useAppSelector((state) => state.home.deniedModal);
  return (
    <>
      {deniedModal ? (
        <>
          <div className="blur"></div>
          <div
            id="loading"
            className="absolute top-[50%] left-[50%] w-[88%] md:w-[50%] lg:w-[40%] bg-white md:p-7 z-50 blurcss"
            style={{ transform: " translate(-50%, -50%)" }}
          >
            <div className="my-1 p-3">
              <div className="flex justify-between align-middle items-center">
                <Text
                  type="body"
                  size="lg"
                  className="font-semibold text-[red]"
                >
                  Location permissions is not Granted
                </Text>
                <img
                  onClick={() => dispatch(setDeniedModal(false))}
                  src="/images/close.svg"
                  height="15px"
                  width="15px"
                ></img>
              </div>
              <div className="mt-1 ms-1 text-base text-black font-medium">Steps to Enable Location</div>
              <Text>
                <ul className="px-5 py-2 text-black font-normal" style={{ listStyleType: "disc" }}>
                  <li>Turn on Location</li>
                  <li>Open this link {document.URL} in browser</li>
                  <li>Click on ⋮ (menu) and open settings</li>
                  <li>Go to Site Settings</li>
                  <li>Click on Location</li>
                  <li>
                    Check this website under blocked section and enable it
                  </li>
                  <li>
                    If not there then clear cookies and site data, then follow
                    above steps
                  </li>
                </ul>
              </Text>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>

    // <AddDialog
    //   title=" Steps to Enable Location"
    //   children={
    //     <div className="my-5">
    //       <Text type="body" size="lg" className="font-semibold">
    //         Steps to Enable Location
    //       </Text>
    //       <Text>
    //         <ul style={{ listStyleType: "disc" }}>
    //           <li>Turn on Location</li>
    //           <li>Open this link {document.URL} in browser</li>
    //           <li>Click on ⋮ (menu) and open settings</li>
    //           <li>Go to Site Settings</li>
    //           <li>Click on Location</li>
    //           <li>Check this website under blocked section and enable it</li>
    //           <li>
    //             If not there then clear cookies and site data, then follow above
    //             steps
    //           </li>
    //         </ul>
    //       </Text>
    //     </div>
    //   }
    //   isOpen={location}
    //   onClose={() => {
    //     setlocation(true);
    //     // dispatch(setDeniedModal(false));
    //   }}
    // />
  );
};

export default DeniedModal;
