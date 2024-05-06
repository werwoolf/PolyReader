import * as React from "react";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { styles } from "./styles";
import TopBar from "./components/TopBar";
import Pagination from "./components/Pagination";
import TextToken from "./components/TextToken";
import Screen from "../../components/Screen";
import { Book } from "../../store/books/types";

interface ReadingScreenProps {
  currentPageContent: string;
  book: Book | null
}

const ReadingScreen: FC<ReadingScreenProps> = ({ currentPageContent, book }) => {
  const [activeWordIndex, setActiveWord] = useState<number | null>(null);
  const [isTranslation, setIsTranslation] = useState<boolean>();
  const [translatedWord, setTranslatedWord] = useState<string | null>(null);

  const currentPageTokens = useMemo(() => {
    return currentPageContent?.match(/\b\w+\b|[\s,]+|\S/g) || [];
  }, [currentPageContent]);

  const activeWord = Number.isInteger(activeWordIndex)
    ? currentPageTokens[activeWordIndex as number]
    : null;

  useEffect(() => {
    setActiveWord(null);
  }, [currentPageContent]);

  useEffect(() => {
    if (!activeWordIndex) return;
    fetch("https://api.reverso.net/translate/v1/translation", {
      "headers": {
        "content-type": "application/json"
      },
      "body": JSON.stringify({
        "format": "text",
        "from": "eng",
        "to": "ukr",
        "input": "cloud",
        "options": { "origin": "translation.web" }
      }),
      "method": "POST"
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });
  }, [activeWordIndex]);


  const parsedPageContent = useMemo(() => {
    return currentPageTokens.map((token, index) => {
      const isWord = /\b\w+\b/.test(token);

      return <TextToken
        key={index}
        token={token}
        isActive={index === activeWordIndex}
        index={index}
        isWord={isWord}
        onSetActiveIndex={setActiveWord}
      />;
    });
  }, [currentPageTokens, activeWordIndex]);

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

      setTranslatedWord(resJson.translation[0]);

    } catch (e) {
      console.log("CATCH error: ", e);
    } finally {
      setIsTranslation(false);
    }
  }, []);

  useEffect(() => {
    if (!activeWordIndex) return;
    handleTranslateWord(currentPageTokens[activeWordIndex]);
  }, [activeWordIndex, currentPageTokens, handleTranslateWord]);
  return (
    <Screen navigation={false}>
        <TopBar bookName={book?.name || ""}/>
        {
          (isTranslation || (translatedWord && activeWord)) && <View
            style={styles.translationContainer}
          >
            <Text style={styles.translation}>
              {
                isTranslation
                  ? "translation..."
                  : <Text>{currentPageTokens[activeWordIndex || 0]} - {translatedWord}</Text>
              }
            </Text>
          </View>
        }
        <ScrollView>
          <Text style={styles.original}>
            {parsedPageContent}
          </Text>
          <Pagination/>
        </ScrollView>
    </Screen>
  );
};

export default ReadingScreen;
