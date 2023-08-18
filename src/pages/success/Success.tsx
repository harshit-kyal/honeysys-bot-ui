import React from "react";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen px-5 py-5">
      <div className="flex justify-center w-full">
        <img src="/images/happy_sun.svg" alt="happy_sun_image" />
      </div>
      <div className="text-center my-6 text-2xl font-semibold">
        <div className="text-primary">Congratulations!</div>
        <div>Your account has been</div>
        <div>successfully created</div>
      </div>
      <div className="px-5 text-sm font-normal flex text-justify justify-center">
        Our intuitive platform ensures that you find exactly what you're looking
        for, making your shopping experience delightful and efficient.
      </div>
      <div className="flex justify-center mt-5">
        <Button
          title="Let's Go"
          handleClick={() => {
            navigate("/");
          }}
        />
      </div>
    </div>
  );
};

export default Success;
