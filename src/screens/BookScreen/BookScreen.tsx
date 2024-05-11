import * as React from "react";
import { FC, useCallback, useEffect } from "react";
import { View, Text, Button, BackHandler } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { deleteBook, getBook } from "../../store/book/asyncActions";
import { Book } from "../../store/books/types";
import { ROUTES_PATH } from "../../defaults/ROUTES_PATH";
import Screen from "../../components/Screen";
import { clearState } from "../../store/book/slice";
import { HandleThunkActionCreator } from "react-redux";
import { useNavigate, useParams } from "react-router-native";

interface BookScreenProps {
  book: Book | null;
  getBook: HandleThunkActionCreator<typeof getBook>;
  clearState: typeof clearState;
  deleteBook: HandleThunkActionCreator<typeof deleteBook>;
}

const BookScreen: FC<BookScreenProps> = ({ book, deleteBook, clearState, getBook }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getBook(+id);
    }
  }, [getBook, id]);

  const handleGoToReadBook = useCallback(() => {
    navigate(ROUTES_PATH.bookReading(id));
  }, [navigate, id]);

  const handleGoToMain = useCallback(() => {
    navigate(ROUTES_PATH.main);
    clearState();
  }, [clearState, navigate]);

  const handleDeleteBook = useCallback(async () => {
    if (id) {
      await deleteBook(+id);
      navigate(ROUTES_PATH.main);
    }
  }, [deleteBook, id, navigate]);

  const handleBackAction = useCallback(() => {
    navigate(ROUTES_PATH.main);

    return true;
  }, [navigate]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackAction
    );

    return () => backHandler.remove();
  }, [handleBackAction]);

  if (!book) return <Text>...loading</Text>;
  return (
    <Screen navigation={false}>
      <View style={{
        display: "flex", gap: 10
      }}>
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 10 }}>
          <MaterialIcons
            name="arrow-back"
            size={24}
            color="black"
            onPress={handleGoToMain}
          />
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
    </Screen>
  );
};

export default BookScreen;
