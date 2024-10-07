// GET RANDOM NUMBER IN RANGE-------------------------------------------------------------------
const randomNumberBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
// GET LISTO OF UNIQUE NUMBERS
const generateUniqueRandomNumbers = (min, max, count) => {
  if (count > max - min + 1)
    throw Error(
      'No more unique numbers than exist in the range can be obtained.'
    );

  const uniqueNumbers = [];
  for (let i = 0; i < count; i++) {
    let randomValue = randomNumberBetween(min, max);
    if (!uniqueNumbers.includes(randomValue)) {
      uniqueNumbers.push(randomValue);
    } else {
      i--;
    }
  }

  return uniqueNumbers;
};
// GET QUESTIONS BASED ON THE LIST OF UNIQUE NUMBERS
export const getRandomQuestions = (min, max, count, data) => {
  const uniqueNumbers = generateUniqueRandomNumbers(min, max, count);
  let questions = [];
  for (let i = 0; i < uniqueNumbers.length; i++) {
    questions.push(data[uniqueNumbers[i]]);
  }
  return questions;
};
