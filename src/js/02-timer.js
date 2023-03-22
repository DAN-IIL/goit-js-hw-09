import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

// STYLE
const timerEl = document.querySelector(`.timer`);
timerEl.style.display = `flex`;
timerEl.style.gap = `20px`;
timerEl.style.paddingTop = `20px`;

const fieldEl = document.querySelectorAll(`.field`)
fieldEl.forEach((div) => {
    div.style.display = `flex`;
    div.style.flexDirection = `column`;
    div.style.textAlign = `center`;
    div.firstElementChild.style.fontWeight = `700`;
    div.firstElementChild.style.fontSize = `24px`;
});


const inputEl = document.querySelector('#datetime-picker');
const btnEl = document.querySelector('[data-start]');

const data = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};

btnEl.disabled = true;

let timeDiff = 0;
let timeId = null;
let selectedDate = null;

// flatpickr library
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      selectedDate = selectedDates[0];
      if (selectedDates[0] < new Date()) {
          window.alert('Please choose a date in the future');
      } else {
        btnEl.disabled = false;
      }
    },
  };

  flatpickr(inputEl, options);

const handleBtnClick = () => {
    timeId = setInterval(() => {
        timeDiff = selectedDate - new Date();
        data.days.textContent = convertMs(timeDiff).days;
        data.hours.textContent = convertMs(timeDiff).hours;
        data.minutes.textContent = convertMs(timeDiff).minutes;
        data.seconds.textContent = convertMs(timeDiff).seconds;

        if (timeDiff === 0) {
            clearInterval(timeId);
        }
    }, 1000);
};

btnEl.addEventListener('click', handleBtnClick);

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