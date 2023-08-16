import { AddDialog, Text } from "@polynomialai/alpha-react";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setLocationModal } from "../../slices/homeSlice";

const LocationModal = () => {
  const dispatch = useAppDispatch();
  const locationModal = useAppSelector((state) => state.home.locationModal);

  return (
    <AddDialog
      title={" Steps to Enable Location"}
      children={
        <div className="my-5">
          <Text type="body" size="lg" className="font-semibold">
            Steps to Enable Location
          </Text>
          <Text>
            <ul style={{ listStyleType: "disc" }}>
              <li>Turn on Location</li>
              <li>Open this link {document.URL} in browser</li>
              <li>Click on ⋮ (menu) and open settings</li>
              <li>Go to Site Settings</li>
              <li>Click on Location</li>
              <li>Check this website under blocked section and enable it</li>
              <li>
                If not there then clear cookies and site data, then follow above
                steps
              </li>
            </ul>
          </Text>
        </div>
      }
      // Header={<></>}
      // Footer={<></>}
      isOpen={locationModal}
      onClose={() => {
        dispatch(setLocationModal(false));
      }}
    />
  );
};

export default LocationModal;
