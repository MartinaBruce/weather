const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');


/* unik Api-key & url  */
const api = {
    key: "077358b08fe370588fdc3aeafd355899", 
    baseurl: "https://api.openweathermap.org/data/2.5/"
}

var inputValue = document.querySelector('.inputValue')

/*eventlist on searchbox when we press a key(13= enterkey on keybord) */
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery); 

function setQuery (evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value); 
        console.log(searchbox.value);
    }
}

function getResults (query) {
     fetch (`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
     .then(res => res.json())
     .then(data => {

        /*var countryValue = data.name.countryEl;
        var dateValue = data.dateEl;
        var timeValue = data.timeEl;
        var tempValue = data.main.currentTempEl;
        var timezoneValue = data.sys.timezone;
        /*var currentWeatherValue = data.currentWeatherItemsEl;
        var futureWeatherValue = data.weatherForecastEl;*/
        
        console.log(data);
    

        /*countryEl.innerHTML = countryValue;
        dateEl.innerHTML = dateValue;
        timeEl.innerHTML= timeValue; 
        currentTempEl.innerHTML = tempValue;
        timezone.innerHTML = timezoneValue;
       /* currentWeatherItemsEl.innerHTML = currentWeatherValue;
        weatherForecastEl.innerHTML = futureWeatherValue; */


     
    //showWeatherData(data);

    }) 
} 

/*array månader & veckordagar*/
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

 /* dagens datum, dag och tid */
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

/*get data via navigator geolocation för exakta position */
getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
        
        let {latitude, longitude } = success.coords;

/* ta bort hourly, minutley??? */
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutley&units=metric&appid=${api.key}`)
        .then(res => res.json())
        .then(data => {

        console.log(data)
        showWeatherData(data);
        })

    }) 
}


function showWeatherData (data){
    let {sunrise, sunset} = data.current;

    timezone.innerHTML = data.timezone;
    countryEl.innerHTML = data.lat + 'N ' + data.lon+'E'


    currentWeatherItemsEl.innerHTML = 
    `
   <div class="weather-item">
        <div>Sunrise</div>
        <div>${window.moment(sunrise * 1000).format('HH:mm ')}</div>
    </div>
    <div class="weather-item">
        <div>Sunset</div>
        <div>${window.moment(sunset*1000).format('HH:mm ')}</div>
    </div>
    
    
    `;

    let otherDayForcast = ''
    data.daily.forEach((day, idx) => {
        if(idx == 0){
            currentTempEl.innerHTML = `
            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
            <div class="other">
                <div class="day">${window.moment(day.dt*1000).format('dddd')}</div>
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
            </div>
            
            `
        }else{
            otherDayForcast += `
            <div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
            </div>
            
            `
        }
    })


    weatherForecastEl.innerHTML = otherDayForcast;
}