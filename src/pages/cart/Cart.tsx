import { Button, Text } from "@polynomialai/alpha-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";

const Cart = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen">
      <PageHeader title="Your Cart" isDisableSearch={false} />
      <div
        style={{ height: "calc(100vh - 60px)" }}
        className="flex flex-col justify-center items-center gap-5 px-5"
      >
        <img
          src="/images/Cart.svg"
          alt="shopping"
          width={"100%"}
          onClick={() => {
            navigate("/cart");
          }}
        />
        <div className="text-center">
          <Text type="body" size="lg" className="font-bold">
            There is no item in your cart
          </Text>
          <Text type="body" size="lg" className="mt-2">
            Add products from the catalog to view.
          </Text>
        </div>
        <Button className="!bg-primary w-full text-sm py-[10px]" onClick={()=>{navigate('/catalog')}}>
          View Products
        </Button>
      </div>
    </div>
  );
};

export default Cart;
