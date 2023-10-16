import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HomeSliceType } from "../types";
import { getChatApi, getStoreDataApi } from "../api";

const initialState: HomeSliceType = {
  loading: false,
  error: "",
  mobileNo: "",
  otp: 0,
  userId: "",
  storeId: "",
  userPincode: 0,
  ChatArray: [],
  locationPermission: false,
  deniedModal: false,
  locationModal: false,
  // storeData: {},
  UiUpdate: false,
  cart: [],
  totalQuantity: 0,
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
    setUserPincode(state, action) {
      return {
        ...state,
        userPincode: action.payload,
      };
    },
    setStoreId(state, action) {
      return {
        ...state,
        storeId: action.payload,
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
    addToCartArray(state, action) {
      let find = state.cart.findIndex(
        (item: any) => item.id === action.payload.id
      );
      if (find >= 0) {
        state.cart[find].quantity += 1;
      } else {
        state.cart.push(action.payload);
      }
      state.totalQuantity = state.totalQuantity += 1;
    },
    // minusToCartArray(state, action) {
    //   return {
    //     ...state,
    //     ChatArray: [...state.ChatArray, action.payload],
    //   };
    // },
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
      // .addCase(getStoreData.pending, (state) => {
      //   // state.loading = true;
      // })
      // .addCase(getStoreData.fulfilled, (state, action) => {
      //   if (action.payload) {
      //     state.storeData = action.payload.data;
      //   }
      //   state.error = "";
      // })
      // .addCase(getStoreData.rejected, (state, action) => {
      //   // state.loading = false;
      //   state.error = action.error.message || "Something went wrong.";
      // })

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
  addToCartArray,
  setUserPincode,
  setStoreId,
} = HomeSlice.actions;
export default HomeSlice.reducer;
