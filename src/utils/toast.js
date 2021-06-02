const SHOW_TIME = 3000;

const toastContainer = document.createElement('div');
const toastItem = document.createElement('div');
const toastFixedItem = document.createElement('div');

document.body.append(toastContainer);


const toast = (message) => {
  toastItem.textContent = message;
  toastItem.classList.add('toast-item');
  toastContainer.append(toastItem);

  setTimeout(() => {
    toastItem.remove();
  }, SHOW_TIME);
};

const toastFixed = (message) => {
  toastFixedItem.textContent = message;
  toastFixedItem.classList.add('toast-item');
  toastContainer.append(toastFixedItem);
};

const deleteToastFixed = () => {
  toastFixedItem.remove();
  toastItem.remove();
};

export { toast, toastFixed, deleteToastFixed };
