import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookState } from "./types";
import { getBook, deleteBook } from "./asyncActions";
import { Book } from "../books/types";
import { splitText } from "../../helpers/splitText";

const initialState: BookState = {
  book: null,
  pages: [],
  currentPage: 1,
  isLoading: false,
};

const handleStartAsyncAction: CaseReducer<BookState> = (state) => {
  state.isLoading = true;
};
const handleRejectAsyncAction: CaseReducer<BookState> = (state) => {
  state.isLoading = false;
};

const handleGetBookFulfilled: CaseReducer<BookState, PayloadAction<Book>> = (state, action) => {
  state.book = action.payload;
  state.pages = splitText(action.payload.text, 5000); // todo: move to config
};

const handleDeleteBookFulfilled: CaseReducer<BookState> = (state) => {
  state.isLoading = false;
};


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
    builder.addCase(getBook.pending, handleStartAsyncAction);
    builder.addCase(getBook.fulfilled, handleGetBookFulfilled);
    builder.addCase(getBook.rejected, handleRejectAsyncAction);

    builder.addCase(deleteBook.pending, handleStartAsyncAction);
    builder.addCase(deleteBook.fulfilled, handleDeleteBookFulfilled);
    builder.addCase(deleteBook.rejected, handleRejectAsyncAction);
  }
});

export default slice.reducer;

export const { previousPage, nextPage, clearState } = slice.actions;
