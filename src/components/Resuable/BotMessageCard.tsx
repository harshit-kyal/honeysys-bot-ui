import { RichCard, Text } from "@polynomialai/alpha-react";
import { chatTime, currentTime } from "../TimeStamp";
import ActionButton from "./ActionButton";
import {
  addToChatArray,
  getChatData,
  setDeliveryDate,
  setDeliveryType,
  setEndTime,
  setLocationPermission,
  setStartTime,
} from "../../slices/homeSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
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
  const overallThemeUI = useAppSelector((state) => state.root.overallThemeUI);
  const cartTotalAmount = useAppSelector((state) => state.home.cartTotalAmount);
  const bot = overallThemeUI.botIcons;
  const navigate = useNavigate();
  const cartData = useAppSelector((state) => state.home.storeData);
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
                  if (flag) {
                    console.log("change",data?.value)
                    if (data?.value === "provideLocation") {
                      dispatch(setLocationPermission(true));
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
                      if (data?.deliveryType) {
                        dispatch(setEndTime(data?.endTime));
                      }
                      if (buttonContent && buttonContent.length > 0) {
                        const replyCard = [
                          {
                            type: "replyMessage",

                            value: {
                              data: [
                                {
                                  content: data?.text,
                                  replayArray: buttonContent,
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
                        text: data.value,
                        voiceFlag: false,
                        isChatVisible: false,
                        sourceAction: true,
                        content: data?.text,
                        replayArray: buttonContent,
                        data: {
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
                        .then((dat) => console.log("data", dat))
                        .catch((err) => console.log("err", err));
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
    </div>
  );
};

export default BotMessageCard;
