function showTemperature(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let fahrenheit = document.querySelector("#fahrenheit-temp");
  fahrenheit.innerHTML = temperature;
  let speed = Math.round(response.data.wind.speed);
  let humidityPercentage = Math.round(response.data.main.humidity);
  let windSpeed = document.querySelector("#wind");
  let humidity = document.querySelector("#humidity");
  windSpeed.innerHTML = speed;
  humidity.innerHTML = humidityPercentage;
  let weather = response.data.weather[0].main;
  let skyDescription = document.querySelector("#sky-description");
  skyDescription.innerHTML = weather;
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = response.data.name;
  let low = document.querySelector("#low");
  let high = document.querySelector("#high");
  let currentLow = Math.round(response.data.main.temp_min);
  let currentHigh = Math.round(response.data.main.temp_max);
  low.innerHTML = currentLow;
  high.innerHTML = currentHigh;
}

function showCurrentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "2005b16f2536bde86914bfb6c901642a";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
function locationSearch(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

function search(city) {
  let apiKey = "2005b16f2536bde86914bfb6c901642a";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let newCity = document.querySelector("#city-input").value;
  search(newCity);
}

let currentLocation = document.querySelector("#location-button");
currentLocation.addEventListener("click", locationSearch);

let searchCity = document.querySelector("#search-for-a-city");
searchCity.addEventListener("submit", handleSubmit);

search("New York");

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let day = days[date.getDay()];
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let currentTime = `${hour}:${minutes}`;
  return `${day} ${currentTime}`;
}
let time = document.querySelector("#current-time");
let date = new Date();
time.innerHTML = formatDate(date);

//function changeTemp(event) {
//event.preventDefault();
//let currentTemp = document.querySelector("#fahrenheit-temp");
//let newCurrentTemp = "17°";
//currentTemp.innerHTML = newCurrentTemp;
//}

//let celcius = document.querySelector("#celcius");
//celcius.addEventListener("click", changeTemp);

//function changeCurrentTemp(event) {
//event.preventDefault();
//let currentTemp = document.querySelector("#fahrenheit-temp");
//let newCurrentTemp = "63°";
//currentTemp.innerHTML = newCurrentTemp;
//}

//let fahrenheit = document.querySelector("#fahrenheit");
//fahrenheit.addEventListener("click", changeCurrentTemp);