import { ProductCard, RichCard } from "@polynomialai/alpha-react";
import React from "react";
import { currentTime } from "../TimeStamp";
import { useAppSelector } from "../../app/hooks";
import ActionButton from "./ActionButton";
import { useNavigate } from "react-router-dom";

interface CardProp {
  imageSrc?: string;
  time?: string;
  items?: number;
  price?: number;
}

const CartReplyCard = ({ imageSrc = "", time, items, price }: CardProp) => {
  const Conversations = useAppSelector((state) => state.root.conversationUI);

  const navigate = useNavigate();

  return (
    <>
      <RichCard
        className="bg-primary"
        time={currentTime()}
        timeCN={`font-[${Conversations.timeStampFontStyle}] font-normal text-white`}
      >
        <ProductCard
          addBtn={<React.Fragment />}
          className="gap-0 rounded p-1 mb-1"
          image={
            <img
              src={imageSrc}
              alt=""
              className="h-[60px] w-[60px] rounded-md"
            />
          }
          price={`₹ ${price?.toLocaleString("en-IN")} (estimated total)`}
          title={`🛒 Total ${items} items`}
        />
      </RichCard>
      <ActionButton
        src=""
        text="View Sent Cart"
        className="bg-primary text-white"
        onClick={() => {
          navigate("/cart");
        }}
      />
    </>
  );
};

export default CartReplyCard;
