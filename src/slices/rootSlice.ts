import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { RootSliceType } from "../types";

const initialState: RootSliceType = {
  loading: false,
  error: "",
  color: {
    primary: "#09215B",
    secondary: "#0D1282",
    background: "#FFFFFF",
    error: "#C25E5E",
  },
  bot: "/images/chat_logo.svg",
  radius: "4px",
  Conversations: {
    fontfamily: "poppins",
    fontstyle: "meduim",
    titlesize: 14,
    contentsize: 14,
    timestampsize: 12,
    greetingTemplate: "",
  },

  Cart: {
    cartTemplate: "",
  },

  Catalog: {
    categoryTemplate:
      "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000 100%)",
    likeSectionTemplate: "",
  },

  Categories: {
    categorySectionTemplate: "",
    categoryLikeSectionTemplate: "",
  },
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

export const RootSlice = createSlice({
  name: "root",
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

export const { setLoading, setError } = RootSlice.actions;
export default RootSlice.reducer;
