import Abstract from '../view/abstract.js';
import EditPointView from '../view/edit-point.js';
import PointView from '../view/point.js';
import { RenderPosition } from '../const.js';

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

  pointComponent.setEditClickHandler(() => {
    replacePointToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  pointEditComponent.setEditClickHandler(() => {
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  pointEditComponent.setFormSubmitHandler(() => {
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  renderElement(pointListElement, pointComponent.getElement(), RenderPosition.BEFOREEND);
};

export { renderElement, renderPoint, createElement };
