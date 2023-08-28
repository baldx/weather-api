/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
const input = document.querySelector('#search');
const submit = document.querySelector('#submit');
const degrees = document.querySelector('.degrees');

const skyInfo = document.querySelector('.sky-info');
const location = document.querySelector('.location');
const date = document.querySelector('.date');
const time = document.querySelector('.time');

const feel = document.querySelector('.feel');
const humidity = document.querySelector('.humidity');
const rain = document.querySelectorAll('.rain');
const wind = document.querySelector('.wind');
const name = document.querySelector('.name');

const highestTemp = document.querySelectorAll('.highest');
const lowestTemp = document.querySelectorAll('.lowest');
const conditionAll = document.querySelectorAll('.condition');

const celsius = document.querySelector('.celsius');
const fahrenheit = document.querySelector('.fahrenheit');
const validSpan = document.querySelector('.validation-message');

let tempChange = 0;
let isFirstSearch = true;

const dateNow = new Date()
const options = 
{
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
};

let apiCurrent;
let apiForecast;


celsius.addEventListener('click', () => {
    if (fahrenheit.classList.contains('active')) {
        fahrenheit.classList.toggle('active');
        celsius.classList.add('active');
        tempChange = 0;
    }
})

fahrenheit.addEventListener('click', () => {
    if (celsius.classList.contains('active')) {
        celsius.classList.remove('active');
        fahrenheit.classList.add('active');
        tempChange = 1;
    }    
})

submit.addEventListener('click', (e) => {
    if (formValidation()) {
        apiCurrent = `https://api.weatherapi.com/v1/current.json?key=28ff6b5ed367475281e170322232008&q=${input.value}`
        apiForecast = `https://api.weatherapi.com/v1/forecast.json?key=28ff6b5ed367475281e170322232008&q=${input.value}&days=7`
        showData()
        isFirstSearch = false;
        e.preventDefault()
    } else e.preventDefault();
    
})

function formValidation () {
    if (input.validity.tooShort) {
        validSpan.innerHTML = 'Minimum is 3 letters!'
        return false;
    } else {
        validSpan.innerHTML = ''
        return true;
    }
}

function clearSearch () {
    input.value = '';
}

async function forecast () {
    response = await fetch(apiForecast, {mode: 'cors'})
    convertDataForecast = await response.json()

    rain.forEach((element, array) => {
        element.innerHTML = convertDataForecast.forecast.forecastday[array].day.daily_chance_of_rain + '%';
    })

    lowestTemp.forEach((element, array) => {
        if (tempChange === 0) element.innerHTML = convertDataForecast.forecast.forecastday[array].day.mintemp_c + ' °C';
        else if (tempChange === 1) element.innerHTML = convertDataForecast.forecast.forecastday[array].day.mintemp_f + ' °F';
        celsius.addEventListener('click', () => {
            element.innerHTML = convertDataForecast.forecast.forecastday[array].day.mintemp_c + ' °C';
        })
    
        fahrenheit.addEventListener('click', () => {
            element.innerHTML = convertDataForecast.forecast.forecastday[array].day.mintemp_f + ' °F';
        })
    })

    highestTemp.forEach((element, array) => {
        if (tempChange === 0) element.innerHTML = convertDataForecast.forecast.forecastday[array].day.maxtemp_c + ' °C';
        else if (tempChange === 1) element.innerHTML = convertDataForecast.forecast.forecastday[array].day.maxtemp_f + ' °F';
        
        celsius.addEventListener('click', () => {
            element.innerHTML = convertDataForecast.forecast.forecastday[array].day.maxtemp_c + ' °C';
        })
    
        fahrenheit.addEventListener('click', () => {
            element.innerHTML = convertDataForecast.forecast.forecastday[array].day.maxtemp_f + ' °F';
        })
    })

    conditionAll.forEach((element, array) => {
        element.innerHTML = convertDataForecast.forecast.forecastday[array].day.condition.text;
    });
}

