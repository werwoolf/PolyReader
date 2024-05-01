import * as React from "react";
import { FC, useCallback, useEffect } from "react";
import { Button, View, Text } from "react-native";
import { useNavigate } from "react-router-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { ROUTES_PATH } from "../../defaults/ROUTES_PATH";
import { Book } from "../../store/books/types";
import { addBook } from "../../store/books/slice";

interface MainScreenProps {
  books: Book[],
  getBooks: () => void;
  addBook: typeof addBook
}

const MainScreen: FC<MainScreenProps> = ({ books, getBooks, addBook }) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("///")

    getBooks()
  }, []);

  const pickFile = useCallback(async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({ multiple: false });
      const { assets } = res;

      if (assets) {
        const uri = assets[0].uri;
        const name = assets[0].name;
        const text = await FileSystem.readAsStringAsync(uri);

        addBook({ text, name })
      }
    } catch (err) {
      console.log("ERROR: ", err)
    }
  }, []);
  return (
    <View style={{
      padding: 10,
      paddingTop: 40,
      display: "flex",
      gap: 20
    }}>
      <Text>MainScreen</Text>

      <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
        {
          books.map((book, index) => <View
            key={index}
            style={{
              width: 100,
              height: 200,
              borderStyle: "solid",
              borderColor: "grey",
              borderWidth: 1
            }}
            onTouchStart={() => navigate(ROUTES_PATH.bookReading(book.id.toString()))}
          >
            <Text>{book.name}</Text>
          </View>)
        }
      </View>

      <Button
        title="Add book"
        onPress={pickFile}
      />
    </View>
  );
};

export default MainScreen;
