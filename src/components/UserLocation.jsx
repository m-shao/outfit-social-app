import { useState, useEffect } from 'react';
import parser from 'fast-xml-parser';

export default function App() {
  const [location, setLocation] = useState(null);
  const [timezone, setTimezone] = useState(null);
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
    });
  }, []);

  useEffect(() => {
    if (location) {
      setLoading(true);
      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max,windspeed_10m_max&current_weather=true&forecast_days=1`,
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            Origin: 'http://localhost:5173',
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setWeather(data);
          setLoading(false);
        })
        .catch((error) => console.error(error));
    }
  }, [location]);

  useEffect(() => {
    if (location) {
      setLoading(true);
      fetch(
        `http://api.timezonedb.com/v2.1/get-time-zone?key=OW0FUQN3IH3H&format=xml&by=position&lat=${location.latitude}&lng=${location.longitude}`,
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            Origin: 'http://localhost:5173',
          },
        }
      )
        .then((response) => response.text())
        .then((data) => {
          const parsedData = parser.parse(data);
          const timezoneInfo = parsedData && parsedData.timezone;
          setTimezone(timezoneInfo);
          setLoading(false);
        })
        .catch((error) => console.error(error));
    }
  }, [location]);

  return (
    <div className="App">
      {location ? (
        <p>
          location is {location.longitude}, {location.latitude}
        </p>
      ) : (
        <p>Retrieving location...</p>
      )}

      {loading ? (
        <p>Loading weather data...</p>
      ) : (
        <>
          <h1>
            Weather in {weather.city_name}, {weather.country_code}
          </h1>
          <p>
            Temperature: {weather.data && weather.data.temperature_2m[0].value}
            °C
          </p>
          <p>
            Precipitation Probability:{' '}
            {weather.data && weather.data.precipitation_probability[0].value}%
          </p>
          <p>Rain: {weather.data && weather.data.rain[0].value}mm</p>
          <p>Showers: {weather.data && weather.data.showers[0].value}%</p>
          <p>Snowfall: {weather.data && weather.data.snowfall[0].value}cm</p>
        </>
      )}
    </div>
  );
}
