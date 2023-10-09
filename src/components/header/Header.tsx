import { Header, Text } from "@polynomialai/alpha-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { resetRoot } from "../../slices/rootSlice";
import { resetHome } from "../../slices/homeSlice";
import { resetBot } from "../../slices/botSlice";
import "../../styles/header.css";

const HeaderBar = () => {
  const dispatch = useAppDispatch();
  const overallThemeUI = useAppSelector((state) => state.root.overallThemeUI);
  const cartQuantity = useAppSelector((state) => state.home.totalQuantity);
  const navigate = useNavigate();
  const reviewToken = localStorage.getItem("reviewToken");

  const hadnleNavigation = (route: string) => {
    navigate(route);
  };
  return (
    <Header
      className="max-[350px]:px-3 min-[350px]:px-5 py-[10px] bg-primary"
      logo={
        <div className="flex items-center">
          <img
            src={overallThemeUI.botIcons}
            alt="logo"
            className="rounded-full bg-[#E6E6E6]  header-logo"
          />
          <div className="flex flex-col ml-2 overflow-hidden">
            <div className="font-semibold text-sm !min-[350px]:text-base">
              Botcy
            </div>
            <div className="font-medium max-[350px]:text-[.5rem] min-[350px]:text-[.625rem] overflow-hidden whitespace-nowrap text-ellipsis">
              Bot Powered E-commerce Platform
            </div>
          </div>
        </div>
      }
      onSettingsClick={() => {}}
      settingLogo={
        <div className="flex items-center flex-shrink-0 h-full w-max gap-2">
          <img
            src="/images/search.svg"
            alt="search"
            className="header-btn "
            onClick={async () => {
              !reviewToken && hadnleNavigation("/search");
            }}
          />
          <div>
            <img
              src="/images/shopping.svg"
              alt="shopping"
              className="header-btn"
              onClick={() => {
                !reviewToken && hadnleNavigation("/cart");
              }}
            />
            {cartQuantity > 0 ? (
              <div className="absolute top-[14px] ms-3 rounded-full bg-white text-primary h-[14px] w-[14px] flex justify-center items-center text-[10px]">
                {cartQuantity}
              </div>
            ) : (
              <></>
            )}
          </div>
          <img
            src="/images/logout.svg"
            alt="logout"
            className="header-btn-logout "
            onClick={() => {
              if (!reviewToken) {
                localStorage.clear();
                dispatch(resetHome());
                dispatch(resetBot());
                dispatch(resetRoot());
                hadnleNavigation("/splash");
              }
            }}
          />
        </div>
      }
    />
  );
};

export default HeaderBar;
