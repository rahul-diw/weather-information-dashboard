// ========================================
// WEATHER DASHBOARD - JAVASCRIPT
// ========================================

// ========================================
// OPENWEATHER API
// ========================================

// IMPORTANT:
// Put your NEW OpenWeather API key here.
// Do not upload your API key to GitHub.

// ========================================
// BACKEND API
// ========================================

const API_URL = "http://localhost:5000/api/weather";
const FORECAST_API_URL = "http://localhost:5000/api/forecast";
// ========================================
// GET HTML ELEMENTS
// ========================================

const weatherForm = document.getElementById("searchForm");

const cityInput = document.getElementById("cityInput");

const locationBtn = document.getElementById("locationBtn");

const searchButton = document.getElementById("searchButton");

const weatherSection = document.getElementById("weatherSection");

const loadingMessage = document.getElementById("loading");

const errorMessage = document.getElementById("error");

const errorText = document.getElementById("errorMessage");

const cityName = document.getElementById("cityName");

const countryName = document.getElementById("countryName");

const weatherIcon = document.getElementById("weatherIcon");

const temperature = document.getElementById("temperature");

const weatherCondition = document.getElementById("weatherCondition");

const humidity = document.getElementById("humidity");

const windSpeed = document.getElementById("windSpeed");

const forecastSection = document.getElementById("forecastSection");

const forecastContainer = document.getElementById("forecastContainer");

const recentSearches = document.getElementById("recentSearches");

const recentSearchList = document.getElementById("recentSearchList");

// ========================================
// CHECK REQUIRED ELEMENTS
// ========================================

if (!weatherForm) {
  console.error("Search form not found. Check #searchForm in index.html");
}

// ========================================
// SEARCH WEATHER
// ========================================

weatherForm.addEventListener("submit", function (event) {
  // Prevent page refresh

  event.preventDefault();

  // Get city name

  const city = cityInput.value.trim();

  // Check empty input

  if (city === "") {
    showError("Please enter a city name.");

    return;
  }

  // Fetch weather data

  getWeather(city);
});

// ========================================
// CURRENT LOCATION WEATHER
// ========================================

locationBtn.addEventListener("click", function () {
  // Check browser support
  if (!navigator.geolocation) {
    showError("Geolocation is not supported by your browser.");
    return;
  }

  // Show loading state
  showLoading();

  navigator.geolocation.getCurrentPosition(
    function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      getWeatherByLocation(latitude, longitude);
    },

    function (error) {
      console.error("Location Error:", error);

      hideLoading();

      if (error.code === error.PERMISSION_DENIED) {
        showError(
          "Location permission was denied. Please allow location access.",
        );
      } else if (error.code === error.POSITION_UNAVAILABLE) {
        showError("Your location could not be determined.");
      } else if (error.code === error.TIMEOUT) {
        showError("Location request timed out. Please try again.");
      } else {
        showError("Unable to get your current location.");
      }
    },
  );
});

// ========================================
// GET WEATHER BY COORDINATES
// ========================================

async function getWeatherByLocation(latitude, longitude) {
  try {
const response = await fetch(
    `${API_URL}?lat=${latitude}&lon=${longitude}`
);

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Invalid API key or the API key is not active yet.");
      }

      throw new Error("Unable to fetch weather for your location.");
    }

    const data = await response.json();

    displayWeather(data);
  } catch (error) {
    console.error("Location Weather Error:", error);

    showError(error.message);
  } finally {
    hideLoading();
  }
}

// ========================================
// GET FORECAST BY CURRENT LOCATION
// ========================================

async function getForecastByLocation(latitude, longitude) {
  try {
const response = await fetch(
    `${FORECAST_API_URL}?lat=${latitude}&lon=${longitude}`
);

    if (!response.ok) {
      throw new Error("Unable to fetch forecast information.");
    }

    const data = await response.json();

    displayForecast(data);
  } catch (error) {
    console.error("Location Forecast API Error:", error);

    // Forecast is optional.
    // Current weather should still remain visible.
    forecastSection.classList.add("hidden");
  }
}

