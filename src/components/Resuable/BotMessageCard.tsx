import { RichCard, Text } from "@polynomialai/alpha-react";
import { chatTime, currentTime } from "../TimeStamp";
import ActionButton from "./ActionButton";
import {
  addToChatArray,
  getChatData,
  setCart,
  setDeliveryDate,
  setDeliveryType,
  setEndTime,
  setLocationPermission,
  setOrderProduct,
  setSlotIndex,
  setStartTime,
  setTotalQuantity,
} from "../../slices/homeSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { ToastPopup } from "../../utils/TosterPopup";
interface CardProp {
  children?: JSX.Element;
  imageSrc?: string;
  botIcon?: string | null;
  time?: string;
  title?: string;
  buttonContent?: [];
  contentArray?: string | (string | JSX.Element)[];
  actionDataArray?: [] | (string | JSX.Element)[];
  flag?: boolean;
}

const BotMessageCard = ({
  children,
  imageSrc,
  time,
  title = "",
  contentArray,
  botIcon,
  actionDataArray,
  buttonContent,
  flag,
}: CardProp) => {
  const dispatch = useAppDispatch();
  const convId = useAppSelector((state) => state.bot.convId);
  const botType = useAppSelector((state) => state.bot.botType);
  const Error = useAppSelector((state) => state.home.error);
  const overallThemeUI = useAppSelector((state) => state.root.overallThemeUI);
  const cartTotalAmount = useAppSelector((state) => state.home.cartTotalAmount);
  const bot = overallThemeUI.botIcons;
  const navigate = useNavigate();
  const cartData = useAppSelector((state) => state.home.storeData);
  const storeId = useAppSelector((state) => state.home.storeId);
  const cartId = useAppSelector((state) => state.home.cartId);
  const mobileNumber = useAppSelector((state) => state.home.mobileNo);
  const deliveryDate = useAppSelector((state) => state.home.deliveryDate);
  const deliveryType = useAppSelector((state) => state.home.deliveryType);
  const orderProduct = useAppSelector((state) => state.home.orderProduct);
  const startTime = useAppSelector((state) => state.home.startTime);
  const slotIndex = useAppSelector((state) => state.home.slotIndex);
  const endTime = useAppSelector((state) => state.home.endTime);

  if (imageSrc) {
    return (
      <RichCard
        image={<img src={imageSrc} alt="" style={{ width: "100%" }} />}
        title={title}
        logo={<img src={botIcon ? botIcon : bot} alt="" />}
        time={time ? chatTime(time) : currentTime()}
        titleCN="text-primary text-sm"
        contentCN={"!font-conversationFontStyle"}
        timeCN={"!font-timeStampFontStyle"}
      >
        <div className="my-2">
          {contentArray && typeof contentArray === "string" ? (
            <Text
              type="body"
              size="md"
              className="font-conversationFontStyle text-black mb-1"
            >
              {contentArray}
            </Text>
          ) : Array.isArray(contentArray) ? (
            contentArray.map((item, index: number) => (
              <Text
                key={index}
                type="body"
                size="md"
                className="font-conversationFontStyle text-black mb-1"
              >
                {item}
              </Text>
            ))
          ) : null}
        </div>
      </RichCard>
    );
  }
  //razorpay
  const loadScript = (src: any) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  const botToastModal = ({ text = "" }: { text: string }) => {
    toast(text, {
      style: {
        padding: " 16px 10px",
        borderRadius: "8px",
        background: "#0a4310",
        color: "#FFF",
      },
    });
  };
  const displayRazorpay = async (paymentDetails: any) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      botToastModal({ text: "you are offline" });
    }
    const option = {
      key: paymentDetails?.key,
      currency: paymentDetails?.currency,
      amount: paymentDetails?.amount,
      name: "Honeysys",
      describe: "Thanks for purchasing",
      image:
        "https://res.cloudinary.com/dqbub4vtj/image/upload/v1695378166/ltvgaegj6h43iqfssjcr.jpg",
      handler: function (response: any) {
        botToastModal({ text: "successful" });
      },
      prefill: {
        name: "Honeysys",
      },
    };
    const paymentObject = new (window as any).Razorpay(option);
    paymentObject.open();
  };

  return (
    <div>
      {actionDataArray && actionDataArray.length !== 0 ? (
        <>
          <div className="flex flex-wrap">
            {actionDataArray.map((data: any, index) => (
              <ActionButton
                // className="w-full"
                className={`flex-grow flex-shrink-0 py-[10x] px-[36px] ${
                  data.text.length < 10 ? "basis-1/2" : "basis-full"
                }`}
                flag={flag}
                key={index}
                src={data?.iconUrl}
                text={data?.text}
                onClick={() => {
                  console.log("data", data, endTime);
                  if (flag) {
                    if (data?.value === "provideLocation") {
                      const newData = {
                        conversationId: convId,
                        isChatVisible: false,
                        text: "getAddress",
                        voiceFlag: false,
                        data: {
                          storeId: storeId,
                        },
                      };
                      dispatch(getChatData({ newData, botType }))
                        .then((res) => {
                          if (
                            res?.payload?.data?.activities[0][0]?.value?.data
                              ?.length !== 0
                          ) {
                            navigate("/addressDetails");
                          } else {
                            navigate("/address");
                          }
                        })
                        .catch((error) => {
                          ToastPopup({ text: "something went wrong" });
                          console.log("err", error);
                        });
                      // dispatch(setLocationPermission(true));
                    } else if (data?.value === "viewCatalog") {
                      navigate("/catalog");
                    } else if (data?.value === "changeLocation") {
                      navigate("/addressDetails");
                    } else {
                      if (data?.date) {
                        dispatch(setDeliveryDate(data?.date));
                      }
                      if (data?.deliveryType) {
                        dispatch(setDeliveryType(data?.deliveryType));
                      }
                      if (data?.startTime) {
                        dispatch(setStartTime(data?.startTime));
                      }
                      if (data?.endTime) {
                        console.log("data", data);
                        dispatch(setEndTime(data?.endTime));
                      }
                      if (data?.slotIndex) {
                        dispatch(setSlotIndex(data?.slotIndex));
                      }
                      if (buttonContent && buttonContent.length > 0) {
                        const replyCard = [
                          {
                            type: "replyMessage",

                            value: {
                              data: [
                                {
                                  content: data?.text,
                                  replyArray: buttonContent,
                                },
                              ],
                              sender: "user",
                              status: "Talking with Bot",
                            },
                            timestamp: new Date(),
                          },
                        ];

                        dispatch(addToChatArray(replyCard));
                      }
                      const newData = {
                        conversationId: convId,
                        text: data?.value,
                        voiceFlag: false,
                        isChatVisible: false,
                        sourceAction: true,
                        content: data?.text,
                        replyArray: buttonContent,

                        data: {
                          paymentMethod:
                            data?.text === "Pay online"
                              ? "Pay Online"
                              : data?.text === "Cash on delivery"
                              ? "Pay on Delivery"
                              : "",
                          lat: cartData?.location?.latitude,
                          lag: cartData?.location?.longitude,
                          location: cartData?.location?.pincode,
                          deliveryType: deliveryType
                            ? deliveryType
                            : data?.deliveryType
                            ? data?.deliveryType
                            : ["Normal", "Express"],
                          slotIndex: slotIndex
                            ? slotIndex
                            : data?.slotIndex
                            ? data?.slotIndex
                            : "",
                          storeId: cartData?.id,
                          cartId: cartId,
                          totalAmount: cartTotalAmount,
                          startTime: startTime
                            ? startTime
                            : data?.startTime
                            ? data?.startTime
                            : "",
                          endTime: endTime
                            ? endTime
                            : data?.endTime
                            ? data?.endTime
                            : "",
                          deliveryDate: deliveryDate
                            ? deliveryDate
                            : data?.date
                            ? data?.date
                            : "",
                          mobileNumber: mobileNumber,
                          appliedPromoCode: false,
                          orderProduct: orderProduct,
                        },
                      };
                      dispatch(getChatData({ newData, botType }))
                        .then((response) => {
                          if (data?.text === "Pay online") {
                            let paymentCard =
                              response?.payload?.data?.activities[0][0];
                            if (data && paymentCard?.type === "paymentCard") {
                              const paymentContent: any =
                                paymentCard?.value?.data[0];
                              if (paymentContent) {
                                if (paymentContent?.isOrderPlaced === true) {
                                  dispatch(setCart([]));
                                  dispatch(setOrderProduct([]));
                                  dispatch(setTotalQuantity(0));
                                }
                                if (
                                  paymentContent?.onlinePaymentDetails &&
                                  paymentContent?.secretKey
                                ) {
                                  let paymentDetails = {
                                    key: paymentContent?.secretKey,
                                    currency:
                                      paymentContent?.onlinePaymentDetails
                                        ?.currency,
                                    amount:
                                      paymentContent?.onlinePaymentDetails
                                        ?.amount,
                                  };
                                  displayRazorpay(paymentDetails);
                                }
                              } else {
                                ToastPopup({ text: "something went wrong" });
                              }
                            }
                          }
                          if (data?.text === "Pay on delivery") {
                            let paymentCard =
                              response?.payload?.data?.activities[0][0];
                            if (data && paymentCard?.type === "paymentCard") {
                              const paymentContent: any =
                                paymentCard?.value?.data[0];
                              if (paymentContent?.isOrderPlaced === true) {
                                dispatch(setCart([]));
                                dispatch(setOrderProduct([]));
                                dispatch(setTotalQuantity(0));
                              }
                            }
                          }
                        })
                        .catch((err) => {
                          ToastPopup({ text: "something went wrong" });
                          console.log("err", err);
                        });
                    }
                  }
                }}
              />
            ))}
          </div>
        </>
      ) : (
        <RichCard
          title={title}
          time={time ? chatTime(time) : currentTime()}
          titleCN="text-primary text-sm"
          contentCN={"!font-conversationFontStyle"}
          timeCN={"!font-timeStampFontStyle"}
        >
          <div className="my-2 w-full">
            {contentArray && typeof contentArray === "string" ? (
              <Text type="body" size="md" className="font-normal mb-1">
                {contentArray}
              </Text>
            ) : Array.isArray(contentArray) ? (
              contentArray.map((item, index: number) => (
                <Text
                  key={index}
                  type="body"
                  size="md"
                  className="font-normal mb-1"
                >
                  {item}
                </Text>
              ))
            ) : null}
          </div>
        </RichCard>
      )}
      {/* <Toaster /> */}
    </div>
  );
};

export default BotMessageCard;
