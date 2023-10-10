import { Text } from "@polynomialai/alpha-react";

const ActionButton = ({
  src,
  text,
  onClick,
  className,
}: {
  src?: string;
  text: string;
  onClick: () => void;
  className?: string;
}) => {
  return (
    <button
      className={`w-full flex justify-center items-center gap-1 bg-background rounded-actionButtonBorder border border-primary py-[10px] mt-[2px] ${className}`}
      onClick={onClick}
    >
      {src && (
        <img src={src} alt="" height={20} style={{ objectFit: "contain" }} />
      )}
      <Text type="body" size="md" className="font-normal flex-shrink-0">
        {text}
      </Text>
    </button>
  );
};

export default ActionButton;
