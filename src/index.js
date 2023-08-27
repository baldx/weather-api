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

let tempChange = 0;

isFirstSearch = true;

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
    }
})

fahrenheit.addEventListener('click', () => {
    if (celsius.classList.contains('active')) {
        celsius.classList.remove('active');
        fahrenheit.classList.add('active');
    }
    
})

submit.addEventListener('click', (e) => {
    apiCurrent = `https://api.weatherapi.com/v1/current.json?key=28ff6b5ed367475281e170322232008&q=${input.value}`
    apiForecast = `http://api.weatherapi.com/v1/forecast.json?key=28ff6b5ed367475281e170322232008&q=${input.value}&days=7`
    showData()
    input.value = '';
    e.preventDefault()
})



async function forecast () {
    response = await fetch(apiForecast, {mode: 'cors'})
    convertDataForecast = await response.json()

    console.log(convertDataForecast);

    rain.forEach((element, array) => {
        element.innerHTML = convertDataForecast.forecast.forecastday[array].day.daily_chance_of_rain + '%';
    })

    lowestTemp.forEach((element, array) => {
        element.innerHTML = convertDataForecast.forecast.forecastday[array].day.mintemp_c + ' °C';
    })

    highestTemp.forEach((element, array) => {
        element.innerHTML = convertDataForecast.forecast.forecastday[array].day.maxtemp_c + ' °C';
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
    })

    highestTemp.forEach((element, array) => {
        element.innerHTML = convertData.forecast.forecastday[array].day.maxtemp_c + ' °C';
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
    
}

if (isFirstSearch === true) {
    firstSearch()
    console.log(isFirstSearch);
}

async function showData () {
    try {
        const response = await fetch(apiCurrent, {mode: 'cors'})
        const convertData = await response.json();

        if (tempChange === 0) {
            degrees.innerHTML = convertData.current.temp_c + ' °C';
            feel.innerHTML = convertData.current.feelslike_c + ' °C';
            date.innerHTML = dateNow.toLocaleString('en-IN', options)
            location.innerHTML = convertData.location.name;
            skyInfo.innerHTML = convertData.current.condition.text;
            humidity.innerHTML = convertData.current.humidity + '%';
            wind.innerHTML = convertData.current.wind_kph + 'kph'
        } else {
            degrees.innerHTML = convertData.current.temp_f + ' °F';
            feel.innerHTML = convertData.current.feelslike_f + ' °F';
            date.innerHTML = dateNow.toLocaleString('en-IN', options)
            location.innerHTML = convertData.location.name;
            skyInfo.innerHTML = convertData.current.condition.text;
            humidity.innerHTML = convertData.current.humidity + '%';
            wind.innerHTML = convertData.current.wind_kph + 'kph'
        }

        celsius.addEventListener('click', () => {
            
        })

        forecast()
        
    } catch(err) {
        degrees.innerHTML = err
    }
}