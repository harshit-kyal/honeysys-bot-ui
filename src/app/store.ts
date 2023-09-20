import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import RootSlice from "../slices/rootSlice";
import homeSlice from "../slices/homeSlice";
import botSlice from "../slices/botSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootSlice from "../slices/rootSlice";
const persistConfig = {
  key: "persist-key",
  storage,
};
const persist = persistReducer(persistConfig, RootSlice);
export const store = configureStore({
  reducer: { root: persist, home: homeSlice, bot: botSlice },
});
const persistor = persistStore(store);
export { persistor };
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
