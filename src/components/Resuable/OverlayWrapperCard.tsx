import { OverlayCard, Text } from "@polynomialai/alpha-react";
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
  const Catalog = useAppSelector((state) => state.root.CatalogUI);
  console.log("Catalog.categoryBackDrop", Catalog.categoryBackDrop);
  return (
    <OverlayCard
      className={className}
      image={
        <img src={imageSrc} alt="" className="w-full h-full object-contain" />
      }
      overlay={overlay ? overlay : Catalog.categoryBackDrop}
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
