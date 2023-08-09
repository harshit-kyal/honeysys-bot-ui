import React from "react";
import ChatWrapper from "./ChatWrapper";
import TimeStamp, { currentTime } from "./TimeStamp";
import ActionButton from "./Resuable/ActionButton";
import { useAppDispatch } from "../app/hooks";
import { setDeniedModal, setLocationModal } from "../slices/homeSlice";
import { useNavigate } from "react-router-dom";
import BotMessageCard from "./Resuable/BotMessageCard";
import ReplyMessageCard from "./Resuable/ReplyMessageCard";

const GetStart = ({ setChatArray }: { setChatArray: any }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <>
      <TimeStamp date={new Date().toISOString()} />
      <ChatWrapper type="bot">
        <div className="flex flex-col max-w-[80%]">
          <BotMessageCard
            content="I am Honeysys bot. I will assist you in experiencing a new turn to bot powered ecommerce platform"
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
                        content={[
                          "Welcome to HoneySys Bot powered e-commerce experience",
                          "I will assist you in shopping for your product discovery, cart management and checkout experiences.",
                          "Provide your location to help us show the products available near you.",
                        ]}
                      />
                      <ActionButton
                        src="/images/location.svg"
                        text="Provide Location"
                        onClick={() => {
                          navigate("/address");
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
