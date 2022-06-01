let currentDateAndTime = new Date();
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednessday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[currentDateAndTime.getDay()];
  let time = currentDateAndTime.toLocaleTimeString([], { timeStyle: "short" });

  let formattedDate = `${day} ${time}`;
  return formattedDate;
}

let now = document.querySelector(".dateTime");
now.innerHTML = formatDate();

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let searchResult = document.querySelector("#city");
  searchResult.innerHTML = `${searchInput.value}`;

  let units = "metric";
  let key = "dfaa96d44261907af5a2c46dbebfa5ad";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let url = `${apiEndpoint}?q=${searchInput.value}&appid=${key}&units=${units}`;

  axios.get(url).then(showTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function showTemperature(response) {
  console.log(response.data.main.temp);
  let currentTemperature = document.querySelector(".temperature");
  let temperature = Math.round(response.data.main.temp);

  currentTemperature.innerHTML = `${temperature}°C`;
}

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
  let currentTemperature = document.querySelector(".temperature");
  let temperature = Math.round(response.data.main.temp);

  currentTemperature.innerHTML = `${temperature}°C`;

  let position = document.querySelector("#city");
  position.innerHTML = response.data.name;
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let button = document.querySelector("#currentWeather");
button.addEventListener("click", getCurrentPosition);
