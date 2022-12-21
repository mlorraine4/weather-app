
import "./styles.css";
import winterImg from "./images/winter.jpg";
import summerImg from "./images/summer.jpg";
import fallImg from "./images/fall.jpg";
import springImg from "./images/spring.jpg";
import format from "date-fns/format";

function today() {
    let today = format(new Date(),'MMMM d, yyyy');
    return today
};

function now() {
    let day = format(new Date(),'eeee');
    return day
};

const getSeason = (() => {
    let background = document.querySelector(".background");
    let search = document.querySelector('#submit');
    if ( format(new Date(), "MM") === "January"||"December"||"February" ) {
        background.src = winterImg;
        search.classList.add("winter");
        credit("winter");
    } else if ( format(new Date(), "MM") === "March"||"April"||"May" ) {
        background.src = springImg;
        search.classList.add("spring");
        credit("spring");
    } else if ( format(new Date(), "MM") === "June"||"July"||"August" ) {
        background.src = summerImg;
        search.classList.add("summer");
        credit("summer");
    } else { 
        background.src = fallImg;
        search.classList.add("fall");
        credit("fall");
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
    let zipcode = Number(document.getElementById('zipcode').value);
    if (re.exec(zipcode) === null) {
        document.querySelector(".error").style.opacity = "1";
    } else {
        getWeather(zipcode);
    }
};

let form = document.querySelector('form');
form.onsubmit = handleSubmit;

const getWeather = (zipcode) => {
    let url = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipcode + ",US&appid=eb32541deec8ade96709809aebaaa013#"
    document.querySelector("#weather").style.opacity = "1";
    document.querySelector(".loading").innerHTML = "Loading . . ."
    fetch(url, {mode: 'cors'})
    .then(function(response) {
        return response.json()
    })
    .then(function(response) {
        console.log(response)
        handleData(response)
    })
    .catch(function(err) {
        console.log(err);
        document.querySelector(".error").style.opacity = "1";

    })
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
};

function convertTemperature(temp) {
    temp = Number(temp);
    let f = (temp - 273.15) * 9/5 + 32;
    f = Math.round(f * 100/100);
    console.log(f);
    return f
};

function displayWeather(name, temp, feelsLike, description) {
    document.querySelector("#weather").style.display = "grid";
    document.querySelector(".loading").innerHTML = "";
    document.querySelector(".cityName").innerHTML = name;
    document.querySelector(".temperature").innerHTML = temp + "°F";
    document.querySelector(".feelsLike").innerHTML = "Feels like " + feelsLike + "°F";
    document.querySelector(".description").innerHTML = description;
};

function displayIcon(main, description) {
    let icon = document.querySelector(".icon");
    if (main === "Clear") {icon.style.background = "url('./images/01d@2x.png')"}
    else if (main === "Snow") {icon.style.background = "url('./images/13d@2x.png')"}
    else if (main === "Clouds") {icon.style.background = "url('./images/04d@2x.png')"}
    else if (main === "Rain" && description === "freezing rain") {icon.style.background = "url('./images/13d@2x.png')"}
    else if (main === "Rain") {icon.style.background = "url('./images/10d@2x.png')"}
    else if (main === "Drizzle") {icon.style.background = "url('./images/10d@2x.png')"}
    else if (main === "Thunderstorm") {icon.style.background = "url('./images/11d@2x.png')"}
    else {icon.style.background = "url('./images/50d@2x.png')"};
};

function credit(season) {
    let creditDiv = document.querySelector(".credit")
    if (season === "winter") {creditDiv.innerHTML = 'snow Photo by <a href="https://unsplash.com/@sametomorrow?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Adam Chang</a> on <a href="https://unsplash.com/s/photos/snowing?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>'}
    if (season === "fall") { creditDiv.innerHTML = 'fall Photo by <a href="https://unsplash.com/@rgaleriacom?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Ricardo Gomez Angel</a> on <a href="https://unsplash.com/s/photos/fall?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>'}
    if (season === "summer") {creditDiv.innerHTML = 'summer Photo by <a href="https://unsplash.com/@notevilbird?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Aleksandr Eremin</a> on <a href="https://unsplash.com/s/photos/summer?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>'}
    if (season === "spring") {creditDiv.innerHTML = 'cherry blossom Photo by <a href="https://unsplash.com/fr/@_entreprenerd?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Arno Smit</a> on <a href="https://unsplash.com/s/photos/spring?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>'}
}




