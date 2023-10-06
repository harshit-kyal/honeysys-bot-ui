import { RichCard, Text } from "@polynomialai/alpha-react";
import { currentTime } from "../TimeStamp";
import { useEffect } from "react";
import ActionButton from "./ActionButton";
import { getChatData } from "../../slices/homeSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

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
  title="",
  contentArray,
  botIcon,
  actionDataArray,
}: CardProp) => {
  const dispatch = useAppDispatch();
  const convId = useAppSelector((state) => state.bot.convId);
  const botType = useAppSelector((state) => state.bot.botType);
  // const bot = localStorage.getItem("botIcons") || "/public/images/Logo.svg";
  const overallThemeUI = useAppSelector((state) => state.root.overallThemeUI);
  const bot = overallThemeUI.botIcons;
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
        time={currentTime()}
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
    <>
      {actionDataArray && actionDataArray.length !== 0 ? (
        <>
            <div>
          {actionDataArray.map((data: any, index) => (
              <ActionButton
                className="w-full"
                key={index}
                src={data.iconUrl}
                text={data.text}
                onClick={() => {
                  const newData = {
                    conversationId: convId,
                    text: data.value,
                    voiceFlag: false,
                  };
                  dispatch(getChatData({ newData, botType }));
                }}
              />
              ))}
              </div>
        </>
      ) : (
        <RichCard
          title={title}
          time={currentTime()}
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
    </>
  );
};

export default BotMessageCard;
