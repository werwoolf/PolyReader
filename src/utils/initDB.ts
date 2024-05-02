import { openDatabase } from "expo-sqlite";

export const initDB = () =>  {
  const db = openDatabase("books");

  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, text TEXT NOT NULL);',
      [],
      () => {
        console.log("Table \"books\" created successfully: " );
      },
      (_, error) => {
        console.log('Error while creating table:', error);
        return true;
      }
    );
  })

  return db;
};

export const db = initDB();
