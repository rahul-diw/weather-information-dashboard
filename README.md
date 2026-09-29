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
```
## Security

The OpenWeather API key is stored as an environment variable on the backend.

The API key is not included in the frontend JavaScript code.

Environment configuration is managed using:

.env

Sensitive environment files and dependencies are excluded from Git using:

.gitignore

A sample environment configuration is provided through:

.env.example

## Project Structure
weather-information-dashboard/
│
├── assets/
│   └── icons/
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
├── screenshots/
│
├── server/
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── .env.example
├── .gitignore
├── index.html
└── README.md

## Local Setup
1. Clone the repository
git clone https://github.com/rahul-diw/weather-information-dashboard.git

2. Navigate into the project
cd weather-information-dashboard

3. Install backend dependencies
cd server
npm install

## Configure environment variables

Create a .env file in the project root:

OPENWEATHER_API_KEY=your_api_key_here

## Start the backend
node server.js

The backend will run locally on:

http://localhost:5000

## Run the frontend

Open index.html using a local development server such as VS Code Live Server.

## Screenshots
# Main Dashboard
<img width="1920" height="1080" alt="{FFDD37C2-A566-4B14-B219-06171E505C64}" src="https://github.com/user-attachments/assets/a09e7648-0ea8-4e1a-982d-49203ad01ede" />

