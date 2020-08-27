const apiKey = '6cda4bd3f184867674d42a94a452e370';
const url = 'https://api.openweathermap.org/data/2.5/';

//Get elements from HTML
const appContainer = document.querySelector('.app-container');
const currentDate = document.querySelector('.location .date');
const currentLocation = document.querySelector('.location .city');
const currentTemp = document.querySelector('.current .temp');
const currentDescription = document.querySelector('.current .description');
const currentFeelsLike = document.querySelector('.current .feels-like');
const currentHiLow = document.querySelector('.current .hi-low');
const search = document.getElementById("search");
const switchToF = document.querySelector(".current .fahrenheit")
const switchToC = document.querySelector(".current .celcius")

//Date builder function
const dateBuilder = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let today = new Date();
    let day = weekdays[today.getDay()];
    let month = months[today.getMonth()];
    currentDate.textContent = `${day} ${today.getDate().toString()} ${month} ${today.getFullYear().toString()}`;
}

let unit;
//Event on window load
window.addEventListener('load', () => {
    unit = 'metric';
    let long; //longitude of current area
    let lat; //latitude of current area
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(currentPosition => {
            long = currentPosition.coords.longitude;
            lat = currentPosition.coords.latitude;
            const apiCall = `${url}weather?lat=${lat}&lon=${long}&units=${unit}&appid=${apiKey}`
            fetch(apiCall)
            .then(weather => {
                return weather.json();
            })
            .then(getWeatherInfo);
            setTimeout(() => {
                dateBuilder(); 
                switchToF.style.display = 'block';
            }, 750);
    })
    } else {
        alert('App cannot access current location, please change location settings');
    }  
})

//Collect weather info from API for display
const getWeatherInfo = (weather) => {
    currentLocation.innerHTML = `${weather.name}, ${weather.sys.country}`;
    currentTemp.innerHTML = `${Math.round(weather.main.temp)}°C`;
    currentDescription.innerHTML = `${weather.weather[0].main}`;
    currentFeelsLike.innerHTML = `Feels like ${Math.round(weather.main.feels_like)}°C`;
    currentHiLow.innerHTML = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
}

//Event and function on search which gets the weather
const getWeather = (q) => {
    unit = 'metric';
    q = q.toString().trim();
    const apiCall2 = `${url}weather?q=${q}&units=${unit}&appid=${apiKey}`;
    fetch(apiCall2)
        .then(weather => {
            if (weather.ok) {
                return weather.json()
            } alert(`${city} not found, try again`);
            throw new Error('Request failed!'); 
        }, networkError => console.log(networkError.message)
        ).then(getWeatherInfo)
    dateBuilder();
    switchToC.style.display = 'none';
    setTimeout(() => {
        switchToF.style.display = 'block';
    }, 1000);
}; 
let city;
function displayResults(e) {
    city = e.target.value;
    getWeather(city);
   }
search.addEventListener('change', displayResults);

//Function and event for temperature switch from celcius to fahrenheit
const changeTempUnitToF = () => {
    unit = 'imperial';
    const apiCall2 = `${url}weather?q=${currentLocation.innerHTML}&units=${unit}&appid=${apiKey}`;
    fetch(apiCall2)
        .then(weather => {
            if (weather.ok) {
                return weather.json()
            } alert('City not found, try again');
            throw new Error('Request failed!'); 
        }, networkError => console.log(networkError.message)
        ).then(weather => {
            currentLocation.innerHTML = `${weather.name}, ${weather.sys.country}`;
            currentTemp.innerHTML = `${Math.round(weather.main.temp)}°F`;
            currentDescription.innerHTML = `${weather.weather[0].main}`;
            currentFeelsLike.innerHTML = `Feels like ${Math.round(weather.main.feels_like)}°F`;
            currentHiLow.innerHTML = `${Math.round(weather.main.temp_min)}°F / ${Math.round(weather.main.temp_max)}°F`;
        })
        switchToF.style.display = 'none';
        setTimeout(() => {
            switchToC.style.display = 'block';
        }, 500);  
 }
switchToF.addEventListener('click', changeTempUnitToF);

//Function and event for temperature switch from fahrenheit to celsius
const changeTempUnitToC = () => {
    switchToC.style.display = 'none';
    setTimeout(() => {
        switchToF.style.display = 'block';
    }, 500);
    getWeather(currentLocation.innerHTML);
}
switchToC.addEventListener('click', changeTempUnitToC);