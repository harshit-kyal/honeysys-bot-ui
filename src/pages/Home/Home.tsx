import { useEffect, useState, useRef } from "react";
import { fetchBot, getConversationId } from "../../services";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { environment } from "../../environments/environment";
import { setBotInfo, setBotType, setConvId } from "../../slices/botSlice";
import { encrypt } from "../../services/aes";
import { io } from "socket.io-client";
import { getChatData, setChatArray, setUiUpdate } from "../../slices/homeSlice";
import ChatWrapper from "../../components/ChatWrapper";
import SearchBar from "../../components/SearchBar";
import LocationPermission from "../../components/Modal/LocationPermission";
import DeniedModal from "../../components/Modal/DeniedModal";
import UserMessageCard from "../../components/Resuable/UserMessageCard";
import GetStart from "../../components/GetStart";
import BotMessageCard from "../../components/Resuable/BotMessageCard";
import FloatingButton from "../../components/FloatingButton";
import Loading from "../../components/Loading";

const Home = () => {
  const dispatch = useAppDispatch();
  const convId = useAppSelector((state) => state.bot.convId);
  const botType = useAppSelector((state) => state.bot.botType);
  const loading = useAppSelector((state) => state.home.loading);
  const ChatArray = useAppSelector((state) => state.home.ChatArray);

  const [ChatComponentArray, setChatComponentArray] = useState<JSX.Element[]>(
    []
  );
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isLoadingVisible, setLoadingVisible] = useState(false);
  const loadingDelayTimeout = useRef<number | undefined>(undefined);

  const showLoading = () => {
    loadingDelayTimeout.current = window.setTimeout(() => {
      setLoadingVisible(true);
    }, 300);
  };

  const hideLoading = () => {
    if (loadingDelayTimeout.current) {
      clearTimeout(loadingDelayTimeout.current);
    }
    setLoadingVisible(false);
  };

  useEffect(() => {
    if (loading) {
      showLoading();
    } else {
      hideLoading();
    }
  }, [loading]);

  const scroll = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const setArray = (component: JSX.Element) => {
    setChatComponentArray((prevChartArray) => [...prevChartArray, component]);
  };

  const replyFunction = (data: any) => {
    if (data.activities) {
      const activities: any[] = data.activities;
      dispatch(setChatArray([...activities]));
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
                dispatch(getChatData({ newData, botType }));
                socket.on("sendMessage", (message) => {
                  if (message.data && message.data !== "") {
                    let data = message.data;
                    replyFunction(data);
                  }
                });
                socket.on("error", (error) => {
                  console.log(error);
                });
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

    return () => {
      setChatComponentArray([]);
    };
  }, []);

  useEffect(() => {
    ChatArray.forEach((activity: any, index: number) => {
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
            <div className="chatWrapper">
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
            <div className="chatWrapper">
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
  }, [ChatComponentArray, isLoadingVisible]);

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
        {isLoadingVisible && <Loading />}
      </div>
      <SearchBar
        onClick={(inputText: string) => {
          const newData = {
            conversationId: convId,
            text: inputText,
            voiceFlag: false,
          };
          dispatch(getChatData({ newData, botType }));
        }}
      />
      <LocationPermission />
      <DeniedModal />
      <FloatingButton />
    </div>
  );
};

export default Home;
