import { Badge } from "@polynomialai/alpha-react";
import { useAppSelector } from "../../app/hooks";

interface CardProp {
  text: string;
  active: boolean;
  borderCn?: string | null;
}

const BadgeCard = ({ text, active, borderCn }: CardProp) => {
  const categorySectionTemplate = useAppSelector(
    (state) => state.root.Categories.categorySectionTemplate
  );
  console.log("radius", borderCn);
  return (
    <Badge
      text={text}
      className={
        borderCn && borderCn != undefined
          ? `${categorySectionTemplate} flex-shrink-0 ${
              active
                ? "bg-primary text-background"
                : "text-primary bg-background border border-primary"
            } ] ${borderCn}`
          : `${categorySectionTemplate} flex-shrink-0 ${
              active
                ? "bg-primary text-background"
                : "text-primary bg-background border border-primary"
            } ]`
      }
    />
  );
};

export default BadgeCard;
