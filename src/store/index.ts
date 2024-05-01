import { combineReducers, configureStore } from "@reduxjs/toolkit";
import books from "./books/slice";

const reducer = combineReducers({
  books
})

export const store = configureStore({ reducer });

export type RootState = ReturnType<typeof reducer>;

