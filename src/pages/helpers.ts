import dayjs from 'dayjs';


export const getRandomInteger = (min: number, max: number) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

export const getRandomElement = <T>(array: T[]): T | undefined => {
  const randomIndex = getRandomInteger(0, array.length - 1);
  return array[randomIndex];
};

export const getRating = (rating: number) => Math.round(rating) * 20;

export const changeDateFormat = (date: string, format: string) => dayjs(date).format(format);

export const makeFirstCharBig = (word: string) => {
  const bigFirstChar = word.charAt(0).toUpperCase();
  return bigFirstChar + word.slice(1);
};

export const isPlural = (number: number) => number > 1;