// ========================================
// GET WEATHER FROM API
// ========================================

async function getWeather(city) {
  try {
    // Show loading state

    showLoading();

    // Create API request

const response = await fetch(
    `${API_URL}?city=${encodeURIComponent(city)}`
);

    // Check API response

    if (!response.ok) {
      // City not found

      if (response.status === 404) {
        throw new Error("City not found. Please enter a valid city name.");
      }

      // Invalid API key

      if (response.status === 401) {
        throw new Error("Invalid API key or the API key is not active yet.");
      }

      // Other API errors

      throw new Error("Unable to fetch weather information. Please try again.");
    }

    // Convert response to JSON

    const data = await response.json();

    displayWeather(data);

    // Fetch 5-day forecast
    await getForecast(city);

    // Save city in recent searches
    saveRecentSearch(data.name);

    // Update recent searches UI
    displayRecentSearches();
  } catch (error) {
    console.error("Weather API Error:", error);

    showError(error.message);
  } finally {
    // Hide loading message

    hideLoading();
  }
}

// ========================================
// DISPLAY WEATHER DATA
// ========================================

function displayWeather(data) {
  // ========================================
  // CITY
  // ========================================

  cityName.textContent = data.name;

  // ========================================
  // COUNTRY
  // ========================================

  countryName.textContent = data.sys.country;

  // ========================================
  // TEMPERATURE
  // ========================================

  temperature.textContent = `${Math.round(data.main.temp)}°C`;

  // ========================================
  // WEATHER CONDITION
  // ========================================

  weatherCondition.textContent = data.weather[0].description;

  // ========================================
  // HUMIDITY
  // ========================================

  humidity.textContent = `${data.main.humidity}%`;

  // ========================================
  // WIND SPEED
  // ========================================

  // OpenWeather gives wind speed in m/s.
  // Convert m/s to km/h.

  const windInKmh = Math.round(data.wind.speed * 3.6);

  windSpeed.textContent = `${windInKmh} km/h`;

  // ========================================
  // WEATHER ICON
  // ========================================

  const iconCode = data.weather[0].icon;

  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  weatherIcon.src = iconUrl;

  weatherIcon.alt = data.weather[0].description;

  // Make icon visible

  weatherIcon.style.display = "block";


  setWeatherEffect(
    data.weather[0].main,
    data.weather[0].icon
);

  // ========================================
  // SHOW WEATHER SECTION
  // ========================================

  weatherSection.classList.remove("hidden");

  // Hide error message

  errorMessage.classList.add("hidden");
  
}

// ========================================
// LOADING STATE
// ========================================

function showLoading() {
  loadingMessage.classList.remove("hidden");

  weatherSection.classList.add("hidden");

  errorMessage.classList.add("hidden");

  // Change button text

  searchButton.innerHTML = "Loading...";

  searchButton.disabled = true;
}

// ========================================
// HIDE LOADING
// ========================================

function hideLoading() {
  loadingMessage.classList.add("hidden");

  // Restore button

  searchButton.innerHTML = "Search <span>→</span>";

  searchButton.disabled = false;
}

// ========================================
// ERROR HANDLING
// ========================================

function showError(message) {
  errorText.textContent = message;

  errorMessage.classList.remove("hidden");

  weatherSection.classList.add("hidden");

  loadingMessage.classList.add("hidden");
}

// ========================================
// INITIAL STATE
// ========================================

// Keep weather card hidden
// until a city is searched.

weatherSection.classList.add("hidden");

errorMessage.classList.add("hidden");

loadingMessage.classList.add("hidden");

// ========================================
// GET 5-DAY FORECAST
// ========================================

async function getForecast(city) {
  try {
 const response = await fetch(
    `${FORECAST_API_URL}?city=${encodeURIComponent(city)}`
);

    if (!response.ok) {
      throw new Error("Unable to fetch forecast information.");
    }

    const data = await response.json();

    displayForecast(data);
  } catch (error) {
    console.error("Forecast API Error:", error);

    // Forecast is a bonus feature.
    // We don't want it to break current weather.

    forecastSection.classList.add("hidden");
  }
}

