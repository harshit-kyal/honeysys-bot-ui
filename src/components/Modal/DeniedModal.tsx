import { AddDialog, Text } from "@polynomialai/alpha-react";
import { setDeniedModal } from "../../slices/homeSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const DeniedModal = () => {
  const dispatch = useAppDispatch();
  const deniedModal = useAppSelector((state) => state.home.deniedModal);

  return (
    <AddDialog
      title=" Steps to Enable Location"
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
      isOpen={deniedModal}
      onClose={() => {
        dispatch(setDeniedModal(false));
      }}
    />
  );
};

export default DeniedModal;
