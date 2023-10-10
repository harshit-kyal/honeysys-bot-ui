import { Text } from "@polynomialai/alpha-react";
import { useNavigate } from "react-router-dom";
import "../styles/header.css";
import { useAppSelector } from "../app/hooks";
const PageHeader = ({
  title,
  isDisableSearch = false,
}: {
  title: string;
  isDisableSearch?: boolean;
}) => {
  const navigate = useNavigate();

  const hadnleNavigation = (route: string) => {
    navigate(route);
  };
  const reviewToken = localStorage.getItem("reviewToken");
  const cartQuantity = useAppSelector((state) => state.home.totalQuantity);
  return (
    <div className="fixed top-0 w-full z-50">
      <div className="bg-primary flex items-center justify-between gap-3 max-[350px]:px-2 min-[350px]:px-4 py-[16.5px]">
        <div
          className="flex"
          onClick={() => {
            if (!reviewToken) {
              navigate(-1);
            }
          }}
        >
          <img src="/images/white_back.svg" alt="back" height={24} width={24} />
          {/* <Text type="body" size="lg" className="inline-block text-white ml-2"> */}
          <div
            className=" whitespace-nowrap text-ellipsis overflow-hidden max-[350px]:text-[0.875rem] min-[350px]:text-[1.125rem] inline-block text-white ml-2"
            style={{ width: "calc(100vw - 172px)" }}
          >
            {title}
          </div>
          {/* </Text> */}
        </div>
        <div className="flex flex-shrink-0 w-max gap-2 items-center">
          {isDisableSearch ? (
            <></>
          ) : (
            <img
              src="/images/search.svg"
              className="header-btn"
              alt="search"
              width={24}
              height={24}
              onClick={() => hadnleNavigation("/search")}
            />
          )}
          <div>
            <img
              src="/images/shopping.svg"
              alt="shopping"
              className="header-btn"
              onClick={() => {
                hadnleNavigation("/cart");
              }}
            />
            {cartQuantity > 0 ? (
              <div className="absolute max-[350px]:top-[15px] min-[350px]:top-[14px] max-[350px]:ms-2 min-[350px]:ms-3 rounded-full bg-white text-primary max-[350px]:h-[10px] min-[350px]:h-[14px] max-[350px]:w-[10px] min-[350px]:w-[14px] flex justify-center items-center  max-[350px]:text-[8px] min-[350px]:text-[10px]">
                {cartQuantity}
              </div>
            ) : (
              <></>
            )}
          </div>
          <img
            src="/images/logout.svg"
            className="header-btn-logout"
            alt="logout"
            width={20}
            height={20}
            onClick={() => {
              localStorage.clear();
              hadnleNavigation("/splash");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
