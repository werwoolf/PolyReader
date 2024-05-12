import * as React from "react";
import { FC, useCallback } from "react";
import { Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "./styles";
import { Pagination as PaginationType } from "../../../../store/book/types";
import { previousPage, nextPage } from "../../../../store/book/slice";

interface PaginationProps {
  pagination: PaginationType;
  previousPage: typeof previousPage,
  nextPage: typeof nextPage
}

const Pagination: FC<PaginationProps> = ({
                                           pagination,
                                           nextPage,
                                           previousPage
                                         }) => {
  const { currentPage, pages } = pagination;

  const isPossibleBack = currentPage > 1;
  const isPossibleForward = currentPage < pages;

  const handlePreviousPage = useCallback(() => {
    previousPage();
  }, [previousPage]);

  const handleNextPage = useCallback(() => {
    nextPage();
  }, [nextPage]);
  return (
    <View style={styles.pagination}>
      <AntDesign
        size={28}
        color={isPossibleBack ? "black" : "grey"}
        name="arrowleft"
        style={styles.button}
        onPress={isPossibleBack ? handlePreviousPage : undefined}
      />
      <Text style={styles.pagesCount}>
        {currentPage} / {pages}
      </Text>
      <AntDesign
        name="arrowright"
        size={28}
        color={isPossibleForward ? "black" : "grey"}
        style={styles.button}
        onPress={isPossibleForward ? handleNextPage : undefined}
      />
    </View>
  );
};

export default Pagination;
