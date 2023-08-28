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
        apiForecast = `http://api.weatherapi.com/v1/forecast.json?key=28ff6b5ed367475281e170322232008&q=${input.value}&days=7`
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
    const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=28ff6b5ed367475281e170322232008&q=växjö&days=7', {mode: 'cors'})
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSx5R0FBeUcsWUFBWTtBQUNySCwwR0FBMEcsWUFBWTtBQUN0SDtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxhQUFhO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLG1JQUFtSSxhQUFhO0FBQ2hKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUlBQW1JLGFBQWE7QUFDaEo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0QsYUFBYTtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxNQUFNO0FBQ04sZ0NBQWdDLFlBQVk7QUFDNUM7QUFDQTtBQUNBLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwaS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gnKTtcclxuY29uc3Qgc3VibWl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N1Ym1pdCcpO1xyXG5jb25zdCBkZWdyZWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlZ3JlZXMnKTtcclxuXHJcbmNvbnN0IHNreUluZm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2t5LWluZm8nKTtcclxuY29uc3QgbG9jYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9jYXRpb24nKTtcclxuY29uc3QgZGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXRlJyk7XHJcbmNvbnN0IHRpbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGltZScpO1xyXG5cclxuY29uc3QgZmVlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mZWVsJyk7XHJcbmNvbnN0IGh1bWlkaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmh1bWlkaXR5Jyk7XHJcbmNvbnN0IHJhaW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucmFpbicpO1xyXG5jb25zdCB3aW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndpbmQnKTtcclxuY29uc3QgbmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYW1lJyk7XHJcblxyXG5jb25zdCBoaWdoZXN0VGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5oaWdoZXN0Jyk7XHJcbmNvbnN0IGxvd2VzdFRlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubG93ZXN0Jyk7XHJcbmNvbnN0IGNvbmRpdGlvbkFsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb25kaXRpb24nKTtcclxuXHJcbmNvbnN0IGNlbHNpdXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2Vsc2l1cycpO1xyXG5jb25zdCBmYWhyZW5oZWl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZhaHJlbmhlaXQnKTtcclxuY29uc3QgdmFsaWRTcGFuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnZhbGlkYXRpb24tbWVzc2FnZScpO1xyXG5cclxubGV0IHRlbXBDaGFuZ2UgPSAwO1xyXG5sZXQgaXNGaXJzdFNlYXJjaCA9IHRydWU7XHJcblxyXG5jb25zdCBkYXRlTm93ID0gbmV3IERhdGUoKVxyXG5jb25zdCBvcHRpb25zID0gXHJcbntcclxuICAgIHdlZWtkYXk6ICdsb25nJyxcclxuICAgIHllYXI6ICdudW1lcmljJyxcclxuICAgIG1vbnRoOiAnbG9uZycsXHJcbiAgICBkYXk6ICdudW1lcmljJyxcclxufTtcclxuXHJcbmxldCBhcGlDdXJyZW50O1xyXG5sZXQgYXBpRm9yZWNhc3Q7XHJcblxyXG5cclxuY2Vsc2l1cy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGlmIChmYWhyZW5oZWl0LmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcclxuICAgICAgICBmYWhyZW5oZWl0LmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xyXG4gICAgICAgIGNlbHNpdXMuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgdGVtcENoYW5nZSA9IDA7XHJcbiAgICB9XHJcbn0pXHJcblxyXG5mYWhyZW5oZWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgaWYgKGNlbHNpdXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xyXG4gICAgICAgIGNlbHNpdXMuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgZmFocmVuaGVpdC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICB0ZW1wQ2hhbmdlID0gMTtcclxuICAgIH0gICAgXHJcbn0pXHJcblxyXG5zdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgaWYgKGZvcm1WYWxpZGF0aW9uKCkpIHtcclxuICAgICAgICBhcGlDdXJyZW50ID0gYGh0dHBzOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2N1cnJlbnQuanNvbj9rZXk9MjhmZjZiNWVkMzY3NDc1MjgxZTE3MDMyMjIzMjAwOCZxPSR7aW5wdXQudmFsdWV9YFxyXG4gICAgICAgIGFwaUZvcmVjYXN0ID0gYGh0dHA6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvZm9yZWNhc3QuanNvbj9rZXk9MjhmZjZiNWVkMzY3NDc1MjgxZTE3MDMyMjIzMjAwOCZxPSR7aW5wdXQudmFsdWV9JmRheXM9N2BcclxuICAgICAgICBzaG93RGF0YSgpXHJcbiAgICAgICAgaXNGaXJzdFNlYXJjaCA9IGZhbHNlO1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgfSBlbHNlIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIFxyXG59KVxyXG5cclxuZnVuY3Rpb24gZm9ybVZhbGlkYXRpb24gKCkge1xyXG4gICAgaWYgKGlucHV0LnZhbGlkaXR5LnRvb1Nob3J0KSB7XHJcbiAgICAgICAgdmFsaWRTcGFuLmlubmVySFRNTCA9ICdNaW5pbXVtIGlzIDMgbGV0dGVycyEnXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB2YWxpZFNwYW4uaW5uZXJIVE1MID0gJydcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXJTZWFyY2ggKCkge1xyXG4gICAgaW5wdXQudmFsdWUgPSAnJztcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZm9yZWNhc3QgKCkge1xyXG4gICAgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChhcGlGb3JlY2FzdCwge21vZGU6ICdjb3JzJ30pXHJcbiAgICBjb252ZXJ0RGF0YUZvcmVjYXN0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXHJcblxyXG4gICAgcmFpbi5mb3JFYWNoKChlbGVtZW50LCBhcnJheSkgPT4ge1xyXG4gICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gY29udmVydERhdGFGb3JlY2FzdC5mb3JlY2FzdC5mb3JlY2FzdGRheVthcnJheV0uZGF5LmRhaWx5X2NoYW5jZV9vZl9yYWluICsgJyUnO1xyXG4gICAgfSlcclxuXHJcbiAgICBsb3dlc3RUZW1wLmZvckVhY2goKGVsZW1lbnQsIGFycmF5KSA9PiB7XHJcbiAgICAgICAgaWYgKHRlbXBDaGFuZ2UgPT09IDApIGVsZW1lbnQuaW5uZXJIVE1MID0gY29udmVydERhdGFGb3JlY2FzdC5mb3JlY2FzdC5mb3JlY2FzdGRheVthcnJheV0uZGF5Lm1pbnRlbXBfYyArICcgwrBDJztcclxuICAgICAgICBlbHNlIGlmICh0ZW1wQ2hhbmdlID09PSAxKSBlbGVtZW50LmlubmVySFRNTCA9IGNvbnZlcnREYXRhRm9yZWNhc3QuZm9yZWNhc3QuZm9yZWNhc3RkYXlbYXJyYXldLmRheS5taW50ZW1wX2YgKyAnIMKwRic7XHJcbiAgICAgICAgY2Vsc2l1cy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBjb252ZXJ0RGF0YUZvcmVjYXN0LmZvcmVjYXN0LmZvcmVjYXN0ZGF5W2FycmF5XS5kYXkubWludGVtcF9jICsgJyDCsEMnO1xyXG4gICAgICAgIH0pXHJcbiAgICBcclxuICAgICAgICBmYWhyZW5oZWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBlbGVtZW50LmlubmVySFRNTCA9IGNvbnZlcnREYXRhRm9yZWNhc3QuZm9yZWNhc3QuZm9yZWNhc3RkYXlbYXJyYXldLmRheS5taW50ZW1wX2YgKyAnIMKwRic7XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcblxyXG4gICAgaGlnaGVzdFRlbXAuZm9yRWFjaCgoZWxlbWVudCwgYXJyYXkpID0+IHtcclxuICAgICAgICBpZiAodGVtcENoYW5nZSA9PT0gMCkgZWxlbWVudC5pbm5lckhUTUwgPSBjb252ZXJ0RGF0YUZvcmVjYXN0LmZvcmVjYXN0LmZvcmVjYXN0ZGF5W2FycmF5XS5kYXkubWF4dGVtcF9jICsgJyDCsEMnO1xyXG4gICAgICAgIGVsc2UgaWYgKHRlbXBDaGFuZ2UgPT09IDEpIGVsZW1lbnQuaW5uZXJIVE1MID0gY29udmVydERhdGFGb3JlY2FzdC5mb3JlY2FzdC5mb3JlY2FzdGRheVthcnJheV0uZGF5Lm1heHRlbXBfZiArICcgwrBGJztcclxuICAgICAgICBcclxuICAgICAgICBjZWxzaXVzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBlbGVtZW50LmlubmVySFRNTCA9IGNvbnZlcnREYXRhRm9yZWNhc3QuZm9yZWNhc3QuZm9yZWNhc3RkYXlbYXJyYXldLmRheS5tYXh0ZW1wX2MgKyAnIMKwQyc7XHJcbiAgICAgICAgfSlcclxuICAgIFxyXG4gICAgICAgIGZhaHJlbmhlaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gY29udmVydERhdGFGb3JlY2FzdC5mb3JlY2FzdC5mb3JlY2FzdGRheVthcnJheV0uZGF5Lm1heHRlbXBfZiArICcgwrBGJztcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgICBjb25kaXRpb25BbGwuZm9yRWFjaCgoZWxlbWVudCwgYXJyYXkpID0+IHtcclxuICAgICAgICBlbGVtZW50LmlubmVySFRNTCA9IGNvbnZlcnREYXRhRm9yZWNhc3QuZm9yZWNhc3QuZm9yZWNhc3RkYXlbYXJyYXldLmRheS5jb25kaXRpb24udGV4dDtcclxuICAgIH0pO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBvbkxvYWRGb3JlY2FzdCAoKSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2ZvcmVjYXN0Lmpzb24/a2V5PTI4ZmY2YjVlZDM2NzQ3NTI4MWUxNzAzMjIyMzIwMDgmcT12w6R4asO2JmRheXM9NycsIHttb2RlOiAnY29ycyd9KVxyXG4gICAgY29uc3QgY29udmVydERhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcblxyXG4gICAgcmFpbi5mb3JFYWNoKChlbGVtZW50LCBhcnJheSkgPT4ge1xyXG4gICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gY29udmVydERhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbYXJyYXldLmRheS5kYWlseV9jaGFuY2Vfb2ZfcmFpbiArICclJztcclxuICAgIH0pXHJcblxyXG4gICAgbG93ZXN0VGVtcC5mb3JFYWNoKChlbGVtZW50LCBhcnJheSkgPT4ge1xyXG4gICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gY29udmVydERhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbYXJyYXldLmRheS5taW50ZW1wX2MgKyAnIMKwQyc7XHJcblxyXG4gICAgICAgIGZhaHJlbmhlaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gY29udmVydERhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbYXJyYXldLmRheS5taW50ZW1wX2YgKyAnIMKwRidcclxuICAgICAgICB9KVxyXG4gICAgICAgIGNlbHNpdXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gY29udmVydERhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbYXJyYXldLmRheS5taW50ZW1wX2MgKyAnIMKwQydcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgICBoaWdoZXN0VGVtcC5mb3JFYWNoKChlbGVtZW50LCBhcnJheSkgPT4ge1xyXG4gICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gY29udmVydERhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbYXJyYXldLmRheS5tYXh0ZW1wX2MgKyAnIMKwQyc7XHJcblxyXG4gICAgICAgIGZhaHJlbmhlaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gY29udmVydERhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbYXJyYXldLmRheS5tYXh0ZW1wX2YgKyAnIMKwRidcclxuICAgICAgICB9KVxyXG4gICAgICAgIGNlbHNpdXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gY29udmVydERhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbYXJyYXldLmRheS5tYXh0ZW1wX2MgKyAnIMKwQydcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgICBjb25kaXRpb25BbGwuZm9yRWFjaCgoZWxlbWVudCwgYXJyYXkpID0+IHtcclxuICAgICAgICBlbGVtZW50LmlubmVySFRNTCA9IGNvbnZlcnREYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5W2FycmF5XS5kYXkuY29uZGl0aW9uLnRleHQ7XHJcbiAgICB9KTtcclxuXHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGZpcnN0U2VhcmNoICgpIHtcclxuICAgIGNvbnN0IHJlc3BvbnNlQ3VycmVudCA9IGF3YWl0IGZldGNoKCdodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9jdXJyZW50Lmpzb24/a2V5PTI4ZmY2YjVlZDM2NzQ3NTI4MWUxNzAzMjIyMzIwMDgmcT12w6R4asO2Jywge21vZGU6ICdjb3JzJ30pXHJcbiAgICBjb25zdCBjb252ZXJ0RGF0YUN1cnJlbnQgPSBhd2FpdCByZXNwb25zZUN1cnJlbnQuanNvbigpO1xyXG5cclxuICAgIG9uTG9hZEZvcmVjYXN0KClcclxuXHJcbiAgICBkZWdyZWVzLmlubmVySFRNTCA9IGNvbnZlcnREYXRhQ3VycmVudC5jdXJyZW50LnRlbXBfYyArICcgwrBDJztcclxuICAgIGRhdGUuaW5uZXJIVE1MID0gZGF0ZU5vdy50b0xvY2FsZVN0cmluZygnZW4tSU4nLCBvcHRpb25zKTtcclxuICAgIGxvY2F0aW9uLmlubmVySFRNTCA9IGNvbnZlcnREYXRhQ3VycmVudC5sb2NhdGlvbi5uYW1lO1xyXG4gICAgc2t5SW5mby5pbm5lckhUTUwgPSBjb252ZXJ0RGF0YUN1cnJlbnQuY3VycmVudC5jb25kaXRpb24udGV4dDtcclxuICAgIGh1bWlkaXR5LmlubmVySFRNTCArPSBjb252ZXJ0RGF0YUN1cnJlbnQuY3VycmVudC5odW1pZGl0eSArICclJztcclxuICAgIGZlZWwuaW5uZXJIVE1MICs9IGNvbnZlcnREYXRhQ3VycmVudC5jdXJyZW50LmZlZWxzbGlrZV9jICsgJyDCsEMnO1xyXG4gICAgd2luZC5pbm5lckhUTUwgKz0gY29udmVydERhdGFDdXJyZW50LmN1cnJlbnQud2luZF9rcGggKyAna3BoJztcclxuICAgIFxyXG4gICAgY2Vsc2l1cy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBkZWdyZWVzLmlubmVySFRNTCA9IGNvbnZlcnREYXRhQ3VycmVudC5jdXJyZW50LnRlbXBfYyArICcgwrBDJztcclxuICAgICAgICBmZWVsLmlubmVySFRNTCA9IGNvbnZlcnREYXRhQ3VycmVudC5jdXJyZW50LmZlZWxzbGlrZV9jICsgJyDCsEMnO1xyXG4gICAgfSlcclxuXHJcbiAgICBmYWhyZW5oZWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGRlZ3JlZXMuaW5uZXJIVE1MID0gY29udmVydERhdGFDdXJyZW50LmN1cnJlbnQudGVtcF9mICsgJyDCsEYnO1xyXG4gICAgICAgIGZlZWwuaW5uZXJIVE1MID0gY29udmVydERhdGFDdXJyZW50LmN1cnJlbnQuZmVlbHNsaWtlX2YgKyAnIMKwRic7XHJcbiAgICB9KVxyXG59XHJcblxyXG5pZiAoaXNGaXJzdFNlYXJjaCkge1xyXG4gICAgZmlyc3RTZWFyY2goKVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBzaG93RGF0YSAoKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYXBpQ3VycmVudCwge21vZGU6ICdjb3JzJ30pXHJcbiAgICAgICAgY29uc3QgY29udmVydERhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcblxyXG4gICAgICAgIGRhdGUuaW5uZXJIVE1MID0gZGF0ZU5vdy50b0xvY2FsZVN0cmluZygnZW4tSU4nLCBvcHRpb25zKVxyXG4gICAgICAgIGxvY2F0aW9uLmlubmVySFRNTCA9IGNvbnZlcnREYXRhLmxvY2F0aW9uLm5hbWU7XHJcbiAgICAgICAgc2t5SW5mby5pbm5lckhUTUwgPSBjb252ZXJ0RGF0YS5jdXJyZW50LmNvbmRpdGlvbi50ZXh0O1xyXG4gICAgICAgIGh1bWlkaXR5LmlubmVySFRNTCA9IGNvbnZlcnREYXRhLmN1cnJlbnQuaHVtaWRpdHkgKyAnJSc7XHJcbiAgICAgICAgd2luZC5pbm5lckhUTUwgPSBjb252ZXJ0RGF0YS5jdXJyZW50LndpbmRfa3BoICsgJ2twaCdcclxuXHJcbiAgICAgICAgZm9yZWNhc3QoKVxyXG5cclxuICAgICAgICBpZiAodGVtcENoYW5nZSA9PT0gMCkge1xyXG4gICAgICAgICAgICBkZWdyZWVzLmlubmVySFRNTCA9IGNvbnZlcnREYXRhLmN1cnJlbnQudGVtcF9jICsgJyDCsEMnO1xyXG4gICAgICAgICAgICBmZWVsLmlubmVySFRNTCA9IGNvbnZlcnREYXRhLmN1cnJlbnQuZmVlbHNsaWtlX2MgKyAnIMKwQyc7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0gZWxzZSBpZiAodGVtcENoYW5nZSA9PT0gMSkge1xyXG4gICAgICAgICAgICBkZWdyZWVzLmlubmVySFRNTCA9IGNvbnZlcnREYXRhLmN1cnJlbnQudGVtcF9mICsgJyDCsEYnO1xyXG4gICAgICAgICAgICBmZWVsLmlubmVySFRNTCA9IGNvbnZlcnREYXRhLmN1cnJlbnQuZmVlbHNsaWtlX2YgKyAnIMKwRic7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjZWxzaXVzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBkZWdyZWVzLmlubmVySFRNTCA9IGNvbnZlcnREYXRhLmN1cnJlbnQudGVtcF9jICsgJyDCsEMnO1xyXG4gICAgICAgICAgICBmZWVsLmlubmVySFRNTCA9IGNvbnZlcnREYXRhLmN1cnJlbnQuZmVlbHNsaWtlX2MgKyAnIMKwQyc7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZmFocmVuaGVpdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgZGVncmVlcy5pbm5lckhUTUwgPSBjb252ZXJ0RGF0YS5jdXJyZW50LnRlbXBfZiArICcgwrBGJztcclxuICAgICAgICAgICAgZmVlbC5pbm5lckhUTUwgPSBjb252ZXJ0RGF0YS5jdXJyZW50LmZlZWxzbGlrZV9mICsgJyDCsEYnO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGNsZWFyU2VhcmNoKClcclxuICAgIH0gY2F0Y2goZXJyKSB7XHJcbiAgICAgICAgZGVncmVlcy5pbm5lckhUTUwgPSBgXCIke2lucHV0LnZhbHVlfVwiIGlzIG5vdCBhIHZhbGlkIGxvY2F0aW9uYFxyXG4gICAgICAgIGNsZWFyU2VhcmNoKClcclxuICAgIH1cclxufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==