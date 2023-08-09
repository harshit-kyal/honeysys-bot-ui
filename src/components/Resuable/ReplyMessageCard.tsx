import React from "react";
import { ReplyCard, RichCard } from "@polynomialai/alpha-react";
import { useAppSelector } from "../../app/hooks";

interface CardProp {
  time?: string;
  content?: string;
  replyTitle?: string;
  replyArray: string[];
}

const ReplyMessageCard = ({
  replyTitle = "Honeysys Bot",
  time,
  content,
  replyArray,
}: CardProp) => {
  const Conversations = useAppSelector((state) => state.root.Conversations);

  return (
    <RichCard
      className="bg-primary text-white"
      time={time}
      content={content}
      timeCN={`text-[${Conversations.timestampsize}px]`}
    >
      <ReplyCard title={replyTitle} titleCN="text-primary">
        <div>
          {replyArray.map((item: string) => (
            <p>{item}</p>
          ))}
        </div>
      </ReplyCard>
    </RichCard>
  );
};

export default ReplyMessageCard;
