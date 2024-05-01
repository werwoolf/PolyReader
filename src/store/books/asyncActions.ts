import { createAsyncThunk } from "@reduxjs/toolkit";
import { openDatabase } from "expo-sqlite";


export const getBooks = createAsyncThunk("get_books", async () => {
  const db = await openDatabase("books");
  console.log("getBooks")
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL);',
      [],
      (tx, results) => {
        console.log('Table created successfully');
        tx.executeSql("INSERT INTO items (name) VALUES (?);", ["ololololo"], (tx, res)=>{
          console.log(res)
        })
        tx.executeSql("SELECT * from items;", [], (tx, res)=>{
          console.log(res.rows._array)
        })
      },
      (tx, error) => {
        console.log('Error while creating table:', error);
      }
    );
  });
  // res.execRawQuery([{sql:"SELECT * from books;", args:[]}], true, ()=>{
  //   console.log("cb")
  // })
})
