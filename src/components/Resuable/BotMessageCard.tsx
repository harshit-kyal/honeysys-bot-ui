import { RichCard, Text } from "@polynomialai/alpha-react";
import { useAppSelector } from "../../app/hooks";
import { currentTime } from "../TimeStamp";

interface CardProp {
  children?: JSX.Element;
  imageSrc?: string;
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
}: CardProp) => {
  const bot = useAppSelector((state) => state.root.bot);
  const Conversations = useAppSelector((state) => state.root.Conversations);

  if (imageSrc) {
    return (
      <RichCard
        image={<img src={imageSrc} alt="" style={{ width: "100%" }} />}
        title={title}
        logo={<img src={bot} alt="" />}
        time={currentTime()}
        titleCN="text-[#09215B] text-sm"
        timeCN={`text-[${Conversations.timestampsize}px]`}
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
  }

  return (
    <RichCard
      title={title}
      time={currentTime()}
      titleCN="text-[#09215B] text-sm"
      timeCN={`text-[${Conversations.timestampsize}px]`}
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
