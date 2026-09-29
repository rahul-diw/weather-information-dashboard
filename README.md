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

# Current Weather
<img width="1920" height="1080" alt="{FCCB9CAE-D179-4AC3-BDFF-5E0729A4BBEE}" src="https://github.com/user-attachments/assets/8d2b3bdc-38be-48ae-871e-9ccd81ad64d8" />

# 5-Day Forecast
<img width="1920" height="1080" alt="{60427DF1-CE52-46EF-87CC-0DFCA358B5B3}" src="https://github.com/user-attachments/assets/476feb4c-56f9-41b1-a10b-9d24eb96b285" />

# Dynamic Weather Environment
<img width="1920" height="1080" alt="{1215E303-C1DB-421C-AF39-A241D73607AA}" src="https://github.com/user-attachments/assets/004b3a1f-75dc-4e6e-8702-4fe60ed512bd" />

# Current Location
<img width="1920" height="1080" alt="{8B370B90-A259-468E-8C3E-1D4410F4B6C5}" src="https://github.com/user-attachments/assets/18623fa2-3b7b-4224-8b08-589f37828a00" />

# Mobile Responsive View 
<img width="375" height="812" alt="{7F92E413-2E45-4797-9D8B-DD8212E54F36}" src="https://github.com/user-attachments/assets/60b4cd8c-10a7-4ad3-9591-8660635f3bbb" />

## API Endpoints
# Current Weather

GET /api/weather?city={city}

Example:

/api/weather?city=Delhi

The endpoint also supports coordinates:

/api/weather?lat={latitude}&lon={longitude}

# 5-Day Forecast

GET /api/forecast?city={city}

Coordinate-based requests are also supported:

/api/forecast?lat={latitude}&lon={longitude}

## Application Flow
- User searches for a city or selects Current Location.
- Frontend sends the request to the Express backend.
- Backend communicates with OpenWeather API.
- Weather data is returned to the frontend.
- Dashboard displays the current weather information.
- Forecast data is displayed in the 5-Day Forecast section.
- Weather conditions control the dynamic visual environment.
- Searched cities are stored locally for quick access.

## Project Objective

The goal of this project was to build a responsive weather dashboard that combines real-time API data with a modern user interface and dynamic weather-based visual effects.

The project also demonstrates frontend API integration, backend API handling, environment-variable security, browser geolocation, LocalStorage, responsive design and deployment.

## Future Enhancements

Possible future improvements include:

- Weather alerts and notifications
- Extended forecast
- Temperature unit switching
- More detailed weather statistics
- Air quality information
- Sunrise and sunset information
- Improved accessibility
- Progressive Web App support


## Author

Rahul Diw

GitHub:
https://github.com/rahul-diw


### ⚠️ Ek cheez abhi mat karo

README mein screenshot filenames maine **assume karke structure diya hai**:

```text
dashboard.png
weather-details.png
forecast.png
weather-effects.png
current-location.png
mobile.png


