import { OverlayCard, Text } from "@polynomialai/alpha-react";
import React from "react";
import { useAppSelector } from "../../app/hooks";

interface CardProps {
  className?: string;
  title?: string;
  contentTitle?: string;
  content?: string;
  imageSrc: string;
  overlay?: string;
}

const OverlayWrapperCard = ({
  className,
  title,
  contentTitle,
  content,
  imageSrc,
  overlay,
}: CardProps) => {
  const Catalog = useAppSelector((state) => state.root.Catalog);

  return (
    <OverlayCard
      className={className}
      imageSrc={imageSrc}
      overlay={overlay ? overlay : Catalog.categoryTemplate}
      titleCn={title ? "justify-end" : ""}
    >
      <>
        {title ? (
          <span>{title}</span>
        ) : (
          <>
            {contentTitle && (
              <Text className="font-semibold" size="lg" type="title">
                {contentTitle}
              </Text>
            )}
            {content && (
              <span className="px-7 mt-2 text-justify">{content}</span>
            )}
          </>
        )}
      </>
    </OverlayCard>
  );
};

export default OverlayWrapperCard;
