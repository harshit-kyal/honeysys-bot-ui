import { Header, Text } from "@polynomialai/alpha-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { resetRoom } from "../../slices/rootSlice";
import { resetHome } from "../../slices/homeSlice";
import { resetBot } from "../../slices/botSlice";

const HeaderBar = () => {
  const dispatch = useAppDispatch();
  const bot = useAppSelector((state) => state.root.bot);
  const navigate = useNavigate();

  const hadnleNavigation = (route: string) => {
    navigate(route);
  };
  return (
    <Header
      className="px-5 py-[10px] bg-primary"
      logo={
        <div className="flex items-center">
          <img
            src={bot}
            alt="logo"
            height={40}
            width={40}
            className="rounded-full bg-[#E6E6E6] p-1"
          />
          <div className="flex flex-col ml-2">
            <Text type="body" size="lg" className="font-semibold">
              Botcy
            </Text>
            <Text type="label" size="lg" className="font-medium">
              Bot Powered E-commerce Platform
            </Text>
          </div>
        </div>
      }
      onSettingsClick={() => {}}
      settingLogo={
        <div className="flex flex-shrink-0 h-full w-max gap-2">
          <img
            src="/images/search.svg"
            alt="search"
            width={24}
            height={24}
            onClick={async () => {
              hadnleNavigation("/search");
            }}
          />
          <img
            src="/images/shopping.svg"
            alt="shopping"
            width={24}
            height={24}
            onClick={() => {
              hadnleNavigation("/cart");
            }}
          />
          <img
            src="/images/logout.svg"
            alt="logout"
            width={20}
            height={20}
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
