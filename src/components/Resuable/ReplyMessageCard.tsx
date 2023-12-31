import { ReplyCard, RichCard } from "@polynomialai/alpha-react";
import { useAppSelector } from "../../app/hooks";
import { chatTime, currentTime } from "../TimeStamp";

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
  const Conversations = useAppSelector((state) => state.root.conversationUI);

  return (
    <RichCard
      className="w-full bg-primary text-white"
      time={time ? chatTime(time) : currentTime()}
      content={content}
      timeCN={`font-[${Conversations.timeStampFontStyle}] text-white`}
    >
      <ReplyCard title={replyTitle} titleCN="text-primary">
        <div>
          {replyArray && replyArray.length > 0 ? (
            replyArray.map((item: string, index: number) => (
              <p key={index}>{item}</p>
            ))
          ) : (
            <></>
          )}
        </div>
      </ReplyCard>
    </RichCard>
  );
};

export default ReplyMessageCard;
