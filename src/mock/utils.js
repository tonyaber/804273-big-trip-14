/**
 * функция генерирует рандомное число из  заданого промежутка
 *
 * @param {number} min - начало промежутка
 * @param {number} max - конец промежутка
 * @returns {number} - возвращает случайное значение
 */
const getRandomNumber = (min, max) => {
  return Math.round((Math.random() * (max - min) + min));
};

/**
 * функция создает новый массив рандомной длины
 * с переешанными элементами
 *
 * @param {array} array - массив
 * @param {number} size - максимально возможный размер нового массива,
 * по умолчанию равен длине массива - 1
 * @returns {array} - возвращает новый массив с рандомными элементами
 */
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

/**
  * функция возващает случайный элемент с массива
  *
  * @param {array} array - массив
  * @returns {string} - возвращает элемент массива
  */
const getRandomElementFromArray = (array) => {
  const randomIndex = getRandomNumber(0, array.length - 1);
  return array[randomIndex];
};

export { getRandomNumber, getRandomArray, getRandomElementFromArray };
