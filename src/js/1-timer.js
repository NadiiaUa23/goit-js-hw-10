// Імпорт бібліотек та стилів
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// посиланя на елементи DOM
class CountdownTimer {
  constructor(datetimePickerId, startButtonSelector, daysSelector, hoursSelector, minutesSelector, secondsSelector) {
    this.datetimePicker = document.getElementById(datetimePickerId);
    this.startButton = document.querySelector(startButtonSelector);
    this.daysValue = document.querySelector(daysSelector);
    this.hoursValue = document.querySelector(hoursSelector);
    this.minutesValue = document.querySelector(minutesSelector);
    this.secondsValue = document.querySelector(secondsSelector);

    this.countdownInterval = null; // Змінна для інтервалу таймера

    this.initialize();
  }
// Ініціалізація календаря flatpickr
  initialize() {
    this.datetimePicker.flatpickr({
      enableTime: true,
      time_24hr: true,
      defaultDate: new Date(),// Встановлення поточної дати та часу за замовчуванням
      minuteIncrement: 1,
      onClose: (selectedDates) => {
        //Обробник події закриття календаря
        const selectedDate = selectedDates[0];
        const now = new Date();
// Перевірка, чи обрана дата майбутня
        if (selectedDate <= now) {
          iziToast.error({
            title: 'Error',
            message: 'Please choose a date in the future',
            position: 'topRight'
          });
          this.startButton.disabled = true;// Вимкнути кнопку Start
        } else {
          this.startButton.disabled = false;// Увімкнути кнопку Start
        }
      },
    });

    this.startButton.disabled = true;// Вимкнути кнопку Start при завантаженні сторінки

//обробника події для кнопки Start
    this.startButton.addEventListener('click', () => this.startCountdown());

    this.updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });// Оновлення відображення таймера
  }

  updateTimerDisplay({ days, hours, minutes, seconds }) {
    this.daysValue.textContent = this.addLeadingZero(days);
    this.hoursValue.textContent = this.addLeadingZero(hours);
    this.minutesValue.textContent = this.addLeadingZero(minutes);
    this.secondsValue.textContent = this.addLeadingZero(seconds);
  }

  startCountdown() {
    //апуск таймера зворотнього відліку до обраної дати.
    const selectedDate = new Date(this.datetimePicker._flatpickr.selectedDates[0]);
    this.startButton.disabled = true;
    clearInterval(this.countdownInterval);
    this.countdownInterval = setInterval(() => {
      const now = new Date();
      const difference = selectedDate - now;

      if (difference <= 0) {
        clearInterval(this.countdownInterval);
        this.updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        iziToast.success({
          title: 'Success',
          message: 'Countdown finished!',
          position: 'topRight'
        });
        this.startButton.disabled = false;
      } else {
        const time = this.convertMs(difference);
        this.updateTimerDisplay(time);
      }
    }, 1000);
  }

// якщо, наприклад, value рівне 5, то функція поверне '05', 
//а якщо value рівне 15, то поверне '15'. Це забезпечує, що 
//числа завжди відображаються у форматі з двома цифрами, наприклад, 
//для відображення часу у форматі HH:MM:SS, де числа менші за 10 мають ведучий нуль.
  addLeadingZero(value) {
    return value < 10 ? `0${value}` : value;
  }

  convertMs(ms) {
    // Допоміжна функція для конвертації мілісекунд у дні, години, хвилини та секунди
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
}

const timer = new CountdownTimer(
  'datetime-picker',
  '[data-start]',
  '[data-days]',
  '[data-hours]',
  '[data-minutes]',
  '[data-seconds]'
);

// import flatpickr from "flatpickr";
// import "flatpickr/dist/flatpickr.min.css";
// import iziToast from "izitoast";
// import "izitoast/dist/css/iziToast.min.css";


// // Otherwise, selectors are also supported
// flatpickr("#datetime-picker", {
//     enableTime: true,
//     dateFormat: "Y-m-d H:i",
// });

// //    const test = iziToast.show({
// //   title: 'Hey',
// // message: 'What would you like to add?'
// //     });


// const datetimePicker = document.getElementById("datetime-picker");
// const startButton = document.querySelector('[data-start]');
// const daysValue = document.querySelector('[data-days]');
// const hoursValue = document.querySelector('[data-hours]');
// const minutesValue = document.querySelector('[data-minutes]');
// const secondsValue = document.querySelector('[data-seconds]');