// ========================================
// DISPLAY 5-DAY FORECAST
// ========================================

function displayForecast(data) {
  // Clear previous forecast

  forecastContainer.innerHTML = "";

  // OpenWeather returns data every 3 hours.
  // We select one reading approximately
  // every 24 hours.

  const dailyForecast = data.list.filter((item) =>
    item.dt_txt.includes("12:00:00"),
  );

  // Create forecast cards

  dailyForecast.slice(0, 5).forEach((item) => {
    const date = new Date(item.dt * 1000);

    const day = date.toLocaleDateString("en-US", {
      weekday: "short",
    });

    const temperature = Math.round(item.main.temp);

    const condition = item.weather[0].description;

    const icon = item.weather[0].icon;

    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    // Create card

    const forecastCard = document.createElement("div");

    forecastCard.className = "forecast-card";

    forecastCard.innerHTML = `

                <span class="forecast-day">
                    ${day}
                </span>

                <img
                    src="${iconUrl}"
                    alt="${condition}"
                    class="forecast-icon"
                >

                <strong class="forecast-temperature">
                    ${temperature}°C
                </strong>

                <span class="forecast-condition">
                    ${condition}
                </span>

            `;

    forecastContainer.appendChild(forecastCard);
  });

  // Show forecast

  if (forecastContainer.children.length > 0) {
    forecastSection.classList.remove("hidden");
  }
}

// ========================================
// RECENT SEARCHES
// ========================================

const MAX_RECENT_SEARCHES = 5;

// ========================================
// SAVE RECENT SEARCH
// ========================================

function saveRecentSearch(city) {
  // Get existing searches
  let searches = JSON.parse(localStorage.getItem("recentSearches")) || [];

  // Remove duplicate city
  searches = searches.filter(
    (item) => item.toLowerCase() !== city.toLowerCase(),
  );

  // Add latest city at the beginning
  searches.unshift(city);

  // Keep only latest 5 searches
  searches = searches.slice(0, MAX_RECENT_SEARCHES);

  // Save to browser storage
  localStorage.setItem("recentSearches", JSON.stringify(searches));
}

// ========================================
// DISPLAY RECENT SEARCHES
// ========================================

function displayRecentSearches() {
  // Get saved searches
  const searches = JSON.parse(localStorage.getItem("recentSearches")) || [];

  // Clear old list
  recentSearchList.innerHTML = "";

  // If no searches exist
  if (searches.length === 0) {
    recentSearches.classList.add("hidden");

    return;
  }

  // Show recent searches section
  recentSearches.classList.remove("hidden");

  addClearHistoryButton();

  // Create search items
  searches.forEach(function (city) {
    const searchItem = document.createElement("button");

    searchItem.className = "recent-search-item";

    searchItem.type = "button";

    searchItem.innerHTML = `
    <span class="recent-city-name">${city}</span>
    <span class="recent-arrow">→</span>
`;

    // Search city when clicked
    searchItem.addEventListener("click", function () {
      cityInput.value = city;

      getWeather(city);
    });

    // Add item to list
    recentSearchList.appendChild(searchItem);
  });
}

// ========================================
// CLEAR RECENT SEARCHES
// ========================================

function clearRecentSearches() {
  localStorage.removeItem("recentSearches");

  displayRecentSearches();
}

// ========================================
// CLEAR HISTORY BUTTON
// ========================================

function addClearHistoryButton() {
  const sectionHeading = recentSearches.querySelector(".section-heading");

  // Prevent duplicate button
  if (!sectionHeading || sectionHeading.querySelector(".clear-history-btn")) {
    return;
  }

  const clearButton = document.createElement("button");

  clearButton.type = "button";
  clearButton.className = "clear-history-btn";
  clearButton.textContent = "Clear History";

  clearButton.addEventListener("click", function () {
    clearRecentSearches();
  });

  sectionHeading.appendChild(clearButton);
}

// ========================================
// LOAD RECENT SEARCHES
// ========================================

