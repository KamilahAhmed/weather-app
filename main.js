const apiKey = '6cda4bd3f184867674d42a94a452e370';
const url = 'https://api.openweathermap.org/data/2.5/';

//Get elements from HTML
const currentDate = document.querySelector('.location .date');
const currentLocation = document.querySelector('.location .city');
const currentTemp = document.querySelector('.current .temp');
const currentDescription = document.querySelector('.current .description');
const currentFeelsLike = document.querySelector('.current .feels-like');
const searchBox = document.querySelector('search-box');

//Date builder function
const DateBuilder = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let today = new Date();
    let day = weekdays[today.getDay()];
    let month = months[today.getMonth()];
    currentDate.textContent = `${day} ${today.getDate().toString()} ${month} ${today.getFullYear().toString()}`;
}

//Event on window load
window.addEventListener('load', () => {
    let long; //longitude of current area
    let lat; //latitude of current area

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(currentPosition => {
            console.log(currentPosition);
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
                currentFeelsLike.textContent = `Feels like ${weather.main.feels_like}°C`;
                currentLocation.textContent = `${weather.name}, ${weather.sys.country}`;
            })
            DateBuilder();
    });
    } else {
        alert('App cannot access current location, please change location settings');
    }  
})

