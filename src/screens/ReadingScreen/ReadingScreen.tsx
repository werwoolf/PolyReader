import * as React from "react";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { ScrollView } from "react-native";
import { SelectableText } from "@alentoma/react-native-selectable-text";
import { IHighlights } from "@alentoma/react-native-selectable-text/demo/SelectableText";
import { styles } from "./styles";
import TopBar from "./components/TopBar";
import Pagination from "./components/Pagination";
// import TextToken from "./components/TextToken";
import Screen from "../../components/Screen";
import { Book } from "../../store/books/types";
import { updateLastVisitedPage } from "../../store/book/asyncActions";
import { HandleThunkActionCreator } from "react-redux";
import "react-native-get-random-values";

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
  const [activeWordIndex, setActiveWord] = useState<number | null>(null);
  const [isTranslation, setIsTranslation] = useState<boolean>();
  const [translatedWord, setTranslatedWord] = useState<string | null>(null);

  useEffect(() => {
    setActiveWord(null);
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

  const handleTranslateWord = useCallback(async (word: string) => {
    try {
      setIsTranslation(true);
      const rawRes = await fetch("https://api.reverso.net/translate/v1/translation", {
        "headers": {
          "content-type": "application/json",
          "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
        },
        "body": JSON.stringify({
          "format": "text",
          "from": "eng",
          "to": "ukr",
          "input": word,
          "options": { "origin": "translation.web" }
        }),
        "method": "POST"
      });
      console.log(rawRes.status);
      const resJson = await rawRes.json();
      console.log(resJson.translation[0]);
      setTranslatedWord(resJson.translation[0]);

    } catch (e) {
      console.log("CATCH error: ", e);
    } finally {
      setIsTranslation(false);
    }
  }, []);

  const handlePressHighlightedWord = useCallback((id: string) => {
    setActiveWord(+id);
    // const { start, end } = words[+id];
    // const word = currentPageContent.substring(start, end);
    //
    // handleTranslateWord(word);
  }, [currentPageContent, handleTranslateWord, words]);

  return (
    <Screen navigation={false}>
      <TopBar bookName={book?.name || ""}/>
      {
        // (isTranslation || (translatedWord && activeWord)) && <View
        //   style={styles.translationContainer}
        // >
        //   <Text style={styles.translation}>
        //     {
        //       isTranslation
        //         ? "translation..."
        //         : <Text>{currentPageTokens[activeWordIndex || 0]} - {translatedWord}</Text>
        //     }
        //   </Text>
        // </View>
      }
      <ScrollView>
        <SelectableText
          value={currentPageContent}
          onSelection={e => {
            handleTranslateWord(e.content);
          }}
          highlights={words}
          onHighlightPress={handlePressHighlightedWord}
          menuItems={["Translate"]}
          prependToChild={null}
          style={{ fontSize: 18 }}
        />
        <Pagination/>
      </ScrollView>
    </Screen>
  );
};

export default ReadingScreen;
