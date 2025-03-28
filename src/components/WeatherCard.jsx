import { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch, FaMapMarkerAlt, FaWind, FaTint } from "react-icons/fa";

const API_KEY = "da29788be0269e4b647bcd0e762e5ea7"; // Replace with your OpenWeatherMap API Key

const WeatherCard = () => {
  const [city, setCity] = useState("Surandai");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (city) => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      setWeather(response.data);
    } catch (err) {
      setError("City not found. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = () => {
    if (city.trim() !== "") {
      fetchWeather(city);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-2xl font-bold text-gray-700">Weather App</h2>

        <div className="mt-4 flex items-center border rounded p-2">
          <FaMapMarkerAlt className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()} // Trigger search on Enter key
            className="w-full outline-none"
          />

          <button onClick={handleSearch} className="ml-2 text-blue-500">
            <FaSearch size={20} />
          </button>
        </div>

        {loading && <p className="mt-4 text-gray-600">Loading...</p>}
        {error && <p className="mt-4 text-red-500">{error}</p>}

        {weather && !loading && !error && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-gray-800">
              {weather.name}, {weather.sys.country}
            </h3>
            <p className="text-lg text-gray-600">
              {weather.weather[0].description.toUpperCase()}
            </p>
            <p className="text-5xl font-bold text-gray-800">
              {Math.round(weather.main.temp)}°C
            </p>

            <div className="flex justify-between items-center mt-4 text-gray-600">
              <div className="flex items-center">
                <FaWind className="mr-2" />
                <span>{weather.wind.speed} m/s</span>
              </div>
              <div className="flex items-center">
                <FaTint className="mr-2" />
                <span>{weather.main.humidity}%</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherCard;
