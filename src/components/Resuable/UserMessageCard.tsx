import { RichCard } from "@polynomialai/alpha-react";
import { currentTime } from "../TimeStamp";
import { useAppSelector } from "../../app/hooks";

interface CardProp {
  time?: string;
  content?: string;
}

const UserMessageCard = ({ time, content }: CardProp) => {
  const Conversations = useAppSelector((state) => state.root.conversationUI);

  return (
    <RichCard
      className="bg-primary text-white"
      time={currentTime()}
      content={content}
      contentCN="text-sm mb-2"
      timeCN={`text-white font-[${Conversations.timeStampFontStyle}px]`}
    />
  );
};

export default UserMessageCard;
