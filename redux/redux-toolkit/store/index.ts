import { createSlice, configureStore } from "@reduxjs/toolkit";

import { INITIAL_STATE } from "./state";

const basketSlice = createSlice({
  name: "basket",
  initialState: INITIAL_STATE,
  reducers: {
    add: (state, action) =>
      state.map(item => {
        if (item.id !== action.payload.id) {
          return item;
        }
        return {
          ...item,
          count: action.payload.count + 1
        };
      }),
    remove: (state, action) =>
      state.map(item => {
        if (item.id !== action.payload.id) {
          return item;
        }

        return {
          ...item,
          count: 0
        };
      })
  }
});

const store = configureStore({ reducer: basketSlice.reducer });

export const { add, remove } = basketSlice.actions;

export { basketSlice, store };
