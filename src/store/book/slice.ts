import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookState } from "./types";
import { getBook } from "./asyncActions";
import { Book } from "../books/types";
import { splitText } from "../../helpers/splitText";

const initialState: BookState = {
  book: null,
  pages: [],
  currentPage: 1,
  isLoading: false,
}

const handleGetBookFulfilled: CaseReducer<BookState, PayloadAction<Book>> = (state, action) => {
  state.book = action.payload;

  state.pages = splitText(action.payload.text, 5000);
}


const slice = createSlice({
  name: "book",
  initialState,
  reducers: {
    previousPage: (state) => {
      state.currentPage -= 1;
    },
    nextPage: (state) => {
      state.currentPage += 1;
    },
    clearState: () => initialState
  },
  extraReducers: builder => {
    builder.addCase(getBook.fulfilled, handleGetBookFulfilled)
  }
});

export default slice.reducer;

export const { previousPage, nextPage, clearState } = slice.actions;
