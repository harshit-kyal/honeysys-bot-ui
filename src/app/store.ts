import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import RootSlice from "../slices/rootSlice";

export const store = configureStore({
  reducer: { root: RootSlice },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
