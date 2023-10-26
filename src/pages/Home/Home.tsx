import { useEffect, useState, useRef } from "react";
import { getConversationId } from "../../services";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { environment } from "../../environments/environment";
import { setBotType, setConvId } from "../../slices/botSlice";
import { encrypt } from "../../services/aes";
import { io } from "socket.io-client";
import {
  getChatData,
  setChatArray,
  addToChatArray,
  setUiUpdate,
  setCart,
  setTotalQuantity,
  setGetStartDisplay,
} from "../../slices/homeSlice";
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
import {
  ReplyCard,
  RichCard,
  SummaryCard,
  Text,
} from "@polynomialai/alpha-react";
import InfiniteScroll from "react-infinite-scroll-component";
import axiosInstance from "../../lib/axiosInstance";
import axios from "axios";
import CartReplyCard from "../../components/Resuable/CartReplyCard";
const Home = () => {
  const dispatch = useAppDispatch();
  const reviewToken = localStorage.getItem("reviewToken");
  const [title, setTitle] = useState<string | null>(null);
  const conversationUI = useAppSelector((state) => state.root.conversationUI);
  const greetingMessage = conversationUI.greetingMessage;
  const overallThemeUI = useAppSelector((state) => state.root.overallThemeUI);
  const getStartDisplay = useAppSelector((state) => state.home.getStartDisplay);
  const botIcon = overallThemeUI.botIcons;

  const convId = useAppSelector((state) => state.bot.convId);
  const botType = useAppSelector((state) => state.bot.botType);
  const loading = useAppSelector((state) => state.home.loading);
  const ChatArray = useAppSelector((state) => state.home.ChatArray);
  const UiUpdate = useAppSelector((state) => state.home.UiUpdate);
  const [ChatComponentArray, setChatComponentArray] = useState<JSX.Element[]>(
    []
  );
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isLoadingVisible, setLoadingVisible] = useState(false);
  const loadingDelayTimeout = useRef<number | undefined>(undefined);

  const chat = [
    // [
    //   {
    //     type: "cartReplyCard",
    //     value: {
    //       data: [
    //         {
    //           imageSrc:
    //             "https://fuchsna.wpenginepowered.com/wp-content/uploads/2020/01/AdobeStock_221818930-1-1024x683.jpeg",
    //           totalAmount: 3500,
    //           totalItems: 6,
    //         },
    //       ],
    //       sender: "user",
    //       status: "Talking with Bot",
    //     },
    //     timestamp: "2023-09-22T11:03:34.323Z",
    //   },
    // ],
    // [
    //   {
    //     type: "message",
    //     text: "Hi! I'm your SHONA. Welcome to Colive",
    //     value: {
    //       sender: "bot",
    //       status: "Talking with Bot",
    //     },
    //     id: "4d1c1860-89de-42f2-b734-ed8042d0702d|000001",
    //     timestamp: "2023-09-25T13:17:38.182Z",
    //     channelId: "directline",
    //     from: {
    //       id: "polynomial-coco-solution-dev",
    //       name: "polynomial-coco-solution-dev",
    //     },
    //     conversation: {
    //       id: "4d1c1860-89de-42f2-b734-ed8042d0702d",
    //     },
    //     replyToId: "4d1c1860-89de-42f2-b734-ed8042d0702d|000001",
    //   },
    // ],
    [
      {
        type: "message",
        text: "Check out our services!",
        value: {
          sender: "user",
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
              title: "👋 Got you!",
              description: [
                "Your address is “Jiya Sharma, Ocean View Apartment, D-302, Test Lane, Street 3, 12th Street, Custom Lane, Tested Street, Custom Tested sector",
              ],
            },
          ],

          sender: "bot",
          status: "Talking with Bot",
        },
        // quickReplay: [
        //   {
        //     text: "View Catalog",
        //     iconUrl:
        //       "https://coliveshona.blob.core.windows.net/coliveshonabot/Raise%20a%20request.png",
        //     value: "",
        //   },
        //   {
        //     text: "Change Location",
        //     iconUrl:
        //       "https://coliveshona.blob.core.windows.net/coliveshonabot/Raise%20a%20request.png",
        //     value: "",
        //   },
        // ],
        timestamp: "2023-09-22T11:03:34.323Z",
      },
      {
        type: "iconQuickReply",

        value: {
          content: [
            "Welcome to HoneySys Bot powered e-commerce experience.",
            "  I will assist you in shopping for your product discovery, cart management and checkout experiences.",
          ],
          data: [
            {
              text: "1",
              iconUrl:
                "https://coliveshona.blob.core.windows.net/coliveshonabot/Raise%20a%20request.png",
              value: "viewCatalog",
            },

            {
              text: "2",
              iconUrl:
                "https://coliveshona.blob.core.windows.net/coliveshonabot/Raise%20a%20request.png",
              value: "changeLocation",
            },
            {
              text: "Provide location",
              iconUrl:
                "https://coliveshona.blob.core.windows.net/coliveshonabot/Raise%20a%20request.png",
              value: "provideLocation",
            },
          ],
          sender: "bot",
          status: "Talking with Bot",
        },
        timestamp: "2023-09-25T13:17:38.184Z",
      },
    ],
    [
      {
        type: "paymentCard",
        value: {
          data: [
            {
              orderId: "#532612378",
              totalAmount: 450,
              totalItems: 2,
              content: [
                "Thank you for Jiya for shopping with us at Honeysys Ecommerce.",
                "Here’s a quick update on your order with order ID #532612378.Total amount: ₹ 310.00",
                "While we are preparing your order, please take a moment to share your feedback with us.",
              ],
            },
          ],
          sender: "bot",
          status: "Talking with Bot",
        },
        timestamp: "2023-09-25T13:17:38.184Z",
      },
    ],
    // [
    //   {
    //     type: "summaryCard",
    //     value: {
    //       data: [
    //         {
    //           imageURL:
    //             "https://res.cloudinary.com/dqbub4vtj/image/upload/v1695378166/ltvgaegj6h43iqfssjcr.jpg",
    //           quantity: "",
    //           price: [
    //             {
    //               price: "₹ 316.00",
    //               title: "Estimated Price",
    //             },
    //             {
    //               price: "₹ 20.00",
    //               title: "Delivery Charges",
    //             },
    //           ],
    //           subtitle: "Quantity 6",
    //           title: "Fresh onions (500gm), Tomatoes (500gm)",
    //           totalAmount: "₹ 314.00",
    //           totaltitle: "Total Amount",
    //           topText: "Great! The total payable amount for this order is. 👇",
    //           bottomText: " Hurry, order now before the products sell out.",
    //         },
    //       ],

    //       sender: "bot",
    //       status: "Talking with Bot",
    //     },
    //     timestamp: "2023-09-22T11:03:34.323Z",
    //   },
    // ],
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
        text: "Hi! I'm your dhruvil. Welcome to Colive",
        value: {
          sender: "bot",
          status: "Talking with Bot",
        },
        id: "4d1c1860-89de-42f2-b734-ed8042d0702d|000001",
        timestamp: "2023-09-25T14:17:38.182Z",
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
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      // scrollRef.current.scrollTo({
      //   top: scrollRef.current.scrollHeight,
      //   // behavior:"auto"
      //   behavior:'instant'
      //   // behavior: "smooth",
      // });
    }
  };

  const setArray = (component: JSX.Element) => {
    setChatComponentArray((prevChartArray) => [...prevChartArray, component]);
  };
  const replyFunction = (data: any) => {
    if (data?.activities) {
      const activities: any[] = data?.activities;
      dispatch(addToChatArray(activities));
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

  // useEffect(() => {
  //   if (!reviewToken && ChatComponentArray.length === 0) {
  //     // if (!reviewToken) {
  //     // dispatch(
  //     //   addToChatArray([
  //     //     {
  //     //       type: "get start",
  //     //       timestamp: "2023-09-25T13:17:38.182Z",
  //     //     },
  //     //   ])
  //     // );
  //     // setChatComponentArray([
  //     //   ...ChatComponentArray,
  //     //   <GetStart
  //     //     setChatArray={setChatComponentArray}
  //     //     key={new Date().getTime()}
  //     //   />,
  //     // ]);
  //   }
  //   if (!reviewToken && botType === "") {
  //     // dispatch(setChatArray([...chat]));
  //     // fetchBot(environment.botType)
  //     //   .then((data) => {
  //     //     dispatch(setBotInfo(data.data.data[0]));
  //     //     const botInfo = data.data.data[0];
  //     if (convId) {
  //     } else {
  //       let botType = "e-comm";
  //       // let token = botInfo.botDeploymentInfo?.directLine_secret || "";
  //       getConversationId(botType)
  //         .then((data: any) => {
  //           // dispatch(setConvId(userId));
  //           dispatch(setConvId(data?.data?.conversationId));
  //           // dispatch(setChatArray(data?.data?.chats));
  //           // dispatch(setBotType(data?.data?.botType));
  //           const endpoint = environment.directlineURL;
  //           const socket = io(endpoint, {
  //             query: { conversationId: convId },
  //             path: "/socket.io",
  //           });
  //           const newData = {
  //             conversationId: data?.data?.conversationId,
  //             text: "init",
  //             voiceFlag: false,
  //           };
  //           dispatch(getChatData({ newData, botType }))
  //             .then(() => {})
  //             .catch(() => {
  //               dispatch(setChatArray([...chat]));
  //             });
  //           socket.on("sendMessage", (message) => {
  //             if (message.data && message.data !== "") {
  //               let data = message.data;
  //               replyFunction(data);
  //             }
  //           });
  //           socket.on("error", (error) => {});
  //         })
  //         .catch((error) => {});
  //     }
  //     // })
  //     // .catch((error) => {
  //     //
  //     // });
  //   }
  //   if (botType !== "" && convId) {
  //     const endpoint = environment.directlineURL;
  //     const socket = io(endpoint, {
  //       query: { conversationId: convId },
  //       path: "/socket.io",
  //     });
  //     socket.on("sendMessage", (message) => {
  //       if (message.data && message.data !== "") {
  //         let data = message.data;

  //         replyFunction(data);
  //       }
  //     });
  //     socket.on("error", (error) => {
  //       // dispatch(setChatArray([...chat]));
  //     });
  //   }

  //   return () => {
  //     setChatComponentArray([]);
  //   };
  // }, []);

  useEffect(() => {
    if (!reviewToken) {
      // dispatch(setChatArray([...chat]));
      getConversationId(botType, convId)
        .then((data: any) => {
          if (data.status === 200 && !getStartDisplay) {
            if (data?.data?.chats) {
              data?.data?.chats.map((item: any, index: number) => {
                replyFunction(item);
              });
              // dispatch(setChatArray(data?.data?.chats));
            }
          }
          const endpoint = environment.directlineURL;
          const socket = io(endpoint, {
            query: { conversationId: convId },
            path: "/socket.io",
          });
          if (!getStartDisplay) {
            const newData = {
              conversationId: convId,
              text: "getStarted",
              isCahtVisible: false,
              voiceFlag: false,
            };
            dispatch(getChatData({ newData, botType }))
              .then(() => {
                dispatch(setGetStartDisplay(true));
              })
              .catch(() => {});
          }
          socket.on("sendMessage", (message) => {
            if (message.data && message.data !== "") {
              let data = message.data;
              replyFunction(data);
            }
          });
          socket.on("error", (error) => {});
        })
        .catch((error) => {});

      // if (botType !== "" && convId) {
      //   const endpoint = environment.directlineURL;
      //   const socket = io(endpoint, {
      //     query: { conversationId: convId },
      //     path: "/socket.io",
      //   });
      //   socket.on("sendMessage", (message) => {
      //     if (message.data && message.data !== "") {
      //       let data = message.data;

      //       replyFunction(data);
      //     }
      //   });
      //   socket.on("error", (error) => {
      //   });
      // }
    }
    return () => {
      setChatComponentArray([]);
    };
  }, []);

  const ChatDataSetter = (
    activity: any[],
    i: number,
    j: number,
    flag: boolean
  ) => {
    console.log("act", activity);
    return (
      <ChatWrapper
        type={activity[i]?.value?.sender === "user" ? "user" : "bot"}
        key={new Date().getTime()}
      >
        <div className="chatWrapper">
          {activity?.map((ac: any, index: number) => {
            if (index >= i && index < j) {
              if (ac["sub_type"] && ac["sub_type"] === "screen") {
              } else if (ac?.type === "get start") {
                return (
                  <div className="w-full">
                    <GetStart
                      setChatArray={setChatComponentArray}
                      key={new Date().getTime()}
                    />
                  </div>
                );
              } else if (ac?.type === "message" && ac?.text !== "") {
                if (ac?.updateUI === true) {
                  dispatch(setUiUpdate(true));
                } else {
                  dispatch(setUiUpdate(false));
                }

                return (
                  <div className="w-full">
                    {ac?.value?.sender === "user" ? (
                      <UserMessageCard
                        content={ac?.text}
                        time={ac?.timestamp}
                      />
                    ) : (
                      <BotMessageCard title={ac?.text} time={ac?.timestamp} />
                    )}
                  </div>
                );
              } else if (
                ac?.type === "richCard" &&
                ac?.value?.data?.length !== 0
              ) {
                const richCard = ac?.value?.data;
                return (
                  <div className="w-full">
                    {ac?.value?.sender === "user" ? (
                      <></>
                    ) : (
                      Array.isArray(richCard) &&
                      richCard?.map((richCard: any, index: number) => {
                        return (
                          <BotMessageCard
                            title={richCard?.title}
                            time={ac?.timestamp}
                            contentArray={richCard?.description}
                            imageSrc={richCard?.imageURL}
                            botIcon={richCard?.botIcon}
                            key={index}
                          />
                        );
                      })
                    )}
                  </div>
                );
              } else if (
                ac?.type === "iconQuickReply" &&
                ac?.value?.data?.length !== 0
              ) {
                const iconQuickReplyCard = ac?.value?.data;
                return (
                  <div className=" w-full">
                    {ac?.value?.sender === "user" ? (
                      <></>
                    ) : (
                      <BotMessageCard
                        actionDataArray={
                          Array.isArray(iconQuickReplyCard)
                            ? iconQuickReplyCard
                            : []
                        }
                        flag={flag}
                        buttonContent={ac?.value?.contant}
                      />
                    )}
                  </div>
                );
              } else if (
                ac?.type === "summaryCard" &&
                ac?.value?.data?.length !== 0
              ) {
                const summaryCard: any = ac?.value?.data;
                return (
                  <div className=" w-full">
                    {ac?.value?.sender === "user" ? (
                      <></>
                    ) : (
                      Array.isArray(summaryCard) &&
                      summaryCard?.map((summaryCard: any, index: number) => {
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
              } else if (
                ac?.type === "trackOrder" &&
                ac?.value?.data?.length !== 0
              ) {
                const trackOrderCard = ac?.value?.data;
                return (
                  <div className="w-full">
                    {ac?.value?.sender === "user" ? (
                      <></>
                    ) : (
                      Array.isArray(trackOrderCard) &&
                      trackOrderCard?.map(
                        (trackOrderCard: any, index: number) => {
                          return (
                            <RichCard>
                              <>
                                <div className="relative">
                                  <ReplyCard
                                    className="w-full"
                                    title="Honeysys Bot"
                                    titleCN="text-primary"
                                  >
                                    <div className="flex flex-col justify-evenly w-full">
                                      <Text
                                        type="body"
                                        size="sm"
                                        className="text-[#505050]"
                                      >
                                        {`🛒 Order ${trackOrderCard.orderId}`}
                                      </Text>
                                      <Text
                                        type="label"
                                        size="lg"
                                        className="text-[#505050]"
                                      >
                                        {`Total ${trackOrderCard.totalItems} items ₹ ${trackOrderCard.totalAmount} `}
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
                                  {`${trackOrderCard?.orderNo}`}{" "}
                                  <span className="font-semibold">
                                    {`${trackOrderCard?.deliveryDate}`}
                                  </span>
                                  {`- ${trackOrderCard?.items} -`}
                                  <span className="font-semibold">
                                    {` ₹ ${trackOrderCard?.totalAmount}`}
                                  </span>{" "}
                                  - Delivered
                                </div>
                              </>
                            </RichCard>
                          );
                        }
                      )
                    )}
                  </div>
                );
              }
              if (ac?.type === "paymentCard" && ac?.value?.data?.length !== 0) {
                const paymentCard = ac?.value?.data;

                if (paymentCard[0]?.isOrderPlaced === true) {
                  dispatch(setCart([]));
                  dispatch(setTotalQuantity(0));
                }

                return (
                  <div className="w-full">
                    {ac?.value?.sender === "user" ? (
                      <></>
                    ) : (
                      Array.isArray(paymentCard) &&
                      paymentCard?.map((paymentCard: any, index: number) => {
                        return (
                          <RichCard>
                            <>
                              <div className="relative">
                                <ReplyCard
                                  className="w-full"
                                  title="Honeysys Bot"
                                  titleCN="text-primary"
                                >
                                  <div className="flex flex-col justify-evenly w-full">
                                    <Text
                                      type="body"
                                      size="sm"
                                      className="text-[#505050]"
                                    >
                                      {`🛒 Order ${paymentCard.orderId}`}
                                    </Text>
                                    <Text
                                      type="label"
                                      size="lg"
                                      className="text-[#505050]"
                                    >
                                      {`Total ${paymentCard.totalItems} items ₹ ${paymentCard.totalAmount} `}
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
                              <div className="flex ms-1 align-middle">
                                <img
                                  src="/images/rupee.svg"
                                  height="24"
                                  width="24"
                                  alt=""
                                ></img>
                                <div className="m-2 ">
                                  <div className="text-[14px] text-[black] flex">
                                    <div className="font-normal me-1">
                                      Payment to
                                    </div>{" "}
                                    Honeysys
                                  </div>
                                  <div className="text-[#075E54] text-[12px] font-normal">
                                    Successful
                                  </div>
                                </div>
                              </div>
                              {paymentCard?.content?.map(
                                (item: string, index: number) => (
                                  <div className="text-[14px] font-normal">
                                    {item}
                                  </div>
                                )
                              )}
                            </>
                          </RichCard>
                        );
                      })
                    )}
                  </div>
                );
              } else if (
                ac?.type === "replyMessage" &&
                ac?.value?.data?.length !== 0
              ) {
                const replyMessageCard = ac.value.data;
                return (
                  <div className="w-full">
                    {Array.isArray(replyMessageCard) &&
                      replyMessageCard?.map(
                        (replyMessageCard: any, index: number) => {
                          return (
                            <ReplyMessageCard
                              time={ac?.timestamp}
                              content={`${replyMessageCard?.content}`}
                              replyArray={replyMessageCard?.replayArray}
                            />
                          );
                        }
                      )}
                  </div>
                );
              } else if (
                ac?.type === "cartReplyCard" &&
                ac?.value?.data?.length !== 0
              ) {
                const cartReplyCard = ac?.value?.data;
                return (
                  <div className="w-full">
                    {ac?.value?.sender === "bot" ? (
                      <></>
                    ) : (
                      Array.isArray(cartReplyCard) &&
                      cartReplyCard?.map(
                        (cartReplyCard: any, index: number) => {
                          return (
                            <CartReplyCard
                              time={ac?.timestamp}
                              imageSrc={cartReplyCard?.imageSrc}
                              price={cartReplyCard?.totalAmount}
                              items={cartReplyCard?.totalItems}
                            />
                          );
                        }
                      )
                    )}
                  </div>
                );
              }
            }
          })}
        </div>
      </ChatWrapper>
    );
  };
  const formatedDate = (data: any) => {
    let date = new Date(data);
    const formattedDate = date.toLocaleString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
      // hour: "numeric",
      // minute: "numeric",
      // hour12: true,
    });
    // .replace(" at", "");
    return formattedDate;
  };
  useEffect(() => {
    setChatComponentArray(
      ChatArray?.map((activity: any, index: number) => {
        if (
          activity.length === 1 &&
          activity[0].sub_type &&
          activity[0].sub_type === "screen"
        ) {
          return <></>;
        }
        let i = 0;
        let j = 0;
        let flag = false;
        if (index === ChatArray.length - 1) {
          flag = true;
        } else {
          flag = false;
        }
        return (
          <>
            {/* <TimeStamp date={new Date().toISOString()} /> */}

            {(() => {
              let ComponentArray = [];

              if (index < ChatArray.length) {
                let date = ChatArray[index][0]?.timestamp;
                let date1 =
                  index - 1 >= 0
                    ? ChatArray[index - 1][0]?.timestamp
                    : "January 1, 1570";
                let dateTime1 = formatedDate(date);
                let dateTime2 = formatedDate(date1);
                if (dateTime1 !== dateTime2) {
                  ComponentArray.push(<TimeStamp date={date} />);
                }
              }

              while (i < activity.length && j < activity.length) {
                if (activity[i]?.value?.sender === activity[j]?.value?.sender) {
                  j++;
                } else {
                  let Iindex = i;
                  i = j;
                  ComponentArray.push(
                    ChatDataSetter(activity, Iindex, j, flag)
                  );
                }
              }
              ComponentArray.push(ChatDataSetter(activity, i, j, flag));
              // console.log("ChatDataSetter",activity)
              return ComponentArray;
            })()}
          </>
        );
      })
    );
  }, [ChatArray]);

  useEffect(() => {
    scroll();
  }, [ChatComponentArray, isLoadingVisible]);
  const [pageNumber, setPageNumber] = useState(0);
  // const fetchData = () => {
  //   setTimeout(() => {
  //     let data = paginationChat.slice(pageNumber, 2);
  //     data?.map((activity: any, index: number) => {
  //       setArray(
  //         <ChatWrapper
  //           type={activity[0]?.value?.sender === "user" ? "user" : "bot"}
  //           key={new Date().getTime() + index}
  //         >
  //           <div className="w-full">
  //             {activity?.map((activity: any, index: number) => {
  //               // if (
  //               //   activity.type === "message" &&
  //               //   activity.text ===
  //               //     "It seems you have to login first to access the above service. Please provide your mobile number"
  //               // ) {
  //               //   return dispatch(setUiUpdate(true));
  //               // }
  //               // if (
  //               //   activity.type === "message" &&
  //               //   activity.text === "Come back later"
  //               // ) {
  //               //   return dispatch(setUiUpdate(false));
  //               // }
  //               if (activity.type === "message" && activity.text !== "") {
  //                 return (
  //                   <div className="chatWrapper">
  //                     {activity?.value?.sender === "user" ? (
  //                       <UserMessageCard content={activity?.text} />
  //                     ) : (
  //                       <BotMessageCard title={activity?.text} />
  //                     )}
  //                   </div>
  //                 );
  //               }
  //               if (
  //                 activity.type === "richCard" &&
  //                 activity.value.data.length !== 0
  //               ) {
  //                 const richCard = activity?.value?.data;
  //                 return (
  //                   <div className="chatWrapper">
  //                     {activity?.value?.sender === "user" ? (
  //                       <></>
  //                     ) : (
  //                       // <UserMessageCard content={activity?.text} />
  //                       <BotMessageCard
  //                         title={richCard.title}
  //                         contentArray={richCard.description}
  //                         imageSrc={richCard.imageURL}
  //                         botIcon={richCard.botIcon}
  //                       />
  //                     )}
  //                   </div>
  //                 );
  //               }
  //               if (
  //                 activity.type === "iconQuickReply" &&
  //                 activity.value.data.length !== 0
  //               ) {
  //                 const iconQuickReplyCard = activity.value.data;

  //                 return (
  //                   <div className="chatWrapper w-full">
  //                     {activity?.value?.sender === "user" ? (
  //                       <></>
  //                     ) : (
  //                       <BotMessageCard actionDataArray={iconQuickReplyCard} />
  //                     )}
  //                   </div>
  //                 );
  //               }
  //               if (
  //                 activity.type === "summaryCard" &&
  //                 activity.value.data.length !== 0
  //               ) {
  //                 const summaryCard: any = activity.value.data;
  //                 return (
  //                   <div className="chatWrapper w-full">
  //                     {activity?.value?.sender === "user" ? (
  //                       <></>
  //                     ) : (
  //                       <BotMessageCard
  //                         title=""
  //                         contentArray={[
  //                           <div> {summaryCard.topText}</div>,
  //                           <SummaryCard
  //                             className="w-full mt-3"
  //                             image={
  //                               <img
  //                                 src="/images/onion.svg"
  //                                 alt=""
  //                                 className="h-[60px] w-[60px] rounded-md"
  //                               />
  //                             }
  //                             priceList={summaryCard.price}
  //                             subtitle={summaryCard.subtitle}
  //                             title={summaryCard.title}
  //                             totalAmount={summaryCard.totalAmount}
  //                             totaltitle={summaryCard.totaltitle}
  //                           />,
  //                           <Text
  //                             type="body"
  //                             size="md"
  //                             className="font-semibold mt-3 mb-1"
  //                           >
  //                             {summaryCard.bottomText}
  //                           </Text>,
  //                         ]}
  //                       />
  //                     )}
  //                   </div>
  //                 );
  //               }
  //             })}
  //           </div>
  //         </ChatWrapper>
  //       );
  //     });
  //     setPageNumber(pageNumber + 1);
  //   }, 500);

  //   // const fetchDataApi=async()=>{
  //   //   const res=await axios();
  //   // }
  //   // fetchDataApi();
  //   // dispatch(setChatArray([...data]))
  // };
  const timelineRef = useRef<any>();

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
          dispatch(getChatData({ newData, botType }))
            .then((data) => {})
            .catch(() => {});
        }}
      />
      <LocationPermission />
      <DeniedModal />
      {UiUpdate && <FloatingButton />}
    </div>
  );
};

export default Home;
