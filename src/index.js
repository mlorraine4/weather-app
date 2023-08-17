import "./styles.css";
import winterImg from "./images/winter.jpg";
import summerImg from "./images/summer.jpg";
import fallImg from "./images/fall.jpg";
import springImg from "./images/spring.jpg";
import format from "date-fns/format";

function today() {
  let today = format(new Date(), "MMMM d, yyyy");
  return today;
}

function now() {
  let day = format(new Date(), "eeee");
  return day;
}

const getSeason = (() => {
  let background = document.querySelector(".background");
  let search = document.querySelector("#submit");
  let currentMonth = format(new Date(), "MM");

  if (currentMonth === "12" || currentMonth === "01" || currentMonth === "02") {
    background.src = winterImg;
    search.classList.add("winter");
  } else if (
    currentMonth === "03" ||
    currentMonth === "04" ||
    currentMonth === "05"
  ) {
    background.src = springImg;
    search.classList.add("spring");
  } else if (
    currentMonth === "06" ||
    currentMonth === "07" ||
    currentMonth === "08"
  ) {
    background.src = summerImg;
    search.classList.add("summer");
  } else {
    background.src = fallImg;
    search.classList.add("fall");
  }
})();

const displayTitleDate = (() => {
  document.querySelector(".titleDate").innerHTML = today();
  document.querySelector(".day").innerHTML = now();
})();

const handleSubmit = (e) => {
  e.preventDefault();
  document.querySelector(".error").style.opacity = "0";
  const re = /^\d{5}$/;
  let zipcode = Number(document.getElementById("zipcode").value);
  if (re.exec(zipcode) === null) {
    document.querySelector(".error").style.opacity = "1";
  } else {
    getWeather(zipcode);
  }
};

let form = document.querySelector("form");
form.onsubmit = handleSubmit;

const getWeather = (zipcode) => {
  let url =
    "https://api.openweathermap.org/data/2.5/weather?zip=" +
    zipcode +
    ",US&appid=eb32541deec8ade96709809aebaaa013#";
  document.querySelector("#weather").style.opacity = "1";
  document.querySelector(".loading").innerHTML = "Loading . . .";
  fetch(url, { mode: "cors" })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);
      handleData(response);
    })
    .catch(function (err) {
      console.log(err);
      document.querySelector(".error").style.opacity = "1";
    });
};

function handleData(response) {
  let name = response.name;
  let tempKelvin = response.main.temp;
  let feelsLike = convertTemperature(response.main.feels_like);
  let description = response.weather[0].description;
  let temp = convertTemperature(tempKelvin);
  let main = response.weather[0].main;
  displayWeather(name, temp, feelsLike, description);
  displayIcon(main, description);
}

function convertTemperature(temp) {
  temp = Number(temp);
  let f = ((temp - 273.15) * 9) / 5 + 32;
  f = Math.round((f * 100) / 100);
  console.log(f);
  return f;
}

function displayWeather(name, temp, feelsLike, description) {
  document.querySelector("#weather").style.display = "grid";
  document.querySelector(".loading").innerHTML = "";
  document.querySelector(".cityName").innerHTML = name;
  document.querySelector(".temperature").innerHTML = temp + "°F";
  document.querySelector(".feelsLike").innerHTML =
    "Feels like " + feelsLike + "°F";
  document.querySelector(".description").innerHTML = description;
}

function displayIcon(main, description) {
  let icon = document.querySelector(".icon");
  if (main === "Clear") {
    icon.style.background = "url('./images/01d@2x.png')";
  } else if (main === "Snow") {
    icon.style.background = "url('./images/13d@2x.png')";
  } else if (main === "Clouds") {
    icon.style.background = "url('./images/04d@2x.png')";
  } else if (main === "Rain" && description === "freezing rain") {
    icon.style.background = "url('./images/13d@2x.png')";
  } else if (main === "Rain") {
    icon.style.background = "url('./images/10d@2x.png')";
  } else if (main === "Drizzle") {
    icon.style.background = "url('./images/10d@2x.png')";
  } else if (main === "Thunderstorm") {
    icon.style.background = "url('./images/11d@2x.png')";
  } else {
    icon.style.background = "url('./images/50d@2x.png')";
  }
}
