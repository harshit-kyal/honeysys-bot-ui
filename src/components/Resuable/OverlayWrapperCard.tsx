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
  return (
    <OverlayCard
      className={className}
      image={
        <img src={imageSrc} alt="" className="w-full h-full" />
      }
      overlay={ Catalog.categoryBackDrop}
      titleCn={title ? "justify-end" : ""}
    >
      <>
        {title ? (
          <span>{title}</span>
        ) : (
          <>
            {contentTitle && (
              <div className="font-semibold text-2xl sm:text-3xl md:text-5xl">
                {contentTitle}
              </div>
            )}
            {content && (
              <span className="px-7 mt-2 text-center text-sm sm:text-lg md:text-xl">{content}</span>
            )}
          </>
        )}
      </>
    </OverlayCard>
  );
};

export default OverlayWrapperCard;
