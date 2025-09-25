async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const apiKey = '2c1bd4c786eb45d6a6d111510251403';
    const weatherResult = document.getElementById('weatherResult');

    if (!city) {
        weatherResult.innerHTML = "Please enter a city name.";
        return;
    }

    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.error) {
            weatherResult.innerHTML = `Error: ${data.error.message}`;
        } else {
            const { temp_c, condition } = data.current;
            weatherResult.innerHTML = `
                <h2>${data.location.name}, ${data.location.country}</h2>
                <p>Temperature: ${temp_c}°C</p>
                <p>Condition: ${condition.text}</p>
                <img src="${condition.icon}" alt="${condition.text}">
            `;
        }
    } catch (error) {
        weatherResult.innerHTML = "Error fetching weather data. Please try again.";
    }
}
