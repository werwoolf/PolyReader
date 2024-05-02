import * as React from "react";
import { FC, useCallback, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { useNavigate, useParams } from "react-router-native";
import { HandleThunkActionCreator } from "react-redux";
import { deleteBook, getBook } from "../../store/book/asyncActions";
import { Book } from '../../store/books/types';
import { ROUTES_PATH } from "../../defaults/ROUTES_PATH";

interface BookScreenProps {
  book: Book | null;
  getBook: HandleThunkActionCreator<typeof getBook>;
  deleteBook: HandleThunkActionCreator<typeof deleteBook>
}

const BookScreen: FC<BookScreenProps> = ({ book, deleteBook, getBook }) => {
  const { id } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      getBook(+id)
    }
  }, []);

  const handleGoToReadBook = useCallback(() => {
    navigate(ROUTES_PATH.bookReading(id))
  }, [])

  const handleDeleteBook = useCallback(async () => {
    if (id) {
      await deleteBook(+id);
      navigate(ROUTES_PATH.main)
    }
  }, [])

  // if (!book) return <Text>"...loading"</Text>
  return (
    <View style={{
      padding: 15, paddingTop: 50, display: "flex", flexDirection: "column", gap: 10
    }}>
      <View style={{display: "flex", flexDirection:"row"}}>
        <Text
          style={{ fontWeight: "900", fontSize: 30 }}
          onPress={() => navigate(ROUTES_PATH.main)}
        >
          {"⇦"}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {book?.name}
        </Text>
      </View>

      <View>
        {
          book && <Text style={{ fontWeight: "bold" }}>
            Size: {Math.ceil(book.text.length / 1024)} kb
          </Text>
        }

      </View>
      <Button
        title="Delete"
        color="red"
        onPress={handleDeleteBook}
      />
      <Button
        title="Read"
        onPress={handleGoToReadBook}
      />
    </View>
  );
};

export default BookScreen;
