import { configureStore } from "@reduxjs/toolkit";
import ToDo from "./todo/slice";

export const store = configureStore({
  reducer: {
    todo: ToDo.reducer,
  },
});
