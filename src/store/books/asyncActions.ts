import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../utils/initDB";
import { Book } from "./types";
import get from "lodash/get";

export const getBooks = createAsyncThunk("get_books", async () => {
  const res = await db.execAsync(
    [{ sql: "SELECT id, name from books;", args: [] }], true
  );
  return get(res, "0.rows", []);
});

export const addBook = createAsyncThunk<void, Omit<Book, "id">>(
  "add_book_async",
  async (book) => {
    await db.execAsync(
      [{
        sql: 'INSERT INTO books (name, text) VALUES (?, ?);',
        args: [book.name, book.text]
      }],
      false
    )
  });


