import React from "react";
import { CustomButton } from "../types";

const Button = ({
  title,
  containerStyles,
  textStyles,
  handleClick,
  btnType }: CustomButton) => {
  return (
      <button
          type={'button' || btnType}
          className={`${containerStyles}`}
          onClick={handleClick}>
          <span className={`${textStyles} flex`}>
              <span className="mt-1">{title}</span>
              <img src='/images/arrow_circle_right.svg' alt='right' width={30} height={30} className='ml-2'></img>
          </span>
      </button>
  );
};

export default Button;
