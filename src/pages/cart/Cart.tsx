import { Button, CartCard, Text } from "@polynomialai/alpha-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { setCartUI } from "../../slices/rootSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addToCartArray,
  addToOrderList,
  getChatData,
  minusToCartArray,
  setCartTotalAmount,
  setExperienceModal,
  setOrderProduct,
} from "../../slices/homeSlice";
import toast, { Toaster } from "react-hot-toast";
import ExperienceModal from "../../components/Modal/ExperienceModal";
import CartChagedModal from "../../components/Modal/CartChagedModal";
import { ToastPopup } from "../../utils/TosterPopup";

const Cart = () => {
  const convId = useAppSelector((state) => state.bot.convId);
  const botType = useAppSelector((state) => state.bot.botType);
  const storeId = useAppSelector((state) => state.home.storeId);
  const storeData = useAppSelector((state) => state.home.storeData);
  const cartId = useAppSelector((state) => state.home.cartId);
  const userSavedAddress = useAppSelector(
    (state) => state.home.userSavedAddres
  );
  const [functionality, setFunctionality] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const dummy = {
  //   estimatedCost: "₹1200.00",
  //   gst: "₹12.00",
  //   totalAmount: "₹1212.00",
  //   itemList: [
  //     {
  //       imageSrc: "/images/onion.svg",
  //       title: "Fresh Onion (500gm)",
  //       price: "₹60.00",
  //       quantity: 2,
  //     },
  //     {
  //       imageSrc: "/images/onion.svg",
  //       title: "Fresh Onion (500gm)",
  //       price: "₹60.00",
  //       quantity: 1,
  //     },
  //     {
  //       imageSrc: "/images/onion.svg",
  //       title: "Fresh Onion (500gm)",
  //       price: "₹60.00",
  //       quantity: 3,
  //     },
  //     {
  //       imageSrc: "/images/onion.svg",
  //       title: "Fresh Onion (500gm)",
  //       price: "₹60.00",
  //       quantity: 1,
  //     },
  //     {
  //       imageSrc: "/images/onion.svg",
  //       title: "Fresh Onion (500gm)",
  //       price: "₹60.00",
  //       quantity: 3,
  //     },
  //     {
  //       imageSrc: "/images/onion.svg",
  //       title: "Fresh Onion (500gm)",
  //       price: "₹60.00",
  //       quantity: 2,
  //     },
  //   ],
  // };
  const [cartList, setCartList] = useState<any>({});
  const [Loading, setLoading] = useState(false);
  const [amountLoader, setAmountLoader] = useState(false);
  const [Index, setIndex] = useState(-1);
  const error = useAppSelector((state) => state.home.error);
  const cart = useAppSelector((state) => state.home.cart);
  const orderProduct = useAppSelector((state) => state.home.orderProduct);
  const cartData = async () => {
    // setLoading(true);
    setAmountLoader(true);
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
            // setLoading(false);
            setAmountLoader(false);
          }
        })
        .catch((error) => {
          // setLoading(false);
          ToastPopup({ text: "something went wrong" });
          setAmountLoader(false);
        });
    }
  };
  useEffect(() => {
    setLoading(true);
    // const fetchData = async () => {
    //   try {
    //     setLoading(false);
    //     // Promise.all([cartData()]).then((res) => {
    //       //   setLoading(false);
    //       // });
    //   } catch (error) {
    //     setLoading(false);
    //   }
    // };
    !Loading &&
      cartData()
        .then(() => {
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    // fetchData();
  }, []);

  const [debounceTimeout, setDebounceTimeout] = useState<any>(null);
  const handleAddApi = (data: any) => {
    setAmountLoader(true);
    const newData = {
      conversationId: convId,
      text: "addtocart",
      isChatVisible: false,
      voiceFlag: false,
      data: data,
    };
    if (convId && botType && convId !== "" && botType !== "") {
      dispatch(getChatData({ newData, botType }))
        .then((response) => {
          cartData();
          // let cartItem = {
          //   productId: data?.productId,
          //   varientId: data?.varientId,
          //   storeId: storeId,
          //   productVariantIndex: data?.productVariantIndex,
          //   quantity: data?.quantity,
          //   cartId: cartId,
          // };
          console.log(
            "cartItem",
            cart,
            data,
            response?.payload?.data?.activities[0][0]?.value?.data?.message
          );
          if (
            response?.payload?.data?.activities[0][0]?.value?.data?.message ===
            "Product Update Successfully"
          ) {
            if (functionality === "increment") {
              dispatch(addToCartArray(data));
            }
            if (functionality === "decrement") {
              dispatch(minusToCartArray(data));
            }
          }
          // setAmountLoader(false);
        })
        .catch(() => {
          ToastPopup({ text: "something went wrong" });
          // setAmountLoader(false);
        });
    }
  };
  const debounceAddApi = (data: any) => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const timeoutId = setTimeout(() => {
      handleAddApi(data);
    }, 800);
    setDebounceTimeout(timeoutId);
  };
  useEffect(() => {
    if (Index !== -1) {
      let findData = cartList?.cartProduct[Index];
      let changedData = {
        productId: findData?.productId,
        varientId: findData?.variants[0]?._id,
        storeId: storeId,
        productVariantIndex: findData?.variants[0].productVariantIndex,
        quantity: findData?.quantity,
        cartId: cartId,
      };
      debounceAddApi(changedData);
      setIndex(-1);
    }
  }, [Index]);
  const removeApi = (data: any) => {
    clearTimeout(debounceTimeout);
    setAmountLoader(true);
    let newData = {
      conversationId: convId,
      text: "removefromcart",
      isChatVisible: false,
      voiceFlag: false,
      data: data,
    };
    if (convId && botType && convId !== "" && botType !== "") {
      dispatch(getChatData({ newData, botType }))
        .then((response) => {
          cartData();
          // let cartItem = {
          //   productId: data?.productId,
          //   varientId: data?.varientId,
          //   storeId: storeId,
          //   productVariantIndex: data?.productVariantIndex,
          //   quantity: 0,
          //   cartId: cartId,
          // };
          console.log(
            "cartItem",
            cart,
            // cartItem,
            response?.payload?.data?.activities[0][0]?.value?.data?.message
          );
          if (
            response?.payload?.data?.activities[0][0]?.value?.data?.message ===
            "Product deleted successfully"
          ) {
            dispatch(minusToCartArray(data));
          }
          // setAmountLoader(false);
        })
        .catch(() => {
          ToastPopup({ text: "something went wrong" });
          // setAmountLoader(false);
        });
    }
  };
  const cartToastModal = ({ text = "" }: { text: string }) => {
    toast(text, {
      style: {
        padding: " 16px 10px",
        borderRadius: "8px",
        background: "#0a4310",
        color: "#FFF",
      },
    });
  };

  const handleIncrement = (index: number, type: string) => {
    let cartCopy = JSON.parse(JSON.stringify(cartList));
    switch (type) {
      case "increment":
        {
          let qua = cartCopy.cartProduct[index].quantity + 1;
          let minPurchaseLimit =
            cartCopy?.cartProduct[index]?.variants[0]?.minPurchaseLimit;
          let stockBalance =
            cartCopy?.cartProduct[index]?.variants[0]?.stockBalance;
          let purchaseLimit =
            cartCopy?.cartProduct[index]?.variants[0]?.purchaseLimit;
          if (minPurchaseLimit > qua) {
            qua = minPurchaseLimit;
          }
          if (
            stockBalance < qua ||
            (purchaseLimit !== 0 && qua > purchaseLimit)
          ) {
            cartToastModal({ text: "This product stock is limited" });

            return;
          } else {
            setFunctionality("increment");
            // let cartItem = {
            //   productId: cartCopy.cartProduct[index].productId,
            //   varientId: cartCopy.cartProduct[index].variants[0]._id,
            //   storeId: storeId,
            //   productVariantIndex:
            //     cartCopy.cartProduct[index].variants[0].productVariantIndex,
            //   quantity: qua,
            //   cartId: cartId,
            // };
            // dispatch(addToCartArray(cartItem));
            // addApi(cartItem);
            setIndex(index);

            cartCopy.cartProduct[index].quantity = qua;
          }
        }
        break;

      case "decrement":
        {
          let qua = cartCopy.cartProduct[index].quantity - 1;
          let minPurchaseLimit =
            cartCopy?.cartProduct[index]?.variants[0]?.minPurchaseLimit;
          if (minPurchaseLimit > qua) {
            qua = 0;
          }
          setFunctionality("decrement");
          // let cartItem = {
          //   productId: cartCopy.cartProduct[index].variants[0].productId,
          //   varientId: cartCopy.cartProduct[index].variants[0]._id,
          //   storeId: storeId,
          //   productVariantIndex:
          //     cartCopy.cartProduct[index].variants[0].productVariantIndex,
          //   quantity: qua,
          //   cartId: cartId,
          // };
          // dispatch(minusToCartArray(cartItem));
          if (qua >= 1) {
            // addApi(cartItem);
            setIndex(index);
          } else {
            let cartItem = {
              productId: cartCopy.cartProduct[index].variants[0].productId,
              storeId: storeId,
              productVariantIndex:
                cartCopy.cartProduct[index].variants[0].productVariantIndex,
              cartId: cartId,
              varientId: cartCopy.cartProduct[index].variants[0]._id,
              quantity: 0,
            };
            removeApi(cartItem);
          }
          cartCopy.cartProduct[index].quantity = qua;
        }
        break;
    }
    setCartList({ ...cartCopy });
  };
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const cartTemplate: any = searchParams.get("cartTemplate");
    const data = JSON.parse(decodeURIComponent(cartTemplate));
    if (cartTemplate) {
      dispatch(
        setCartUI({
          imageBorderColor: data?.imageBorderColor,
          titleWeight: data?.titleWeight,
          titleColor: data?.titleColor,
          quantityWeight: data?.quantityWeight,
          priceWeight: data?.priceWeight,
          priceSize: data?.priceSize,
          priceColor: data?.priceColor,
        })
      );
    }
  }, [window.location.search]);
  // useEffect(() => {
  //   cartList?.cartProduct?.map((item: any) => {
  //     let orederData = {
  //       productId: item?.productId,
  //       productVariantIndex: item?.productVariantIndex,
  //       quantity: item?.quantity,
  //     };
  //     return dispatch(addToOrderList(orederData));
  //   });
  // }, [cartList]);
  return (
    <div className="h-screen sticky">
      <PageHeader title="Your Cart" isDisableSearch={false} cart={true} />
      {!Loading && !error ? (
        <>
          {cartList?.cartProduct && cartList?.cartProduct?.length > 0 ? (
            <>
              <div className="px-2 min-[264.5px]:pt-[70px] max-[264.5px]:pt-[60px]">
                <div className="flex justify-between items-center">
                  <span className="text-[12px] font-semibold">
                    {`Total ${cartList?.cartProduct?.length} items`}
                  </span>
                  <button
                    className="border-primary border-2 bg-white text-primary rounded-md px-2 py-1 min-[264.5px]:text-[11px] max-[264.5px]:text-[10px] font-medium"
                    onClick={() => {
                      navigate("/catalog");
                    }}
                  >
                    Add More
                  </button>
                </div>
                <div className="max-h-72  overflow-x-hidden overflow-y-scroll mt-4">
                  {cartList?.cartProduct?.map((items: any, index: number) => (
                    <CartCard
                      key={index}
                      className="text-"
                      image={
                        <img
                          src={
                            items?.variants[0]?.images
                              ? items?.variants[0]?.images
                              : ""
                          }
                          className={
                            "border-5 rounded-lg border h-[60px] !w-[60px] object-cover !border-cartImageBorderColor"
                          }
                          alt=""
                        />
                      }
                      price={
                        items?.variants[0]?.price
                          ? items?.variants[0]?.price
                          : ""
                      }
                      quantity={items?.quantity ? items?.quantity : 0}
                      title={items?.productName ? items?.productName : ""}
                      titleCn={"!font-cartTitleWeight !text-cartTitleColor"}
                      priceCn={
                        "!text-cartPriceColor !font-cartPriceWeight"
                        // : "!text-cartPriceColor !font-cartPriceWeight  !text-cartPriceSmallSize  min-[330px]:!text-cartPriceSize"
                      }
                      quantityCn={
                        "!font-cartQuantityWeight  !text-cartQuantitySmallSize  min-[330px]:!text-cartQuantitySize"
                      }
                      addClick={() => handleIncrement(index, "increment")}
                      minusClick={() => handleIncrement(index, "decrement")}
                    />
                  ))}
                </div>
                <hr className="border-1 border-gray-400" />
                <div className="flex justify-between text-[14px] font-semibold leading-6 mt-2">
                  <div>
                    <span>Estimated Total</span>
                    <br />
                    <span>GST</span>
                  </div>
                  <div className="text-end">
                    <span>
                      {amountLoader
                        ? "-"
                        : cartList?.cartCalculation?.totalAmount
                        ? cartList?.cartCalculation?.totalAmount
                        : 0}
                    </span>
                    <br />
                    <span>
                      {" "}
                      {amountLoader
                        ? "-"
                        : cartList?.cartCalculation?.totalTax
                        ? cartList?.cartCalculation?.totalTax
                        : 0}
                    </span>
                  </div>
                </div>
                <hr className="border-1 border-gray-950 mt-2" />
                <div className="flex justify-between text-[14px] font-semibold mt-2">
                  <span>Total Amount</span>
                  <span>
                    {amountLoader
                      ? "-"
                      : (
                          parseFloat(cartList?.cartCalculation?.totalAmount) +
                          parseFloat(cartList?.cartCalculation?.totalTax)
                        ).toFixed(2) || 0}
                  </span>
                </div>
                <div className="min-[264.5px]:text-[12px] max-[264.5px]:text-[11px] text-secondaryFontColor font-light mt-2">
                  By continuing, you agree to share your cart and phone number
                  with the business so it can confirm your order and total price
                  including any tax and discounts.
                </div>
                <div className="flex justify-center align-middle">
                  <button
                    className="bg-primary text-white text-[12px] py-2 font-light max-[500px]:w-[100%] min-[500px]:w-[55%] min-[1024px]:w-[40%] my-3 rounded-md mx-auto"
                    onClick={() => {
                      Object.keys(userSavedAddress).length !== 0
                        ? (() => {
                            dispatch(
                              setCartTotalAmount(
                                (
                                  parseFloat(
                                    cartList?.cartCalculation?.totalAmount
                                  ) +
                                  parseFloat(
                                    cartList?.cartCalculation?.totalTax
                                  )
                                ).toFixed(2)
                              )
                            );
                            navigate("/");
                            let data = cartList?.cartProduct?.map(
                              (item: any) => {
                                let orederData = {
                                  productId: item?.productId,
                                  productVariantIndex:
                                    item?.productVariantIndex,
                                  quantity: item?.quantity,
                                };
                                // console.log("orederData", orederData);
                                // orderList.push(orederData);
                                return orederData;
                              }
                            );
                            {
                              data.length > 0 ? (
                                dispatch(setOrderProduct(data))
                              ) : (
                                <></>
                              );
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
                                ToastPopup({ text: "something went wrong" });
                                console.log("err", error);
                              });
                          })()
                        : dispatch(setExperienceModal(true));
                    }}
                  >
                    Send To Business
                  </button>
                </div>
              </div>
              {amountLoader && (
                <div className="cartLoader">
                  <div className="cartLoader-text">Loading...</div>
                </div>
              )}
            </>
          ) : (
            <>
              <div
                style={{ height: "calc(100vh)" }}
                className="flex flex-col justify-center items-center gap-5 px-5 align-middle mt-2"
              >
                <img
                  src="/images/Cart.svg"
                  alt="shopping"
                  width="autos"
                  onClick={() => {
                    navigate("/cart");
                  }}
                />
                <div className="text-center">
                  <Text type="body" size="lg" className="font-bold">
                    There is no item in your cart
                  </Text>
                  <Text type="body" size="lg" className="mt-2">
                    Add products from the catalog to view.
                  </Text>
                </div>
                <Button
                  className="!bg-primary max-[500px]:w-[90%] min-[500px]:w-[55%] min-[1024px]:w-[40%] text-sm py-[10px]"
                  onClick={() => {
                    navigate("/catalog");
                  }}
                >
                  View Products
                </Button>
              </div>
            </>
          )}
          <ExperienceModal />
          <CartChagedModal />
          {/* <Toaster /> */}
        </>
      ) : Loading && !error ? (
        <>
          <div className="px-2 min-[264.5px]:pt-16 max-[264.5px]:pt-[67px]">
            Loading...
          </div>
        </>
      ) : (
        <div className="px-2 min-[264.5px]:pt-16 max-[264.5px]:pt-[67px]">
          something went wrong
        </div>
      )}
    </div>
  );
};

export default Cart;
