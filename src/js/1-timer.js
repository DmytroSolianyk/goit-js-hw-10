// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    const now = new Date();
    if (userSelectedDate <= now) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      document.querySelector('[data-start]').disabled = true;
    } else {
      document.querySelector('[data-start]').disabled = false;
    }
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

flatpickr('#datetime-picker', options);

document.querySelector('[data-start]').addEventListener('click', function () {
  startCountdown(userSelectedDate);
});

function startCountdown(endTime) {
  document.querySelector('[data-start]').disabled = true;
  document.querySelector('#datetime-picker').disabled = true;

  let currentTimer = setInterval(() => {
    const now = new Date().getTime();
    const distance = endTime - now;

    if (distance < 0) {
      clearInterval(currentTimer);
      document.querySelector('#datetime-picker').disabled = false;
      return;
    }
    updateDataTimer(convertMs(distance));
  }, 1000);
}

function updateDataTimer(dateValue) {
  const { days, hours, minutes, seconds } = dateValue;
  document.querySelector('[data-days]').innerText = days
    .toString()
    .padStart(2, '0');
  document.querySelector('[data-hours]').innerText = hours
    .toString()
    .padStart(2, '0');
  document.querySelector('[data-minutes]').innerText = minutes
    .toString()
    .padStart(2, '0');
  document.querySelector('[data-seconds]').innerText = seconds
    .toString()
    .padStart(2, '0');
}
