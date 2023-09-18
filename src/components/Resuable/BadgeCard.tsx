import { Badge } from "@polynomialai/alpha-react";

interface CardProp {
  text: string;
  active: boolean;
  borderCn?: string | null;
}

const BadgeCard = ({ text, active, borderCn }: CardProp) => {
  return (
    <Badge
      text={text}
      className={`rounded-quickReplyBorderRadius flex-shrink-0 ${
        active
          ? "bg-primary text-background"
          : "text-primary bg-background border border-primary"
      } ${borderCn}`}
    />
  );
};

export default BadgeCard;
