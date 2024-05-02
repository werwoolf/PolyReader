import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../utils/initDB";

export const getBook = createAsyncThunk<void, number>(
  "get_book",
  async (id) => {
    const res = await db.execAsync(
      [{ sql: "SELECT * FROM books WHERE id = ?;", args: [id] }], true
    );
    console.log(res)
  }
);
