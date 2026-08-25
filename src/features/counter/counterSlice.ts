import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },

    decrement: (state) => {
      state.value = Math.max(0, state.value - 1);
    },

    incrementByCustomValue: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },

    decrementByCustomValue: (state, action: PayloadAction<number>) => {
      state.value = Math.max(0, state.value - action.payload);
    },

    reset: (state) => {
      state.value = 0;
    },
  },
});

export const {
  increment,
  decrement,
  incrementByCustomValue,
  decrementByCustomValue,
  reset,
} = counterSlice.actions;

export default counterSlice.reducer;
