#  Weather Information Dashboard

A responsive and modern Weather Information Dashboard that provides real-time weather information for cities around the world.

The application uses the OpenWeather API through a Node.js and Express backend and provides a cinematic weather experience with dynamic environmental effects based on current weather conditions.

## Live Demo

**Frontend:**  
https://weather-information-dashboard-1.onrender.com

**Backend:**  
https://weather-information-dashboard-c3ga.onrender.com

---

##  Features

###  Weather Search
- Search for weather information by city name.
- Displays real-time weather data.
- Handles invalid city searches and API errors.

###  Current Location
- Uses browser geolocation to detect the user's current coordinates.
- Fetches current weather using latitude and longitude.
- Displays the corresponding weather forecast.

###  Current Weather
Displays:

- Temperature
- Weather condition
- Weather icon
- Humidity
- Wind speed
- Location information

###  5-Day Forecast
- Displays upcoming weather conditions.
- Shows temperature and weather condition for each day.
- Works with both city search and current-location weather.

###  Recent Searches
- Stores recently searched cities using LocalStorage.
- Prevents duplicate entries.
- Keeps the latest searches.
- Allows users to quickly search a previously searched city.
- Includes a Clear History option.

###  Dynamic Weather Environment

The dashboard changes its visual environment according to the current weather.

Supported conditions include:

-  Clear weather
-  Cloudy weather
-  Rain
-  Thunderstorm
-  Snow
-  Mist / Fog / Haze
-  Night environment

The interface includes animated environmental effects such as:

- Rain
- Clouds
- Fog
- Lightning
- Moon
- Stars
- Day/night atmosphere
- Dynamic weather backgrounds

###  Responsive Design

The dashboard is designed to work across:

- Desktop
- Tablet
- Mobile devices

---

##  Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript
- LocalStorage
- Browser Geolocation API

### Backend
- Node.js
- Express.js
- CORS
- dotenv

### API
- OpenWeather API

### Deployment
- GitHub
- Render

---

##  Project Architecture

```text
User
  │
  ▼
Frontend
HTML + CSS + JavaScript
  │
  ▼
Node.js + Express Backend
  │
  ▼
OpenWeather API
  │
  ▼
Weather Data
  │
  ▼
Dynamic Dashboard
