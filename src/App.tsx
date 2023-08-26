import React, { useEffect } from "react";
import "./App.css";
import Routing from "./routes/Routing";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { fetchBot, getConversationId } from "./services";
import { environment } from "./environments/environment";
import { setBotInfo, setBotType, setConvId } from "./slices/botSlice";
import { decrypt, encrypt } from "./services/aes";
import axios from "axios";
import { io } from "socket.io-client";

function App() {
  const dispatch = useAppDispatch();
  const convId = useAppSelector((state) => state.bot.convId);

  const color = useAppSelector((state) => state.root.color);
  const radius = useAppSelector((state) => state.root.radius);
  const Catalog = useAppSelector((state) => state.root.Catalog);

  useEffect(() => {
    document.documentElement.style.setProperty("--primary", color.primary);
    document.documentElement.style.setProperty("--secondary", color.secondary);
    document.documentElement.style.setProperty(
      "--background",
      color.background
    );
    document.documentElement.style.setProperty("--error", color.error);
    document.documentElement.style.setProperty("--radius", radius);
    document.documentElement.style.setProperty(
      "--shadow",
      Catalog.categoryTemplate
    );

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
              socket.on("sendMessage", (message) => {
                console.log(message);
                if (message.data && message.data != "") {
                  // let data = JSON.parse(message.data);
                  let data = message.data;

                  console.log(data);
                  //homeChatArray = [];
                  // if (Object.keys(data).length != 0) {
                  //   var d = JSON.parse(JSON.stringify(data));
                  //   for (let i = 0; i < d.activities.length; i++) {
                  //     var element = d.activities[i];
                  //     //user message
                  //     if (
                  //       element.from.id ===
                  //       storageService.getItem("conversation-id")
                  //     ) {
                  //       if (element.text === "init") {
                  //         screen = "home";
                  //       } else {
                  //         screen = "chat";
                  //       }

                  //       if (
                  //         element.text !== "init" &&
                  //         element.text !== "resend"
                  //       ) {
                  //         convChatArray.push({
                  //           type: 0,
                  //           request: element.text,
                  //           response: element,
                  //         });
                  //       }
                  //     } else if (
                  //       element.value &&
                  //       element.value.sender === "agent"
                  //     ) {
                  //       screen = "chat";
                  //       mode = "agent";
                  //       convChatArray.push({ type: 3, response: element });
                  //     } else {
                  //       //bot message
                  //       mode = "bot";
                  //       if (element.text !== "Hello and welcome!") {
                  //         if (
                  //           (screen === "home" && theme === "dark") ||
                  //           (screen === "home" && theme === "")
                  //         ) {
                  //           //homeChatArray.push({ type: 1, response: element });
                  //           insertInArray("homeChatArray", 1, element);
                  //         } else if (screen === "home" && theme === "light") {
                  //           //authHomeChatArray.push({ type: 1, response: element });
                  //           insertInArray("authHomeChatArray", 1, element);
                  //         } else {
                  //           //convChatArray.push({ type: 1, response: element });
                  //           insertInArray("convChatArray", 1, element);
                  //         }
                  //         typingAnimationService.update(false);
                  //       }
                  //     }

                  //     if (element.type == "loginCard") {
                  //     } else if (
                  //       element.type == "statusCode" &&
                  //       element.value.statusCode == 200
                  //     ) {
                  //       //200 - Login successful
                  //       if (themeIsSwitchable) {
                  //         switchTheme("light");
                  //       }
                  //     } else if (
                  //       element.type == "statusCode" &&
                  //       element.value.statusCode == 204
                  //     ) {
                  //       //204 - Logout successful

                  //       if (themeIsSwitchable) {
                  //         switchTheme("dark");
                  //       }
                  //     } else if (
                  //       element.type == "statusCode" &&
                  //       element.value.statusCode == 401
                  //     ) {
                  //       //401 - Incorrect OTP
                  //     }

                  //     if (
                  //       (screen === "home" && theme === "dark") ||
                  //       (screen === "home" && theme === "")
                  //     ) {
                  //       chatArray = homeChatArray;
                  //     } else if (screen === "home" && theme === "light") {
                  //       chatArray = authHomeChatArray;
                  //     } else {
                  //       chatArray = convChatArray;
                  //     }

                  //     scrollToBottom();
                  //   }
                  // }
                }
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
  }, []);
  return <Routing />;
}

export default App;
