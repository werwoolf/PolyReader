import * as React from "react";
import { FC, useEffect, useMemo, useRef } from "react";
import { ScrollView, Text, View } from "react-native";
import { styles } from "./styles";
import TopBar from "./components/TopBar";
import { useParams } from "react-router-native";
import { Book } from "../../store/books/types";
import { HandleThunkActionCreator } from "react-redux";
import { getBook } from "../../store/book/asyncActions";

interface ReadingScreenProps {
  book: Book | null;
  getBook: HandleThunkActionCreator<typeof getBook>
}

const ReadingScreen: FC<ReadingScreenProps> = ({ book, getBook }) => {
  const originRef = useRef<ScrollView | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getBook(+id)
    }
  }, []);

  if (!book) return <Text>"...loading"</Text>
  return (
    <View style={styles.container}>
      <TopBar bookName={book.name}/>
      <Text>ID: {id}</Text>
      <ScrollView
        style={styles.original}
        ref={originRef}
      >
        <Text style={{ fontSize: 25 }}>
          {book.text}
        </Text>
      </ScrollView>
    </View>
  );
};

export default ReadingScreen;
