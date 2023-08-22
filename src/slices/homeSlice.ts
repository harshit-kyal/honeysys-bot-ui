import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { HomeSliceType } from "../types";
import { getStoreDataApi } from "../api";

const initialState: HomeSliceType = {
  loading: false,
  error: "",
  locationPermission: false,
  deniedModal: false,
  locationModal: false,
  storeData: {},
};

export const getStoreData = createAsyncThunk("getStoreData", async () => {
  const response: any = await getStoreDataApi();
  return response;
});

// export const getEmployeeSalesData = createAsyncThunk(
//   "getEmployeeSalesData",
//   async (_, { getState }) => {
//     const currentState = getState() as RootState;
//     const response: any = await getEmployeeSalesDataApi(
//       currentState.dashboard.RangeDate !== "" &&
//         currentState.dashboard.RangeDate
//     );
//     return response.data;
//   }
// );

export const HomeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
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
    setChatArray(state, action) {
      return {
        ...state,
        chatArray: action.payload,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStoreData.pending, (state) => {
        state.loading = true;
        console.log("pending");
      })
      .addCase(getStoreData.fulfilled, (state, action) => {
        console.log(action);
        console.log("done");
        if (action.payload) {
          state.storeData = action.payload.data;
        }
        state.error = "";
      })
      .addCase(getStoreData.rejected, (state, action) => {
        console.log(action)
        state.loading = false;
        state.error = action.error.message || "Something went wrong.";
      });
  },
});

export const {
  setLoading,
  setError,
  setChatArray,
  setLocationPermission,
  setLocationModal,
  setDeniedModal,
} = HomeSlice.actions;
export default HomeSlice.reducer;
