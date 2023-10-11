import ChatWrapper from "./ChatWrapper";
import TimeStamp from "./TimeStamp";
import ActionButton from "./Resuable/ActionButton";
import { useNavigate, useSearchParams } from "react-router-dom";
import BotMessageCard from "./Resuable/BotMessageCard";
import ReplyMessageCard from "./Resuable/ReplyMessageCard";
import { Button, ReplyCard, RichCard, Text } from "@polynomialai/alpha-react";
import CartReplyCard from "./Resuable/CartReplyCard";
import OrderSummaryCard from "./Resuable/OrderSummaryCard";
import { getStoreData, setLocationPermission } from "../slices/homeSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useState } from "react";

const GetStart = ({ setChatArray }: { setChatArray: any }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const conversationUI = useAppSelector((state) => state.root.conversationUI);
  const handleTrackMyOrder = () => {
    return (
      <>
        {setChatArray((array: any) => [
          ...array,
          <ChatWrapper type="user">
            <div className="flex flex-col chatWrapper">
              <ReplyMessageCard
                content="Track your Orders"
                replyArray={[
                  "Thank you for Jiya for shopping with us at Honeysys Ecommerce. ",
                ]}
              />
            </div>
          </ChatWrapper>,
          <ChatWrapper type="bot">
            <div className="flex flex-col chatWrapper">
              <RichCard>
                <>
                  <div className="relative">
                    <ReplyCard
                      className="w-full"
                      title="Honeysys Bot"
                      titleCN="text-primary"
                    >
                      <div className="flex flex-col justify-evenly w-full">
                        <Text type="body" size="sm" className="text-[#505050]">
                          🛒 Order #532612378
                        </Text>
                        <Text type="label" size="lg" className="text-[#505050]">
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
                  <div className="text-[14px] font-normal">
                    1. <span className="font-semibold">June 27, 2023 </span>-
                    Onions, Chilly Powder, lorem ipsum, lorem ipsum -
                    <span className="font-semibold">₹ 450.00</span> - Delivered
                  </div>
                </>
              </RichCard>
              <RichCard className="mt-2">
                <>
                  <div className="relative">
                    <ReplyCard
                      className="w-full"
                      title="Honeysys Bot"
                      titleCN="text-primary"
                    >
                      <div className="flex flex-col justify-evenly w-full">
                        <Text type="body" size="sm" className="text-[#505050]">
                          🛒 Order #532612378
                        </Text>
                        <Text type="label" size="lg" className="text-[#505050]">
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
                  <div className="text-[14px] font-normal">
                    2. <span className="font-semibold">June 23, 2023 </span>-
                    Onions, Chilly Powder, lorem ipsum, lorem ipsum -
                    <span className="font-semibold">₹ 230.00</span> - Delivered
                  </div>
                </>
              </RichCard>
            </div>
          </ChatWrapper>,
        ])}
      </>
    );
  };
  // const [radius, setRadius] = useState<string | null>("");
  // const [title, setTitle] = useState<string | null>("");
  // useEffect(() => {
  //   const searchParams = new URLSearchParams(window.location.search);
  //   const filtersParam = searchParams.get("radius");
  //   setRadius(filtersParam);
  //   const titleData = searchParams.get("title");
  //   setTitle(titleData);
  // }, [window.location.search]);

  // const greetingMessage = localStorage.getItem("greetingMessage") || "Hey";

  return (
    <>
      {/* <TimeStamp date={new Date().toISOString()} /> */}
      <ChatWrapper type="bot">
        <div className="flex flex-col">
          <BotMessageCard
            title={conversationUI.greetingMessage}
            contentArray="I am Honeysys bot. I will assist you in experiencing a new turn to bot powered ecommerce platform"
            imageSrc="/images/greeting.svg"
          />
          <ActionButton
            src="/images/widgets.svg"
            text="Get Started"
            onClick={() => {
              setChatArray((array: any) => [
                ...array,
                <ChatWrapper type="user">
                  <div className="chatWrapper">
                    <ReplyMessageCard
                      content="Get Started"
                      replyArray={[
                        "Greetings!",
                        "I am Honeysys bot. I will assist you in experiencing a new turn to bot powered ecommerce platform.",
                      ]}
                    ></ReplyMessageCard>
                  </div>
                </ChatWrapper>,
                <ChatWrapper type="bot">
                  <div className="flex flex-col chatWrapper">
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
                        dispatch(setLocationPermission(true));
                        // navigate("/address");
                        // navigator.permissions
                        //   .query({ name: "geolocation" })
                        //   .then(function (result) {
                        //     if (result.state === "granted") {
                        //       alert("granted");
                        //       navigator.geolocation.getCurrentPosition(
                        //         function (position) {
                        //           console.log(
                        //             "Latitude is :",
                        //             position.coords.latitude
                        //           );
                        //           console.log(
                        //             "Longitude is :",
                        //             position.coords.longitude
                        //           );
                        //         }
                        //       );
                        //     } else if (result.state === "prompt") {
                        //       // dispatch(setLocationModal(true));
                        //       alert("prompt");
                        //       navigator.geolocation.getCurrentPosition(
                        //         function (position) {
                        //           console.log(
                        //             "Latitude is :",
                        //             position.coords.latitude
                        //           );
                        //           console.log(
                        //             "Longitude is :",
                        //             position.coords.longitude
                        //           );
                        //         }
                        //       );
                        //     } else if (result.state === "denied") {
                        //       // dispatch(setDeniedModal(true));
                        //       alert("denied");
                        //     }
                        //     result.onchange = function () {
                        //       console.log(result.state);
                        //     };
                        //   });

                        // botApi({
                        //   pincode: "500081",
                        //   type: "location",
                        //   action: "getStores",
                        //   clientName: "honeySys",
                        // }).then((response) => {
                        //   if (response.data?.code === 200) {
                        //   }
                        // });

                        setChatArray((array: any) => [
                          ...array,
                          // Location from Map
                          <ChatWrapper type="user">
                            <div className="flex flex-col chatWrapper">
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
                            <div className="flex flex-col chatWrapper">
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
                            <div className="flex flex-col chatWrapper">
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
                            <div className="flex flex-col chatWrapper">
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
                                  navigate("/catalog");
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
                            <div className="flex flex-col chatWrapper">
                              <CartReplyCard
                                imageSrc="/images/vegetables.svg"
                                price={3500}
                                items={6}
                              />
                            </div>
                          </ChatWrapper>,
                          // Delivery type selection
                          <ChatWrapper type="bot">
                            <div className="flex flex-col chatWrapper">
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
                                      <div className="flex flex-col chatWrapper">
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
                                      <div className="flex flex-col chatWrapper">
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
                                                <div className="flex flex-col chatWrapper">
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
                                                <div className="flex flex-col chatWrapper">
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
                                                            <div className="flex flex-col chatWrapper">
                                                              <ReplyMessageCard
                                                                content="Confirm"
                                                                replyArray={[
                                                                  "Amazing!!! Your order will be delivered to you on July 03, 2023 in between 12:00 PM - 04:00 PM",
                                                                ]}
                                                              />
                                                            </div>
                                                          </ChatWrapper>,
                                                          // order invoice
                                                          <ChatWrapper type="bot">
                                                            <div className="flex flex-col chatWrapper">
                                                              <OrderSummaryCard
                                                                handleTrackMyOrder={
                                                                  handleTrackMyOrder
                                                                }
                                                                setChatArray={
                                                                  setChatArray
                                                                }
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
                      onClick={() => {
                        handleTrackMyOrder();
                      }}
                    />
                  </div>
                </ChatWrapper>,
              ]);
            }}
          />
        </div>
      </ChatWrapper>
    </>
  );
};

export default GetStart;


