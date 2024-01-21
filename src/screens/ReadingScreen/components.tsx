import React, { memo, useEffect, useRef } from "react";
import { Text, UIManager } from 'react-native';

// @ts-ignore
export const OriginalPart = memo(({ index, isActive, text, setActiveWordIndex }) => {
    return <Text
      style={{ backgroundColor: isActive ? "#aaa" : "#fff" }}
      onPress={() => setActiveWordIndex(isActive ? null : index)}
    >
      {text}
    </Text>
  }
);

// @ts-ignore
export const TranslationPart = memo(({ isActive, text, onScrollTranslation }) => {
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