async function onLoadForecast () {
    const response = await fetch('https://api.weatherapi.com/v1/forecast.json?key=28ff6b5ed367475281e170322232008&q=växjö&days=7', {mode: 'cors'})
    const convertData = await response.json();

    rain.forEach((element, array) => {
        element.innerHTML = convertData.forecast.forecastday[array].day.daily_chance_of_rain + '%';
    })

    lowestTemp.forEach((element, array) => {
        element.innerHTML = convertData.forecast.forecastday[array].day.mintemp_c + ' °C';

        fahrenheit.addEventListener('click', () => {
            element.innerHTML = convertData.forecast.forecastday[array].day.mintemp_f + ' °F'
        })
        celsius.addEventListener('click', () => {
            element.innerHTML = convertData.forecast.forecastday[array].day.mintemp_c + ' °C'
        })
    })

    highestTemp.forEach((element, array) => {
        element.innerHTML = convertData.forecast.forecastday[array].day.maxtemp_c + ' °C';

        fahrenheit.addEventListener('click', () => {
            element.innerHTML = convertData.forecast.forecastday[array].day.maxtemp_f + ' °F'
        })
        celsius.addEventListener('click', () => {
            element.innerHTML = convertData.forecast.forecastday[array].day.maxtemp_c + ' °C'
        })
    })

    conditionAll.forEach((element, array) => {
        element.innerHTML = convertData.forecast.forecastday[array].day.condition.text;
    });

}

async function firstSearch () {
    const responseCurrent = await fetch('https://api.weatherapi.com/v1/current.json?key=28ff6b5ed367475281e170322232008&q=växjö', {mode: 'cors'})
    const convertDataCurrent = await responseCurrent.json();

    onLoadForecast()

    degrees.innerHTML = convertDataCurrent.current.temp_c + ' °C';
    date.innerHTML = dateNow.toLocaleString('en-IN', options);
    location.innerHTML = convertDataCurrent.location.name;
    skyInfo.innerHTML = convertDataCurrent.current.condition.text;
    humidity.innerHTML += convertDataCurrent.current.humidity + '%';
    feel.innerHTML += convertDataCurrent.current.feelslike_c + ' °C';
    wind.innerHTML += convertDataCurrent.current.wind_kph + 'kph';
    
    celsius.addEventListener('click', () => {
        degrees.innerHTML = convertDataCurrent.current.temp_c + ' °C';
        feel.innerHTML = convertDataCurrent.current.feelslike_c + ' °C';
    })

    fahrenheit.addEventListener('click', () => {
        degrees.innerHTML = convertDataCurrent.current.temp_f + ' °F';
        feel.innerHTML = convertDataCurrent.current.feelslike_f + ' °F';
    })
}

if (isFirstSearch) {
    firstSearch()
}

