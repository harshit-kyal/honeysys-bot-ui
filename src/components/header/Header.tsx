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
      className="max-[350px]:px-3 min-[350px]:px-5 py-[10px] bg-primary"
      logo={
        <div className="flex items-center">
          <img
            src={bot}
            alt="logo"
            className="rounded-full bg-[#E6E6E6] p-1 header-logo"
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
            className="header-btn-logout "
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
