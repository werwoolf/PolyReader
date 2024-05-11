import * as React from "react";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { ScrollView, View, Text, BackHandler } from "react-native";
import { SelectableText } from "@alentoma/react-native-selectable-text";
import { IHighlights, SelectableTextProps } from "@alentoma/react-native-selectable-text/demo/SelectableText";
import { styles } from "./styles";
import TopBar from "./components/TopBar";
import Pagination from "./components/Pagination";
import { Translation } from "./data";
import Screen from "../../components/Screen";
import { ROUTES_PATH } from "../../defaults/ROUTES_PATH";
import { Book } from "../../store/books/types";
import { updateLastVisitedPage } from "../../store/book/asyncActions";
import { HandleThunkActionCreator } from "react-redux";
import "react-native-get-random-values";
import { useNavigate, useParams } from "react-router-native";

interface ReadingScreenProps {
  currentPageContent: string;
  book: Book | null;
  currentPage: number;
  updateLastVisitedPage: HandleThunkActionCreator<typeof updateLastVisitedPage>;
}

const ReadingScreen: FC<ReadingScreenProps> = ({
                                                 book,
                                                 currentPage,
                                                 currentPageContent,
                                                 updateLastVisitedPage
                                               }) => {
  const [activeWordIndex, setActiveWordIndex] = useState<number | null>(null);
  const [isTranslation, setIsTranslation] = useState<boolean>();
  const [translation, setTranslation] = useState<Translation | null>(null);
  const navigate = useNavigate();
  const { id } = useParams();

  // const isWordTranslation = translation?.from  todo: check if translation is word

  useEffect(() => {
    setActiveWordIndex(null);
  }, [currentPageContent]);

  useEffect(() => {
    if (book) {
      updateLastVisitedPage({ id: book.id, page: currentPage });
    }
  }, [book, currentPage, updateLastVisitedPage]);
  // console.log("///")
  // useEffect(() => {
  //   console.log("effect")
  //
  //   const paragraphRegex = /(?:\r\n|\r|\n){2,}/g; // Regular expression to match paragraphs
  //   const paragraphs = currentPageContent.split(paragraphRegex);
  //   console.log(paragraphs)
  // }, [currentPageContent]);

  const words = useMemo(() => {

    const res: IHighlights[] = [];

    const wordRegex = /\b\w+\b/g;
    let match;

    while ((match = wordRegex.exec(currentPageContent)) !== null) {
      const word = match[0];
      const start = match.index;
      const end = start + word.length;

      res.push({
        end,
        start,
        id: res.length.toString(),
        color: res.length === activeWordIndex ? "yellow" : undefined
      });
    }

    return res;
  }, [activeWordIndex, currentPageContent]);

  const handleTranslate = useCallback(async (text: string) => {
    try {
      setIsTranslation(true);
      const rawRes = await fetch("https://api.reverso.net/translate/v1/translation", {
        "headers": {
          "content-type": "application/json",
          "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
        },
        "body": JSON.stringify({
          format: "text",
          from: "eng",
          to: "ukr",
          input: text,
          options: { origin: "translation.web" }
        }),
        "method": "POST"
      });
      console.log(rawRes.status);
      const resJson = await rawRes.json();

      setTranslation({
        from: text, to: resJson.translation[0]
      });

    } catch (e) {
      console.log("CATCH error: ", e);
    } finally {
      setIsTranslation(false);
    }
  }, []);

  const handlePressHighlightedWord = useCallback((id: string) => {
    if (activeWordIndex === +id) {
      setActiveWordIndex(null);
      setTranslation(null);
      return;
    }
    setActiveWordIndex(+id);
    const { start, end } = words[+id];
    const word = currentPageContent.substring(start, end);

    handleTranslate(word);
  }, [activeWordIndex, currentPageContent, handleTranslate, words]);

  const handleTextSelection: SelectableTextProps["onSelection"] = useCallback(e => {
    handleTranslate(e.content);
    setTranslation(null);
    setActiveWordIndex(null);
  }, [handleTranslate]);

  const handleBackAction = useCallback(() => {
    if (activeWordIndex !== null || translation) {
      setTranslation(null);
      setActiveWordIndex(null);
    } else {
      navigate(ROUTES_PATH.book(id));
    }

    return true;
  }, [activeWordIndex, id, navigate, translation]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackAction
    );

    return () => backHandler.remove();
  }, [handleBackAction]);

  return (
    <Screen navigation={false}>
      <TopBar bookName={book?.name || ""}/>
      {
        (isTranslation || (translation)) && <View
          style={styles.translationContainer}
        >
          <Text style={styles.translation}>
            {
              isTranslation
                ? "translation..."
                : <Text>{translation?.from} - {translation?.to}</Text>
            }
          </Text>
        </View>
      }
      <ScrollView style={{ flex: 1 }}>
        <SelectableText
          value={currentPageContent}
          onSelection={handleTextSelection}
          highlights={words}
          onHighlightPress={handlePressHighlightedWord}
          menuItems={["Translate"]}
          textComponentProps={{
            onLongPress: () => {
              // setActiveWordIndex(null);
              // setTranslation(null);
            }
          }}
          style={{ fontSize: 20 }}
          prependToChild={null}
        />
        <Pagination/>
      </ScrollView>
    </Screen>
  );
};

export default ReadingScreen;
