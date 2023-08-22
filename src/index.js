const input = document.querySelector('#search');
const submit = document.querySelector('#submit');
const degrees = document.querySelector('.degrees');
let api;

submit.addEventListener('click', (e) => {
    api = `https://api.weatherapi.com/v1/current.json?key=28ff6b5ed367475281e170322232008&q=${input.value}`
    showData()
    input.value = '';
    e.preventDefault()
})


async function showData () {
    try {
        const response = await fetch(api, {mode: 'cors'})
        const convert = await response.json()
        console.log(convert);

        degrees.innerHTML = convert.current.temp_c + 'C'
    } catch(err) {
        degrees.innerHTML = 'No matching location found'
    }
}

