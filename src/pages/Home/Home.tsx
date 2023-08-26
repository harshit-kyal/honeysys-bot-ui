import React, { useEffect, useState, useRef } from "react";
import SearchBar from "../../components/SearchBar";
import ChatWrapper from "../../components/ChatWrapper";
import LocationPermission from "../../components/Modal/LocationPermission";
import DeniedModal from "../../components/Modal/DeniedModal";
import UserMessageCard from "../../components/Resuable/UserMessageCard";
import GetStart from "../../components/GetStart";
import { getChat } from "../../services";
import { useAppSelector } from "../../app/hooks";

const Home = () => {
  const convId = useAppSelector((state) => state.bot.convId);
  const botInfo = useAppSelector((state) => state.bot.botInfo);
  const botType = useAppSelector((state) => state.bot.botType);

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
        <GetStart setChatArray={setChatArray} key={new Date().getTime()} />,
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
          const newData = {
            conversationId: convId,
            text: inputText,
            voiceFlag: false,
          };
          getChat(newData, botType).then((data) => {
            console.log(data);
          });
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
