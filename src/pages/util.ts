/*export const getRandomInteger = (min: number, max: number) => {
  // случайное число от min до (max+1)
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};*/
export const getRating = (rating: number) => Math.round(rating) * 20;

export const makeFirstCharBig = (word: string) => {
  const bigFirstChar = word.charAt(0).toUpperCase();
  return bigFirstChar + word.slice(1);
};

export const isPlural = (number: number) => number > 1;
