import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HomeSliceType } from "../types";
import { getChatApi, getStoreDataApi } from "../api";

const initialState: HomeSliceType = {
  loading: false,
  error: "",
  mobileNo: "",
  otp: 0,
  userId: "",
  ChatArray: [],
  locationPermission: false,
  deniedModal: false,
  locationModal: false,
  storeData: {},
  UiUpdate: false,
};

const log = async (data: any) => {};

export const getStoreData = createAsyncThunk("getStoreData", async () => {
  const response: any = await getStoreDataApi();
  await log(response);
  return response;
});

export const getChatData = createAsyncThunk(
  "getChatData",
  async ({ newData, botType }: { newData: any; botType: string }) => {
    const response: any = await getChatApi({ newData, botType });
    return response;
  }
);

export const HomeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    resetHome: () => initialState,
    setLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    setError(state, action) {
      return {
        ...state,
        error: action.payload,
      };
    },
    setMobileNo(state, action) {
      return {
        ...state,
        mobileNo: action.payload,
      };
    },
    setOtp(state, action) {
      return {
        ...state,
        otp: action.payload,
      };
    },
    setUserId(state, action) {
      return {
        ...state,
        userId: action.payload,
      };
    },
    setChatArray(state, action) {
      return {
        ...state,
        ChatArray: action.payload,
      };
    },
    addToChatArray(state, action) {
      return {
        ...state,
        ChatArray: [...state.ChatArray, action.payload],
      };
    },
    setLocationPermission(state, action) {
      return {
        ...state,
        locationPermission: action.payload,
      };
    },
    setLocationModal(state, action) {
      return {
        ...state,
        locationModal: action.payload,
      };
    },
    setDeniedModal(state, action) {
      return {
        ...state,
        deniedModal: action.payload,
      };
    },
    setStoreData(state, action) {
      return {
        ...state,
        storeData: action.payload,
      };
    },
    setUiUpdate(state, action) {
      return {
        ...state,
        UiUpdate: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStoreData.pending, (state) => {
        // state.loading = true;
      })
      .addCase(getStoreData.fulfilled, (state, action) => {
        if (action.payload) {
          state.storeData = action.payload.data;
        }
        state.error = "";
      })
      .addCase(getStoreData.rejected, (state, action) => {
        // state.loading = false;
        state.error = action.error.message || "Something went wrong.";
      })

      .addCase(getChatData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getChatData.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          // state.ChatArray = [
          //   ...state.ChatArray,
          //   ...action.payload.data.activities,
          // ];
        }
        state.error = "";
      })
      .addCase(getChatData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong.";
      });
  },
});

export const {
  resetHome,
  setLoading,
  setError,
  setMobileNo,
  setOtp,
  setUserId,
  setChatArray,
  addToChatArray,
  setLocationPermission,
  setLocationModal,
  setDeniedModal,
  setUiUpdate,
} = HomeSlice.actions;
export default HomeSlice.reducer;
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
