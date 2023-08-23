const input = document.querySelector('#search');
const submit = document.querySelector('#submit');
const degrees = document.querySelector('.degrees');

const skyInfo = document.querySelector('.sky-info');
const location = document.querySelector('.location');
const date = document.querySelector('.date');
const time = document.querySelector('.time');

const feel = document.querySelector('.feel');
const humidity = document.querySelector('.humidity');
const rain = document.querySelector('.rain');
const wind = document.querySelector('.wind');
const name = document.querySelector('.name');
const change = document.querySelector('.change');

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

submit.addEventListener('click', (e) => {
    apiCurrent = `https://api.weatherapi.com/v1/current.json?key=28ff6b5ed367475281e170322232008&q=${input.value}`
    apiForecast = `http://api.weatherapi.com/v1/forecast.json?key=28ff6b5ed367475281e170322232008&q=${input.value}`
    showData()
    input.value = '';
    e.preventDefault()
})

async function future () {
    const response = await fetch('http://api.weatherapi.com/v1/future.json?key=28ff6b5ed367475281e170322232008&q=växjö', {mode: 'cors'})
    convertData = await response.json()
    console.log(convertData);
}

async function forecast () {
    const responseForecast = await fetch('http://api.weatherapi.com/v1/forecast.json?key=28ff6b5ed367475281e170322232008&q=växjö', {mode: 'cors'})
    convertDataForecast = await responseForecast.json()
    console.log(convertDataForecast);
}

window.onload = async () => {
    const responseCurrent = await fetch('https://api.weatherapi.com/v1/current.json?key=28ff6b5ed367475281e170322232008&q=växjö', {mode: 'cors'})
    const convertDataCurrent = await responseCurrent.json();

    forecast()
    future()

    console.log(convertDataCurrent);
    
    degrees.innerHTML = convertDataCurrent.current.temp_c + '°C'
    date.innerHTML = dateNow.toLocaleString('en-IN', options);
    location.innerHTML = convertDataCurrent.location.name;
    skyInfo.innerHTML = convertDataCurrent.current.condition.text;
    humidity.innerHTML += convertDataCurrent.current.humidity + '%';
    feel.innerHTML += convertDataCurrent.current.feelslike_c + '°C';
    wind.innerHTML += convertDataCurrent.current.wind_kph + 'kph';
    name.innerHTML = convertDataCurrent.current.is_day;


    change.addEventListener('click', () => {
        if (change.innerHTML === 'Switch to fahrenheit') {
            degrees.innerHTML = convertData.current.temp_f + '°F'
            feel.innerHTML = convertData.current.feelslike_f + '°F';
            change.innerHTML = 'Switch to celsius';
        } else {
            degrees.innerHTML = convertData.current.temp_c + '°C'
            feel.innerHTML = convertData.current.feelslike_c + '°C';
            change.innerHTML = 'Switch to fahrenheit';
        }
    })
}

async function showData () {
    try {
        const response = await fetch(apiCurrent, {mode: 'cors'})
        const convertData = await response.json()
        console.log(convertData);

        degrees.innerHTML = convertData.current.temp_c + '°C'
        date.innerHTML = dateNow.toLocaleString('en-IN', options)
        location.innerHTML = convertData.location.name;
        skyInfo.innerHTML = convertData.current.condition.text;
        humidity.innerHTML = convertData.current.humidity + '%';
        feel.innerHTML = convertData.current.feelslike_c + '°C';
        wind.innerHTML = convertData.current.wind_kph + 'kph'
    } catch(err) {
        degrees.innerHTML = err
    }
}

