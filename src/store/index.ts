import { combineReducers, configureStore } from "@reduxjs/toolkit";
import books from "./books/slice";
import book from "./book/slice";

const reducer = combineReducers({
  books, book
})

export const store = configureStore({ reducer });

export type RootState = ReturnType<typeof reducer>;