// Display saved searches when page loads
displayRecentSearches();


/* =====================================================
   REALISTIC WEATHER ENGINE
===================================================== */

const weatherCanvas =
    document.getElementById("weatherCanvas");

const weatherContext =
    weatherCanvas?.getContext("2d");

let weatherParticles = [];

let weatherAnimationFrame;

let currentWeather =
    "clear";


/* =====================================================
   RESIZE CANVAS
===================================================== */

function resizeWeatherCanvas() {

    if (!weatherCanvas) {
        return;
    }

    const dpr =
        Math.min(window.devicePixelRatio || 1, 2);

    weatherCanvas.width =
        window.innerWidth * dpr;

    weatherCanvas.height =
        window.innerHeight * dpr;

    weatherCanvas.style.width =
        `${window.innerWidth}px`;

    weatherCanvas.style.height =
        `${window.innerHeight}px`;

    weatherContext.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );
}


window.addEventListener(
    "resize",
    resizeWeatherCanvas
);


resizeWeatherCanvas();


/* =====================================================
   WEATHER EFFECT CONTROLLER
===================================================== */

function setWeatherEffect(
    condition,
    iconCode
    
) {

        console.log(
    "WEATHER EFFECT:",
    condition,
    iconCode
);

    const body =
        document.body;

    const effects =
        document.getElementById(
            "weatherEffects"
        );


    if (!effects) {
        return;
    }


    /* Remove old states */

    body.classList.remove(
        "weather-active",
        "weather-clear",
        "weather-clouds",
        "weather-rain",
        "weather-thunderstorm",
        "weather-mist",
        "weather-snow",
        "weather-night"
    );


    weatherParticles = [];


    currentWeather =
        condition.toLowerCase();


    body.classList.add(
        "weather-active"
    );

    // Detect day/night for all weather conditions
if (iconCode && iconCode.endsWith("n")) {
    document.body.classList.add("weather-night");
}


    /* =================================================
       CLEAR
    ================================================= */

    if (currentWeather === "clear") {

        if (
            iconCode &&
            iconCode.endsWith("n")
        ) {

            body.classList.add(
                "weather-night"
            );

        } else {

            body.classList.add(
                "weather-clear"
            );
        }

        startWeatherAnimation();

        return;
    }


    /* =================================================
       CLOUDS
    ================================================= */

    if (currentWeather === "clouds") {

        body.classList.add(
            "weather-clouds"
        );

        startWeatherAnimation();

        return;
    }


    /* =================================================
       RAIN
    ================================================= */

    if (
        currentWeather === "rain" ||
        currentWeather === "drizzle"
    ) {

        body.classList.add(
            "weather-rain"
        );

        createRainParticles();

        startWeatherAnimation();

        return;
    }


    /* =================================================
       THUNDERSTORM
    ================================================= */

    if (
        currentWeather ===
        "thunderstorm"
    ) {

        body.classList.add(
            "weather-thunderstorm"
        );

        createRainParticles(
            true
        );

        startWeatherAnimation();

        return;
    }


    /* =================================================
       SNOW
    ================================================= */

    if (
        currentWeather === "snow"
    ) {

        body.classList.add(
            "weather-snow"
        );

        createSnowParticles();

        startWeatherAnimation();

        return;
    }


    /* =================================================
       MIST / FOG / HAZE
    ================================================= */

    if (
        currentWeather === "mist" ||
        currentWeather === "fog" ||
        currentWeather === "haze" ||
        currentWeather === "smoke"
    ) {

        body.classList.add(
            "weather-mist"
        );

        startWeatherAnimation();

        return;
    }


    /* Fallback */

    body.classList.add(
        "weather-clouds"
    );

    startWeatherAnimation();
}

/* =====================================================
   CREATE REALISTIC RAIN
===================================================== */

