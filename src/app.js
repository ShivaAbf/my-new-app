let dates = document.querySelector("#date");
let time = document.querySelector("#time");
function showTime(currentTime){
  let currentDate = new Date();
  let weekDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let week = weekDay[currentDate.getDay()];
  let mounth = [
    "January","February","March","April","May","June","July","Auguast","September","October","November","December",];
  let mounths = mounth[currentDate.getMonth()];
  let day = currentDate.getDate();
  dates.innerHTML = `${week},  ${mounths}  ${day}`;
  let hour = currentDate.getHours();
  let min = currentDate.getMinutes();
  if(hour <10){
  hour = `0${hour}`
  }
  if(min<10){
    min = `0${min}`
  }
  time.innerHTML = `${hour}:${min}`
}

showTime()

let input = document.querySelector("#enter-city");
let icon = document.querySelector("#icon")

function getCoordinates(Coordinate){
  apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${Coordinate.lat}&lon=${Coordinate.lon}&appid=8015ed1d22e33fd7249f1d37945c66fb&units=metric`
  axios.get(apiUrl).then(showForecast)
}

function showWeather(information){
let weath = document.querySelector("#weath")
let description = document.querySelector("#desc")
let humidity = document.querySelector("#humid");
let wind = document.querySelector("#wind")

celsiusTemp = information.data.main.temp
weath.innerHTML =  Math.round(celsiusTemp);
description.innerHTML= information.data.weather[0].main;
humidity.innerHTML = `Humidity: ${information.data.main.humidity}%`
wind.innerHTML = `Wind speed: ${Math.round(information.data.wind.speed)} Km/H`
icon.setAttribute(
  "src",
  `http://openweathermap.org/img/wn/${information.data.weather[0].icon}@2x.png`
);
getCoordinates(information.data.coord)
}

function search(city){
apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8015ed1d22e33fd7249f1d37945c66fb
&units=metric`
axios.get(apiUrl).then(showWeather);
}

function showCity(cityValue) {
  event.preventDefault();
  cityValue = document.querySelector("#show-city");
  let celsiusTemp = null;
  cityValue.innerHTML = input.value;
  search(input.value);
  }

function showFahrenheit(event){
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9/5) + 32
  let temperature = document.querySelector("#weath")
  temperature.innerHTML = Math.round(fahrenheitTemp) 
  }

function showCelcius(event){
  event.preventDefault();
  let temperature =document.querySelector("#weath")
  temperature.innerHTML = Math.round(celsiusTemp)
}

function formatDay(timeNumber, index){
  console.log(index)
let date = new Date(timeNumber * 1000);
let day = date.getDay();
let weekDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
return weekDay[day]
}

function showForecast(response){
  let forecastElement = document.querySelector("#forecast")
  let dailyForecast = response.data.daily;
  let forecastHTML = `<div class="row">`
  dailyForecast.forEach(function(responseDay,index ){
    if(index < 6){
    forecastHTML =forecastHTML + `
    <div class="col-2 week ">
        <ul>
        <li><p class="week-day">${formatDay(responseDay.dt)}</p></li>
        <li class="weather"><img src="http://openweathermap.org/img/wn/${responseDay.weather[0].icon}@2x.png"></li>
        <li><span class="min-temp">${Math.round(responseDay.temp.min)}°</span>   <span class="max-temp">${Math.round(responseDay.temp.max)}°</span></li>
      </ul>
      </div>`
  forecastElement.innerHTML = forecastHTML
}
  })
  forecastHTML = forecastHTML + `</div>`
}

  let form = document.querySelector("form");
  form.addEventListener("submit", showCity);

   let fahrenheit = document.querySelector("#fahrenheit")
   fahrenheit.addEventListener("click", showFahrenheit)
  
   let celcius = document.querySelector("#cel")
   celcius.addEventListener("click", showCelcius)
 
   search("Isfahan")