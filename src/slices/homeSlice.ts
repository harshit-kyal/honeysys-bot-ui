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
  cartId: "",
  userPincode: 0,
  userSavedAddres: {},
  ChatArray: [],
  locationPermission: false,
  cartTotalAmount: "",
  deniedModal: false,
  locationModal: false,
  experienceModal: false,
  storeData: {},
  UiUpdate: false,
  cart: [],
  orderProduct: [],
  totalQuantity: 0,
  deliveryType: "",
  deliveryDate: "",
  startTime: "",
  endTime: "",
  slotIndex: "",
  getStartDisplay: false,
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
    setDeliveryType(state, action) {
      return {
        ...state,
        deliveryType: action.payload,
      };
    },
    setStartTime(state, action) {
      return {
        ...state,
        startTime: action.payload,
      };
    },
    setEndTime(state, action) {
      return {
        ...state,
        endTime: action.payload,
      };
    },
    setDeliveryDate(state, action) {
      return {
        ...state,
        deliveryDate: action.payload,
      };
    },
    setUserSavedAddres(state, action) {
      return {
        ...state,
        userSavedAddres: action.payload,
      };
    },
    setSlotIndex(state, action) {
      return {
        ...state,
        slotIndex: action.payload,
      };
    },
    setCartId(state, action) {
      return {
        ...state,
        cartId: action.payload,
      };
    },
    setCartTotalAmount(state, action) {
      return {
        ...state,
        cartTotalAmount: action.payload,
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
    addToOrderList(state, action) {
      return {
        ...state,
        orderProduct: [...state.orderProduct, action.payload],
      };
    },
    setCart(state, action) {
      return {
        ...state,
        cart: action.payload,
      };
    },
    setTotalQuantity(state, action) {
      return {
        ...state,
        totalQuantity: action.payload,
      };
    },
    addToCartArray(state, action) {
      if (action?.payload?.quantity > 0) {
        let find = state.cart.findIndex(
          (item: any) =>
            item?.productId === action?.payload?.productId &&
            item?.varientId === action?.payload?.varientId
        );
        if (find !== -1) {
          state.cart[find].quantity = action?.payload?.quantity;
        } else {
          state.cart.push(action.payload);
          state.totalQuantity = state.totalQuantity += 1;
        }
      }
    },
    minusToCartArray(state, action) {
      let find = state.cart.findIndex(
        (item: any) =>
          item?.productId === action?.payload?.productId &&
          item?.varientId === action?.payload?.varientId
      );
      if (find !== -1) {
        if (action?.payload?.quantity > 0) {
          state.cart[find].quantity = action?.payload?.quantity;
        } else {
          state.totalQuantity = state.totalQuantity -= 1;
          state.cart.splice(find, 1);
        }
      }
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
    setExperienceModal(state, action) {
      return {
        ...state,
        experienceModal: action.payload,
      };
    },
    setGetStartDisplay(state, action) {
      return {
        ...state,
        getStartDisplay: action.payload,
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
  minusToCartArray,
  setLocationPermission,
  setLocationModal,
  setDeniedModal,
  setUiUpdate,
  addToCartArray,
  setUserPincode,
  setStoreId,
  setStoreData,
  setCartId,
  setCartTotalAmount,
  addToOrderList,
  setDeliveryDate,
  setDeliveryType,
  setStartTime,
  setEndTime,
  setSlotIndex,
  setCart,
  setTotalQuantity,
  setGetStartDisplay,
  setUserSavedAddres,
  setExperienceModal,
} = HomeSlice.actions;
export default HomeSlice.reducer;
