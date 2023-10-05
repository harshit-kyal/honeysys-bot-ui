import { Button, CartCard, Text } from "@polynomialai/alpha-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { useDispatch } from "react-redux";
import { setCartUI } from "../../slices/rootSlice";
import { pageData } from "../../api";
import { useAppSelector } from "../../app/hooks";

const Cart = () => {
  const convId = useAppSelector((state) => state.bot.convId);
  const botType = useAppSelector((state) => state.bot.botType);
  const navigate = useNavigate();
  const dummy = {
    estimatedCost: "₹1200.00",
    gst: "₹12.00",
    totalAmount: "₹1212.00",
    itemList: [
      {
        imageSrc: "/images/onion.svg",
        title: "Fresh Onion (500gm)",
        price: "₹60.00",
        quantity: 2,
      },
      {
        imageSrc: "/images/onion.svg",
        title: "Fresh Onion (500gm)",
        price: "₹60.00",
        quantity: 1,
      },
      {
        imageSrc: "/images/onion.svg",
        title: "Fresh Onion (500gm)",
        price: "₹60.00",
        quantity: 3,
      },
      {
        imageSrc: "/images/onion.svg",
        title: "Fresh Onion (500gm)",
        price: "₹60.00",
        quantity: 1,
      },
      {
        imageSrc: "/images/onion.svg",
        title: "Fresh Onion (500gm)",
        price: "₹60.00",
        quantity: 3,
      },
      {
        imageSrc: "/images/onion.svg",
        title: "Fresh Onion (500gm)",
        price: "₹60.00",
        quantity: 2,
      },
    ],
  };
  const [cartList, setCartList] = useState<any>([]);
  const cartData = () => {
    const newData = {
      conversationId: convId,
      text: "viewCart",
      voiceFlag: false,
    };
    if (convId && botType && convId !== "" && botType !== "") {
      pageData(newData, botType)
        .then((data) => {
          if (data && data?.data?.activities[0]?.type === "viewCart") {
            setCartList(data?.data?.activities[0]?.value.data[0]);
          }
        })
        .catch((error) => console.log("error", error));
    }
  };
  useEffect(() => {
    cartData();
  }, []);

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
    setCartList({ ...cartList });
  };
  const dispatch = useDispatch();
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const cartTemplate: any = searchParams.get("cartTemplate");
    const data = JSON.parse(decodeURIComponent(cartTemplate));
    if (cartTemplate) {
      dispatch(
        setCartUI({
          imageBorderColor: data?.imageBorderColor,
          titleWeight: data?.titleWeight,
          titleColor: data?.titleColor,
          quantityWeight: data?.quantityWeight,
          priceWeight: data?.priceWeight,
          priceSize: data?.priceSize,
          priceColor: data?.priceColor,
        })
      );
    }
  }, [window.location.search]);
  return (
    <div className="h-screen sticky">
      <PageHeader title="Your Cart" isDisableSearch={false} />
      {cartList ? (
        <>
          <div className="px-2 min-[264.5px]:pt-16 max-[264.5px]:pt-[67px]">
            <div className="flex justify-between items-center">
              <span className="text-[12px] font-semibold">Total 6 items</span>
              <button
                className="border-primary border-2 bg-white text-primary rounded-md px-2 py-1 min-[264.5px]:text-[11px] max-[264.5px]:text-[10px] font-medium"
                onClick={() => {
                  navigate("/catalog");
                }}
              >
                Add More
              </button>
            </div>
            <div className="max-h-72  overflow-x-hidden overflow-y-scroll mt-4">
              {cartList?.itemList?.map((items: any, index: number) => (
                <CartCard
                  key={index}
                  className="text-"
                  image={
                    <img
                      src={items.imageSrc}
                      className={
                        "border-5 rounded-lg border object-cover !border-cartImageBorderColor h-full"
                      }
                      alt=""
                    />
                  }
                  price={items.price}
                  quantity={items.quantity}
                  title={items.title}
                  titleCn={"!font-cartTitleWeight !text-cartTitleColor"}
                  priceCn={
                    "!text-cartPriceColor !font-cartPriceWeight"
                    // : "!text-cartPriceColor !font-cartPriceWeight  !text-cartPriceSmallSize  min-[330px]:!text-cartPriceSize"
                  }
                  quantityCn={
                    "!font-cartQuantityWeight  !text-cartQuantitySmallSize  min-[330px]:!text-cartQuantitySize"
                  }
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
            <div className="min-[264.5px]:text-[12px] max-[264.5px]:text-[11px] text-secondaryFontColor font-light mt-2">
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
