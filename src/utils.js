//функция рандомного числа
const getRandomNumber = (min, max) => {
  return Math.round((Math.random() * (max - min) + min));
};

//Функция создания массива с рандомным набором данных
const getRandomArray = (array, size = array.length - 1) => {
  const newArray = array.slice();

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const swap = newArray[j];
    newArray[j] = newArray[i];
    newArray[i] = swap;
  }

  const count = getRandomNumber(1, size);

  return newArray.slice(0, count);
};

export { getRandomNumber, getRandomArray };
