import { createSlice } from "@reduxjs/toolkit";
import { BookState } from "./types";
import { getBook } from "./asyncActions";

const initialState: BookState = {
  book: null,
  isLoading: false
}

const slice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getBook.fulfilled, (state, action)=>{
      // @ts-ignore
      state.book = action.payload
    })
  }
});

export default slice.reducer;
