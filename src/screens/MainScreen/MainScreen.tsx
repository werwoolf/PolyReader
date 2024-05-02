import * as React from "react";
import { FC, useCallback, useEffect } from "react";
import { Button, View, Text } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { addBook } from "../../store/books/asyncActions";
import { HandleThunkActionCreator } from "react-redux";
import { styles } from "./styles";
import Books from "./components/Books";

interface MainScreenProps {
  getBooks: () => void;
  addBook: HandleThunkActionCreator<typeof addBook>
}

const MainScreen: FC<MainScreenProps> = ({ getBooks, addBook }) => {
  useEffect(() => {
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

        await addBook({ text, name });
        getBooks();
      }
    } catch (err) {
      console.log("ERROR: ", err)
    }
  }, [addBook, getBooks]);
  return (
    <View style={styles.container}>
      <Text>MainScreen</Text>
      <Books/>
      <Button
        title="Add book"
        onPress={pickFile}
      />
    </View>
  );
};

export default MainScreen;
