import React, { useEffect, useState, useRef } from "react";
import SearchBar from "../../components/SearchBar";
import ChatWrapper from "../../components/ChatWrapper";
import LocationPermission from "../../components/Modal/LocationPermission";
import DeniedModal from "../../components/Modal/DeniedModal";
import UserMessageCard from "../../components/Resuable/UserMessageCard";
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
              <div className="w-[80%]">
                <UserMessageCard content={inputText} />
              </div>
            </ChatWrapper>,
          ]);
        }}
      />
      <LocationPermission />
      <DeniedModal />
    </div>
  );
};

export default Home;