function createRainParticles(
    heavyRain = false
) {

    weatherParticles = [];


    const particleCount =
        heavyRain
            ? 550
            : 320;


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        weatherParticles.push({

            x:
                Math.random() *
                window.innerWidth,

            y:
                Math.random() *
                window.innerHeight,

            length:
                heavyRain
                    ? 18 + Math.random() * 32
                    : 12 + Math.random() * 25,

            speed:
                heavyRain
                    ? 15 + Math.random() * 15
                    : 9 + Math.random() * 11,

            opacity:
                0.12 +
                Math.random() * 0.35,

            width:
                Math.random() > 0.8
                    ? 1.4
                    : 0.8,

            drift:
                heavyRain
                    ? 3 + Math.random() * 3
                    : 1.5 + Math.random() * 2
        });
    }
}

/* =====================================================
   CREATE REALISTIC SNOW
===================================================== */

function createSnowParticles() {

    weatherParticles = [];


    const particleCount = 180;


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        weatherParticles.push({

            x:
                Math.random() *
                window.innerWidth,

            y:
                Math.random() *
                window.innerHeight,

            radius:
                1 +
                Math.random() * 3,

            speed:
                0.6 +
                Math.random() * 1.5,

            drift:
                0.5 +
                Math.random() * 1.2,

            phase:
                Math.random() *
                Math.PI * 2,

            opacity:
                0.35 +
                Math.random() * 0.55
        });
    }
}

/* =====================================================
   WEATHER ANIMATION LOOP
===================================================== */

function startWeatherAnimation() {

    cancelAnimationFrame(
        weatherAnimationFrame
    );


    function animate() {

        if (
            !weatherContext ||
            !weatherCanvas
        ) {
            return;
        }


        weatherContext.clearRect(
            0,
            0,
            window.innerWidth,
            window.innerHeight
        );


        if (
            currentWeather === "rain" ||
            currentWeather === "drizzle" ||
            currentWeather === "thunderstorm"
        ) {

            drawRain();

        }


        if (
            currentWeather === "snow"
        ) {

            drawSnow();

        }


        weatherAnimationFrame =
            requestAnimationFrame(
                animate
            );
    }


    animate();
}

/* =====================================================
   DRAW RAIN
===================================================== */

function drawRain() {

    weatherContext.lineCap =
        "round";


    weatherParticles.forEach(
        (drop) => {

            weatherContext.beginPath();


            weatherContext.moveTo(
                drop.x,
                drop.y
            );


            weatherContext.lineTo(
                drop.x +
                    drop.drift,
                drop.y +
                    drop.length
            );


            weatherContext.strokeStyle =
                `rgba(
                    185,
                    215,
                    235,
                    ${drop.opacity}
                )`;


            weatherContext.lineWidth =
                drop.width;


            weatherContext.stroke();


            drop.x +=
                drop.drift;

            drop.y +=
                drop.speed;


            /* Reset after leaving screen */

            if (
                drop.y >
                window.innerHeight + 100
            ) {

                drop.y =
                    -100;

                drop.x =
                    Math.random() *
                    window.innerWidth;
            }


            if (
                drop.x >
                window.innerWidth + 100
            ) {

                drop.x =
                    -50;
            }
        }
    );
}

/* =====================================================
   DRAW RAIN
===================================================== */

function drawRain() {

    weatherContext.lineCap =
        "round";


    weatherParticles.forEach(
        (drop) => {

            weatherContext.beginPath();


            weatherContext.moveTo(
                drop.x,
                drop.y
            );


            weatherContext.lineTo(
                drop.x +
                    drop.drift,
                drop.y +
                    drop.length
            );


            weatherContext.strokeStyle =
                `rgba(
                    185,
                    215,
                    235,
                    ${drop.opacity}
                )`;


            weatherContext.lineWidth =
                drop.width;


            weatherContext.stroke();


            drop.x +=
                drop.drift;

            drop.y +=
                drop.speed;


            /* Reset after leaving screen */

            if (
                drop.y >
                window.innerHeight + 100
            ) {

                drop.y =
                    -100;

                drop.x =
                    Math.random() *
                    window.innerWidth;
            }


            if (
                drop.x >
                window.innerWidth + 100
            ) {

                drop.x =
                    -50;
            }
        }
    );
}