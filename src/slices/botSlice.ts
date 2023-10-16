import {createSlice } from "@reduxjs/toolkit";
import { BotSliceType } from "../types";

const initialState: BotSliceType = {
  loading: false,
  error: "",
  botInfo: {},
  convId: "",
  botType: "",
};

export const BotSlice = createSlice({
  name: "bot",
  initialState,
  reducers: {
    resetBot: () => initialState,
    setBotInfo(state, action) {
      return {
        ...state,
        botInfo: action.payload,
      };
    },
    setConvId(state, action) {
      return {
        ...state,
        convId: action.payload,
      };
    },
    setBotType(state, action) {
      return {
        ...state,
        botType: action.payload,
      };
    },
  },
});

export const { resetBot, setBotInfo, setConvId, setBotType } = BotSlice.actions;
export default BotSlice.reducer;
