import { RenderPosition } from './const.js';
import EditPointView from './view/edit-point.js';
import PointView from './view/point.js';
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
  * функция обавляет DOM-элемент в контейнер
  *
  * @param container - DOM-элемент, в корорый записываем новое значение
  * @param element - добавляемый DOM-элемент
  * @param place - параметр, отвечающий за место, куда записываем
  *
  */

const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};
/**
  * функция создания DOM-элемента
  *
  * Принцип работы:
  * 1. создаём пустой div-блок
  * 2. берём HTML в виде строки и вкладываем в этот div-блок, превращая в DOM-элемент @param template
  * 3. @returns возвращаем этот DOM-элемент
  *
  */
const createElement = (template) => {
  const newElement = document.createElement('div'); // 1
  newElement.innerHTML = template; // 2

  return newElement.firstChild; // 3
};

/**
  * функция открывает поле редактирования и скрывает его после изменений
  *
  * @param pointListElement - список
  * @param point - DOM-элемент списка
  *
  */
const renderPoint = (pointListElement, point) => {
  const pointComponent = new PointView(point);
  const pointEditComponent = new EditPointView(point);

  //смена точки на форму редактирования
  const replacePointToForm = () => {
    pointListElement.replaceChild(pointEditComponent.getElement(), pointComponent.getElement());
  };

  //смена формы редактирования на обычное отображение точки
  const replaceFormToPoint = () => {
    pointListElement.replaceChild(pointComponent.getElement(), pointEditComponent.getElement());
  };

  //фукнкция клика на кнопку Escape
  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' && evt.target.tagName !== 'INPUT') {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  pointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replacePointToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  pointEditComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  pointEditComponent.getElement().querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  renderElement(pointListElement, pointComponent.getElement(), RenderPosition.BEFOREEND);
};

export { getRandomNumber, getRandomArray, renderElement, createElement, renderPoint };
