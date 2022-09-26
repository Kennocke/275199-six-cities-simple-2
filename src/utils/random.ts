export const generateRandomValue = (min: number, max: number, numAfterDigit = 0) =>
  +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);

export const getRandomItems = <T>(items: T[]):T[] => {
  const startPosition = generateRandomValue(0, items.length - 1);
  const endPosition = startPosition + generateRandomValue(startPosition, items.length);
  return items.slice(startPosition, endPosition);
};

export const getRandomItem = <T>(items: T[]):T => {
  console.log(items);
  return items[generateRandomValue(0, items.length - 1)];
};

export const generateRandomDate = (start: Date, end: Date) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getDate()));

export const generateRandomFlag = (): boolean => Boolean(generateRandomValue(0, 1));
