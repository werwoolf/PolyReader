import * as React from "react";
import { FC, useCallback, useEffect } from "react";
import { Button, View, Text } from "react-native";
import { addBook } from "../../store/books/asyncActions";
import Books from "./components/Books";
import Screen from "../../components/Screen";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
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
    try {
      const res = await DocumentPicker.getDocumentAsync({
        multiple: false, type: "text/plain"
      });
      const { assets, canceled } = res;

      if (assets && !canceled) {
        const uri = assets[0].uri;
        const name = assets[0].name;
        const text = await FileSystem.readAsStringAsync(uri);

        await addBook({ text, name, last_visited_page: 1 });
        getBooks();
      }
    } catch (err) {
      console.log("ERROR: ", err);
    }
  }, [addBook, getBooks]);
  return (
    <Screen navigation>
      <View style={{ display: "flex", gap: 20 }}>
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
