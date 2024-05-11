import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookState } from "./types";
import { getBook, deleteBook } from "./asyncActions";
import { Book } from "../books/types";
import { splitText } from "../../helpers/splitText";
import uniq from "lodash/uniq";

const initialState: BookState = {
  book: null,
  statistic: null,
  pages: [],
  currentPage: 1,
  isLoading: false
};

const handleStartAsyncAction: CaseReducer<BookState> = state => {
  state.isLoading = true;
};
const handleRejectAsyncAction: CaseReducer<BookState> = state => {
  state.isLoading = false;
};

const handleGetBookFulfilled: CaseReducer<BookState, PayloadAction<Book>> = (state, action) => {
  state.book = action.payload;
  state.currentPage = action.payload.last_visited_page || 1;
  state.pages = splitText(action.payload.text, 2000); // todo: move to config

  const start = new Date().getTime();

  const symbols = action.payload.text.length;
  const words = action.payload.text.split(" ");
  const normalizedWords = words.map(word=> word
      .toLowerCase()
      .replace("\"", "")
      .replace(",", "")
      .replace(":", "")
      .replace(".", "")
  );

  state.statistic = {
    totalWords: words.length,
    uniqueWords: uniq(normalizedWords).length
  };

  console.log(new Date().getTime() - start);
};

const handleDeleteBookFulfilled: CaseReducer<BookState> = state => {
  state.isLoading = false;
};


const slice = createSlice({
  name: "book",
  initialState,
  reducers: {
    previousPage: state => {
      state.currentPage -= 1;
    },
    nextPage: state => {
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
