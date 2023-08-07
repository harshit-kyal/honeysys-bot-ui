import React, { useEffect, useState, useRef } from "react";
import SearchBar from "../../components/SearchBar";
import TimeStamp, { currentTime } from "../../components/TimeStamp";
import { RichCard, Text } from "@polynomialai/alpha-react";
import ChatWrapper from "../../components/ChatWrapper";
import ActionButton from "../../components/ActionButton";
import GetStart from "../../components/GetStart";

const Home = () => {
  const [ChatArray, setChatArray] = useState<JSX.Element[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (ChatArray.length === 0) {
      setChatArray((array) => [
        ...array,
        <GetStart setChatArray={setChatArray} />,
      ]);
    }
  }, []);

  useEffect(() => {
    scroll();
  }, [ChatArray]);

  return (
    <div
      className="w-full bg-background text-primary text-[40px] font-bold"
      style={{ height: "calc(100vh - 125px)", marginBottom: 65 }}
    >
      <div
        ref={scrollRef}
        className="bg-background h-full overflow-y-auto py-5"
      >
        {ChatArray}
      </div>
      <SearchBar
        onClick={(inputText: string) => {
          setChatArray((array) => [
            ...array,
            <ChatWrapper type="user">
              <RichCard
                className="w-[80%] bg-[#0D1282] text-white"
                content={inputText}
                contentCN="text-sm"
                time={currentTime()}
                timeCN="text-white font-normal"
              ></RichCard>
            </ChatWrapper>,
          ]);
        }}
      />
    </div>
  );
};

export default Home;
