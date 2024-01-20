import { memo, useCallback, useMemo, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { parts } from "./src/downloading/FightClub";

// @ts-ignore
const OriginalPart = memo(({ index, isActive, text, setActiveWordIndex }) => {
    return <Text
      style={{ backgroundColor: isActive ? "#aaa" : "#fff" }}
      onPress={() => setActiveWordIndex(isActive ? null : index)}
    >
      {text}
    </Text>
  }
);

export default function App() {
  const start = performance.now();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [activeWordIndex, setActiveWordIndex] = useState<null | number>(null);

  const activePage = useMemo(() => parts[currentPage], [currentPage]);

  // @ts-ignore
  const activeWord = parts[currentPage].tokens1[activeWordIndex];


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


  // if (activeWord){
  //   console.log(parts[currentPage].tokens2[activeWord[3]]);
  // }

  const translation = useMemo(() => {
    return activePage.tokens2.reduce((acc, [a, b, c]) => `${acc}${a}${c}`, "").replaceAll("\n", "")
  }, [activePage])

  const handlePreviousPage = useCallback(() => {
    setCurrentPage(current => current - 1);
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage(current => current + 1);
  }, []);

  const end = performance.now()

  console.log(end - start)
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        style={{
          height: "5%",
          borderBottomWidth: 2,
          borderBottomColor: "rgba(122, 122, 122, .5)",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 10,
          backgroundColor: "#fff"
        }}
      >
        <Text>
          {translation}
        </Text>
      </ScrollView>
      <ScrollView
        style={{ height: "90%", zIndex: 9 }}
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 20,
    marginTop: 40,
    position: "relative"
  },
  pagination: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30
  }
});
