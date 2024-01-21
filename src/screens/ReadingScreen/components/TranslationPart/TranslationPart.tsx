import React, { FC, memo, useEffect, useRef } from "react";
import { Text } from "react-native";

interface TranslationPartProps {
  text: string;
  isActive: boolean;
  onScrollTranslation: ({ position }: { position: number }) => void
}

const TranslationPart: FC<TranslationPartProps> = memo(({ isActive, text, onScrollTranslation }) => {
  const ref = useRef<Text | null>(null);

  useEffect(() => {
    if (isActive && ref.current) {
      ref.current?.measure((...args) => {
        const [_x, _y, _width, _height, pageX] = args;
        onScrollTranslation({ position: pageX })
      })
    }
  }, [isActive, ref.current]);

  return <Text
    ref={ref}
    style={{ backgroundColor: isActive ? "#aaa" : "#fff" }}
  >
    {text}
  </Text>
});

export default memo(TranslationPart);
