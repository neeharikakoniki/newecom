import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type NetworkState = {
  isConnected: boolean;
  bannerHeight: number;
};

const initialState: NetworkState = {
  isConnected: true,
  bannerHeight: 0,
};

const networkSlice = createSlice({
  name: "network",
  initialState,
  reducers: {
    setNetworkStatus: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    setBannerHeight: (state, action: PayloadAction<number>) => {
      state.bannerHeight = action.payload;
    },
  },
});

export const { setNetworkStatus, setBannerHeight } = networkSlice.actions;
export default networkSlice.reducer;
