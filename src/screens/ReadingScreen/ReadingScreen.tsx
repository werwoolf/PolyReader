import * as React from "react";
import { FC, useMemo, useRef } from "react";
import { ScrollView, Text, View } from "react-native";
import { styles } from "./styles";
import TopBar from "./components/TopBar";
import { useParams } from "react-router-native";
import { Book } from "../../store/books/types";

interface ReadingScreenProps {
  books: Book[]
}

const ReadingScreen: FC<ReadingScreenProps> = ({ books }) => {
  const { id } = useParams();

  const originRef = useRef<ScrollView | null>(null);

  const { text, bookName } = useMemo(() => {
    if (!id) return { text: "", bookName: "" };
    const book = books.find((book) => book.id === +id);

    return { text: book?.text || "", bookName: book?.name || "" };
  }, [id]);
  return (
    <View style={styles.container}>
      <TopBar bookName={bookName}/>
      <Text>ID: {id}</Text>
      <ScrollView
        style={styles.original}
        ref={originRef}
      >
        <Text style={{ fontSize: 25 }}>
          {text}
        </Text>
      </ScrollView>
    </View>
  );
};

export default ReadingScreen;
