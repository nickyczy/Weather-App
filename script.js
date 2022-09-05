const time = document.querySelector(".time");
const city = document.querySelector(".city");
const cityTemp = document.querySelector(".weather-temp");
const pressureEl = document.querySelector(".pressure");
const wind = document.querySelector(".windspeed");
const humidityEl = document.querySelector(".humidity");
const descriptionEl = document.querySelector(".description");
const iconEl = document.querySelector(".icon");

const searchButton = document.querySelector(".search-button");
const searchInput = document.querySelector(".search-bar");

// var d = new Date();
// var n = d.toLocaleDateString();
// document.getElementById("date").innerText = n;

const weather = {
	apiKey: "6b0a723190d286693b72befbb0a7e3e8",

	fetchWeather: function (city) {
		fetch(
			"https://api.openweathermap.org/data/2.5/weather?q=" +
				city +
				"&units=metric&APPID=" +
				this.apiKey
		)
			.then((response) => response.json())
			.then((data) => this.displayWeather(data));
	},

	displayWeather: function (data) {
		const { name } = data;
		const { icon, description } = data.weather[0];

		const { temp, humidity, pressure } = data.main;
		const { speed } = data.wind;

		city.innerText = name;
		cityTemp.innerText = `${temp} °C`;
		descriptionEl.innerText = description;
		humidityEl.innerText = humidity + " %";
		wind.innerText = speed + " m/s";
		pressureEl.innerText = pressure + " hPa";
		iconEl.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

		document.querySelector(".current-info").classList.remove("loading");

		// document.body.style.backgroundImage =
		// 	"url('https://images.unsplash.com/1600x900/" + name + "')";
	},
	search: function () {
		this.fetchWeather(searchInput.value);
	},
};

searchButton.addEventListener("click", function () {
	weather.search();
});
searchInput.addEventListener("keyup", function (e) {
	if (e.key === "Enter") weather.search();
});

weather.fetchWeather("Melbourne ");
