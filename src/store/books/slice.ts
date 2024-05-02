import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book, BooksState } from "./types";
import { addBook, getBooks } from "./asyncActions";

const initialState: BooksState = {
  books: [],
  isLoading: false
};

const handleAsyncActionStart: CaseReducer<BooksState> = (state) => {
  state.isLoading = true;
};
const handleAsyncActionRejected: CaseReducer<BooksState> = (state) => {
  state.isLoading = false;
};


const handleGetBooksFulfilled: CaseReducer<BooksState, PayloadAction<Book[]>> = (state, action) => {
  state.books = action.payload;
  state.isLoading = false;
};

const handleAddBookFulfilled: CaseReducer<BooksState> = (state) => {
  state.isLoading = false;
};

const slice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getBooks.pending, handleAsyncActionStart);
    builder.addCase(getBooks.fulfilled, handleGetBooksFulfilled);
    builder.addCase(getBooks.rejected,handleAsyncActionRejected);

    builder.addCase(addBook.pending, handleAsyncActionStart);
    builder.addCase(addBook.fulfilled, handleAddBookFulfilled);
    builder.addCase(addBook.rejected, handleAsyncActionRejected);
  }
});

export default slice.reducer;
