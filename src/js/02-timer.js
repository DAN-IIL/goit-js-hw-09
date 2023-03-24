import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

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
})

const startBtnEl = document.querySelector(`button[data-start]`);
const daysEl = document.querySelector(`span[data-days]`);
const hoursEl = document.querySelector(`span[data-hours]`);
const minutesEl = document.querySelector(`span[data-minutes]`);
const secondsEl = document.querySelector(`span[data-seconds]`);

const inputPickerEl = document.querySelector(`#datetime-picker`);
startBtnEl.setAttribute(`disabled`, ``);

const options = {
  defaultHour: 12,
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  isActive: false,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      Notiflix.Notify.failure('⚠️Please choose a date in the future');
      console.log(startBtnEl);
    } else {
      startBtnEl.removeAttribute(`disabled`, ``);
      Notiflix.Notify.success('✅Click on "START" button');
      console.log(selectedDates[0]);
    }
  },
};

startBtnEl.addEventListener(`click`, startTimet);

let timerId = null;

function startTimet() {  
  if (options.isActive) {
    return;
  }
  options.isActive = true;
  setTimeout(() =>{Notiflix.Notify.info('☝️Click on "ESC" to stop')}, 3000)
;
  
  const timerId = setInterval(() => {
    const currentTime = new Date();
    let finishTime = new Date(inputPickerEl.value)
    const time = finishTime - currentTime;
    console.log(convertMs(time));
    const { days, hours, minutes, seconds } = convertMs(time);

    if (time >= 0) {
      daysEl.textContent = addLeadingZero(days);
      hoursEl.textContent = addLeadingZero(hours);
      minutesEl.textContent = addLeadingZero(minutes);
      secondsEl.textContent = addLeadingZero(seconds);
    }
    else {
      clearInterval(timerId);      
      Notiflix.Notify.success(`👌Timer is finished`);
      options.isActive = false;
    }
  }, 1000);
    
  window.addEventListener(`keydown`, (e) => {
    if (e.code === `Escape`) {
      clearInterval(timerId);
      startBtnEl.setAttribute(`disabled`, ``);
      options.isActive = false;
      Notiflix.Notify.info(`🤷‍♀️You stoped timer`);
      setTimeout(() =>{Notiflix.Notify.info(`Select new date`)}, 2000)
    }
  })
}

function addLeadingZero(value){
  return value.toString().padStart(2, `0`);
}

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

flatpickr("#datetime-picker", options);