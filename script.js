const api = {
    key: "a26981702fe5da2ed4fb95c43d48cb55",
    base: "https://api.openweathermap.org/data/2.5/"
}


const search = document.querySelector(".search");
const btn = document.querySelector(".btn");
btn.addEventListener("click", getInput);

function getInput (event) {
    event.preventDefault();
    if (event.type == "click") {
        getData(search.value);
        console.log(search.value);
    }
}

function getData () {
    fetch(`${api.base}weather?q=${search.value}&units=metric&appid=${api.key}`)
        .then(response => {
            return response.json();
        }).then(displayData);
        
}

function displayData (response) {
    if (response.cod === "404") {
        const error = document.querySelector(".error");
        error.textContent = "Please enter a valid city";
        search.value = "";
     

    } else {
        console.log(response);
        const error = document.querySelector(".error");
        error.textContent = "";
        const city = document.querySelector(".city");
        city.innerText = `${response.name}, ${response.sys.country}`;

        const today = new Date();
        const date = document.querySelector(".date");
        date.innerText = dateFunction(today);

        const temp = document.querySelector(".temp");
        temp.innerHTML = ` ${Math.round(response.main.temp)} <sup>°C</sup>`;

        const weather = document.querySelector(".weather");
        const weather_text = response.weather[0].main;
        weather.innerText = `Weather: ${response.weather[0].main}`;

        const tempRange = document.querySelector(".temp-range");
        tempRange.innerText = `Temp Range: ${Math.round(response.main.temp_min)}°C / ${Math.round(response.main.temp_max)}°C`;

        
        const humidity = document.querySelector(".humidity");
        humidity.innerHTML = `Humidity: ${response.main.humidity}%`;

        const weatherIcon = document.querySelector(".weather-icon");
        const iconURL = "http://openweathermap.org/img/w/";
        weatherIcon.src = iconURL + response.weather[0].icon + ".png";

        search.value = "";

        main_container = document.querySelector(".main-container");
        console.log(weather_text)

    if(weather_text == 'Clear') {
        main_container.style.backgroundImage = "url(images/clear.gif)";
        
    } else if(weather_text == 'Haze') {
        main_container.style.backgroundImage = "url(images/haze.gif)";
       


    } else if(weather_text == 'Clouds') { 
        main_container.style.backgroundImage = "url(images/cloudy.gif)";
        
    } else if(weather_text == 'Sunny') {

        main_container.style.backgroundImage = "url(images/clear.gif)";
        
    }     else if(weather_text == 'Rain') {
        
        main_container.style.backgroundImage = "url(images/rain3.gif)";
        
    } else if(weather_text == 'Snow') {
        
        main_container.style.backgroundImage = "url(images/snow.gif)";
    
    } else if(weather_text == 'Thunderstorm') {
    
        main_container.style.backgroundImage = "url('mages/thunderstorm.gif)";
        
    } 

    }
}

function dateFunction (d) {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
}


