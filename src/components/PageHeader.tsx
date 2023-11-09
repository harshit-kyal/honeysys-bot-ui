import { Text } from "@polynomialai/alpha-react";
import { useNavigate } from "react-router-dom";
import "../styles/header.css";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getChatData, resetHome, setCartChagedModal } from "../slices/homeSlice";
import { resetBot } from "../slices/botSlice";
import { resetRoot } from "../slices/rootSlice";
import { boolean } from "yargs";
import { useState } from "react";
import CartChagedModal from "./Modal/CartChagedModal";
import { ToastPopup } from "../utils/TosterPopup";
const PageHeader = ({
  title,
  isDisableSearch = false,
  cart,
}: {
  title: string;
  isDisableSearch?: boolean;
  cart?: boolean;
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const hadnleNavigation = (route: string) => {
    navigate(route);
  };
  const reviewToken = localStorage.getItem("reviewToken");
  const cartQuantity = useAppSelector((state) => state.home.totalQuantity);
  const cartData = useAppSelector((state) => state.home.cart);
  const orderProduct = useAppSelector((state) => state.home.orderProduct);
  const convId = useAppSelector((state) => state.bot.convId);
  const botType = useAppSelector((state) => state.bot.botType);
  // const cartChangeHandler=()=>{
  //   const newData = {
  //     conversationId: convId,
  //     text: "viewCart",
  //     voiceFlag: false,
  //     isChatVisible: false,

  //   };
  //   if (convId && botType && convId !== "" && botType !== "") {
  //      dispatch(getChatData({ newData, botType }))
  //       .then((data) => {
  //         if (
  //           data &&
  //           data?.payload?.data?.activities[0][0]?.type === "viewCart"
  //         ) {
  //         }
  //       })
  //       .catch((error) => {
  //         ToastPopup({ text: "something went wrong" });
  //         console.log("err", error);
  //       });
  //   }
  // }
  const cartHandler = () => {
    if (!reviewToken) {
      if (cart) {
        if (orderProduct.length > 0 && cartData.length > 0) {
          if (cartData.length === orderProduct.length) {
            let valid = true;
            cartData.forEach((item, index) => {
              if (
                item?.productId === orderProduct[index]?.productId &&
                item?.productVariantIndex ===
                  orderProduct[index]?.productVariantIndex &&
                item?.quantity === orderProduct[index]?.quantity
              ) {
                valid = false;
                // break;
              } else {
                valid = true;
              }
            });
            if (valid) {
              dispatch(setCartChagedModal(true));
            } else {
              navigate(-1);
            }
          } else {
            dispatch(setCartChagedModal(true));
          }
        } else {
          navigate(-1);
        }
      } else {
        navigate(-1);
      }
    }
  };

  return (
    <div className="fixed top-0 w-full z-50">
      <div className="bg-primary flex items-center justify-between gap-3 max-[350px]:px-2 min-[350px]:px-4 py-[16.5px]">
        <div
          className="flex "
          onClick={() => {
            cartHandler();
          }}
        >
          <img
            src="/images/white_back.svg"
            className="cursor-pointer"
            alt="back"
            height={24}
            width={24}
          />
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
                navigate("/cart");
                // hadnleNavigation("/cart");
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
      </div>
    </div>
  );
};

export default PageHeader;
