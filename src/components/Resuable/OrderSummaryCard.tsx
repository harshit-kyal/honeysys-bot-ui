import BotMessageCard from "./BotMessageCard";
import {
  ReplyCard,
  RichCard,
  SummaryCard,
  Text,
} from "@polynomialai/alpha-react";
import ActionButton from "./ActionButton";
import ChatWrapper from "../ChatWrapper";
import ReplyMessageCard from "./ReplyMessageCard";
import { useEffect, useState } from "react";

const OrderSummaryCard = ({
  handleTrackMyOrder,
  setChatArray,
}: {
  handleTrackMyOrder: any;
  setChatArray: any;
}) => {
  const [radius, setRadius] = useState<string | null>("");
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const borderRadius = searchParams.get("radius");
    setRadius(borderRadius);
  }, []);

  const ThankYouCard = () => (
    <ChatWrapper type="bot">
      <div className="flex flex-col max-w-[80%] sm:w-[50%] md:w-[40%]">
        <BotMessageCard
          contentArray={[
            "Thank you for your valuable feedback. We are improving ourselves day by day.",
          ]}
        ></BotMessageCard>
        <ActionButton
          radius={radius}
          text="Track Your Orders"
          onClick={() => {
            handleTrackMyOrder();
          }}
        />
        <ActionButton
          text="Track My Refunds"
          radius={radius}
          onClick={() => {
            handleTrackMyOrder();
          }}
        />
      </div>
    </ChatWrapper>
  );

  return (
    <>
      <BotMessageCard
        title=""
        contentArray={[
          "Great! The total payable amount for this order is. 👇",
          <SummaryCard
            className="w-full mt-3"
            image={
              <img
                src="/images/onion.svg"
                alt=""
                className="h-[60px] w-[60px] rounded-md"
              />
            }
            priceList={[
              {
                price: "₹ 316.00",
                title: "Estimated Price",
              },
              {
                price: "₹ 20.00",
                title: "Delivery Charges",
              },
              {
                price: "₹ 18.00",
                title: "GST Applied (12%)",
              },
              {
                price: "-₹ 40.00",
                title: "Coupon Code",
              },
            ]}
            subtitle="Quantity 6"
            title="Fresh onions (500gm), Tomatoes (500gm)"
            totalAmount="₹ 314.00"
            totaltitle="Total Amount"
          />,
          <Text type="body" size="md" className="font-semibold mt-3 mb-1">
            Hurry, order now before the products sell out.
          </Text>,
        ]}
      />
      <ActionButton
        text="Review & Pay"
        radius={radius}
        onClick={() => {
          setChatArray((array: any) => [
            ...array,
            // review and pay
            <ChatWrapper type="user">
              <div className="flex flex-col max-w-[80%] sm:w-[50%] md:w-[40%]">
                <ReplyMessageCard
                  content="Review & Pay"
                  replyArray={[
                    "Great! The total payable amount for this order is. Hurry, order now before the products sell out.",
                  ]}
                />
              </div>
            </ChatWrapper>,
            // payment success
            <ChatWrapper type="bot">
              <div className="flex flex-col max-w-[80%] sm:w-[50%] md:w-[40%]">
                <RichCard className="w-full bg-background">
                  <>
                    <div className="relative">
                      <ReplyCard
                        className="w-full"
                        title="Honeysys Bot"
                        titleCN="text-primary"
                      >
                        <div className="flex flex-col justify-evenly w-full">
                          <Text
                            type="body"
                            size="sm"
                            className="text-[#505050]"
                          >
                            🛒 Order #532612378
                          </Text>
                          <Text
                            type="label"
                            size="lg"
                            className="text-[#505050]"
                          >
                            Total 6 items ₹ 316.00
                          </Text>
                          <img
                            src="/images/vegetables.svg"
                            height={50}
                            alt="vegetable"
                            className="max-w-[54px] rounded-md absolute right-1 bottom-1"
                          />
                        </div>
                      </ReplyCard>
                    </div>
                    <div className="text-[14px] text-black font-normal">
                      <div>
                        Thank you for Jiya for shopping with us at Honeysys
                        Ecommerce.
                      </div>
                      <br />
                      <div>
                        Here’s a quick update on your order with order ID
                        #532612378. Total amount:{" "}
                        <span className="font-semibold">₹ 310.00</span>
                      </div>
                      <br />
                      <div>
                        While we are preparing your order, please take a moment
                        to share your feedback with us.
                      </div>
                    </div>
                  </>
                </RichCard>
                <div className="flex">
                  <ActionButton
                    text="Very Happy"
                    radius={radius}
                    onClick={() => {
                      setChatArray((array: any) => [
                        ...array,
                        <ChatWrapper type="user">
                          <div className="flex flex-col max-w-[80%] sm:w-[50%] md:w-[40%]">
                            <ReplyMessageCard
                              content="Very Happy"
                              replyArray={[
                                "Great! The total payable amount for this order is. Hurry, order now before the products sell out.",
                              ]}
                            />
                          </div>
                        </ChatWrapper>,
                        // thank you for ordering
                        <ThankYouCard />,
                      ]);
                    }}
                  />
                  <ActionButton
                    text="Good"
                    radius={radius}
                    onClick={() => {
                      setChatArray((array: any) => [
                        ...array,
                        <ChatWrapper type="user">
                          <div className="flex flex-col max-w-[80%] sm:w-[50%] md:w-[40%]">
                            <ReplyMessageCard
                              content="Good"
                              replyArray={[
                                "Great! The total payable amount for this order is. Hurry, order now before the products sell out.",
                              ]}
                            />
                          </div>
                        </ChatWrapper>,
                        // thank you for ordering
                        <ThankYouCard />,
                      ]);
                    }}
                  />
                </div>
                <ActionButton
                  text="Not Happy"
                  radius={radius}
                  onClick={() => {
                    setChatArray((array: any) => [
                      ...array,
                      <ChatWrapper type="user">
                        <div className="flex flex-col max-w-[80%] sm:w-[50%] md:w-[40%]">
                          <ReplyMessageCard
                            content="Not Happy"
                            replyArray={[
                              "Great! The total payable amount for this order is. Hurry, order now before the products sell out.",
                            ]}
                          />
                        </div>
                      </ChatWrapper>,
                      // thank you for ordering
                      <ThankYouCard />,
                    ]);
                  }}
                />
              </div>
            </ChatWrapper>,
          ]);
        }}
      />
      <ActionButton
        text="Apply Coupon"
        radius={radius}
        onClick={() => {
          setChatArray((array: any) => [
            ...array,
            //user apply coupon select
            <ChatWrapper type="user">
              <div className="flex flex-col max-w-[80%] sm:w-[50%] md:w-[40%]">
                <ReplyMessageCard
                  content="Apply Coupon"
                  replyArray={[
                    "Great! The total payable amount for this order is. Hurry, order now before the products sell out.",
                  ]}
                />
              </div>
            </ChatWrapper>,
            // guide user how to apply coupon code
            <ChatWrapper type="bot">
              <div className="flex flex-col max-w-[80%] sm:w-[50%] md:w-[40%]">
                <RichCard>
                  <>
                    <div className="text-[14px] font-normal">
                      <div>
                        Amazing!!! Please enter the coupon code to apply.👋
                      </div>
                      <br />
                      <div className="font-medium">
                        Eg. “My coupon code is COUPON15”
                      </div>
                      <br />
                      <div className="font-semibold">
                        Hurry, order now before the products sell out.
                      </div>
                    </div>
                  </>
                </RichCard>
              </div>
            </ChatWrapper>,
          ]);
        }}
      />
    </>
  );
};

export default OrderSummaryCard;
