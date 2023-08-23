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
let api;

submit.addEventListener('click', (e) => {
    api = `https://api.weatherapi.com/v1/current.json?key=28ff6b5ed367475281e170322232008&q=${input.value}`
    showData()
    input.value = '';
    e.preventDefault()
})


window.onload = async () => {
    const response = await fetch('https://api.weatherapi.com/v1/current.json?key=28ff6b5ed367475281e170322232008&q=växjö', {mode: 'cors'})
    const convertData = await response.json()

    console.log(convertData);
    
    degrees.innerHTML = convertData.current.temp_c + '°C'
    date.innerHTML = dateNow.toLocaleString('en-IN', options);
    location.innerHTML = convertData.location.name;
    skyInfo.innerHTML = convertData.current.condition.text;
    humidity.innerHTML += convertData.current.humidity + '%';
    feel.innerHTML += convertData.current.feelslike_c + '°C';
    wind.innerHTML += convertData.current.wind_kph + 'kph';
    name.innerHTML = convertData.current.is_day;

    console.log(convertData.current.maxtemp_c);

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
        const response = await fetch(api, {mode: 'cors'})
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

