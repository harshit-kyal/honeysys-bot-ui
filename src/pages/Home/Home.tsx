import React, { useEffect, useState, useRef } from "react";
import SearchBar from "../../components/SearchBar";
import ChatWrapper from "../../components/ChatWrapper";
import LocationPermission from "../../components/Modal/LocationPermission";
import DeniedModal from "../../components/Modal/DeniedModal";
import UserMessageCard from "../../components/Resuable/UserMessageCard";
import GetStart from "../../components/GetStart";
import { fetchBot, getChat, getConversationId } from "../../services";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import BotMessageCard from "../../components/Resuable/BotMessageCard";
import { environment } from "../../environments/environment";
import { setBotInfo, setBotType, setConvId } from "../../slices/botSlice";
import { encrypt } from "../../services/aes";
import { io } from "socket.io-client";
import { setChatArray, setUiUpdate } from "../../slices/homeSlice";
import FloatingButton from "../../components/FloatingButton";

const Home = () => {
  const dispatch = useAppDispatch();
  const convId = useAppSelector((state) => state.bot.convId);
  const botType = useAppSelector((state) => state.bot.botType);
  const botInfo = useAppSelector((state) => state.bot.botInfo);
  const ChatArray = useAppSelector((state) => state.home.ChatArray);

  const [ChatComponentArray, setChatComponentArray] = useState<JSX.Element[]>(
    []
  );
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
    if (ChatComponentArray.length === 0) {
      setChatComponentArray([
        ...ChatComponentArray,
        <GetStart
          setChatArray={setChatComponentArray}
          key={new Date().getTime()}
        />,
      ]);
    }
  }, []);

  const setArray = (component: JSX.Element) => {
    console.log("setArray");
    setChatComponentArray((prevChartArray) => [...prevChartArray, component]);
  };

  const replyFunction = (data: any) => {
    console.log("replyFunction", data);
    if (data.activities) {
      const activities: any[] = data.activities;
      // setChatArray((prevChartArray: any) => {
      // console.log("IN setChatArray");
      // const newChartArray = [...prevChartArray];
      console.log(ChatArray, activities);
      dispatch(setChatArray([...ChatArray, ...activities]));
      //   return newChartArray;
      // });
    }
  };

  useEffect(() => {
    if (botType === "") {
      fetchBot(environment.botType)
        .then((data) => {
          dispatch(setBotInfo(data.data.data[0]));

          const botInfo = data.data.data[0];

          if (convId) {
            console.log(convId);
          } else {
            let botType = encrypt(botInfo.botType);
            let token = botInfo.botDeploymentInfo?.directLine_secret || "";
            getConversationId(botType, token)
              .then((data: any) => {
                dispatch(setConvId(data?.data?.conversationId));
                dispatch(setBotType(data?.data?.botType));
                const endpoint = environment.directlineURL;
                const socket = io(endpoint, {
                  query: { conversationId: data.data.conversationId },
                  path: "/directline/socket.io",
                });

                // init message
                const newData = {
                  conversationId: data?.data?.conversationId,
                  text: "init",
                  voiceFlag: false,
                };
                getChat(newData, botType);

                // setChatComponentArray([
                //   <ChatWrapper type={"bot"} key={new Date().getTime()}>
                //     <div className="w-[80%]">
                //       <BotMessageCard title={`botType : ${botType}`} />
                //     </div>
                //   </ChatWrapper>,
                //   <ChatWrapper type={"bot"} key={new Date().getTime()}>
                //     <div className="w-[80%]">
                //       <BotMessageCard
                //         title={`conversationId : ${data?.data?.conversationId}`}
                //       />
                //     </div>
                //   </ChatWrapper>,
                // ]);
                socket.on("sendMessage", (message) => {
                  if (message.data && message.data !== "") {
                    let data = message.data;
                    console.log(data);
                    replyFunction(data);
                  }
                });
                socket.on("fetchHomeData", () => {
                  // this.fetchHomeData();
                });
                socket.on("error", (error) => {
                  console.log(error);
                });
                // socket.on("fetchHomeData", () => {
                //   fetchHomeData();
                // });
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    console.log(ChatArray);
    ChatArray.forEach((activity: any, index: number) => {
      console.log(activity);
      if (
        activity.type === "message" &&
        activity.text === "I am unable to continue. Come back later."
      ) {
        dispatch(setUiUpdate(true));
      } else if (
        activity.type === "message" &&
        activity.text === "Come back later"
      ) {
        dispatch(setUiUpdate(false));
      } else if (activity.type === "message" && activity.text !== "") {
        setArray(
          <ChatWrapper
            type={activity.value?.sender === "user" ? "user" : "bot"}
            key={new Date().getTime() + index}
          >
            <div className="w-[80%]">
              {activity.value.sender === "user" ? (
                <UserMessageCard content={activity.text} />
              ) : (
                <BotMessageCard title={activity.text} />
              )}
            </div>
          </ChatWrapper>
        );
      }
      // type paragraph
      else if (activity.type === "paragraph" && activity.value.text) {
        let text = activity.value.text;
        text.replace("<p>", "");
        text.replace("</p>", "");
        setArray(
          <ChatWrapper
            type={activity.value?.sender === "user" ? "user" : "bot"}
            key={new Date().getTime() + index}
          >
            <div className="w-[80%]">
              {activity.value.sender === "user" ? (
                <UserMessageCard content={activity.text} />
              ) : (
                <BotMessageCard title={text} />
              )}
            </div>
          </ChatWrapper>
        );
      }
    });
  }, [ChatArray]);

  useEffect(() => {
    scroll();
  }, [ChatComponentArray]);
  console.log("ChatComponentArray", ChatComponentArray);

  return (
    <div
      className="w-full bg-background text-primary text-[40px] font-bold"
      style={{ height: "calc(100vh - 125px)", marginBottom: 65 }}
    >
      <div
        ref={scrollRef}
        className="bg-background h-full overflow-y-auto py-5"
      >
        {ChatComponentArray}
      </div>
      <SearchBar
        onClick={(inputText: string) => {
          const newData = {
            conversationId: convId,
            text: inputText,
            voiceFlag: false,
          };
          getChat(newData, botType);
        }}
      />
      <LocationPermission />
      <DeniedModal />
      <FloatingButton />
    </div>
  );
};

export default Home;
