import { Badge } from "@polynomialai/alpha-react";
import React from "react";
import { useAppSelector } from "../../app/hooks";

interface CardProp {
  text: string;
  active: boolean;
}

const BadgeCard = ({ text, active }: CardProp) => {
  const categorySectionTemplate = useAppSelector(
    (state) => state.root.Categories.categorySectionTemplate
  );

  return (
    <Badge
      text={text}
      className={`${categorySectionTemplate} ${
        active ? "bg-primary text-background" : "text-primary bg-background border border-primary"
      }`}
    />
  );
};

export default BadgeCard;
