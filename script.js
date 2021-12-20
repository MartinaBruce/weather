const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
//const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');


/* unik Api-key & url  */
const api = {
    key: "077358b08fe370588fdc3aeafd355899", 
    baseurl: "https://api.openweathermap.org/data/2.5/"
}

/*eventlist on searchbox when we press a key(13= enterkey on keybord) */
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery); 

function setQuery (evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value); 
    }
}

function getResults (query) {
     fetch (`${api.baseurl}forecast?q=${query}&units=metric&APPID=${api.key}`)
     .then(weather => {      
        return weather.json();
  
    }) .then(displayResults);
    
}

function makeForecastItem(weather){
    
    let forecastItem = document.createElement('div');
    forecastItem.setAttribute('class', 'weather-forecast-item');

    let forecastItemIcon = document.createElement('img');
    forecastItemIcon.setAttribute('class', 'w-icon');
    forecastItemIcon.setAttribute('src', `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
    forecastItem.appendChild(forecastItemIcon);


    let forecastItemTemp = document.createElement('div');
    forecastItemTemp.setAttribute('class', 'weather-forecast-item-temp');
    forecastItemTemp.innerHTML = `${weather.main.temp}<span>°C</span>`;
    forecastItem.appendChild(forecastItemTemp);


    let forecastItemDate = document.createElement('div');
    forecastItemDate.setAttribute("class", 'weather-forecast-date');
    forecastItemDate.innerHTML =  weather.dt_txt.split(" ")[0]
    forecastItem.appendChild(forecastItemDate);
    
    let forecastItemMin = document.createElement('div');
    forecastItemMin.setAttribute('class', 'weather-forecast-item-Min');
    forecastItemMin.innerHTML =  `Min: ${Math.round(weather.main.temp_min)}<span>°C</span>`;
    forecastItem.appendChild(forecastItemMin);

    let forecastItemMax = document.createElement('div');
    forecastItemMax.setAttribute('class', 'weather-forecast-item-Max');
    forecastItemMax.innerHTML = `Max: ${Math.round(weather.main.temp_max)}<span>°C</span>`;
    forecastItem.appendChild(forecastItemMax);

    return forecastItem
}



function displayResults(weather){
    
    console.log(weather);
    let city = document.querySelector ('.place-container .time-zone');
    city.innerText = `${weather.city.name}, ${weather.city.country}`;
     
    
    weatherForecastEl.innerHTML= " "

    for (i = 0; i < weather.list.length; i=i+8) {

        console.log(weatherForecastEl)
        weatherForecastEl.appendChild(makeForecastItem(weather.list[i]));
    } 
} 

/*array månader & veckordagar*/
 const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
 const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

 /* dagens datum, dag och tid (klockformat)*/
setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn24HrFormat = hour >= 24 ? hour %12: hour
    const minutes = time.getMinutes();

    timeEl.innerHTML = (hoursIn24HrFormat < 10? '0'+hoursIn24HrFormat : hoursIn24HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="&units=metric"> </span>`

    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

}, 1000);

getResults("Gävle")