// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

function showMessage(isAlert, delay) {
  if (isAlert) {
    iziToast.error({
      message: `❌ Rejected promise in ${delay}ms`,
      position: 'topRight',
    });
  } else {
    iziToast.success({
      message: `✅ Fulfilled promise in ${delay}ms`,
      position: 'topRight',
    });
  }
}

document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault();

  const delay = parseInt(this.delay.value);
  const state = this.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      showMessage(false, delay);
    })
    .catch(delay => {
      showMessage(true, delay);
    });
});
