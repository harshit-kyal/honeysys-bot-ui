import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { HomeSliceType } from "../types";

const initialState: HomeSliceType = {
  loading: false,
  error: "",
  chatArray: [],
  locationModal: false,
  deniedModal: false,
};

// export const getMasterName = createAsyncThunk("getMasterName", async () => {
//   const response: any = await getMasterNameApi();
//   return response.data;
// });

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
  },
  extraReducers: (builder) => {
    // builder
    //   .addCase(getMasterName.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(getMasterName.fulfilled, (state, action) => {
    //     if (action.payload.data) {
    //       state.MasterName = action.payload.data;
    //     }
    //     state.error = "";
    //   })
    //   .addCase(getMasterName.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.error.message || "Something went wrong.";
    //   })
  },
});

export const {
  setLoading,
  setError,
  setChatArray,
  setLocationModal,
  setDeniedModal,
} = HomeSlice.actions;
export default HomeSlice.reducer;
