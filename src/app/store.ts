import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import RootSlice from "../slices/rootSlice";
import homeSlice from "../slices/homeSlice";
import botSlice from "../slices/botSlice";

export const store = configureStore({
  reducer: { root: RootSlice, home: homeSlice, bot: botSlice },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
