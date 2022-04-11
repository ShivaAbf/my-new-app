let dates = document.querySelector("#date");
let time = document.querySelector("#time");
function showTime(currentTime){
  let currentDate = new Date();
  // console.log(currentDate);
  let weekDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let week = weekDay[currentDate.getDay()];
  let mounth = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Auguast",
    "September",
    "October",
    "November",
    "December",
  ];
  let mounths = mounth[currentDate.getMonth()];
  // console.log(week);
  let day = currentDate.getDate();
  dates.innerHTML = `${week},  ${mounths}  ${day}`;
  // time.innerHTML = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
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
let form = document.querySelector("form");
let input = document.querySelector("#enter-city");
let icon = document.querySelector("#icon")



// console.log(form.value);
function showWeather(information){

  let weath = document.querySelector("#weath")
  
  weath.innerHTML =  Math.round(information.data.main.temp);
  let description = document.querySelector("#desc")
   description.innerHTML= information.data.weather[0].main;
  let humidity = document.querySelector("#humid");
humidity.innerHTML = `Humidity: ${information.data.main.humidity}%`
let wind = document.querySelector("#wind")
wind.innerHTML = `Wind speed: ${Math.round(information.data.wind.speed)} Km/H`
icon.setAttribute(
  "src",
  `http://openweathermap.org/img/wn/${information.data.weather[0].icon}@2x.png`
);
  

}
function search(city){
 
  apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8269c637bf5ee65986b1b74910708602&units=metric`
  axios.get(apiUrl).then(showWeather);
  // console.log(city)
}



 
  function showCity(cityValue) {
    cityValue = document.querySelector("#show-city");
    event.preventDefault();
  
    cityValue.innerHTML = input.value;
    search(input.value);
  }



  form.addEventListener("submit", showCity);
   let fahrenheit = document.querySelector("#fahrenheit")
  