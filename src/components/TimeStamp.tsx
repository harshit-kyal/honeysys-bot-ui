import { Text } from "@polynomialai/alpha-react";

const TimeStamp = ({ date }: { date: string }) => {
  const now = new Date(date);

  const formattedDate = now
    .toLocaleString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
    .replace(" at", "");

  return (
    <div className="flex justify-center my-[10px]">
      <Text
        type="label"
        size="lg"
        className="text-[#969696] font-medium py-[5px] px-[10px]"
      >
        {formattedDate}
      </Text>
    </div>
  );
};

export default TimeStamp;

export const currentTime = (): string => {
  return new Date().toLocaleString("en-US", {
    hour: "2-digit",
    minute: "numeric",
    hour12: true,
  });
};
