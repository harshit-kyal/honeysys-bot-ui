import { Button } from "@polynomialai/alpha-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getChatData,
  setCartChagedModal,
  setCartTotalAmount,
  setOrderProduct,
} from "../../slices/homeSlice";
const CartChagedModal = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const convId = useAppSelector((state) => state.bot.convId);
  const botType = useAppSelector((state) => state.bot.botType);
  const storeData = useAppSelector((state) => state.home.storeData);
  const cartId = useAppSelector((state) => state.home.cartId);
  const storeId = useAppSelector((state) => state.home.storeId);
  const cartChagedModal = useAppSelector((state) => state.home.cartChagedModal);
  const [cartList, setCartList] = useState<any>({});
  const cartData = async () => {
    const newData = {
      conversationId: convId,
      text: "viewCart",
      voiceFlag: false,
      isChatVisible: false,
      data: {
        storeId: storeId,
      },
    };
    if (convId && botType && convId !== "" && botType !== "") {
      await dispatch(getChatData({ newData, botType }))
        .then((data) => {
          if (
            data &&
            data?.payload?.data?.activities[0][0]?.type === "viewCart"
          ) {
            setCartList(data?.payload?.data?.activities[0][0]?.value.data);
          }
        })
        .catch((error) => {});
    }
  };
  useEffect(() => {
    cartData();
  }, []);
  return (
    <>
      {cartChagedModal ? (
        <>
          <div className="blur"></div>
          <div
            id="loading"
            className="absolute top-[50%] left-[50%] w-[88%] md:w-[50%] lg:w-[40%] bg-white px-5 md:px-7 pb-5 md:pb-7 pt-3 md:pt-5 z-50 blurcss"
            style={{ transform: " translate(-50%, -50%)" }}
          >
            <div className="flex justify-end align-middle">
              <img
                onClick={() => dispatch(setCartChagedModal(false))}
                src="/images/close.svg"
                height="12px"
                width="12px"
              ></img>
            </div>
            <div className="text-center text-sm">
              Your cart is changed.do you want to add in bussiness?
            </div>
            <div className="flex justify-evenly">
              <Button
                className="text-white !bg-primary px-7 text-xs py-2 mt-2"
                onClick={() => {
                  dispatch(setCartChagedModal(false));
                  navigate("/");
                }}
              >
                NO
              </Button>
              <Button
                className="text-white !bg-primary px-7 text-xs py-2 mt-2"
                onClick={() => {
                  (() => {
                    dispatch(
                      setCartTotalAmount(
                        parseInt(cartList?.cartCalculation?.totalAmount) +
                          parseInt(cartList?.cartCalculation?.totalTax)
                      )
                    );
                    navigate("/");
                    let data = cartList?.cartProduct?.map((item: any) => {
                      let orederData = {
                        productId: item?.productId,
                        productVariantIndex: item?.productVariantIndex,
                        quantity: item?.quantity,
                      };
                      // console.log("orederData", orederData);
                      // orderList.push(orederData);
                      return orederData;
                    });
                    {
                      data.length > 0 ? dispatch(setOrderProduct(data)) : <></>;
                    }
                    const newData = {
                      conversationId: convId,
                      text: "cartAction",
                      voiceFlag: false,
                      isChatVisible: false,
                      data: {
                        deliveryType: ["Normal", "Express"],
                        location: storeData?.location?.pincode,
                        lat: storeData?.location?.latitude,
                        lag: storeData?.location?.longitude,
                        storeId: storeData?.id,
                        cartId: cartId,
                      },
                    };
                    dispatch(getChatData({ newData, botType }))
                      .then(() => {})
                      .catch((error) => {
                        console.log("err", error);
                      });
                  })();
                  dispatch(setCartChagedModal(false));
                  navigate("/");
                }}
              >
                Yes
              </Button>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default CartChagedModal;
