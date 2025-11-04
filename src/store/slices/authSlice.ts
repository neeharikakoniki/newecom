import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthUser = { uid: string; email: string | null; displayName: string | null };

type AuthState = {
  user: AuthUser | null;
  initialized: boolean; // becomes true after we hear from Firebase once
};

const initialState: AuthState = { user: null, initialized: false };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthUser | null>) {
      state.user = action.payload;
      state.initialized = true;
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
