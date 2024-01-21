import * as React from "react";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button, ScrollView, Text, View } from "react-native";
import { parts } from "../../downloading/FightClub";
import { styles } from "./styles";
import { OriginalPart, TranslationPart } from "./components";
import { NativeSyntheticEvent } from "react-native/Libraries/Types/CoreEventTypes";
import { NativeScrollEvent } from "react-native/Libraries/Components/ScrollView/ScrollView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { throttle } from "../../helpers/throttle";

interface ReadingScreenProps {}

const ReadingScreen: FC<ReadingScreenProps> = () => {
  const start = performance.now();

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [activeWordIndex, setActiveWordIndex] = useState<null | number>(null);
  const activePage = useMemo(() => parts[currentPage], [currentPage]);
  const [isLoadingTranslation, setIsLoadingTranslation] = useState<boolean>(false);
  const [loadedWordTranslation, setLoadedWordTranslation] = useState<null | string>(null);

  const activeWordObj = activeWordIndex ? activePage.tokens1[activeWordIndex] : null;
  const activeWordTranslationIndex = activeWordObj ? activeWordObj[3] : null;
  const translationRef = useRef<ScrollView | null>(null);
  const originRef = useRef<ScrollView | null>(null);
  const translationScroll = useRef<number>(0);
  const [originScroll, setOriginScroll] = useState<number>(0);
  const [isPositionReaded, setIsPositionReaded] = useState<boolean>(false)

  const handleScrollTranslationTo = useCallback(({ position, offset = 0 }: { position?: number, offset?: number }) => {
    if (!translationRef.current) return;

    translationRef.current.scrollTo({
      animated: true,
      y: (typeof position === "number")
        ? position + translationScroll.current - 100
        : translationScroll.current - (offset * 5)
      // y: position
    });
  }, []);

  // const handleScrollTranslation = useMemo(() => throttle((e: NativeSyntheticEvent<NativeScrollEvent>) => {
  //   translationScroll.current = e.nativeEvent.contentOffset.x;
  // }, 0), []);

  const handleScrollTranslation = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    translationScroll.current = e.nativeEvent.contentOffset.x;
  }, []);

  const handleScrollOriginal = useMemo(() => throttle((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setOriginScroll(e.nativeEvent.contentOffset.y);
  }, 1000), []);

  const original = useMemo(() => {
    return activePage.tokens1.map(([a, b, c, d, e], index) => <OriginalPart
        key={index}
        isActive={index === activeWordIndex}
        text={`${a}${c}`}
        index={index}
        setActiveWordIndex={setActiveWordIndex}
      />
    )
  }, [activePage, activeWordIndex])

  const translation = useMemo(() => {
    return activePage.tokens2.map(([a, b, c], index) => <TranslationPart
      key={index}
      onScrollTranslation={handleScrollTranslationTo}
      isActive={index === activeWordTranslationIndex}
      text={`${a}${c}`.replaceAll("\n", " ")}
    />);
  }, [activePage, activeWordTranslationIndex]);

  const handlePreviousPage = useCallback(() => {
    setCurrentPage(current => current - 1);
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage(current => current + 1);
  }, []);

  const handleSaveDataToCache = useCallback(async (page: number, originScroll: number) => {
    if (!isPositionReaded) return;
    await AsyncStorage.setItem("position", JSON.stringify({ page, originScroll }))
  }, []);

  useEffect(() => {
    handleSaveDataToCache(currentPage, originScroll)
  }, [currentPage, originScroll]);

  useEffect(() => {
    if (!activeWordObj) return;
    setIsLoadingTranslation(true);
    fetch(`https://2books.su/dictionary/translate?word=${activeWordObj[0]}`)
      .then((res) => res.json())
      .then(json => {
        const { word, tr, ts } = json;
        setIsLoadingTranslation(false)
        setLoadedWordTranslation(`${word} [${ts}] -> ${tr}`)
      })
  }, [activeWordObj])

  useEffect(() => {
    setActiveWordIndex(null)
  }, [currentPage]);

  useEffect(() => {
    AsyncStorage.getItem("position").then((data) => {
      setIsPositionReaded(true);

      if (data) {
        const { page, originScroll } = JSON.parse(data);
        setCurrentPage(page)
        originRef.current?.scrollTo({ y: originScroll, animated: true })
      }

    })
  }, []);

  const end = performance.now()

  console.log("all time: ",end - start)
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        style={styles.translation}
        ref={translationRef}
        onScroll={handleScrollTranslation}
      >
        {translation}
      </ScrollView>
      {
        activeWordObj
          ? <Text style={styles.wordTranslation}>
            {isLoadingTranslation ? "loading..." : loadedWordTranslation}
          </Text>
          : null
      }
      <ScrollView
        style={styles.original}
        ref={originRef}
        onScroll={handleScrollOriginal}
      >
        <Text style={{ fontSize: 25 }}>
          {original}
        </Text>
      </ScrollView>
      <View style={styles.pagination}>
        <Button
          title={"previous"}
          disabled={currentPage < 1}
          onPress={handlePreviousPage}
        />
        <Text style={{ fontSize: 30 }}>
          {currentPage + 1} / {parts.length}
        </Text>
        <Button
          title={"next"}
          disabled={currentPage >= parts.length}
          onPress={handleNextPage}
        />
      </View>

    </View>
  );
};

export default ReadingScreen;
