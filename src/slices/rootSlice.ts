import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootSliceType } from "../types";

const initialState: RootSliceType = {
  loading: false,
  error: "",
  color: {
    error: "#C25E5E",
  },
  overallThemeUI: {
    theme: ["#09215B", "#0D1282", "#FFFFFF"],
    // theme: ["#00C9A7", "#128C7E", "#FFFFFF"],
    botIcons:
      "https://res.cloudinary.com/dqbub4vtj/image/upload/v1694763084/y1ty56zfgvzy5oiypzn2.png",
    actionButtonBorder: "4px",
  },
  conversationUI: {
    fontFamily: "poppins",
    conversationFontStyle: "400",
    timeStampFontStyle: "500",
    greetingMessage: "👋 Greetings!",
  },
  cartUI: {
    imageBorderColor: "#E6E6E6",
    titleWeight: "500",
    titleColor: "#000",
    quantityWeight: "500",
    priceWeight: "500",
    priceSize: "12px",
    priceColor: "#000000",
  },
  CatalogUI: {
    categoryBackDrop: "linear-gradient(180deg,rgba(0,0,0,0) 0%,#000 126%)",
    youMayLike: {
      imageBorderColor: "none",
      titleWeight: "500",
      titleColor: "#000",
      priceWeight: "500",
      priceColor: "#505050",
    },
  },
  CategoriesUI: {
    quickReplyBorderRadius: "1000px",
    drawer: {
      imageBorderColor: "#E6E6E6",
      titleWeight: "500",
      titleColor: "#000",
    },
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
    resetRoot: () => initialState,
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
    setTheme(state, action) {
      return {
        ...state,
        overallThemeUI: action.payload.overallThemeUI,
        conversationUI: action.payload.conversationUI,
        cartUI: action.payload.cartUI,
        CatalogUI: action.payload.CatalogUI,
        CategoriesUI: action.payload.CategoriesUI,
      };
    },
    setThemeColor(state, action) {
      return {
        ...state,
        overallThemeUI: action.payload.overallThemeUI,
        conversationUI: action.payload.conversationUI,
        cartUI: action.payload.cartUI,
        CatalogUI: action.payload.CatalogUI,
        CategoriesUI: action.payload.CategoriesUI,
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

export const { resetRoot, setLoading, setError, setTheme, setThemeColor } =
  RootSlice.actions;
export default RootSlice.reducer;
