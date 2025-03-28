const WeatherForecast = ({ forecast }) => {
  return (
    <div className="mt-4 grid grid-cols-5 gap-3">
      {forecast.map((day, index) => (
        <div key={index} className="bg-gray-200 p-3 rounded-lg text-center">
          <p className="text-sm">{new Date(day.dt * 1000).toLocaleDateString()}</p>
          <img 
            src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} 
            alt="weather icon"
          />
          <p className="font-bold">{day.main.temp}°C</p>
        </div>
      ))}
    </div>
  );
};

export default WeatherForecast;
