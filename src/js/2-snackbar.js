// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


document.addEventListener("DOMContentLoaded", function() {
  //посилання на форму
  const form = document.querySelector('.form');
//обробник події submit для форми
  form.addEventListener('submit', handleSubmit);
});

function handleSubmit(event) {
  event.preventDefault();

  const delay = getDelay();
  const state = getState();

  if (delay && state) {
    createPromise(delay, state)
      .then(handleSuccess)
      .catch(handleError);
  }
}

function getDelay() {
  const delayInput = document.querySelector('input[name="delay"]');
  return parseInt(delayInput.value);
}

function getState() {
  const stateInput = document.querySelector('input[name="state"]:checked');
  return stateInput ? stateInput.value : null;
}
// Функція для створення промісу з вказаними параметрами
function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    if (state === 'fulfilled') {
      setTimeout(() => resolve(delay), delay);
    } else {
      setTimeout(() => reject(delay), delay);
    }
  });
}

function handleSuccess(value) {
  iziToast.success({
    title: 'Success',
    message: `✅ Fulfilled promise in ${value}ms`
  });
}

function handleError(value) {
  iziToast.error({
    title: 'Error',
    message: `❌ Rejected promise in ${value}ms`
  });
}