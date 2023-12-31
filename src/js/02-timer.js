import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const startButtonEl = document.querySelector('[data-start]');
const flatpickrEl = document.querySelector('#datetime-picker');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const  minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

startButtonEl.disabled = true;

let countdownIntervalId;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
  
    onClose(selectedDates) {
      const currentDate = new Date();

      selectedDates.forEach((date) => {
        if (date < currentDate) { 
            startButtonEl.disabled = true;
          alert("Please choose a date in the future");
        } else {
            startButtonEl.disabled = false;
            handleTimerReset();
        }
      });
    },
  };

  flatpickr(flatpickrEl, options);

  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

  const addZero = (value) => {
    return value.toString().padStart(2, '0');
  };

  const updateTimer = (targetDate) => {
    const currentDate = new Date();
    const remainingTime = targetDate.getTime() - currentDate.getTime();

    if (remainingTime <= 0) {
      clearInterval(countdownIntervalId);
      startButtonEl.disabled = true;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(remainingTime);

    daysEl.textContent = addZero(days);
    hoursEl.textContent = addZero(hours);
    minutesEl.textContent = addZero(minutes);
    secondsEl.textContent = addZero(seconds);
  };



  const handleTimerStart = () => {
    const selectedDate = flatpickrEl._flatpickr.selectedDates[0];
    countdownIntervalId = setInterval(() => updateTimer(selectedDate), 1000);
    startButtonEl.textContent = 'Reset';
  };
  
  const handleTimerReset = () => {
    clearInterval(countdownIntervalId);
    startButtonEl.textContent = 'Start';

    daysEl.textContent = '00';
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
  };
  
  startButtonEl.addEventListener('click', () => {
    if (startButtonEl.textContent === 'Start') {
      handleTimerStart();
    } else if (startButtonEl.textContent === 'Reset') {
      handleTimerReset();
    }
  });