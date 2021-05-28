import Abstract from '../view/abstract.js';
import { RenderPosition } from '../const.js';

/**
 * функция меняет заменяет один DOM элемент другим
 *
 * @param newChild - новые элемент,который добавляем
 * @param oldChild - старый элемент, который заменяем
 *
 */
const replace = (newChild, oldChild) => {
  if (oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof Abstract) {
    newChild = newChild.getElement();
  }

  if (!oldChild.parentElement) {
    throw new Error('Can\'t replace unexisting elements');
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error('Can\'t replace unexisting elements');
  }

  parent.replaceChild(newChild, oldChild);
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
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (element instanceof Abstract) {
    element = element.getElement();
  }

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
 * функция удаления DOM-элемента
 *
 * @param component - DOM-элемент, который удаляем
 */
const remove = (component) => {
  if (component === null) {
    return;
  }
  if (!(component instanceof Abstract)) {
    throw new Error('Can remove only components');
  }

  component.getElement().remove();
  component.removeElement();
};

/**
 * функция, которая меняем один эелемент в массиве(по индексу)
 *
 * @param items - массив элементов
 * @param update - значение для изменения
 * @returns @param array - возвращает массив с новым значением
 */
const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

const show = (buttonNewPoint, pageBodyContainer, buttonHeaderTable, buttonHeaderStats) => {
  buttonNewPoint.disabled = false;
  buttonHeaderTable.classList.add('trip-tabs__btn--active');
  buttonHeaderStats.classList.remove('trip-tabs__btn--active');
  for (let i = 0; i < pageBodyContainer.length; i++) {
    pageBodyContainer[i].classList.add('page-body__container-for-line');
  }
};

const hide = (buttonNewPoint, pageBodyContainer, buttonHeaderTable, buttonHeaderStats) => {
  buttonHeaderTable.classList.remove('trip-tabs__btn--active');
  buttonHeaderStats.classList.add('trip-tabs__btn--active');
  buttonNewPoint.disabled = true;
  for (let i = 0; i < pageBodyContainer.length; i++) {
    pageBodyContainer[i].classList.remove('page-body__container-for-line');
  }
};

export { renderElement, replace, createElement, remove, updateItem, show, hide };
