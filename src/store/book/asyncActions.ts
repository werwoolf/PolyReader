import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../utils/initDB";
import get from "lodash/get";
import { Book } from "../books/types";

export const getBook = createAsyncThunk<Book | null, number>(
  "get_book",
  async (id) => {
    const res = await db.execAsync(
      [{ sql: "SELECT * FROM books WHERE id = ?;", args: [id] }], true
    );

    return get(res, "0.rows.0", null);
  }
);
