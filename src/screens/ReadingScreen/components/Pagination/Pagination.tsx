import * as React from "react";
import { Dispatch, FC, SetStateAction, useCallback } from "react";
import { Button, Text, View } from "react-native";
import { styles } from "../../styles";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const Pagination: FC<PaginationProps> = ({
                                           currentPage,
                                           totalPages,
                                           setCurrentPage
                                         }) => {
  const handlePreviousPage = useCallback(() => {
    setCurrentPage(current => current - 1);
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage(current => current + 1);
  }, []);
  return (
    <View style={styles.pagination}>
      <Button
        title={"previous"}
        disabled={currentPage < 1}
        onPress={handlePreviousPage}
      />
      <Text style={{ fontSize: 30 }}>
        {currentPage + 1} / {totalPages}
      </Text>
      <Button
        title={"next"}
        disabled={currentPage >= totalPages}
        onPress={handleNextPage}
      />
    </View>
  );
};

export default Pagination;
