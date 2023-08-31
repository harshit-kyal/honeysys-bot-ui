import { CustomButton } from "../../types";

const Button = ({ title, handleClick, btnType }: CustomButton) => {
  return (
    <button
      type={btnType || "button"}
      className="flex !bg-primary text-background px-6 py-2 rounded-3xl"
      onClick={handleClick}
    >
      <span className="text-white text-[14px] flex">
        <span className="mt-1">{title}</span>
        <img
          src="/images/arrow_circle_right.svg"
          alt="right"
          width={30}
          height={30}
          className="ml-2"
        ></img>
      </span>
    </button>
  );
};

export default Button;
