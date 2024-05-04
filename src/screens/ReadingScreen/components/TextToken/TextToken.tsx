import * as React from "react";
import { FC, memo, useCallback } from "react";
import { Text } from "react-native";

interface TextTokenProps {
  token: string;
  isActive: boolean;
  isWord: boolean;
  index: number;
  onSetActiveIndex: (index: number | null) => void;
}

const TextToken: FC<TextTokenProps> = ({
                                         token,
                                         index,
                                         isWord,
                                         isActive,
                                         onSetActiveIndex
                                       }) => {
  const handlePress = useCallback(() => {
    if (isWord) {
      onSetActiveIndex(isActive ? null : index);
    }
  }, [token, onSetActiveIndex, isWord, isActive])

  return <Text
    onPress={handlePress}
    style={{
      backgroundColor: isActive
        ? "red"
        : "#00000000"
    }}
  >
    {token}
  </Text>;
};

export default memo(TextToken);
