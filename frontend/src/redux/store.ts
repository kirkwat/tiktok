import {
  configureStore,
  Action,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import postSlice from "./slices/postSlice";
import modalSlice from "./slices/modalSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    post: postSlice,
    modal: modalSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = ThunkDispatch<RootState, null, Action<string>>;
export type RootState = ReturnType<typeof store.getState>;
