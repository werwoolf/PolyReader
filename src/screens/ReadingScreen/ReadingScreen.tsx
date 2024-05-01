import * as React from "react";
import { FC, useRef, useState } from "react";
import { ScrollView, Text, View, Button } from "react-native";
import { styles } from "./styles";
import TopBar from "./components/TopBar";
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

interface ReadingScreenProps {
}

const ReadingScreen: FC<ReadingScreenProps> = () => {
  const [activeWordIndex, setActiveWordIndex] = useState<null | number>(null);
  const [text, setText] = useState("");

  const originRef = useRef<ScrollView | null>(null);

  const pickFile = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync();
      const { assets } = res;

      if (assets) {
        const uri = assets[0].uri;
        const read = await FileSystem.readAsStringAsync(uri);
        setText(read)
      }
    } catch (err) {
      console.log("ERROR: ", err)
    }
  };

  return (
    <View style={styles.container}>
      <TopBar
        activeWordIndex={activeWordIndex}
        setActiveWordIndex={setActiveWordIndex}
      />
      <ScrollView
        style={styles.original}
        ref={originRef}
      >
        <Text style={{ fontSize: 25 }}>
          {text}
        </Text>
        <Button
          title="select"
          onPress={pickFile}
        >
          Click
        </Button>
      </ScrollView>
    </View>
  );
};

export default ReadingScreen;
