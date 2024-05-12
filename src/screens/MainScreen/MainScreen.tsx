import * as React from "react";
import { FC, useCallback, useEffect } from "react";
import { Button, View, Text } from "react-native";
import { addBook } from "../../store/books/asyncActions";
import Books from "./components/Books";
import Screen from "../../components/Screen";
import { styles } from "./styles";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { HandleThunkActionCreator } from "react-redux";
import JSZip from "jszip";

interface MainScreenProps {
  getBooks: () => void;
  isLoading: boolean;
  addBook: HandleThunkActionCreator<typeof addBook>
}

console.log("////////////////////////")
const MainScreen: FC<MainScreenProps> = ({ getBooks, isLoading, addBook }) => {
  useEffect(() => {
    getBooks();
  }, [getBooks]);

  const pickFile = useCallback(async () => {
    const res = await DocumentPicker.getDocumentAsync({
      multiple: false, type: ["text/plain", "application/epub+zip"]
    });
    const { assets, canceled } = res;


    if (assets) {
      try {
        const uri = assets[0].uri;
        const name = assets[0].name;
        const text = await FileSystem.readAsStringAsync(uri, { encoding: "base64" });

        const zip = await JSZip.loadAsync(text, { base64: true });

        for await (const [key, file] of Object.entries(zip.files)) {
          console.log("start: ", file.name);
          const res = await file.async("text");

          // if (file.name.startsWith("OEBPS/3599586769249772871_73604-h-0.htm.html")){
            console.log(res)
          // }

        }

      } catch (e) {
        console.log(e)
      }

    }

    // try {
    //   const res = await DocumentPicker.getDocumentAsync({
    //     multiple: false, type: ["text/plain", "application/epub+zip"]
    //   });
    //   const { assets, canceled } = res;
    //
    //   if (assets && !canceled) {
    //     const uri = assets[0].uri;
    //     const name = assets[0].name;
    //     const text = await FileSystem.readAsStringAsync(uri);
    //
    //     await addBook({ text, name, last_visited_page: 1 });
    //     getBooks();
    //   }
    // } catch (err) {
    //   console.log("ERROR: ", err);
    // }
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
