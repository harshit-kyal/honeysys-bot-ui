import React from "react";
import { Text } from "@polynomialai/alpha-react";

const ActionButton = ({
  src,
  text,
  onClick,
}: {
  src?: string;
  text: string;
  onClick: () => void;
}) => {
  return (
    <button
      className="w-full flex justify-center items-center gap-1 rounded border border-primary py-[10px] mt-[2px]"
      onClick={onClick}
    >
      <img src={src} alt="" height={20} style={{objectFit: 'contain'}} />
      <Text type="body" size="md" className="font-normal">
        {text}
      </Text>
    </button>
  );
};

export default ActionButton;
