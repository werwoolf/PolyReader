import * as React from "react";
import { FC, useCallback, useEffect } from "react";
import { Button, View, Text } from "react-native";
import { addBook } from "../../store/books/asyncActions";
import Books from "./components/Books";
import Screen from "../../components/Screen";
import { styles } from "./styles";
import { BookService } from "../../services/book.service";
import * as DocumentPicker from "expo-document-picker";
import { HandleThunkActionCreator } from "react-redux";

interface MainScreenProps {
  getBooks: () => void;
  isLoading: boolean;
  addBook: HandleThunkActionCreator<typeof addBook>
}

const MainScreen: FC<MainScreenProps> = ({ getBooks, isLoading, addBook }) => {
  useEffect(() => {
    getBooks();
  }, [getBooks]);

  const pickFile = useCallback(async () => {
    const res = await DocumentPicker.getDocumentAsync({
      multiple: false, type: ["text/plain", "application/epub+zip"]
    });
    const { assets, canceled } = res;


    if (assets && !canceled) {
      const bookService = new BookService(assets[0].uri);
      const book = await bookService.readFile(assets[0].uri);
      await addBook(book);
      getBooks();
    }
  }, [addBook, getBooks]);
  return (
    <Screen navigation>
      <View style={styles.container}>
        <Text>MainScreen</Text>
        <Books/>
        {isLoading && <Text>... loading</Text>}
        <Button
          title="Add book"
          onPress={pickFile}
        />
      </View>
    </Screen>
  );
};

export default MainScreen;
