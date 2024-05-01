import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book, BooksState } from "./types";

export const booksDefault = [
  {
    name: "Fight club",
    id: 1,
    text: "fight Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aspernatur aut beatae commodi cupiditate, fugit, in ipsa ipsam minus obcaecati praesentium quae quas repellendus repudiandae saepe sequi tempora tenetur veniam!"
  },
  {
    name: "Gone by wind",
    id: 2,
    text: "gonr Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aspernatur aut beatae commodi cupiditate, fugit, in ipsa ipsam minus obcaecati praesentium quae quas repellendus repudiandae saepe sequi tempora tenetur veniam!"
  },
]

const initialState: BooksState = {
  books: booksDefault
}

const slice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<Omit<Book, "id">>) => {
      state.books.push({ ...action.payload, id: state.books.length + 1 })
    }
  }
});

export default slice.reducer;

export const { addBook } = slice.actions;
