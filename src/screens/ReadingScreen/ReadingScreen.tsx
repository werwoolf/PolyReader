import * as React from "react";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { styles } from "./styles";
import TopBar from "./components/TopBar";
import { useParams } from "react-router-native";
import Pagination from "./components/Pagination";
import TextToken from "./components/TextToken";

interface ReadingScreenProps {
  currentPageContent: string
}

const ReadingScreen: FC<ReadingScreenProps> = ({ currentPageContent }) => {
  const { id } = useParams();
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
    setActiveWord(null)
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
        "options": { "origin": "translation.web", }
      }),
      "method": "POST"
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });
  }, []);

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
      />
    });
  }, [currentPageTokens, activeWordIndex]);

  const handleTranslateWord = useCallback(async (word: string) => {
    try {
      setIsTranslation(true)
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
      console.log(rawRes.status)
      const resJson = await rawRes.json();

      setTranslatedWord(resJson.translation[0]);

    } catch (e) {
      console.log("CATCH error: ", e)
    } finally {
      setIsTranslation(false)
    }
  }, [])

  useEffect(() => {
    if (!activeWordIndex) return;
    handleTranslateWord(currentPageTokens[activeWordIndex])
  }, [activeWordIndex, currentPageTokens]);

  // if (!book) return <Text>"...loading"</Text>;
  return (
    <View style={styles.container}>
      {
        (isTranslation || (translatedWord && activeWord)) && <View
          style={{
            width: "100%",
            paddingVertical: 10,
            paddingHorizontal: 5,
            borderStyle: "solid",
            borderColor: "grey",
            borderWidth: 2,
            backgroundColor: "#ccc"
          }}
        >
          <Text style={{ fontSize: 18 }}>
            {
              isTranslation
                ? "translation..."
                : <Text>{currentPageTokens[activeWordIndex || 0]} - {translatedWord}</Text>
            }
          </Text>
        </View>
      }
      <TopBar bookName={""}/>
      <Text>ID: {id}</Text>
      <ScrollView>
        <Text style={{ fontSize: 25 }}>
          {parsedPageContent}
        </Text>
        <Pagination/>
      </ScrollView>
    </View>
  );
};

export default ReadingScreen;
