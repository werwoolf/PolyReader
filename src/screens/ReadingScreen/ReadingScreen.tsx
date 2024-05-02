import * as React from "react";
import { FC, useRef } from "react";
import { ScrollView, Text, View } from "react-native";
import { styles } from "./styles";
import TopBar from "./components/TopBar";
import { useParams } from "react-router-native";
import Pagination from "./components/Pagination";

interface ReadingScreenProps {
  currentPageContent: string,
  pagination: {  currentPage: number, pages: number}
}

const ReadingScreen: FC<ReadingScreenProps> = ({ currentPageContent, pagination }) => {
  const originRef = useRef<ScrollView | null>(null);
  const { id } = useParams();

  // if (!book) return <Text>"...loading"</Text>;
  return (
    <View style={styles.container}>
      <TopBar bookName={""}/>
      <Text>ID: {id}</Text>
      <ScrollView
        style={styles.original}
        ref={originRef}
      >
        <Text style={{ fontSize: 25 }}>
          {currentPageContent}
        </Text>
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.pages}
          setCurrentPage={}
        />
      </ScrollView>
    </View>
  );
};

export default ReadingScreen;
