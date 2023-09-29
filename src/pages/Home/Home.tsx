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
import TimeStamp from "../../components/TimeStamp";
import ActionButton from "../../components/Resuable/ActionButton";
import ReplyMessageCard from "../../components/Resuable/ReplyMessageCard";
import { setConversationUI, setThemeColor } from "../../slices/rootSlice";
import { SummaryCard, Text } from "@polynomialai/alpha-react";
import InfiniteScroll from "react-infinite-scroll-component";
import axiosInstance from "../../lib/axiosInstance";
import axios from "axios";
const Home = () => {
  const dispatch = useAppDispatch();
  const reviewToken = localStorage.getItem("reviewToken");
  const [title, setTitle] = useState<string | null>(null);
  const conversationUI = useAppSelector((state) => state.root.conversationUI);
  const greetingMessage = conversationUI.greetingMessage;
  const overallThemeUI = useAppSelector((state) => state.root.overallThemeUI);
  const botIcon = overallThemeUI.botIcons;

  const convId = useAppSelector((state) => state.bot.convId);
  const botType = useAppSelector((state) => state.bot.botType);
  const loading = useAppSelector((state) => state.home.loading);
  const ChatArray = useAppSelector((state) => state.home.ChatArray);

  const userId = useAppSelector((state) => state.home.userId);
  const [ChatComponentArray, setChatComponentArray] = useState<JSX.Element[]>(
    []
  );
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isLoadingVisible, setLoadingVisible] = useState(false);
  const loadingDelayTimeout = useRef<number | undefined>(undefined);

  const chat = [
    [
      {
        type: "message",
        text: "Hi! I'm your SHONA. Welcome to Colive",
        value: {
          sender: "bot",
          status: "Talking with Bot",
        },
        id: "4d1c1860-89de-42f2-b734-ed8042d0702d|000001",
        timestamp: "2023-09-25T13:17:38.182Z",
        channelId: "directline",
        from: {
          id: "polynomial-coco-solution-dev",
          name: "polynomial-coco-solution-dev",
        },
        conversation: {
          id: "4d1c1860-89de-42f2-b734-ed8042d0702d",
        },
        replyToId: "4d1c1860-89de-42f2-b734-ed8042d0702d|000001",
      },
    ],
    [
      {
        type: "message",
        text: "Check out our services!",
        value: {
          sender: "bot",
          status: "Talking with Bot",
        },
        id: "4d1c1860-89de-42f2-b734-ed8042d0702d|000001",
        timestamp: "2023-09-25T13:17:38.183Z",
        channelId: "directline",
        from: {
          id: "polynomial-coco-solution-dev",
          name: "polynomial-coco-solution-dev",
        },
        conversation: {
          id: "4d1c1860-89de-42f2-b734-ed8042d0702d",
        },
        replyToId: "4d1c1860-89de-42f2-b734-ed8042d0702d|000001",
      },
    ],
    [
      {
        type: "richCard",
        value: {
          data: [
            {
              title: "hii",
              imageURL:
                "https://res.cloudinary.com/dqbub4vtj/image/upload/v1695378166/ltvgaegj6h43iqfssjcr.jpg",
              description: [
                "Welcome to HoneySys Bot powered e-commerce experience.",
                "I will assist you in shopping for your product discovery, cart management and checkout experiences.",
                "Provide your location to help us show the products available near you.",
              ],
              botIcon:
                "https://res.cloudinary.com/dqbub4vtj/image/upload/v1695209051/sie7cwqzpqovkpu67a2k.png",
            },
          ],

          sender: "bot",
          status: "Talking with Bot",
        },
        timestamp: "2023-09-22T11:03:34.323Z",
      },
      {
        type: "iconQuickReply",
        value: {
          data: [
            {
              text: "EXPLORE",
              iconUrl:
                "https://quiltstorageaccount.blob.core.windows.net/uiassest/Property View.png",
              value: "EXPLORE",
            },
            {
              text: "ABOUT US",
              iconUrl:
                "https://quiltstorageaccount.blob.core.windows.net/uiassest/About.png",
              value: "ABOUT COLIVE",
            },
            {
              text: "RAISE AN ISSUE",
              iconUrl:
                "https://coliveshona.blob.core.windows.net/coliveshonabot/Raise%20a%20request.png",
              value: "RAISE AN ISSUE",
            },
          ],
          sender: "bot",
          status: "Talking with Bot",
        },
        id: "4d1c1860-89de-42f2-b734-ed8042d0702d|000001",
        timestamp: "2023-09-25T13:17:38.184Z",
        channelId: "directline",
        from: {
          id: "polynomial-coco-solution-dev",
          name: "polynomial-coco-solution-dev",
        },
        conversation: {
          id: "4d1c1860-89de-42f2-b734-ed8042d0702d",
        },
        replyToId: "4d1c1860-89de-42f2-b734-ed8042d0702d|000001",
      },
    ],
    [
      {
        type: "summaryCard",
        value: {
          data: [
            {
              imageURL:
                "https://res.cloudinary.com/dqbub4vtj/image/upload/v1695378166/ltvgaegj6h43iqfssjcr.jpg",
              quantity: "",
              price: [
                {
                  price: "₹ 316.00",
                  title: "Estimated Price",
                },
                {
                  price: "₹ 20.00",
                  title: "Delivery Charges",
                },
              ],
              subtitle: "Quantity 6",
              title: "Fresh onions (500gm), Tomatoes (500gm)",
              totalAmount: "₹ 314.00",
              totaltitle: "Total Amount",
              topText: "Great! The total payable amount for this order is. 👇",
              bottomText: " Hurry, order now before the products sell out.",
            },
          ],

          sender: "bot",
          status: "Talking with Bot",
        },
        timestamp: "2023-09-22T11:03:34.323Z",
      },
    ],
  ];
  const paginationChat = [
    [
      {
        type: "message",
        text: "Hi! I'm your dhruvil. Welcome to Colive",
        value: {
          sender: "bot",
          status: "Talking with Bot",
        },
        id: "4d1c1860-89de-42f2-b734-ed8042d0702d|000001",
        timestamp: "2023-09-25T13:17:38.182Z",
        channelId: "directline",
        from: {
          id: "polynomial-coco-solution-dev",
          name: "polynomial-coco-solution-dev",
        },
        conversation: {
          id: "4d1c1860-89de-42f2-b734-ed8042d0702d",
        },
        replyToId: "4d1c1860-89de-42f2-b734-ed8042d0702d|000001",
      },
    ],
    [
      {
        type: "message",
        text: "Hi! I'm your dubey. Welcome to Colive",
        value: {
          sender: "bot",
          status: "Talking with Bot",
        },
        id: "4d1c1860-89de-42f2-b734-ed8042d0702d|000001",
        timestamp: "2023-09-25T13:17:38.182Z",
        channelId: "directline",
        from: {
          id: "polynomial-coco-solution-dev",
          name: "polynomial-coco-solution-dev",
        },
        conversation: {
          id: "4d1c1860-89de-42f2-b734-ed8042d0702d",
        },
        replyToId: "4d1c1860-89de-42f2-b734-ed8042d0702d|000001",
      },
    ],
    [
      {
        type: "message",
        text: "Hi! I'm your SHONA. Welcome to Colive",
        value: {
          sender: "bot",
          status: "Talking with Bot",
        },
        id: "4d1c1860-89de-42f2-b734-ed8042d0702d|000001",
        timestamp: "2023-09-25T13:17:38.182Z",
        channelId: "directline",
        from: {
          id: "polynomial-coco-solution-dev",
          name: "polynomial-coco-solution-dev",
        },
        conversation: {
          id: "4d1c1860-89de-42f2-b734-ed8042d0702d",
        },
        replyToId: "4d1c1860-89de-42f2-b734-ed8042d0702d|000001",
      },
    ],
    [
      {
        type: "message",
        text: "Hi! I'm your prince. Welcome to Colive",
        value: {
          sender: "bot",
          status: "Talking with Bot",
        },
        id: "4d1c1860-89de-42f2-b734-ed8042d0702d|000001",
        timestamp: "2023-09-25T13:17:38.182Z",
        channelId: "directline",
        from: {
          id: "polynomial-coco-solution-dev",
          name: "polynomial-coco-solution-dev",
        },
        conversation: {
          id: "4d1c1860-89de-42f2-b734-ed8042d0702d",
        },
        replyToId: "4d1c1860-89de-42f2-b734-ed8042d0702d|000001",
      },
    ],
    [
      {
        type: "message",
        text: "Hi! I'm your prince. Welcome to Colive",
        value: {
          sender: "bot",
          status: "Talking with Bot",
        },
        id: "4d1c1860-89de-42f2-b734-ed8042d0702d|000001",
        timestamp: "2023-09-25T13:17:38.182Z",
        channelId: "directline",
        from: {
          id: "polynomial-coco-solution-dev",
          name: "polynomial-coco-solution-dev",
        },
        conversation: {
          id: "4d1c1860-89de-42f2-b734-ed8042d0702d",
        },
        replyToId: "4d1c1860-89de-42f2-b734-ed8042d0702d|000001",
      },
    ],
  ];
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
      console.log("scrollRef.current", scrollRef.current.scrollHeight);
    }
  };

  const setArray = (component: JSX.Element) => {
    setChatComponentArray((prevChartArray) => [...prevChartArray, component]);
  };
  const replyFunction = (data: any) => {
    if (data.activities) {
      const activities: any[] = data.activities;
      dispatch(setChatArray([[...activities]]));
    }
  };
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const radiusParam = searchParams.get("radius");
    const cartTemplate: any = searchParams.get("conversationCart");
    const data = JSON.parse(decodeURIComponent(cartTemplate));
    setTitle(data?.title);
    const botIconParams: any = searchParams.get("botIcon");
    if (cartTemplate) {
      dispatch(
        setConversationUI({
          fontFamily: data?.fontFamily || "poppins",
          conversationFontStyle: data?.conversationFontStyle,
          timeStampFontStyle: data?.timeStampFontStyle,
          greetingMessage: data?.title,
        })
      );
    }
    const themeParams: any = searchParams.get("theme");
    const themeParamsData = JSON.parse(decodeURIComponent(themeParams));
    const botIconParamsData = JSON.parse(decodeURIComponent(botIconParams));
    if (
      themeParams &&
      radiusParam &&
      botIconParams &&
      themeParamsData !== undefined &&
      radiusParam !== undefined &&
      botIconParamsData !== undefined
    ) {
      dispatch(
        setThemeColor({
          theme: themeParamsData,
          botIcons: botIconParamsData,
          actionButtonBorder: radiusParam,
        })
      );
    }
  }, [window.location.search]);
  useEffect(() => {
    if (reviewToken) {
      setChatComponentArray([
        <TimeStamp date={new Date().toISOString()} />,
        <ChatWrapper type="bot">
          <div className="flex flex-col chatWrapper">
            <BotMessageCard
              contentArray="I am Honeysys bot. I will assist you in experiencing a new turn to bot powered ecommerce platform"
              imageSrc="/images/greeting.svg"
              title={greetingMessage}
            />
            <ActionButton
              src="/images/widgets.svg"
              text="Get Started"
              onClick={() => {}}
            />
          </div>
        </ChatWrapper>,
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
      ]);
    }
  }, [title, greetingMessage, botIcon]);

  useEffect(() => {
    if (!reviewToken && ChatComponentArray.length === 0) {
      setChatComponentArray([
        ...ChatComponentArray,
        <GetStart
          setChatArray={setChatComponentArray}
          key={new Date().getTime()}
        />,
      ]);
    }
    if (!reviewToken && botType === "") {
      // dispatch(setChatArray([...chat]));
      // fetchBot(environment.botType)
      //   .then((data) => {
      //     dispatch(setBotInfo(data.data.data[0]));
      //     const botInfo = data.data.data[0];
      if (convId) {
        console.log(convId);
      } else {
        let botType = "e-comm";
        // let token = botInfo.botDeploymentInfo?.directLine_secret || "";
        getConversationId(botType)
          .then((data: any) => {
            // dispatch(setConvId(userId));
            dispatch(setConvId(data?.data?.conversationId));
            // dispatch(setChatArray(data?.data?.chats));
            dispatch(setBotType(data?.data?.botType));
            const endpoint = environment.directlineURL;
            const socket = io(endpoint, {
              query: { conversationId: data.data.conversationId },
              path: "/socket.io",
            });
            // init message
            const newData = {
              conversationId: data?.data?.conversationId,
              text: "init",
              voiceFlag: false,
            };
            dispatch(getChatData({ newData, botType }));
            socket.on("sendMessage", (message) => {
              if (message.data.isUpdated === true) {
                dispatch(setUiUpdate(true));
              } else {
                dispatch(setUiUpdate(false));
              }
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
      // })
      // .catch((error) => {
      //   console.log(error);
      // });
    }

    return () => {
      setChatComponentArray([]);
    };
  }, []);
  useEffect(() => {
    console.log("ChatArray", ChatArray);
    ChatArray.map((activity: any, index: number) => {
      setArray(
        <ChatWrapper
          type={activity[0]?.value?.sender === "user" ? "user" : "bot"}
          key={new Date().getTime() + index}
        >
          <div className="chatWrapper">
            {activity.map((activity: any, index: number) => {
              if (
                activity.type === "message" &&
                activity.text ===
                  "It seems you have to login first to access the above service. Please provide your mobile number"
              ) {
                return dispatch(setUiUpdate(true));
              }
              if (
                activity.type === "message" &&
                activity.text === "Come back later"
              ) {
                return dispatch(setUiUpdate(false));
              }
              if (activity.type === "message" && activity.text !== "") {
                console.log("text", activity.text);
                if (
                  activity.text ===
                  "Sorry an error occured while processing the request"
                ) {
                  dispatch(setUiUpdate(true));
                } else {
                  dispatch(setUiUpdate(false));
                }

                return (
                  <div className="w-full">
                    {activity?.value?.sender === "user" ? (
                      <UserMessageCard content={activity?.text} />
                    ) : (
                      <BotMessageCard title={activity?.text} />
                    )}
                  </div>
                );
              }
              if (
                activity.type === "richCard" &&
                activity.value.data.length !== 0
              ) {
                const richCard = activity.value.data;
                console.log("richCard", richCard);
                return (
                  <div className="w-full">
                    {activity?.value?.sender === "user" ? (
                      <></>
                    ) : (
                      // <UserMessageCard content={activity?.text} />
                      richCard.map((richCard: any, index: number) => {
                        return (
                          <BotMessageCard
                            title={richCard.title}
                            contentArray={richCard.description}
                            imageSrc={richCard.imageURL}
                            botIcon={richCard.botIcon}
                            key={index}
                          />
                        );
                      })
                    )}
                  </div>
                );
              }
              if (
                activity.type === "iconQuickReply" &&
                activity.value.data.length !== 0
              ) {
                const iconQuickReplyCard = activity.value.data;
                console.log("iconQuickReplyCard", iconQuickReplyCard);
                return (
                  <div className=" w-[266px]">
                    {activity?.value?.sender === "user" ? (
                      <></>
                    ) : (
                      <BotMessageCard actionDataArray={iconQuickReplyCard} />
                    )}
                  </div>
                );
              }
              if (
                activity.type === "summaryCard" &&
                activity.value.data.length !== 0
              ) {
                const summaryCard: any = activity.value.data;
                return (
                  <div className=" w-full">
                    {activity?.value?.sender === "user" ? (
                      <></>
                    ) : (
                      summaryCard.map((summaryCard: any, index: number) => {
                        return (
                          <BotMessageCard
                            key={index}
                            title=""
                            contentArray={[
                              <div> {summaryCard.topText}</div>,

                              <SummaryCard
                                className="w-full mt-3"
                                image={
                                  <img
                                    src="/images/onion.svg"
                                    alt=""
                                    className="h-[60px] w-[60px] rounded-md"
                                  />
                                }
                                priceList={summaryCard.price}
                                subtitle={summaryCard.subtitle}
                                title={summaryCard.title}
                                totalAmount={summaryCard.totalAmount}
                                totaltitle={summaryCard.totaltitle}
                              />,
                              <Text
                                type="body"
                                size="md"
                                className="font-semibold mt-3 mb-1"
                              >
                                {summaryCard.bottomText}
                              </Text>,
                            ]}
                          />
                        );
                      })
                    )}
                  </div>
                );
              }
            })}
          </div>
        </ChatWrapper>
      );
    });
  }, [ChatArray]);
  // useEffect(() => {
  //   ChatArray.forEach((activity: any, index: number) => {
  //     activity.forEach((activity: any, index: number) => {
  //       if (
  //         activity.type === "message" &&
  //         activity.text ===
  //           "It seems you have to login first to access the above service. Please provide your mobile number"
  //       ) {
  //         dispatch(setUiUpdate(true));
  //       } else if (
  //         activity.type === "message" &&
  //         activity.text === "Come back later"
  //       ) {
  //         dispatch(setUiUpdate(false));
  //       } else if (activity.type === "message" && activity.text !== "") {
  //         setArray(
  //           <ChatWrapper
  //             type={activity?.value?.sender === "user" ? "user" : "bot"}
  //             key={new Date().getTime() + index}
  //           >
  //             <div className="chatWrapper">
  //               {activity?.value?.sender === "user" ? (
  //                 <UserMessageCard content={activity?.text} />
  //               ) : (
  //                 <BotMessageCard title={activity?.text} />
  //               )}
  //             </div>
  //           </ChatWrapper>
  //         );
  //       } else if (
  //         activity.type === "richCard" &&
  //         activity.value.data.length !== 0
  //       ) {
  //         const richCard = activity.value.data;
  //         console.log("activity", richCard.botIcon);
  //         setArray(
  //           <ChatWrapper
  //             type={activity?.value?.sender === "user" ? "user" : "bot"}
  //             key={new Date().getTime() + index}
  //           >
  //             <div className="chatWrapper">
  //               {activity?.value?.sender === "user" ? (
  //                 <></>
  //               ) : (
  //                 // <UserMessageCard content={activity?.text} />
  //                 <BotMessageCard
  //                   title={richCard.title}
  //                   contentArray={richCard.description}
  //                   imageSrc={richCard.imageURL}
  //                   botIcon={richCard.botIcon}
  //                 />
  //               )}
  //             </div>
  //           </ChatWrapper>
  //         );
  //       } else if (
  //         activity.type === "iconQuickReply" &&
  //         activity.value.data.length !== 0
  //       ) {
  //         const iconQuickReplyCard = activity.value.data;
  //         console.log("activity", iconQuickReplyCard);
  //         setArray(
  //           <ChatWrapper
  //             type={activity?.value?.sender === "user" ? "user" : "bot"}
  //             // key={new Date().getTime() + index}
  //           >
  //             <div className="chatWrapper w-full">
  //               {activity?.value?.sender === "user" ? (
  //                 <></>
  //               ) : (
  //                 <BotMessageCard actionDataArray={iconQuickReplyCard} />
  //               )}
  //             </div>
  //           </ChatWrapper>
  //         );
  //       }
  //       // type paragraph
  //       else if (activity.type === "paragraph" && activity.value.text) {
  //         let text = activity.value.text;
  //         text.replace("<p>", "");
  //         text.replace("</p>", "");
  //         setArray(
  //           <ChatWrapper
  //             type={activity.value?.sender === "user" ? "user" : "bot"}
  //             key={new Date().getTime() + index}
  //           >
  //             <div className="chatWrapper">
  //               {activity.value.sender === "user" ? (
  //                 <UserMessageCard content={activity.text} />
  //               ) : (
  //                 <BotMessageCard title={text} />
  //               )}
  //             </div>
  //           </ChatWrapper>
  //         );
  //       }
  //       // else if (
  //       //   activity.type === "plainQuickReply" &&
  //       //   activity.value.data.length !== 0
  //       // ) {
  //       //   setArray(
  //       //     <ChatWrapper
  //       //       type={activity?.value?.sender === "user" ? "user" : "bot"}
  //       //       key={new Date().getTime() + index}
  //       //     >
  //       //       <div className="chatWrapper">
  //       //         {activity?.value?.sender === "user" ? (
  //       //           <UserMessageCard content={activity.value.data} />
  //       //         ) : (
  //       //           <BotMessageCard contentArray={activity.value.data} />
  //       //         )}
  //       //       </div>
  //       //     </ChatWrapper>
  //       //   );
  //       // }
  //     });
  //   });
  // }, [ChatArray]);

  useEffect(() => {
    scroll();
  }, [ChatComponentArray, isLoadingVisible]);
  const [pageNumber, setPageNumber] = useState(0);
  const fetchData = () => {
    setTimeout(() => {
      let data = paginationChat.slice(pageNumber, 2);
      console.log("pageNumber", pageNumber, ":", "data", data);
      data.map((activity: any, index: number) => {
        setArray(
          <ChatWrapper
            type={activity[0]?.value?.sender === "user" ? "user" : "bot"}
            key={new Date().getTime() + index}
          >
            <div className="w-full">
              {activity.map((activity: any, index: number) => {
                if (
                  activity.type === "message" &&
                  activity.text ===
                    "It seems you have to login first to access the above service. Please provide your mobile number"
                ) {
                  return dispatch(setUiUpdate(true));
                }
                if (
                  activity.type === "message" &&
                  activity.text === "Come back later"
                ) {
                  return dispatch(setUiUpdate(false));
                }
                if (activity.type === "message" && activity.text !== "") {
                  return (
                    <div className="chatWrapper">
                      {activity?.value?.sender === "user" ? (
                        <UserMessageCard content={activity?.text} />
                      ) : (
                        <BotMessageCard title={activity?.text} />
                      )}
                    </div>
                  );
                }
                if (
                  activity.type === "richCard" &&
                  activity.value.data.length !== 0
                ) {
                  const richCard = activity.value.data;
                  return (
                    <div className="chatWrapper">
                      {activity?.value?.sender === "user" ? (
                        <></>
                      ) : (
                        // <UserMessageCard content={activity?.text} />
                        <BotMessageCard
                          title={richCard.title}
                          contentArray={richCard.description}
                          imageSrc={richCard.imageURL}
                          botIcon={richCard.botIcon}
                        />
                      )}
                    </div>
                  );
                }
                if (
                  activity.type === "iconQuickReply" &&
                  activity.value.data.length !== 0
                ) {
                  const iconQuickReplyCard = activity.value.data;

                  return (
                    <div className="chatWrapper w-full">
                      {activity?.value?.sender === "user" ? (
                        <></>
                      ) : (
                        <BotMessageCard actionDataArray={iconQuickReplyCard} />
                      )}
                    </div>
                  );
                }
                if (
                  activity.type === "summaryCard" &&
                  activity.value.data.length !== 0
                ) {
                  const summaryCard: any = activity.value.data;
                  return (
                    <div className="chatWrapper w-full">
                      {activity?.value?.sender === "user" ? (
                        <></>
                      ) : (
                        <BotMessageCard
                          title=""
                          contentArray={[
                            <div> {summaryCard.topText}</div>,
                            <SummaryCard
                              className="w-full mt-3"
                              image={
                                <img
                                  src="/images/onion.svg"
                                  alt=""
                                  className="h-[60px] w-[60px] rounded-md"
                                />
                              }
                              priceList={summaryCard.price}
                              subtitle={summaryCard.subtitle}
                              title={summaryCard.title}
                              totalAmount={summaryCard.totalAmount}
                              totaltitle={summaryCard.totaltitle}
                            />,
                            <Text
                              type="body"
                              size="md"
                              className="font-semibold mt-3 mb-1"
                            >
                              {summaryCard.bottomText}
                            </Text>,
                          ]}
                        />
                      )}
                    </div>
                  );
                }
              })}
            </div>
          </ChatWrapper>
        );
      });
      setPageNumber(pageNumber + 1);
    }, 500);
    // console.log("data", data);
    // const fetchDataApi=async()=>{
    //   const res=await axios();
    // }
    // fetchDataApi();
    // dispatch(setChatArray([...data]))
  };
  const timelineRef = useRef<any>();
  console.log("ChatComponentArray", ChatComponentArray);
  return (
    <div
      className="w-full bg-background text-primary text-[40px] font-bold"
      style={{ height: "calc(100vh - 118px)", marginBottom: 65 }}
    >
      <div
        ref={scrollRef}
        className="bg-background h-full overflow-y-auto py-5"
      >
        {/* <div
          id="scrollableDiv"
          style={{
            height: "100%",
            overflow: "auto",
            display: "flex",
            flexDirection: "column-reverse",
          }}
          ref={timelineRef}
        >
          <InfiniteScroll
            dataLength={ChatComponentArray.length}
            next={fetchData}
            style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.
            inverse={true}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            scrollableTarget="scrollableDiv"
          >
            {ChatComponentArray.reverse()}
            {isLoadingVisible && !reviewToken && <Loading />}
          </InfiniteScroll>
        </div> */}
        {ChatComponentArray}
        {isLoadingVisible && !reviewToken && <Loading />}
        {/* {botIcon ? <img src={botIcon} height="50px" width="50px"></img> : ""} */}
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
