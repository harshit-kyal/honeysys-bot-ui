import { RichCard } from "@polynomialai/alpha-react";
import { currentTime } from "../TimeStamp";
import { useAppSelector } from "../../app/hooks";

interface CardProp {
  time?: string;
  content?: string;
}

const UserMessageCard = ({ time, content }: CardProp) => {
  const Conversations = useAppSelector((state) => state.root.Conversations);

  return (
    <RichCard
      className="bg-primary text-white"
      time={currentTime()}
      content={content}
      contentCN="text-sm"
      timeCN={`text-white text-[${Conversations.timestampsize}px]`}
    />
  );
};

export default UserMessageCard;
