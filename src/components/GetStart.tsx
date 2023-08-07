import React from "react";
import ChatWrapper from "./ChatWrapper";
import { ReplyCard, RichCard, Text } from "@polynomialai/alpha-react";
import TimeStamp, { currentTime } from "./TimeStamp";
import ActionButton from "./ActionButton";

const GetStart = ({ setChatArray }: { setChatArray: any }) => {
  return (
    <>
      <TimeStamp date={new Date().toISOString()} />
      <ChatWrapper type="bot">
        <div className="flex flex-col max-w-[80%]">
          <RichCard
            className="w-full"
            content="I am Honeysys bot. I will assist you in experiencing a new turn to bot powered ecommerce platform"
            imageSrc="/images/greeting.svg"
            logoSrc="/images/chat_logo.svg"
            time={currentTime()}
            title="👋 Greetings!"
            titleCN="text-[#09215B]"
          />
          <ActionButton
            src="/images/widgets.svg"
            text="Get Started"
            onClick={() => {
              setChatArray((array: any) => [
                ...array,
                <ChatWrapper type="user">
                  <RichCard
                    className="w-[80%] bg-[#0D1282] text-white"
                    content="Get Started"
                    time={new Date().toLocaleString("en-US", {
                      hour: "2-digit",
                      minute: "numeric",
                      hour12: true,
                    })}
                    timeCN="text-white font-normal"
                  >
                    <ReplyCard title="Honeysys Bot" titleCN="text-[#09215B]">
                      <p>
                        Greetings!
                        <br /> I am Honeysys bot. I will assist you in
                        experiencing a new turn to bot powered ecommerce
                        platform.
                      </p>
                    </ReplyCard>
                  </RichCard>
                </ChatWrapper>,
              ]);
              setTimeout(() => {
                setChatArray((array: any) => [
                  ...array,
                  <ChatWrapper type="bot">
                    <div className="flex flex-col max-w-[80%]">
                      <RichCard
                        className="w-full"
                        imageSrc="/images/greeting2.svg"
                        logoSrc="/images/chat_logo.svg"
                        time={currentTime()}
                        title="👋 Greetings!"
                        titleCN="text-[#09215B]"
                      >
                        <div className="text-">
                          <Text
                            type="body"
                            size="md"
                            className="font-normal mb-1"
                          >
                            Welcome to HoneySys Bot powered e-commerce
                            experience.
                          </Text>
                          <Text
                            type="body"
                            size="md"
                            className="font-normal mb-1"
                          >
                            I will assist you in shopping for your product
                            discovery, cart management and checkout experiences.
                          </Text>
                          <Text type="body" size="md" className="font-normal">
                            Provide your location to help us show the products
                            available near you.
                          </Text>
                        </div>
                      </RichCard>
                      <ActionButton
                        src="/images/location.svg"
                        text="Get Started"
                        onClick={() => {
                          //   setChatArray((array) => [...array, <GetStart />]);
                          //   setTimeout(() => {
                          //     setChatArray((array) => [...array]);
                          //   }, 0.5);
                        }}
                      />
                      <ActionButton
                        src="/images/order.svg"
                        text="Get Started"
                        onClick={() => {
                          //   setChatArray((array) => [...array, <GetStart />]);
                          //   setTimeout(() => {
                          //     setChatArray((array) => [...array]);
                          //   }, 0.5);
                        }}
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
