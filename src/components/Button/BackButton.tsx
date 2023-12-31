import { useNavigate } from "react-router";

const BackButton = (noTitle?:any) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex h-20 pt-4"
      onClick={() => {
        navigate(-1);
      }}
    >
      <div className="flex items-center h-min cursor-pointer">
        <img
          src="/images/keyboard_backspace.svg"
          alt="back"
          className="cursor-pointer"
          color="black"
          height={24}
          width={24}
        />
        {!noTitle && <span className="text-sm font-[400] ms-2">Back</span>}
      </div>
    </div>
  );
};

export default BackButton;
