function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednessday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  let time = date.toLocaleTimeString([], { timeStyle: "short" });

  let formattedDate = `${day} ${time}`;
  return formattedDate;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#dateTime");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

function search(city) {
  let units = "metric";
  let key = "dfaa96d44261907af5a2c46dbebfa5ad";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let url = `${apiEndpoint}?q=${city}&appid=${key}&units=${units}`;

  axios.get(url).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

search("Zandvoort");

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let key = "dfaa96d44261907af5a2c46dbebfa5ad";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let url = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${key}&units=${units}`;

  axios.get(url).then(showPositionTemperature);
}

function showPositionTemperature(response) {
  console.log(response.data.main.temp);
  let currentTemperature = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);

  currentTemperature.innerHTML = `${temperature}`;

  let position = document.querySelector("#city");
  position.innerHTML = response.data.name;
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let button = document.querySelector("#currentWeather");
button.addEventListener("click", getCurrentPosition);
