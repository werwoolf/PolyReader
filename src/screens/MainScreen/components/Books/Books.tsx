import * as React from "react";
import { FC } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { ROUTES_PATH } from "../../../../defaults/ROUTES_PATH";
import { Book } from "../../../../store/books/types";
import { styles } from "./styles";
import { useNavigate } from "react-router-native";

interface BooksProps {
  books: Book[],
}

const Books: FC<BooksProps> = ({ books }) => {
  const navigate = useNavigate();

  return (
    <ScrollView
      horizontal
      contentContainerStyle={styles.container}
    >
      {
        books.map((book, index) => <TouchableOpacity
          key={index}
          style={styles.book}
          onPress={() => navigate(ROUTES_PATH.book(book.id.toString()))}
        >
          <Text>{book.name}</Text>
        </TouchableOpacity>)
      }
    </ScrollView>
  );
};

export default Books;
