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

//Date builder function
const dateBuilder = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let today = new Date();
    let day = weekdays[today.getDay()];
    let month = months[today.getMonth()];
    currentDate.textContent = `${day} ${today.getDate().toString()} ${month} ${today.getFullYear().toString()}`;
}

//Random color generator 
let randomNumberOne = Math.floor(Math.random()*256);
let randomNumberTwo = Math.floor(Math.random()*256);
let randomNumberThree = Math.floor(Math.random()*256);
let bkgColor = `RGB(${randomNumberOne}, ${randomNumberTwo}, ${randomNumberThree})`;
appContainer.style.backgroundColor = `${bkgColor}`;

//Event on window load
window.addEventListener('load', () => {
    let long; //longitude of current area
    let lat; //latitude of current area
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(currentPosition => {
            long = currentPosition.coords.longitude;
            lat = currentPosition.coords.latitude;

            const apiCall = `${url}weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`
            fetch(apiCall)
            .then(response => {
                return response.json();
            })
            .then(weather => {
                currentTemp.textContent = `${Math.round(weather.main.temp)}°C`;
                currentDescription.textContent = `${weather.weather[0].main}`;
                currentFeelsLike.textContent = `Feels like ${Math.round(weather.main.feels_like)}°C`;
                currentLocation.textContent = `${weather.name}, ${weather.sys.country}`;
                currentHiLow.textContent = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`
            })
            dateBuilder();
            
    });
    } else {
        alert('App cannot access current location, please change location settings');
    }  
})

//Event and function on search which gets the weather
let city;
function displayResults(e) {
    city = e.target.value;
    getWeather(city);
   }
search.addEventListener('change', displayResults);

const getWeather = (q) => {
    q = q.toString().trim();
const apiCall2 = `${url}weather?q=${q}&units=metric&appid=${apiKey}`;
fetch(apiCall2)
    .then(response => {
        if (response.ok) {
            return response.json()
        } alert('City not found, try again');
        throw new Error('Request failed!'); 
    }, networkError => console.log(networkError.message)
    ).then(weather => {
        currentLocation.textContent = `${weather.name}, ${weather.sys.country}`;
        currentTemp.innerHTML = `${Math.round(weather.main.temp)}°C`;
        currentDescription.textContent = `${weather.weather[0].main}`;
        currentFeelsLike.textContent = `Feels like ${Math.round(weather.main.feels_like)}°C`;
        currentHiLow.textContent = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
    })
    dateBuilder();
    
    let rnOne = Math.floor(Math.random()*256);
    let rnTwo = Math.floor(Math.random()*256);
    let rnThree = Math.floor(Math.random()*256);
    let backgroundColor = `RGB(${rnOne}, ${rnTwo}, ${rnThree})`;
    appContainer.style.backgroundColor = `${backgroundColor}`;
}; 