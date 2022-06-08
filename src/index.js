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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednessday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let days = [
    "Monday",
    "Tuesday",
    "Wednessday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let forecastHTML = `<div class="table-responsive forecast-details">
<table class="table table-borderless table-hover">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<tr>
    <td>
      <h6>${formatDay(forecastDay.dt)}</h6>
    </td>
    <td>
      <img
        src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
        alt=""
        width="42"
      />
    </td>
    <td>
      <span class="weather-forecast-temperature-max">
        ${Math.round(forecastDay.temp.max)}°
      </span>
      <span class="weather-forecast-temperature-min">
        ${Math.round(forecastDay.temp.min)}°
      </span>
    </td>
  </tr>
    `;
    }
  });
  forecastHTML = forecastHTML + `</table> </div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let latitude = coordinates.lat;
  let longitude = coordinates.lon;
  let units = "metric";
  let key = "dfaa96d44261907af5a2c46dbebfa5ad";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/onecall";
  let url = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${key}&units=${units}`;

  axios.get(url).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#dateTime");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
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

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let key = "dfaa96d44261907af5a2c46dbebfa5ad";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let url = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${key}&units=${units}`;

  axios.get(url).then(displayTemperature);
}

function getCurrentPositionWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let button = document.querySelector("#currentWeather");
button.addEventListener("click", getCurrentPositionWeather);

search("Zandvoort");
