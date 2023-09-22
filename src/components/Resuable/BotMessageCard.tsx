import { RichCard, Text } from "@polynomialai/alpha-react";
import { currentTime } from "../TimeStamp";
import { useEffect } from "react";

interface CardProp {
  children?: JSX.Element;
  imageSrc?: string;
  botIcon?: string | null;
  time?: string;
  title?: string;
  contentArray?: string | (string | JSX.Element)[];
}

const BotMessageCard = ({
  children,
  imageSrc,
  time,
  title,
  contentArray,
  botIcon,
}: CardProp) => {
  const bot = localStorage.getItem("botIcons") || "/public/images/Logo.svg";
  if (imageSrc) {
    return (
      <RichCard
        image={<img src={imageSrc} alt="" style={{ width: "100%" }} />}
        title={title}
        logo={<img src={bot} alt="" />}
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
    <RichCard
      title={title}
      time={currentTime()}
      titleCN="text-primary text-sm"
      contentCN={"!font-conversationFontStyle"}
      timeCN={"!font-timeStampFontStyle"}
    >
      <div className="my-2">
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
  );
};

export default BotMessageCard;
