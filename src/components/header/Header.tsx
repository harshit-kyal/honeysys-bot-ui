import { Header, Text } from "@polynomialai/alpha-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { resetRoom } from "../../slices/rootSlice";
import { resetHome } from "../../slices/homeSlice";
import { resetBot } from "../../slices/botSlice";
import "../../styles/header.css";

const HeaderBar = () => {
  const dispatch = useAppDispatch();
  const bot = useAppSelector((state) => state.root.bot);
  const navigate = useNavigate();

  const hadnleNavigation = (route: string) => {
    navigate(route);
  };
  return (
    <Header
      className="px-3 xs:px-5 py-[10px] bg-primary"
      logo={
        <div className="flex items-center">
          <img
            src={bot}
            alt="logo"
            className="rounded-full bg-[#E6E6E6] p-1 header-logo"
          />
          <div className="flex flex-col ml-2 overflow-hidden">
            <Text
              type="body"
              size="lg"
              className="font-semibold text-sm xs:text-base"
            >
              Botcy
            </Text>
            <Text
              type="label"
              size="lg"
              className="font-medium text-[.5rem] xs:text-[.625rem] overflow-hidden whitespace-nowrap text-ellipsis"
            >
              Bot Powered E-commerce Platform
            </Text>
          </div>
        </div>
      }
      onSettingsClick={() => {}}
      settingLogo={
        <div className="flex items-center flex-shrink-0 h-full w-max gap-2">
          <img
            src="/images/search.svg"
            alt="search"
            className="header-btn"
            onClick={async () => {
              hadnleNavigation("/search");
            }}
          />
          <img
            src="/images/shopping.svg"
            alt="shopping"
            className="header-btn"
            onClick={() => {
              hadnleNavigation("/cart");
            }}
          />
          <img
            src="/images/logout.svg"
            alt="logout"
            className="header-btn-logout"
            onClick={() => {
              localStorage.clear();
              dispatch(resetHome());
              dispatch(resetBot());
              dispatch(resetRoom());
              hadnleNavigation("/splash");
            }}
          />
        </div>
      }
    />
  );
};

export default HeaderBar;
