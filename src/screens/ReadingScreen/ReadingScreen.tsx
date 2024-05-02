import * as React from "react";
import { FC, useMemo, useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { styles } from "./styles";
import TopBar from "./components/TopBar";
import { useParams } from "react-router-native";
import Pagination from "./components/Pagination";


interface ReadingScreenProps {
  currentPageContent: string
}

const ReadingScreen: FC<ReadingScreenProps> = ({ currentPageContent }) => {
  const originRef = useRef<ScrollView | null>(null);
  const { id } = useParams();
  const [activeWordIndex, setActiveWord] = useState<number | null>(null);

  const parsedPageContent = useMemo(() => {
    return currentPageContent
      .split(" ")
      .map((word, index) => <Text
        onPress={() => setActiveWord(index)}
        style={{ backgroundColor: activeWordIndex === index ? "red" : "#00000000" }}
      >{word} </Text>);
  }, [currentPageContent, activeWordIndex]);

  // if (!book) return <Text>"...loading"</Text>;
  return (
    <View style={styles.container}>
      <TopBar bookName={""}/>
      <Text>ID: {id}</Text>
      <ScrollView
        style={styles.original}
        ref={originRef}
      >
        <Text style={{ fontSize: 25 }}>
          {parsedPageContent}
        </Text>
        <Pagination/>
      </ScrollView>
    </View>
  );
};

export default ReadingScreen;
