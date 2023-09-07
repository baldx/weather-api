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
    const response = await fetch('https://api.weatherapi.com/v1/forecast.json?key=28ff6b5ed367475281e170322232008&q=växjö&days=3', {mode: 'cors'}) //error because PRO+ trial plan ran out, otherwise would work
    const convertData = await response.json();

    console.log(convertData);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSx5R0FBeUcsWUFBWTtBQUNySCwyR0FBMkcsWUFBWTtBQUN2SDtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxhQUFhO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLG9JQUFvSSxhQUFhO0FBQ2pKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1JQUFtSSxhQUFhO0FBQ2hKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELGFBQWE7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBTTtBQUNOLGdDQUFnQyxZQUFZO0FBQzVDO0FBQ0E7QUFDQSxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcGkvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoJyk7XHJcbmNvbnN0IHN1Ym1pdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdWJtaXQnKTtcclxuY29uc3QgZGVncmVlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZWdyZWVzJyk7XHJcblxyXG5jb25zdCBza3lJbmZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNreS1pbmZvJyk7XHJcbmNvbnN0IGxvY2F0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvY2F0aW9uJyk7XHJcbmNvbnN0IGRhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGF0ZScpO1xyXG5jb25zdCB0aW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRpbWUnKTtcclxuXHJcbmNvbnN0IGZlZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmVlbCcpO1xyXG5jb25zdCBodW1pZGl0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5odW1pZGl0eScpO1xyXG5jb25zdCByYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJhaW4nKTtcclxuY29uc3Qgd2luZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53aW5kJyk7XHJcbmNvbnN0IG5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmFtZScpO1xyXG5cclxuY29uc3QgaGlnaGVzdFRlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaGlnaGVzdCcpO1xyXG5jb25zdCBsb3dlc3RUZW1wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxvd2VzdCcpO1xyXG5jb25zdCBjb25kaXRpb25BbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29uZGl0aW9uJyk7XHJcblxyXG5jb25zdCBjZWxzaXVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNlbHNpdXMnKTtcclxuY29uc3QgZmFocmVuaGVpdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mYWhyZW5oZWl0Jyk7XHJcbmNvbnN0IHZhbGlkU3BhbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52YWxpZGF0aW9uLW1lc3NhZ2UnKTtcclxuXHJcbmxldCB0ZW1wQ2hhbmdlID0gMDtcclxubGV0IGlzRmlyc3RTZWFyY2ggPSB0cnVlO1xyXG5cclxuY29uc3QgZGF0ZU5vdyA9IG5ldyBEYXRlKClcclxuY29uc3Qgb3B0aW9ucyA9IFxyXG57XHJcbiAgICB3ZWVrZGF5OiAnbG9uZycsXHJcbiAgICB5ZWFyOiAnbnVtZXJpYycsXHJcbiAgICBtb250aDogJ2xvbmcnLFxyXG4gICAgZGF5OiAnbnVtZXJpYycsXHJcbn07XHJcblxyXG5sZXQgYXBpQ3VycmVudDtcclxubGV0IGFwaUZvcmVjYXN0O1xyXG5cclxuXHJcbmNlbHNpdXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBpZiAoZmFocmVuaGVpdC5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgZmFocmVuaGVpdC5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcclxuICAgICAgICBjZWxzaXVzLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgIHRlbXBDaGFuZ2UgPSAwO1xyXG4gICAgfVxyXG59KVxyXG5cclxuZmFocmVuaGVpdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGlmIChjZWxzaXVzLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcclxuICAgICAgICBjZWxzaXVzLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgIGZhaHJlbmhlaXQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgdGVtcENoYW5nZSA9IDE7XHJcbiAgICB9ICAgIFxyXG59KVxyXG5cclxuc3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgIGlmIChmb3JtVmFsaWRhdGlvbigpKSB7XHJcbiAgICAgICAgYXBpQ3VycmVudCA9IGBodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9jdXJyZW50Lmpzb24/a2V5PTI4ZmY2YjVlZDM2NzQ3NTI4MWUxNzAzMjIyMzIwMDgmcT0ke2lucHV0LnZhbHVlfWBcclxuICAgICAgICBhcGlGb3JlY2FzdCA9IGBodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9mb3JlY2FzdC5qc29uP2tleT0yOGZmNmI1ZWQzNjc0NzUyODFlMTcwMzIyMjMyMDA4JnE9JHtpbnB1dC52YWx1ZX0mZGF5cz03YFxyXG4gICAgICAgIHNob3dEYXRhKClcclxuICAgICAgICBpc0ZpcnN0U2VhcmNoID0gZmFsc2U7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICB9IGVsc2UgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgXHJcbn0pXHJcblxyXG5mdW5jdGlvbiBmb3JtVmFsaWRhdGlvbiAoKSB7XHJcbiAgICBpZiAoaW5wdXQudmFsaWRpdHkudG9vU2hvcnQpIHtcclxuICAgICAgICB2YWxpZFNwYW4uaW5uZXJIVE1MID0gJ01pbmltdW0gaXMgMyBsZXR0ZXJzISdcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhbGlkU3Bhbi5pbm5lckhUTUwgPSAnJ1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjbGVhclNlYXJjaCAoKSB7XHJcbiAgICBpbnB1dC52YWx1ZSA9ICcnO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBmb3JlY2FzdCAoKSB7XHJcbiAgICByZXNwb25zZSA9IGF3YWl0IGZldGNoKGFwaUZvcmVjYXN0LCB7bW9kZTogJ2NvcnMnfSlcclxuICAgIGNvbnZlcnREYXRhRm9yZWNhc3QgPSBhd2FpdCByZXNwb25zZS5qc29uKClcclxuXHJcbiAgICByYWluLmZvckVhY2goKGVsZW1lbnQsIGFycmF5KSA9PiB7XHJcbiAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBjb252ZXJ0RGF0YUZvcmVjYXN0LmZvcmVjYXN0LmZvcmVjYXN0ZGF5W2FycmF5XS5kYXkuZGFpbHlfY2hhbmNlX29mX3JhaW4gKyAnJSc7XHJcbiAgICB9KVxyXG5cclxuICAgIGxvd2VzdFRlbXAuZm9yRWFjaCgoZWxlbWVudCwgYXJyYXkpID0+IHtcclxuICAgICAgICBpZiAodGVtcENoYW5nZSA9PT0gMCkgZWxlbWVudC5pbm5lckhUTUwgPSBjb252ZXJ0RGF0YUZvcmVjYXN0LmZvcmVjYXN0LmZvcmVjYXN0ZGF5W2FycmF5XS5kYXkubWludGVtcF9jICsgJyDCsEMnO1xyXG4gICAgICAgIGVsc2UgaWYgKHRlbXBDaGFuZ2UgPT09IDEpIGVsZW1lbnQuaW5uZXJIVE1MID0gY29udmVydERhdGFGb3JlY2FzdC5mb3JlY2FzdC5mb3JlY2FzdGRheVthcnJheV0uZGF5Lm1pbnRlbXBfZiArICcgwrBGJztcclxuICAgICAgICBjZWxzaXVzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBlbGVtZW50LmlubmVySFRNTCA9IGNvbnZlcnREYXRhRm9yZWNhc3QuZm9yZWNhc3QuZm9yZWNhc3RkYXlbYXJyYXldLmRheS5taW50ZW1wX2MgKyAnIMKwQyc7XHJcbiAgICAgICAgfSlcclxuICAgIFxyXG4gICAgICAgIGZhaHJlbmhlaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gY29udmVydERhdGFGb3JlY2FzdC5mb3JlY2FzdC5mb3JlY2FzdGRheVthcnJheV0uZGF5Lm1pbnRlbXBfZiArICcgwrBGJztcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgICBoaWdoZXN0VGVtcC5mb3JFYWNoKChlbGVtZW50LCBhcnJheSkgPT4ge1xyXG4gICAgICAgIGlmICh0ZW1wQ2hhbmdlID09PSAwKSBlbGVtZW50LmlubmVySFRNTCA9IGNvbnZlcnREYXRhRm9yZWNhc3QuZm9yZWNhc3QuZm9yZWNhc3RkYXlbYXJyYXldLmRheS5tYXh0ZW1wX2MgKyAnIMKwQyc7XHJcbiAgICAgICAgZWxzZSBpZiAodGVtcENoYW5nZSA9PT0gMSkgZWxlbWVudC5pbm5lckhUTUwgPSBjb252ZXJ0RGF0YUZvcmVjYXN0LmZvcmVjYXN0LmZvcmVjYXN0ZGF5W2FycmF5XS5kYXkubWF4dGVtcF9mICsgJyDCsEYnO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNlbHNpdXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gY29udmVydERhdGFGb3JlY2FzdC5mb3JlY2FzdC5mb3JlY2FzdGRheVthcnJheV0uZGF5Lm1heHRlbXBfYyArICcgwrBDJztcclxuICAgICAgICB9KVxyXG4gICAgXHJcbiAgICAgICAgZmFocmVuaGVpdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBjb252ZXJ0RGF0YUZvcmVjYXN0LmZvcmVjYXN0LmZvcmVjYXN0ZGF5W2FycmF5XS5kYXkubWF4dGVtcF9mICsgJyDCsEYnO1xyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG5cclxuICAgIGNvbmRpdGlvbkFsbC5mb3JFYWNoKChlbGVtZW50LCBhcnJheSkgPT4ge1xyXG4gICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gY29udmVydERhdGFGb3JlY2FzdC5mb3JlY2FzdC5mb3JlY2FzdGRheVthcnJheV0uZGF5LmNvbmRpdGlvbi50ZXh0O1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIG9uTG9hZEZvcmVjYXN0ICgpIHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2ZvcmVjYXN0Lmpzb24/a2V5PTI4ZmY2YjVlZDM2NzQ3NTI4MWUxNzAzMjIyMzIwMDgmcT12w6R4asO2JmRheXM9MycsIHttb2RlOiAnY29ycyd9KSAvL2Vycm9yIGJlY2F1c2UgUFJPKyB0cmlhbCBwbGFuIHJhbiBvdXQsIG90aGVyd2lzZSB3b3VsZCB3b3JrXHJcbiAgICBjb25zdCBjb252ZXJ0RGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhjb252ZXJ0RGF0YSk7XHJcblxyXG4gICAgcmFpbi5mb3JFYWNoKChlbGVtZW50LCBhcnJheSkgPT4ge1xyXG4gICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gY29udmVydERhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbYXJyYXldLmRheS5kYWlseV9jaGFuY2Vfb2ZfcmFpbiArICclJztcclxuICAgIH0pXHJcblxyXG4gICAgbG93ZXN0VGVtcC5mb3JFYWNoKChlbGVtZW50LCBhcnJheSkgPT4ge1xyXG4gICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gY29udmVydERhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbYXJyYXldLmRheS5taW50ZW1wX2MgKyAnIMKwQyc7XHJcblxyXG4gICAgICAgIGZhaHJlbmhlaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gY29udmVydERhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbYXJyYXldLmRheS5taW50ZW1wX2YgKyAnIMKwRidcclxuICAgICAgICB9KVxyXG4gICAgICAgIGNlbHNpdXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gY29udmVydERhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbYXJyYXldLmRheS5taW50ZW1wX2MgKyAnIMKwQydcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgICBoaWdoZXN0VGVtcC5mb3JFYWNoKChlbGVtZW50LCBhcnJheSkgPT4ge1xyXG4gICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gY29udmVydERhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbYXJyYXldLmRheS5tYXh0ZW1wX2MgKyAnIMKwQyc7XHJcblxyXG4gICAgICAgIGZhaHJlbmhlaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gY29udmVydERhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbYXJyYXldLmRheS5tYXh0ZW1wX2YgKyAnIMKwRidcclxuICAgICAgICB9KVxyXG4gICAgICAgIGNlbHNpdXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gY29udmVydERhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbYXJyYXldLmRheS5tYXh0ZW1wX2MgKyAnIMKwQydcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgICBjb25kaXRpb25BbGwuZm9yRWFjaCgoZWxlbWVudCwgYXJyYXkpID0+IHtcclxuICAgICAgICBlbGVtZW50LmlubmVySFRNTCA9IGNvbnZlcnREYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5W2FycmF5XS5kYXkuY29uZGl0aW9uLnRleHQ7XHJcbiAgICB9KTtcclxuXHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGZpcnN0U2VhcmNoICgpIHtcclxuICAgIGNvbnN0IHJlc3BvbnNlQ3VycmVudCA9IGF3YWl0IGZldGNoKCdodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9jdXJyZW50Lmpzb24/a2V5PTI4ZmY2YjVlZDM2NzQ3NTI4MWUxNzAzMjIyMzIwMDgmcT12w6R4asO2Jywge21vZGU6ICdjb3JzJ30pXHJcbiAgICBjb25zdCBjb252ZXJ0RGF0YUN1cnJlbnQgPSBhd2FpdCByZXNwb25zZUN1cnJlbnQuanNvbigpO1xyXG5cclxuICAgIG9uTG9hZEZvcmVjYXN0KClcclxuXHJcbiAgICBkZWdyZWVzLmlubmVySFRNTCA9IGNvbnZlcnREYXRhQ3VycmVudC5jdXJyZW50LnRlbXBfYyArICcgwrBDJztcclxuICAgIGRhdGUuaW5uZXJIVE1MID0gZGF0ZU5vdy50b0xvY2FsZVN0cmluZygnZW4tSU4nLCBvcHRpb25zKTtcclxuICAgIGxvY2F0aW9uLmlubmVySFRNTCA9IGNvbnZlcnREYXRhQ3VycmVudC5sb2NhdGlvbi5uYW1lO1xyXG4gICAgc2t5SW5mby5pbm5lckhUTUwgPSBjb252ZXJ0RGF0YUN1cnJlbnQuY3VycmVudC5jb25kaXRpb24udGV4dDtcclxuICAgIGh1bWlkaXR5LmlubmVySFRNTCArPSBjb252ZXJ0RGF0YUN1cnJlbnQuY3VycmVudC5odW1pZGl0eSArICclJztcclxuICAgIGZlZWwuaW5uZXJIVE1MICs9IGNvbnZlcnREYXRhQ3VycmVudC5jdXJyZW50LmZlZWxzbGlrZV9jICsgJyDCsEMnO1xyXG4gICAgd2luZC5pbm5lckhUTUwgKz0gY29udmVydERhdGFDdXJyZW50LmN1cnJlbnQud2luZF9rcGggKyAna3BoJztcclxuICAgIFxyXG4gICAgY2Vsc2l1cy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBkZWdyZWVzLmlubmVySFRNTCA9IGNvbnZlcnREYXRhQ3VycmVudC5jdXJyZW50LnRlbXBfYyArICcgwrBDJztcclxuICAgICAgICBmZWVsLmlubmVySFRNTCA9IGNvbnZlcnREYXRhQ3VycmVudC5jdXJyZW50LmZlZWxzbGlrZV9jICsgJyDCsEMnO1xyXG4gICAgfSlcclxuXHJcbiAgICBmYWhyZW5oZWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGRlZ3JlZXMuaW5uZXJIVE1MID0gY29udmVydERhdGFDdXJyZW50LmN1cnJlbnQudGVtcF9mICsgJyDCsEYnO1xyXG4gICAgICAgIGZlZWwuaW5uZXJIVE1MID0gY29udmVydERhdGFDdXJyZW50LmN1cnJlbnQuZmVlbHNsaWtlX2YgKyAnIMKwRic7XHJcbiAgICB9KVxyXG59XHJcblxyXG5pZiAoaXNGaXJzdFNlYXJjaCkge1xyXG4gICAgZmlyc3RTZWFyY2goKVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBzaG93RGF0YSAoKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYXBpQ3VycmVudCwge21vZGU6ICdjb3JzJ30pXHJcbiAgICAgICAgY29uc3QgY29udmVydERhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcblxyXG4gICAgICAgIGRhdGUuaW5uZXJIVE1MID0gZGF0ZU5vdy50b0xvY2FsZVN0cmluZygnZW4tSU4nLCBvcHRpb25zKVxyXG4gICAgICAgIGxvY2F0aW9uLmlubmVySFRNTCA9IGNvbnZlcnREYXRhLmxvY2F0aW9uLm5hbWU7XHJcbiAgICAgICAgc2t5SW5mby5pbm5lckhUTUwgPSBjb252ZXJ0RGF0YS5jdXJyZW50LmNvbmRpdGlvbi50ZXh0O1xyXG4gICAgICAgIGh1bWlkaXR5LmlubmVySFRNTCA9IGNvbnZlcnREYXRhLmN1cnJlbnQuaHVtaWRpdHkgKyAnJSc7XHJcbiAgICAgICAgd2luZC5pbm5lckhUTUwgPSBjb252ZXJ0RGF0YS5jdXJyZW50LndpbmRfa3BoICsgJ2twaCdcclxuXHJcbiAgICAgICAgZm9yZWNhc3QoKVxyXG5cclxuICAgICAgICBpZiAodGVtcENoYW5nZSA9PT0gMCkge1xyXG4gICAgICAgICAgICBkZWdyZWVzLmlubmVySFRNTCA9IGNvbnZlcnREYXRhLmN1cnJlbnQudGVtcF9jICsgJyDCsEMnO1xyXG4gICAgICAgICAgICBmZWVsLmlubmVySFRNTCA9IGNvbnZlcnREYXRhLmN1cnJlbnQuZmVlbHNsaWtlX2MgKyAnIMKwQyc7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0gZWxzZSBpZiAodGVtcENoYW5nZSA9PT0gMSkge1xyXG4gICAgICAgICAgICBkZWdyZWVzLmlubmVySFRNTCA9IGNvbnZlcnREYXRhLmN1cnJlbnQudGVtcF9mICsgJyDCsEYnO1xyXG4gICAgICAgICAgICBmZWVsLmlubmVySFRNTCA9IGNvbnZlcnREYXRhLmN1cnJlbnQuZmVlbHNsaWtlX2YgKyAnIMKwRic7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjZWxzaXVzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBkZWdyZWVzLmlubmVySFRNTCA9IGNvbnZlcnREYXRhLmN1cnJlbnQudGVtcF9jICsgJyDCsEMnO1xyXG4gICAgICAgICAgICBmZWVsLmlubmVySFRNTCA9IGNvbnZlcnREYXRhLmN1cnJlbnQuZmVlbHNsaWtlX2MgKyAnIMKwQyc7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZmFocmVuaGVpdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgZGVncmVlcy5pbm5lckhUTUwgPSBjb252ZXJ0RGF0YS5jdXJyZW50LnRlbXBfZiArICcgwrBGJztcclxuICAgICAgICAgICAgZmVlbC5pbm5lckhUTUwgPSBjb252ZXJ0RGF0YS5jdXJyZW50LmZlZWxzbGlrZV9mICsgJyDCsEYnO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGNsZWFyU2VhcmNoKClcclxuICAgIH0gY2F0Y2goZXJyKSB7XHJcbiAgICAgICAgZGVncmVlcy5pbm5lckhUTUwgPSBgXCIke2lucHV0LnZhbHVlfVwiIGlzIG5vdCBhIHZhbGlkIGxvY2F0aW9uYFxyXG4gICAgICAgIGNsZWFyU2VhcmNoKClcclxuICAgIH1cclxufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==