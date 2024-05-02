import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../utils/initDB";
import get from "lodash/get";
import { Book } from "../books/types";

export const getBook = createAsyncThunk<Book, number>(
  "get_book",
  async (id) => {
    const res = await db.execAsync(
      [{ sql: "SELECT * FROM books WHERE id = ?;", args: [id] }], true
    );

    return get(res, "0.rows.0") as unknown as Book;
  }
);

export const deleteBook = createAsyncThunk<Book | null, number>(
  "delete_book",
  async (id) => {
    const res = await db.execAsync(
      [{ sql: "DELETE FROM books WHERE id = ?;", args: [id] }], false
    );

    return get(res, "0.rowsAffected", null);
  }
);