// const options = {
//     enableTime: true,// выбор времени
//     time_24hr: true,//Отображает выбор времени в 24-часовом режиме без выбора AM/PM, 
//     //если этот параметр включен.
//     defaultDate: new Date(),
//     /*Устанавливает начальную выбранную дату(ы).
// Если вы используете режим: «несколько» или календарь диапазона,
//  укажите массив объектов даты или массив строк даты, которые соответствуют вашему формату даты.
// В противном случае вы можете указать один объект Date или строку даты.*/
//     minuteIncrement: 1, // Adjusts the step for the minute input (incl. scrolling)
//     onClose(selectedDates)//Функции, которые будут активироваться каждый раз при закрытии календаря.
//      {
//       console.log(selectedDates[0]);
//     },
//   };

//   let userSelectedDate;
// startButton.disabled = true;

// flatpickr("#datetime-picker", {
//     onClose: function (selectedDates, dateStr, instance) {
//         userSelectedDate = selectedDates[0];
//         const currentDate = new Date();

//         if (userSelectedDate <= currentDate){
//             iziToast.error({
//                 title: 'Error',
//                 message : 'plese choose a date in the future',
//             })
//             startButton.disabled = true;
//         } else {
//             startButton.disabled = false;
//         }
//     }
// });

// startButton.addEventListener('click', function() {
// const countdown = userSelectedDate - new Date();

// if (countdown <= 0) {
//     iziToast.error({
//         title: 'Error',
//         message : 'plese choose a date in the future',
//     });
//     return;
//  }
// })




//   function convertMs(ms) {
//     // Number of milliseconds per unit of time
//     const second = 1000;
//     const minute = second * 60;
//     const hour = minute * 60;
//     const day = hour * 24;
  
//     // Remaining days
//     const days = Math.floor(ms / day);
//     // Remaining hours
//     const hours = Math.floor((ms % day) / hour);
//     // Remaining minutes
//     const minutes = Math.floor(((ms % day) % hour) / minute);
//     // Remaining seconds
//     const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
//     return { days, hours, minutes, seconds };
//   }
  
//   console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
//   console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
//   console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}


 ///////////////////////////////////////////////


// import flatpickr from "flatpickr";
// import "flatpickr/dist/flatpickr.min.css";
// import iziToast from "izitoast";
// import "izitoast/dist/css/iziToast.min.css";

// const datetimePicker = document.getElementById('datetime-picker');
// const startButton = document.querySelector('[data-start]');
// const daysValue = document.querySelector('[data-days]');
// const hoursValue = document.querySelector('[data-hours]');
// const minutesValue = document.querySelector('[data-minutes]');
// const secondsValue = document.querySelector('[data-seconds]');

// let countdownInterval;

// datetimePicker.flatpickr({
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date,
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     const selectedDate = selectedDates[0];
//     const now = new Date();

//     if (selectedDate <= now) {
//       iziToast.error({
//         title: 'Error',
//         message: 'Please choose a date in the future',
//         position: 'topRight'
//       });
//       startButton.disabled = true;
//     } else {
//       startButton.disabled = false;
//     }
//   },
// });

// startButton.disabled = true;

// function updateTimerDisplay(time) {
//   daysValue.textContent = addLeadingZero(time.days);
//   hoursValue.textContent = addLeadingZero(time.hours);
//   minutesValue.textContent = addLeadingZero(time.minutes);
//   secondsValue.textContent = addLeadingZero(time.seconds);
// }

// function startCountdown(targetDate) {
//   clearInterval(countdownInterval);
//   datetimePicker.disabled = true

//   countdownInterval = setInterval(() => {
//     const now = new Date();
//     const difference = targetDate - now;

//     if (difference <= 0) {
//       clearInterval(countdownInterval);
//       updateTimerDisplay(convertMs(0));
//       iziToast.success({
//         title: 'Success',
//         message: 'Countdown finished!',
//         position: 'topRight'
//       });
//       startButton.disabled = false;
//     } else {
//       updateTimerDisplay(convertMs(difference));
//     }
//   }, 1000);
// }

// startButton.addEventListener('click', () => {
//   const selectedDate = new Date(datetimePicker._flatpickr.selectedDates[0]);
//   startButton.disabled = true;
//   startCountdown(selectedDate);
// });

// function addLeadingZero(value) {
//   return value < 10 ? `0${value}` : value;
// }

// function convertMs(ms) {
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   const days = Math.floor(ms / day);
//   const hours = Math.floor((ms % day) / hour);
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }

////////////////////////////