import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import RootSlice from "../slices/rootSlice";
import homeSlice from "../slices/homeSlice";
import botSlice from "../slices/botSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "persist-key",
  storage,
};
const botpersistConfig = {
  key: "bot-persist-key",
  storage,
};
const homepersistConfig = {
  key: "home-persist-key",
  storage,
};
const rootPersist = persistReducer(persistConfig, RootSlice);
const homePersist = persistReducer(homepersistConfig, homeSlice);
const botPersist = persistReducer(botpersistConfig, botSlice);
export const store = configureStore({
  reducer: { root: rootPersist, home: homePersist, bot: botPersist },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
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
