export const splitText = (text: string, limit = 1000): string[] => { // todo: check whitespace if  dot not found
  let acc = text;
  const res: string[] = [];

  while (acc.length) {
    if (acc.length <= limit) {
      res.push(acc);
      break;
    }
    const lastDotIndex = acc.lastIndexOf(".", limit);

    res.push(acc.slice(0, lastDotIndex + 1));
    acc = acc.slice(lastDotIndex + 1);
  }

  return res;
};
