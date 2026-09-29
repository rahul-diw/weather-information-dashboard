const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: "../.env" });

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/api/weather", async (req, res) => {
    try {
        const { city, lat, lon } = req.query;

        let query = "";

        // City search
        if (city) {
            query = `q=${encodeURIComponent(city)}`;
        }

        // Current location
        else if (lat && lon) {
            query =
                `lat=${encodeURIComponent(lat)}` +
                `&lon=${encodeURIComponent(lon)}`;
        }

        // Nothing provided
        else {
            return res.status(400).json({
                message: "City or coordinates are required"
            });
        }

        const url =
            `https://api.openweathermap.org/data/2.5/weather` +
            `?${query}` +
            `&appid=${process.env.OPENWEATHER_API_KEY}` +
            `&units=metric`;

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        res.json(data);

    } catch (error) {
        console.error("Weather API Error:", error);

        res.status(500).json({
            message: "Unable to fetch weather data"
        });
    }
});

app.get("/api/forecast", async (req, res) => {
    try {
        const { city, lat, lon } = req.query;

        let query = "";

        if (city) {
            query = `q=${encodeURIComponent(city)}`;
        } else if (lat && lon) {
            query = `lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`;
        } else {
            return res.status(400).json({
                message: "City or coordinates are required"
            });
        }

        const url =
            `https://api.openweathermap.org/data/2.5/forecast` +
            `?${query}` +
            `&appid=${process.env.OPENWEATHER_API_KEY}` +
            `&units=metric`;

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        res.json(data);

    } catch (error) {
        console.error("Forecast API Error:", error);

        res.status(500).json({
            message: "Unable to fetch forecast data"
        });
    }
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Weather server running on port ${PORT}`);
});