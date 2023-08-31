import { Button, CartCard, Text } from "@polynomialai/alpha-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";

const Cart = () => {
  const navigate = useNavigate();
  const [cartList, setCartListValue] = useState({
    estimatedCost: "₹1200.00",
    gst: "₹12.00",
    totalAmount: "₹1212.00",
    itemList: [
      {
        imageSrc: "/images/vegetables.svg",
        title: "Fresh Onion (500gm)",
        price: "₹60.00",
        quantity: 2,
      },
      {
        imageSrc: "/images/vegetables.svg",
        title: "Fresh Onion (500gm)",
        price: "₹60.00",
        quantity: 1,
      },
      {
        imageSrc: "/images/vegetables.svg",
        title: "Fresh Onion (500gm)",
        price: "₹60.00",
        quantity: 3,
      },
      {
        imageSrc: "/images/vegetables.svg",
        title: "Fresh Onion (500gm)",
        price: "₹60.00",
        quantity: 1,
      },
      {
        imageSrc: "/images/vegetables.svg",
        title: "Fresh Onion (500gm)",
        price: "₹60.00",
        quantity: 3,
      },
      {
        imageSrc: "/images/vegetables.svg",
        title: "Fresh Onion (500gm)",
        price: "₹60.00",
        quantity: 2,
      },
    ],
  });

  const handleIncrement = (index: number, type: string) => {
    switch (type) {
      case "increment":
        cartList.itemList[index].quantity += 1;
        break;

      case "decrement":
        if (cartList.itemList[index].quantity !== 0) {
          cartList.itemList[index].quantity -= 1;
        }
        break;
    }
    setCartListValue({ ...cartList });
  };
  return (
    <div className="h-screen sticky">
      <PageHeader title="Your Cart" isDisableSearch={false} />
      {cartList ? (
        <>
          <div className="px-2 pt-20">
            <div className="flex justify-between items-center">
              <span className="text-[12px] font-semibold">Total 6 items</span>
              <button
                className="border-primary border-2 bg-white text-primary rounded-md px-2 py-1 text-[11px] font-medium"
                onClick={() => {
                  navigate("/catalog");
                }}
              >
                Add More
              </button>
            </div>
            <div className="max-h-72 h-72 overflow-x-hidden overflow-y-scroll mt-4">
              {cartList.itemList.map((items: any, index: number) => (
                <CartCard
                  key={index}
                  className=""
                  image={
                    <img
                      src={items.imageSrc}
                      className="border-1 border-[#09215B]"
                      alt=""
                    />
                  }
                  price={items.price}
                  quantity={items.quantity}
                  title={items.title}
                  titleCn="font-normal text-[#505050] text-[12px]"
                  addClick={() => handleIncrement(index, "increment")}
                  minusClick={() => handleIncrement(index, "decrement")}
                />
              ))}
            </div>
            <hr className="border-1 border-gray-400" />
            <div className="flex justify-between text-[14px] font-semibold leading-6 mt-2">
              <div>
                <span>Estimated Total</span>
                <br />
                <span>GST</span>
              </div>
              <div className="text-end">
                <span>{cartList.estimatedCost}</span>
                <br />
                <span>{cartList.gst}</span>
              </div>
            </div>
            <hr className="border-1 border-gray-950 mt-2" />
            <div className="flex justify-between text-[14px] font-semibold mt-2">
              <span>Total Amount</span>
              <span>{cartList.totalAmount}</span>
            </div>
            <div className="text-[12px] text-secondaryFontColor font-light mt-2">
              By continuing, you agree to share your cart and phone number with
              the business so it can confirm your order and total price
              including any tax and discounts.
            </div>
            <button
              className="bg-primary text-white text-[12px] py-2 font-light w-full my-3 rounded-md"
              onClick={() => {
                navigate("/catalog");
              }}
            >
              Send To Business
            </button>
          </div>
        </>
      ) : (
        <>
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
            <Button
              className="!bg-primary w-full text-sm py-[10px]"
              onClick={() => {
                navigate("/catalog");
              }}
            >
              View Products
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
