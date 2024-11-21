// Selecting HTML elements
const searchButton = document.getElementById("searchButton");
const cityInput = document.getElementById("cityInput");
const weatherOutput = document.getElementById("weatherOutput");
let isCelsius = true; // Track if the temperature is in Celsius or Fahrenheit

// Adding an event listener to the search button
searchButton.addEventListener("click", () => {
    const city = cityInput.value.trim(); // Get the city name from input
    if (city) {
        fetchWeather(city); // Call the function to fetch weather data
    } else {
        weatherOutput.textContent = "Please enter a city name.";
    }
});

// Function to fetch weather data from OpenWeatherMap API
async function fetchWeather(city) {
    const apiKey = "262464baa56ace00c2ed62da282e50fc"; // Replace with your API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; // Units in metric for Celsius

    try {
        const response = await fetch(url); // Fetching data from the API
        if (!response.ok) {
            throw new Error("City not found"); // Handle errors for invalid city names
        }
        const data = await response.json(); // Convert the response to JSON
        displayWeather(data); // Display the weather data
    } catch (error) {
        console.error(error); // Log error to the console
        weatherOutput.textContent = error.message; // Display error message
    }
}

// Function to display weather data on the page
function displayWeather(data) {
    const { name, main, weather } = data;
    let temp = main.temp; // Use let so temp can be updated
    const description = weather[0].description;
    const icon = weather[0].icon;

    // Icon URL for weather
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    // Render HTML
    weatherOutput.innerHTML = `
        <h2>${name}</h2>
        <img src="${iconUrl}" alt="${description}" />
        <p id="temp">Temperature: ${temp}°C</p>
        <p>Condition: ${description}</p>
        <button id="toggleTemp">Switch to Fahrenheit</button>
    `;

    // Add toggle functionality
    const toggleButton = document.getElementById("toggleTemp");
    toggleButton.addEventListener("click", () => {
        if (isCelsius) {
            temp = (temp * 9) / 5 + 32; // Convert to Fahrenheit
            toggleButton.textContent = "Switch to Celsius";
            document.getElementById("temp").textContent = `Temperature: ${temp.toFixed(2)}°F`;
        } else {
            temp = main.temp; // Back to Celsius
            toggleButton.textContent = "Switch to Fahrenheit";
            document.getElementById("temp").textContent = `Temperature: ${temp}°C`;
        }
        isCelsius = !isCelsius; // Flip the state
    });
}
