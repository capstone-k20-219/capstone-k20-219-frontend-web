import { ActiveState, InitialActiveState } from "@/lib/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  value: {
    role: "user",
    index: -1,
    name: "",
  } as ActiveState,
} as InitialActiveState;

export const active = createSlice({
  name: "active",
  initialState,
  reducers: {
    setInitial: () => {
      return initialState;
    },
    onActive: (state, action: PayloadAction<ActiveState>) => {
      return {
        value: {
          role: action.payload.role,
          index: action.payload.index,
          name: action.payload.name,
        },
      };
    },
  },
});

export const { setInitial, onActive } = active.actions;
export default active.reducer;
