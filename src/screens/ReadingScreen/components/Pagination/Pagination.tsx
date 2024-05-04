import * as React from "react";
import { FC, useCallback } from "react";
import { Button, Text, View } from "react-native";
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

  const handlePreviousPage = useCallback(()=>{
    previousPage();
  }, []);

  const handleNextPage = useCallback(()=>{
    nextPage();
  }, []);
  return (
    <View style={styles.pagination}>
      <Button
        title={"previous"}
        disabled={currentPage < 1}
        onPress={handlePreviousPage}
      />
      <Text style={{ fontSize: 30 }}>
        {currentPage} / {pages}
      </Text>
      <Button
        title={"next"}
        disabled={currentPage >= pages}
        onPress={handleNextPage}
      />
    </View>
  );
};

export default Pagination;
