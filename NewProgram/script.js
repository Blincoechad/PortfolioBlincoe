
    const apiKey = '50526b5ba68f28b81f4ceb3d903db602'; // replace with your API key
    const cityTest = 'Lakeland,US'; // test city
    const statusEl = document.getElementById('status');
    const cityInput = document.getElementById('cityInput');
    const button = document.getElementById('getWeatherBtn');
    const result = document.getElementById('weatherResult');

    // --- Check if API key works ---
    const checkKey = () => {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityTest}&appid=${apiKey}&units=imperial`)
        .then(res => res.json())
        .then(data => {
          if (data.cod == 200) {
            statusEl.textContent = '✅ API key works! Enter a city to get weather.';
            statusEl.className = 'ready';
            cityInput.disabled = false;
            button.disabled = false;
            clearInterval(intervalId);
          } else if (data.cod == 401) {
            statusEl.textContent = '⏳ API key not ready yet. Retrying in 10 seconds...';
            statusEl.className = 'waiting';
          } else {
            statusEl.textContent = `⚠️ Other response: ${data.message}`;
            statusEl.className = 'error';
          }
        })
        .catch(err => {
          statusEl.textContent = '❌ Network error';
          statusEl.className = 'error';
          console.error(err);
        });
    };

    const intervalId = setInterval(checkKey, 10000);
    checkKey();

    // --- Convert city, state input to API-ready format ---
    const formatCityInput = (input) => {
      input = input.trim();
      // Detect US state abbreviation at the end and replace with ,US
      if (input.match(/,[ ]?[A-Z]{2}$/i)) {
        input = input.replace(/,[ ]?[A-Z]{2}$/i, ',US');
      } else if (!input.includes(',')) {
        // No state or country, default to US
        input = input + ',US';
      }
      return input;
    };

    // --- Weather button functionality ---
    button.addEventListener('click', () => {
      const cityName = cityInput.value;
      if (!cityName) {
        result.textContent = 'Please enter a city name.';
        return;
      }

      const cityParam = formatCityInput(cityName);
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityParam)}&appid=${apiKey}&units=imperial`;

      fetch(url)
        .then(res => res.json())
        .then(data => {
          if (data.cod == 200) {
            result.textContent = `In ${data.name}, ${data.sys.country}, it’s ${data.main.temp}°F with ${data.weather[0].description}.`;
          } else {
            result.textContent = `City not found or error: ${data.message}`;
          }
        })
        .catch(() => {
          result.textContent = 'Error fetching weather data.';
        });
    });
    const date = new Date();
    document.getElementById('theDate').innerHTML = date.toDateString();
  
