import { AuthState, InitialState } from "@/lib/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  value: {
    token: "",
    uid: "",
    refresh_token: "",
    role: "user",
  } as AuthState,
} as InitialState;

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: () => {
      return initialState;
    },
    logIn: (state, action: PayloadAction<AuthState>) => {
      return {
        value: {
          token: action.payload.token,
          uid: action.payload.uid,
          refresh_token: action.payload.refresh_token,
          role: action.payload.role,
        },
      };
    },
  },
});

export const { logIn, logOut } = auth.actions;
export default auth.reducer;
