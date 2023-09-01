import { useEffect, useState, useRef, lazy, Suspense } from "react";
import { fetchBot, getConversationId } from "../../services";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { environment } from "../../environments/environment";
import { setBotInfo, setBotType, setConvId } from "../../slices/botSlice";
import { encrypt } from "../../services/aes";
import { io } from "socket.io-client";
import { getChatData, setChatArray, setUiUpdate } from "../../slices/homeSlice";
const SearchBar = lazy(() => import("../../components/SearchBar"));
const ChatWrapper = lazy(() => import("../../components/ChatWrapper"));
const LocationPermission = lazy(
  () => import("../../components/Modal/LocationPermission")
);
const DeniedModal = lazy(() => import("../../components/Modal/DeniedModal"));
const UserMessageCard = lazy(
  () => import("../../components/Resuable/UserMessageCard")
);
const GetStart = lazy(() => import("../../components/GetStart"));
const BotMessageCard = lazy(
  () => import("../../components/Resuable/BotMessageCard")
);
const FloatingButton = lazy(() => import("../../components/FloatingButton"));
const Loading = lazy(() => import("../../components/Loading"));

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
    // Show loading after a short delay (300ms)
    loadingDelayTimeout.current = window.setTimeout(() => {
      setLoadingVisible(true);
    }, 300);
  };

  const hideLoading = () => {
    // Clear any existing timeouts and hide loading
    if (loadingDelayTimeout.current) {
      clearTimeout(loadingDelayTimeout.current);
    }
    setLoadingVisible(false);
  };

  useEffect(() => {
    // Handle loading state changes
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
    setChatComponentArray((prevChartArray) => [...prevChartArray, component]);
  };

  const replyFunction = (data: any) => {
    if (data.activities) {
      const activities: any[] = data.activities;
      console.log("state1", ChatArray);
      console.log("state", ChatArray, [...ChatArray, ...activities]);
      dispatch(setChatArray([...activities]));
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
    console.log("state", ChatArray);
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
  }, [ChatComponentArray, isLoadingVisible]);

  return (
    <div
      className="w-full bg-background text-primary text-[40px] font-bold"
      style={{ height: "calc(100vh - 125px)", marginBottom: 65 }}
    >
      <Suspense fallback={<Loading />}>
        <div
          ref={scrollRef}
          className="bg-background h-full overflow-y-auto py-5"
        >
          {ChatComponentArray}
          {isLoadingVisible && <Loading />}
        </div>
      </Suspense>
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
      <Suspense fallback={<Loading />}>
        <LocationPermission />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <DeniedModal />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <FloatingButton />
      </Suspense>
    </div>
  );
};

export default Home;
