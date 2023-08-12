import React from "react";
import ChatWrapper from "./ChatWrapper";
import TimeStamp, { currentTime } from "./TimeStamp";
import ActionButton from "./Resuable/ActionButton";
import { useAppDispatch } from "../app/hooks";
import { setDeniedModal, setLocationModal } from "../slices/homeSlice";
import { useNavigate } from "react-router-dom";
import BotMessageCard from "./Resuable/BotMessageCard";
import ReplyMessageCard from "./Resuable/ReplyMessageCard";
import { ProductCard } from "@polynomialai/alpha-react";
import CartReplyCard from "./Resuable/CartReplyCard";

const GetStart = ({ setChatArray }: { setChatArray: any }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <>
      <TimeStamp date={new Date().toISOString()} />
      <ChatWrapper type="bot">
        <div className="flex flex-col max-w-[80%]">
          <BotMessageCard
            contentArray="I am Honeysys bot. I will assist you in experiencing a new turn to bot powered ecommerce platform"
            imageSrc="/images/greeting.svg"
            title="👋 Greetings!"
          />
          <ActionButton
            src="/images/widgets.svg"
            text="Get Started"
            onClick={() => {
              setChatArray((array: any) => [
                ...array,
                <ChatWrapper type="user">
                  <div className="w-[80%]">
                    <ReplyMessageCard
                      content="Get Started"
                      replyArray={[
                        "Greetings!",
                        "I am Honeysys bot. I will assist you in experiencing a new turn to bot powered ecommerce platform.",
                      ]}
                    ></ReplyMessageCard>
                  </div>
                </ChatWrapper>,
              ]);
              setTimeout(() => {
                setChatArray((array: any) => [
                  ...array,
                  <ChatWrapper type="bot">
                    <div className="flex flex-col max-w-[80%]">
                      <BotMessageCard
                        imageSrc="/images/greeting2.svg"
                        contentArray={[
                          "Welcome to HoneySys Bot powered e-commerce experience",
                          "I will assist you in shopping for your product discovery, cart management and checkout experiences.",
                          "Provide your location to help us show the products available near you.",
                        ]}
                      />
                      <ActionButton
                        src="/images/location.svg"
                        text="Provide Location"
                        onClick={() => {
                          // navigate("/address");
                          // navigator.permissions
                          //   .query({ name: "geolocation" })
                          //   .then(function (result) {
                          //     if (result.state === "granted") {
                          //       alert("granted");
                          //     } else if (result.state === "prompt") {
                          //       dispatch(setLocationModal(true));
                          //     } else if (result.state === "denied") {
                          //       dispatch(setDeniedModal(true));
                          //     }
                          //     result.onchange = function () {
                          //       console.log(result.state);
                          //     };
                          //   });
                          setChatArray((array: any) => [
                            ...array,
                            // Location from Map
                            <ChatWrapper type="user">
                              <div className="flex flex-col max-w-[80%]">
                                <ReplyMessageCard
                                  content="Test Lane, Street 3, 12th Street, Custom Lane, Tested Street, Custom Tested sector"
                                  replyArray={[
                                    "We have received your cart details. Choose an address you’d like this order to be delivered at.",
                                  ]}
                                />{" "}
                              </div>
                            </ChatWrapper>,
                            // Propmt for confirm Location
                            <ChatWrapper type="bot">
                              <div className="flex flex-col max-w-[80%]">
                                <BotMessageCard
                                  title="👋 One more question!"
                                  contentArray={[
                                    "Enter your address to help us reach you better like your building/apartment/room no.",
                                    "Eg - Prakhar Kaushik, Clover Apartment, C-204",
                                  ]}
                                />
                                <ActionButton
                                  src="/images/location.svg"
                                  text="Change Location"
                                  onClick={() => {}}
                                />
                              </div>
                            </ChatWrapper>,
                            // user add location
                            <ChatWrapper type="user">
                              <div className="flex flex-col max-w-[80%]">
                                <ReplyMessageCard
                                  content="Jiya Sharma, Ocean View Apartment, D-302"
                                  replyArray={[
                                    "One more question!",
                                    "Enter your address to help us reach you better like your building/apartment/room no.",
                                    "Eg - Prakhar Kaushik, Clover Apartment, C-204",
                                  ]}
                                />
                              </div>
                            </ChatWrapper>,
                            // Got you message
                            <ChatWrapper type="bot">
                              <div className="flex flex-col max-w-[80%]">
                                <BotMessageCard
                                  title="👋 Got you!"
                                  contentArray={[
                                    "Your address is “Jiya Sharma, Ocean View Apartment, D-302, Test Lane, Street 3, 12th Street, Custom Lane, Tested Street, Custom Tested sector”",
                                  ]}
                                />
                                <ActionButton
                                  src="/images/catelog.svg"
                                  text="View Catalog"
                                  onClick={() => {
                                    navigate("/catelog");
                                  }}
                                />
                                <ActionButton
                                  src="/images/location.svg"
                                  text="Change Location"
                                  onClick={() => {}}
                                />
                              </div>
                            </ChatWrapper>,
                            // Cart Order Message
                            <ChatWrapper type="user">
                              <div className="flex flex-col w-[80%]">
                                <CartReplyCard
                                  imageSrc="/images/vegetables.svg"
                                  price={3500}
                                  items={6}
                                />
                                <ActionButton
                                  src=""
                                  text="View Sent Cart"
                                  className="bg-primary text-white"
                                  onClick={() => {}}
                                />
                              </div>
                            </ChatWrapper>,
                            // Delivery type selection
                            <ChatWrapper type="bot">
                              <div className="flex flex-col max-w-[80%]">
                                <BotMessageCard
                                  title="👋 Got you!"
                                  contentArray={[
                                    "Amazing!!! Please select the delivery type to ensure the item reach you at the desirable time.",
                                    "Note: Packaging & Delivery charges apply according to the delivery method.",
                                  ]}
                                />
                                <ActionButton
                                  text="10 mins Delivery"
                                  onClick={() => {}}
                                />
                                <ActionButton
                                  text="After 3 Days"
                                  onClick={() => {
                                    setChatArray((array: any) => [
                                      ...array,
                                      // user select delivery time
                                      <ChatWrapper type="user">
                                        <div className="flex flex-col max-w-[80%]">
                                          <ReplyMessageCard
                                            content="After 3 Days"
                                            replyArray={[
                                              "Amazing!!! Please select the delivery type to ensure the item reach you at the desirable time.",
                                            ]}
                                          />
                                        </div>
                                      </ChatWrapper>,
                                      // Time Slots
                                      <ChatWrapper type="bot">
                                        <div className="flex flex-col max-w-[80%]">
                                          <BotMessageCard
                                            title="👋 Got you!"
                                            contentArray={[
                                              "Your address is “Jiya Sharma, Ocean View Apartment, D-302, Test Lane, Street 3, 12th Street, Custom Lane, Tested Street, Custom Tested sector”",
                                            ]}
                                          />
                                          <ActionButton
                                            text="7:00 AM - 10:00 AM"
                                            onClick={() => {}}
                                          />
                                          <ActionButton
                                            text="12:00 PM - 04:00 PM"
                                            onClick={() => {
                                              setChatArray((array: any) => [
                                                ...array,
                                                // user select time slot
                                                <ChatWrapper type="user">
                                                  <div className="flex flex-col max-w-[80%]">
                                                    <ReplyMessageCard
                                                      content="12:00 PM - 04:00 PM"
                                                      replyArray={[
                                                        "Amazing!!! Please select the delivery time to ensure the item reach you at the desirable time.",
                                                      ]}
                                                    />
                                                  </div>
                                                </ChatWrapper>,
                                                // Confirm Time Slots
                                                <ChatWrapper type="bot">
                                                  <div className="flex flex-col max-w-[80%]">
                                                    <BotMessageCard
                                                      title="👋 Got you!"
                                                      contentArray={[
                                                        "Amazing!!! Your order will be delivered to you on July 03, 2023 in between 12:00 PM - 04:00 PM",
                                                      ]}
                                                    />
                                                    <ActionButton
                                                      text="Confirm"
                                                      onClick={() => {
                                                        setChatArray(
                                                          (array: any) => [
                                                            ...array,
                                                            // user confirm
                                                            <ChatWrapper type="user">
                                                              <div className="flex flex-col max-w-[80%]">
                                                                <ReplyMessageCard
                                                                  content="Confirm"
                                                                  replyArray={[
                                                                    "Amazing!!! Your order will be delivered to you on July 03, 2023 in between 12:00 PM - 04:00 PM",
                                                                  ]}
                                                                />
                                                              </div>
                                                            </ChatWrapper>,
                                                          ]
                                                        );
                                                      }}
                                                    />
                                                  </div>
                                                </ChatWrapper>,
                                              ]);
                                            }}
                                          />
                                          <ActionButton
                                            text="06:00 PM - 09:00 PM"
                                            onClick={() => {}}
                                          />
                                        </div>
                                      </ChatWrapper>,
                                    ]);
                                  }}
                                />
                                <ActionButton
                                  text="Pickup From Store"
                                  onClick={() => {}}
                                />
                              </div>
                            </ChatWrapper>,
                          ]);
                        }}
                      />
                      <ActionButton
                        src="/images/order.svg"
                        text="Track Your Order"
                        onClick={() => {}}
                      />
                    </div>
                  </ChatWrapper>,
                ]);
              }, 1);
            }}
          />
        </div>
      </ChatWrapper>
    </>
  );
};

export default GetStart;
