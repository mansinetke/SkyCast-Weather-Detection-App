document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('weatherForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const city = document.getElementById('city').value;
        const weatherResult = document.getElementById('weatherResult');
        const errorMessage = document.getElementById('errorMessage');

        // Reset the result and error messages
        weatherResult.classList.add('hidden');
        errorMessage.classList.add('hidden');

        // Fetch weather data
        fetch('/weather', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                city: city
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                errorMessage.textContent = data.error;
                errorMessage.classList.remove('hidden');
            } else {
                // Update the weather result
                document.getElementById('cityName').textContent = `City: ${data.city}`;
                document.getElementById('countryName').textContent = `Country: ${data.country_name}`;
                document.getElementById('description').textContent = `Weather: ${data.description}`;
                document.getElementById('temperature').textContent = `Temperature: ${data.temperature}°C`;
                document.getElementById('feelsLike').textContent = `Feels Like: ${data.feels_like}°C`;
                document.getElementById('minTemp').textContent = `Min Temp: ${data.temp_min}°C`;
                document.getElementById('maxTemp').textContent = `Max Temp: ${data.temp_max}°C`;
                document.getElementById('humidity').textContent = `Humidity: ${data.humidity}%`;
                document.getElementById('pressure').textContent = `Pressure: ${data.pressure} hPa`;
                document.getElementById('windSpeed').textContent = `Wind Speed: ${data.wind_speed} m/s`;
                document.getElementById('weatherIcon').src = `http://openweathermap.org/img/wn/${data.icon}.png`;

                // Show the weather result section
                weatherResult.classList.remove('hidden');
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            errorMessage.textContent = 'An error occurred while fetching weather data.';
            errorMessage.classList.remove('hidden');
        });
    });
});
