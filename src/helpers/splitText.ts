import chunk from "lodash/chunk"

export const splitText = (text: string, limit = 1000): string[] => {
  return chunk(text.split(""), limit).map(chunk => chunk.join(""));
}
