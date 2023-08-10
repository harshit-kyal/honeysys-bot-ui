import { Text } from "@polynomialai/alpha-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const PageHeader = ({
  title,
  isDisableSearch = false,
}: {
  title: string;
  isDisableSearch?: boolean;
}) => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 w-full z-50">
      <div className="bg-primary flex items-center justify-between gap-3 px-5 py-2 h-[60px]">
        <div
          className="flex  "
          onClick={() => {
            navigate(-1);
          }}
        >
          <img src="/images/white_back.svg" alt="back" height={24} width={24} />
          <Text type="body" size="lg" className="inline-block text-white ml-2">
            <div
              className="whitespace-nowrap text-ellipsis overflow-hidden"
              style={{width: 'calc(100vw - 172px)'}}
            >
              {title}
            </div>
          </Text>
        </div>
        <div className="flex flex-shrink-0 h-full w-max gap-2">
          {isDisableSearch ? (
            <></>
          ) : (
            <img src="/images/search.svg" alt="search" width={24} height={24} />
          )}
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
      </div>
    </div>
  );
};

export default PageHeader;
