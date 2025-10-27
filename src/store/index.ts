import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice";
import networkReducer from "./slices/networkSlice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    network: networkReducer,
  },
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: false, 
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector = <TSelected,>(selector: (s: RootState) => TSelected) =>
  useSelector(selector);
