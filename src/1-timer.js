import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


// Otherwise, selectors are also supported
flatpickr("#datetime-picker", {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
});

//    const test = iziToast.show({
//   title: 'Hey',
// message: 'What would you like to add?'
//     });


const datetimePicker = document.getElementById("datetime-picker");
const startButton = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

const options = {
    enableTime: true,// выбор времени
    time_24hr: true,//Отображает выбор времени в 24-часовом режиме без выбора AM/PM, 
    //если этот параметр включен.
    defaultDate: new Date(),
    /*Устанавливает начальную выбранную дату(ы).
Если вы используете режим: «несколько» или календарь диапазона,
 укажите массив объектов даты или массив строк даты, которые соответствуют вашему формату даты.
В противном случае вы можете указать один объект Date или строку даты.*/
    minuteIncrement: 1, // Adjusts the step for the minute input (incl. scrolling)
    onClose(selectedDates)//Функции, которые будут активироваться каждый раз при закрытии календаря.
     {
      console.log(selectedDates[0]);
    },
  };

  let userSelectedDate;
startButton.disabled = true;

flatpickr("#datetime-picker", {
    onClose: function (selectedDates, dateStr, instance) {
        userSelectedDate = selectedDates[0];
        const currentDate = new Date();

        if (userSelectedDate <= currentDate){
            iziToast.error({
                title: 'Error',
                message : 'plese choose a date in the future',
            })
            startButton.disabled = true;
        } else {
            startButton.disabled = false;
        }
    }
});

startButton.addEventListener('click', function() {
const countdown = userSelectedDate - new Date();

if (countdown <= 0) {
    iziToast.error({
        title: 'Error',
        message : 'plese choose a date in the future',
    });
    return;
 }
})




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


  