async function showData () {
    try {
        const response = await fetch(apiCurrent, {mode: 'cors'})
        const convertData = await response.json();

        date.innerHTML = dateNow.toLocaleString('en-IN', options)
        location.innerHTML = convertData.location.name;
        skyInfo.innerHTML = convertData.current.condition.text;
        humidity.innerHTML = convertData.current.humidity + '%';
        wind.innerHTML = convertData.current.wind_kph + 'kph'

        forecast()

        if (tempChange === 0) {
            degrees.innerHTML = convertData.current.temp_c + ' °C';
            feel.innerHTML = convertData.current.feelslike_c + ' °C';
            
        } else if (tempChange === 1) {
            degrees.innerHTML = convertData.current.temp_f + ' °F';
            feel.innerHTML = convertData.current.feelslike_f + ' °F';
        }

        celsius.addEventListener('click', () => {
            degrees.innerHTML = convertData.current.temp_c + ' °C';
            feel.innerHTML = convertData.current.feelslike_c + ' °C';
        })

        fahrenheit.addEventListener('click', () => {
            degrees.innerHTML = convertData.current.temp_f + ' °F';
            feel.innerHTML = convertData.current.feelslike_f + ' °F';
        })

        clearSearch()
    } catch(err) {
        degrees.innerHTML = `"${input.value}" is not a valid location`
        clearSearch()
    }
}
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSx5R0FBeUcsWUFBWTtBQUNySCwyR0FBMkcsWUFBWTtBQUN2SDtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxhQUFhO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLG9JQUFvSSxhQUFhO0FBQ2pKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUlBQW1JLGFBQWE7QUFDaEo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0QsYUFBYTtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxNQUFNO0FBQ04sZ0NBQWdDLFlBQVk7QUFDNUM7QUFDQTtBQUNBLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwaS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gnKTtcclxuY29uc3Qgc3VibWl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N1Ym1pdCcpO1xyXG5jb25zdCBkZWdyZWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlZ3JlZXMnKTtcclxuXHJcbmNvbnN0IHNreUluZm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2t5LWluZm8nKTtcclxuY29uc3QgbG9jYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9jYXRpb24nKTtcclxuY29uc3QgZGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXRlJyk7XHJcbmNvbnN0IHRpbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGltZScpO1xyXG5cclxuY29uc3QgZmVlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mZWVsJyk7XHJcbmNvbnN0IGh1bWlkaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmh1bWlkaXR5Jyk7XHJcbmNvbnN0IHJhaW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucmFpbicpO1xyXG5jb25zdCB3aW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndpbmQnKTtcclxuY29uc3QgbmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYW1lJyk7XHJcblxyXG5jb25zdCBoaWdoZXN0VGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5oaWdoZXN0Jyk7XHJcbmNvbnN0IGxvd2VzdFRlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubG93ZXN0Jyk7XHJcbmNvbnN0IGNvbmRpdGlvbkFsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb25kaXRpb24nKTtcclxuXHJcbmNvbnN0IGNlbHNpdXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2Vsc2l1cycpO1xyXG5jb25zdCBmYWhyZW5oZWl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZhaHJlbmhlaXQnKTtcclxuY29uc3QgdmFsaWRTcGFuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnZhbGlkYXRpb24tbWVzc2FnZScpO1xyXG5cclxubGV0IHRlbXBDaGFuZ2UgPSAwO1xyXG5sZXQgaXNGaXJzdFNlYXJjaCA9IHRydWU7XHJcblxyXG5jb25zdCBkYXRlTm93ID0gbmV3IERhdGUoKVxyXG5jb25zdCBvcHRpb25zID0gXHJcbntcclxuICAgIHdlZWtkYXk6ICdsb25nJyxcclxuICAgIHllYXI6ICdudW1lcmljJyxcclxuICAgIG1vbnRoOiAnbG9uZycsXHJcbiAgICBkYXk6ICdudW1lcmljJyxcclxufTtcclxuXHJcbmxldCBhcGlDdXJyZW50O1xyXG5sZXQgYXBpRm9yZWNhc3Q7XHJcblxyXG5cclxuY2Vsc2l1cy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGlmIChmYWhyZW5oZWl0LmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcclxuICAgICAgICBmYWhyZW5oZWl0LmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xyXG4gICAgICAgIGNlbHNpdXMuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgdGVtcENoYW5nZSA9IDA7XHJcbiAgICB9XHJcbn0pXHJcblxyXG5mYWhyZW5oZWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgaWYgKGNlbHNpdXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xyXG4gICAgICAgIGNlbHNpdXMuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgZmFocmVuaGVpdC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICB0ZW1wQ2hhbmdlID0gMTtcclxuICAgIH0gICAgXHJcbn0pXHJcblxyXG5zdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgaWYgKGZvcm1WYWxpZGF0aW9uKCkpIHtcclxuICAgICAgICBhcGlDdXJyZW50ID0gYGh0dHBzOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2N1cnJlbnQuanNvbj9rZXk9MjhmZjZiNWVkMzY3NDc1MjgxZTE3MDMyMjIzMjAwOCZxPSR7aW5wdXQudmFsdWV9YFxyXG4gICAgICAgIGFwaUZvcmVjYXN0ID0gYGh0dHBzOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2ZvcmVjYXN0Lmpzb24/a2V5PTI4ZmY2YjVlZDM2NzQ3NTI4MWUxNzAzMjIyMzIwMDgmcT0ke2lucHV0LnZhbHVlfSZkYXlzPTdgXHJcbiAgICAgICAgc2hvd0RhdGEoKVxyXG4gICAgICAgIGlzRmlyc3RTZWFyY2ggPSBmYWxzZTtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgIH0gZWxzZSBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBcclxufSlcclxuXHJcbmZ1bmN0aW9uIGZvcm1WYWxpZGF0aW9uICgpIHtcclxuICAgIGlmIChpbnB1dC52YWxpZGl0eS50b29TaG9ydCkge1xyXG4gICAgICAgIHZhbGlkU3Bhbi5pbm5lckhUTUwgPSAnTWluaW11bSBpcyAzIGxldHRlcnMhJ1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFsaWRTcGFuLmlubmVySFRNTCA9ICcnXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsZWFyU2VhcmNoICgpIHtcclxuICAgIGlucHV0LnZhbHVlID0gJyc7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGZvcmVjYXN0ICgpIHtcclxuICAgIHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYXBpRm9yZWNhc3QsIHttb2RlOiAnY29ycyd9KVxyXG4gICAgY29udmVydERhdGFGb3JlY2FzdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxyXG5cclxuICAgIHJhaW4uZm9yRWFjaCgoZWxlbWVudCwgYXJyYXkpID0+IHtcclxuICAgICAgICBlbGVtZW50LmlubmVySFRNTCA9IGNvbnZlcnREYXRhRm9yZWNhc3QuZm9yZWNhc3QuZm9yZWNhc3RkYXlbYXJyYXldLmRheS5kYWlseV9jaGFuY2Vfb2ZfcmFpbiArICclJztcclxuICAgIH0pXHJcblxyXG4gICAgbG93ZXN0VGVtcC5mb3JFYWNoKChlbGVtZW50LCBhcnJheSkgPT4ge1xyXG4gICAgICAgIGlmICh0ZW1wQ2hhbmdlID09PSAwKSBlbGVtZW50LmlubmVySFRNTCA9IGNvbnZlcnREYXRhRm9yZWNhc3QuZm9yZWNhc3QuZm9yZWNhc3RkYXlbYXJyYXldLmRheS5taW50ZW1wX2MgKyAnIMKwQyc7XHJcbiAgICAgICAgZWxzZSBpZiAodGVtcENoYW5nZSA9PT0gMSkgZWxlbWVudC5pbm5lckhUTUwgPSBjb252ZXJ0RGF0YUZvcmVjYXN0LmZvcmVjYXN0LmZvcmVjYXN0ZGF5W2FycmF5XS5kYXkubWludGVtcF9mICsgJyDCsEYnO1xyXG4gICAgICAgIGNlbHNpdXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gY29udmVydERhdGFGb3JlY2FzdC5mb3JlY2FzdC5mb3JlY2FzdGRheVthcnJheV0uZGF5Lm1pbnRlbXBfYyArICcgwrBDJztcclxuICAgICAgICB9KVxyXG4gICAgXHJcbiAgICAgICAgZmFocmVuaGVpdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBjb252ZXJ0RGF0YUZvcmVjYXN0LmZvcmVjYXN0LmZvcmVjYXN0ZGF5W2FycmF5XS5kYXkubWludGVtcF9mICsgJyDCsEYnO1xyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG5cclxuICAgIGhpZ2hlc3RUZW1wLmZvckVhY2goKGVsZW1lbnQsIGFycmF5KSA9PiB7XHJcbiAgICAgICAgaWYgKHRlbXBDaGFuZ2UgPT09IDApIGVsZW1lbnQuaW5uZXJIVE1MID0gY29udmVydERhdGFGb3JlY2FzdC5mb3JlY2FzdC5mb3JlY2FzdGRheVthcnJheV0uZGF5Lm1heHRlbXBfYyArICcgwrBDJztcclxuICAgICAgICBlbHNlIGlmICh0ZW1wQ2hhbmdlID09PSAxKSBlbGVtZW50LmlubmVySFRNTCA9IGNvbnZlcnREYXRhRm9yZWNhc3QuZm9yZWNhc3QuZm9yZWNhc3RkYXlbYXJyYXldLmRheS5tYXh0ZW1wX2YgKyAnIMKwRic7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY2Vsc2l1cy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBjb252ZXJ0RGF0YUZvcmVjYXN0LmZvcmVjYXN0LmZvcmVjYXN0ZGF5W2FycmF5XS5kYXkubWF4dGVtcF9jICsgJyDCsEMnO1xyXG4gICAgICAgIH0pXHJcbiAgICBcclxuICAgICAgICBmYWhyZW5oZWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBlbGVtZW50LmlubmVySFRNTCA9IGNvbnZlcnREYXRhRm9yZWNhc3QuZm9yZWNhc3QuZm9yZWNhc3RkYXlbYXJyYXldLmRheS5tYXh0ZW1wX2YgKyAnIMKwRic7XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcblxyXG4gICAgY29uZGl0aW9uQWxsLmZvckVhY2goKGVsZW1lbnQsIGFycmF5KSA9PiB7XHJcbiAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBjb252ZXJ0RGF0YUZvcmVjYXN0LmZvcmVjYXN0LmZvcmVjYXN0ZGF5W2FycmF5XS5kYXkuY29uZGl0aW9uLnRleHQ7XHJcbiAgICB9KTtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gb25Mb2FkRm9yZWNhc3QgKCkge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvZm9yZWNhc3QuanNvbj9rZXk9MjhmZjZiNWVkMzY3NDc1MjgxZTE3MDMyMjIzMjAwOCZxPXbDpHhqw7YmZGF5cz03Jywge21vZGU6ICdjb3JzJ30pXHJcbiAgICBjb25zdCBjb252ZXJ0RGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuXHJcbiAgICByYWluLmZvckVhY2goKGVsZW1lbnQsIGFycmF5KSA9PiB7XHJcbiAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBjb252ZXJ0RGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVthcnJheV0uZGF5LmRhaWx5X2NoYW5jZV9vZl9yYWluICsgJyUnO1xyXG4gICAgfSlcclxuXHJcbiAgICBsb3dlc3RUZW1wLmZvckVhY2goKGVsZW1lbnQsIGFycmF5KSA9PiB7XHJcbiAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBjb252ZXJ0RGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVthcnJheV0uZGF5Lm1pbnRlbXBfYyArICcgwrBDJztcclxuXHJcbiAgICAgICAgZmFocmVuaGVpdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBjb252ZXJ0RGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVthcnJheV0uZGF5Lm1pbnRlbXBfZiArICcgwrBGJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgY2Vsc2l1cy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBjb252ZXJ0RGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVthcnJheV0uZGF5Lm1pbnRlbXBfYyArICcgwrBDJ1xyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG5cclxuICAgIGhpZ2hlc3RUZW1wLmZvckVhY2goKGVsZW1lbnQsIGFycmF5KSA9PiB7XHJcbiAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBjb252ZXJ0RGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVthcnJheV0uZGF5Lm1heHRlbXBfYyArICcgwrBDJztcclxuXHJcbiAgICAgICAgZmFocmVuaGVpdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBjb252ZXJ0RGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVthcnJheV0uZGF5Lm1heHRlbXBfZiArICcgwrBGJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgY2Vsc2l1cy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBjb252ZXJ0RGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVthcnJheV0uZGF5Lm1heHRlbXBfYyArICcgwrBDJ1xyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG5cclxuICAgIGNvbmRpdGlvbkFsbC5mb3JFYWNoKChlbGVtZW50LCBhcnJheSkgPT4ge1xyXG4gICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gY29udmVydERhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbYXJyYXldLmRheS5jb25kaXRpb24udGV4dDtcclxuICAgIH0pO1xyXG5cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZmlyc3RTZWFyY2ggKCkge1xyXG4gICAgY29uc3QgcmVzcG9uc2VDdXJyZW50ID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2N1cnJlbnQuanNvbj9rZXk9MjhmZjZiNWVkMzY3NDc1MjgxZTE3MDMyMjIzMjAwOCZxPXbDpHhqw7YnLCB7bW9kZTogJ2NvcnMnfSlcclxuICAgIGNvbnN0IGNvbnZlcnREYXRhQ3VycmVudCA9IGF3YWl0IHJlc3BvbnNlQ3VycmVudC5qc29uKCk7XHJcblxyXG4gICAgb25Mb2FkRm9yZWNhc3QoKVxyXG5cclxuICAgIGRlZ3JlZXMuaW5uZXJIVE1MID0gY29udmVydERhdGFDdXJyZW50LmN1cnJlbnQudGVtcF9jICsgJyDCsEMnO1xyXG4gICAgZGF0ZS5pbm5lckhUTUwgPSBkYXRlTm93LnRvTG9jYWxlU3RyaW5nKCdlbi1JTicsIG9wdGlvbnMpO1xyXG4gICAgbG9jYXRpb24uaW5uZXJIVE1MID0gY29udmVydERhdGFDdXJyZW50LmxvY2F0aW9uLm5hbWU7XHJcbiAgICBza3lJbmZvLmlubmVySFRNTCA9IGNvbnZlcnREYXRhQ3VycmVudC5jdXJyZW50LmNvbmRpdGlvbi50ZXh0O1xyXG4gICAgaHVtaWRpdHkuaW5uZXJIVE1MICs9IGNvbnZlcnREYXRhQ3VycmVudC5jdXJyZW50Lmh1bWlkaXR5ICsgJyUnO1xyXG4gICAgZmVlbC5pbm5lckhUTUwgKz0gY29udmVydERhdGFDdXJyZW50LmN1cnJlbnQuZmVlbHNsaWtlX2MgKyAnIMKwQyc7XHJcbiAgICB3aW5kLmlubmVySFRNTCArPSBjb252ZXJ0RGF0YUN1cnJlbnQuY3VycmVudC53aW5kX2twaCArICdrcGgnO1xyXG4gICAgXHJcbiAgICBjZWxzaXVzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGRlZ3JlZXMuaW5uZXJIVE1MID0gY29udmVydERhdGFDdXJyZW50LmN1cnJlbnQudGVtcF9jICsgJyDCsEMnO1xyXG4gICAgICAgIGZlZWwuaW5uZXJIVE1MID0gY29udmVydERhdGFDdXJyZW50LmN1cnJlbnQuZmVlbHNsaWtlX2MgKyAnIMKwQyc7XHJcbiAgICB9KVxyXG5cclxuICAgIGZhaHJlbmhlaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgZGVncmVlcy5pbm5lckhUTUwgPSBjb252ZXJ0RGF0YUN1cnJlbnQuY3VycmVudC50ZW1wX2YgKyAnIMKwRic7XHJcbiAgICAgICAgZmVlbC5pbm5lckhUTUwgPSBjb252ZXJ0RGF0YUN1cnJlbnQuY3VycmVudC5mZWVsc2xpa2VfZiArICcgwrBGJztcclxuICAgIH0pXHJcbn1cclxuXHJcbmlmIChpc0ZpcnN0U2VhcmNoKSB7XHJcbiAgICBmaXJzdFNlYXJjaCgpXHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHNob3dEYXRhICgpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChhcGlDdXJyZW50LCB7bW9kZTogJ2NvcnMnfSlcclxuICAgICAgICBjb25zdCBjb252ZXJ0RGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuXHJcbiAgICAgICAgZGF0ZS5pbm5lckhUTUwgPSBkYXRlTm93LnRvTG9jYWxlU3RyaW5nKCdlbi1JTicsIG9wdGlvbnMpXHJcbiAgICAgICAgbG9jYXRpb24uaW5uZXJIVE1MID0gY29udmVydERhdGEubG9jYXRpb24ubmFtZTtcclxuICAgICAgICBza3lJbmZvLmlubmVySFRNTCA9IGNvbnZlcnREYXRhLmN1cnJlbnQuY29uZGl0aW9uLnRleHQ7XHJcbiAgICAgICAgaHVtaWRpdHkuaW5uZXJIVE1MID0gY29udmVydERhdGEuY3VycmVudC5odW1pZGl0eSArICclJztcclxuICAgICAgICB3aW5kLmlubmVySFRNTCA9IGNvbnZlcnREYXRhLmN1cnJlbnQud2luZF9rcGggKyAna3BoJ1xyXG5cclxuICAgICAgICBmb3JlY2FzdCgpXHJcblxyXG4gICAgICAgIGlmICh0ZW1wQ2hhbmdlID09PSAwKSB7XHJcbiAgICAgICAgICAgIGRlZ3JlZXMuaW5uZXJIVE1MID0gY29udmVydERhdGEuY3VycmVudC50ZW1wX2MgKyAnIMKwQyc7XHJcbiAgICAgICAgICAgIGZlZWwuaW5uZXJIVE1MID0gY29udmVydERhdGEuY3VycmVudC5mZWVsc2xpa2VfYyArICcgwrBDJztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIGlmICh0ZW1wQ2hhbmdlID09PSAxKSB7XHJcbiAgICAgICAgICAgIGRlZ3JlZXMuaW5uZXJIVE1MID0gY29udmVydERhdGEuY3VycmVudC50ZW1wX2YgKyAnIMKwRic7XHJcbiAgICAgICAgICAgIGZlZWwuaW5uZXJIVE1MID0gY29udmVydERhdGEuY3VycmVudC5mZWVsc2xpa2VfZiArICcgwrBGJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNlbHNpdXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGRlZ3JlZXMuaW5uZXJIVE1MID0gY29udmVydERhdGEuY3VycmVudC50ZW1wX2MgKyAnIMKwQyc7XHJcbiAgICAgICAgICAgIGZlZWwuaW5uZXJIVE1MID0gY29udmVydERhdGEuY3VycmVudC5mZWVsc2xpa2VfYyArICcgwrBDJztcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBmYWhyZW5oZWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBkZWdyZWVzLmlubmVySFRNTCA9IGNvbnZlcnREYXRhLmN1cnJlbnQudGVtcF9mICsgJyDCsEYnO1xyXG4gICAgICAgICAgICBmZWVsLmlubmVySFRNTCA9IGNvbnZlcnREYXRhLmN1cnJlbnQuZmVlbHNsaWtlX2YgKyAnIMKwRic7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgY2xlYXJTZWFyY2goKVxyXG4gICAgfSBjYXRjaChlcnIpIHtcclxuICAgICAgICBkZWdyZWVzLmlubmVySFRNTCA9IGBcIiR7aW5wdXQudmFsdWV9XCIgaXMgbm90IGEgdmFsaWQgbG9jYXRpb25gXHJcbiAgICAgICAgY2xlYXJTZWFyY2goKVxyXG4gICAgfVxyXG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9