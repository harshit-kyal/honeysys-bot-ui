import React from "react";
import { Header, Text } from "@polynomialai/alpha-react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

const HeaderBar = () => {
  const bot = useAppSelector((state) => state.root.bot);
  const navigate = useNavigate();

  return (
    <Header
      className="px-5 py-[10px] bg-primary"
      logo={
        <div className="flex items-center">
          <img src={bot} alt="logo" height={40} width={40} className="rounded-full bg-[#E6E6E6] p-1" />
          <div className="flex flex-col ml-2">
            <Text type="body" size="lg" className="font-semibold">
              HoneySys Bot
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
          <img src="/images/search.svg" alt="search" width={24} height={24} />
          <img
            src="/images/shopping.svg"
            alt="shopping"
            width={24}
            height={24}
            onClick={() => {
              navigate("/cart");
            }}
          />
          <img src="/images/option.svg" alt="option" width={24} height={24} />
        </div>
      }
    />
  );
};

export default HeaderBar;
