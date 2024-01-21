import React, { FC, memo } from "react";
import { Text } from "react-native";

interface OriginalPartProps {
  text: string;
  index: number;
  isActive: boolean;
  setActiveWordIndex: (index: number | null) => void
}

const OriginalPart: FC<OriginalPartProps> = ({ index, isActive, text, setActiveWordIndex }) => {
  return <Text
    style={{ backgroundColor: isActive ? "#aaa" : "#fff" }}
    onPress={() => setActiveWordIndex(isActive ? null : index)}
  >
    {text}
  </Text>
};

export default memo(OriginalPart);
