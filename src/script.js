function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = temperature;
  speed = Math.round(response.data.wind.speed);
  let humidityPercentage = Math.round(response.data.main.humidity);
  let windSpeed = document.querySelector("#wind");
  let humidity = document.querySelector("#humidity");
  windSpeed.innerHTML = speed;
  humidity.innerHTML = humidityPercentage;
  let weather = response.data.weather[0].description;
  let skyDescription = document.querySelector("#sky-description");
  skyDescription.innerHTML = weather;
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = response.data.name;
  let low = document.querySelector("#low");
  let high = document.querySelector("#high");
  currentLow = Math.round(response.data.main.temp_min);
  currentHigh = Math.round(response.data.main.temp_max);
  low.innerHTML = currentLow;
  high.innerHTML = currentHigh;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  fahrenheitTemp = response.data.main.temp;
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

function showCelsiusTemp(event) {
  event.preventDefault();
  let celsiusResult = ((fahrenheitTemp - 32) * 5) / 9;
  let lowResult = ((currentLow - 32) * 5) / 9;
  let highResult = ((currentHigh - 32) * 5) / 9;
  let tempLow = document.querySelector("#low");
  let tempHigh = document.querySelector("#high");
  let windSpeed = document.querySelector("#wind");
  let speedUnit = document.querySelector("#speed-unit");
  windSpeed.innerHTML = Math.round(speed * 1.609);
  speedUnit.innerHTML = "kph";
  tempLow.innerHTML = Math.round(lowResult);
  tempHigh.innerHTML = Math.round(highResult);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(celsiusResult);
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}
function showFahrenheitTemp(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  let tempLow = document.querySelector("#low");
  let tempHigh = document.querySelector("#high");
  let windSpeed = document.querySelector("#wind");
  let speedUnit = document.querySelector("#speed-unit");
  windSpeed.innerHTML = speed;
  speedUnit.innerHTML = "mph";
  tempLow.innerHTML = currentLow;
  tempHigh.innerHTML = currentHigh;
  currentTemp.innerHTML = Math.round(fahrenheitTemp);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}
let speed = null;
let currentLow = null;
let currentHigh = null;
let fahrenheitTemp = null;

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsiusTemp);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

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
  return `Last updated: ${day} ${currentTime}`;
}
let time = document.querySelector("#current-time");
let date = new Date();
time.innerHTML = formatDate(date);

search("New York");
