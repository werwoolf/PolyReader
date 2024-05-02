import chunk from "lodash/chunk"

export const splitText = (text: string, limit = 1000): string[] => {
  const chunks = Math.ceil(text.length / limit)

  return chunk(text.split(""), chunks).map(chunk=> chunk.join(""))
}
