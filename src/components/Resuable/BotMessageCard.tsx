import { RichCard, Text } from "@polynomialai/alpha-react";
import { chatTime, currentTime } from "../TimeStamp";
import { useEffect } from "react";
import ActionButton from "./ActionButton";
import { getChatData, setLocationPermission } from "../../slices/homeSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";

interface CardProp {
  children?: JSX.Element;
  imageSrc?: string;
  botIcon?: string | null;
  time?: string;
  title?: string;
  contentArray?: string | (string | JSX.Element)[];
  actionDataArray?: [] | (string | JSX.Element)[];
}

const BotMessageCard = ({
  children,
  imageSrc,
  time,
  title = "",
  contentArray,
  botIcon,
  actionDataArray,
}: CardProp) => {
  const dispatch = useAppDispatch();
  const convId = useAppSelector((state) => state.bot.convId);
  const botType = useAppSelector((state) => state.bot.botType);
  const overallThemeUI = useAppSelector((state) => state.root.overallThemeUI);
  const bot = overallThemeUI.botIcons;
  const navigate = useNavigate();
  // if (actionDataArray && actionDataArray.length !== 0) {
  //   {
  //     actionDataArray.map((data: any, index) => (
  //       <ActionButton
  //         key={index}
  //         src={data.iconUrl}
  //         text="poojan"
  //         onClick={() => {}}
  //       />
  //     ));
  //   }
  // }
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
                key={index}
                src={data.iconUrl}
                text={data.text}
                onClick={() => {
                  if (data.value === "provideLocation") {
                    dispatch(setLocationPermission(true));
                  } else if (data.value === "viewCatalog") {
                    navigate("/catalog");
                  } else if (data.value === "changeLocation") {
                    navigate("/addressDetails");
                  } else {
                    const newData = {
                      conversationId: convId,
                      text: data.value,
                      voiceFlag: false,
                    };
                    dispatch(getChatData({ newData, botType }));
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
