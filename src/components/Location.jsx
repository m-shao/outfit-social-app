import { useState, useEffect } from 'react';

export default function App() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
    });
  });

  useEffect(() => {
    fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=43.88&longitude=-78.93&hourly=temperature_2m,precipitation_probability,rain,showers,snowfall&current_weather=true',
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          Origin: 'http://localhost:5173',
        },
      }
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="App">
      {location ? (
        <p>
          location is {location.longitude}, {location.latitude}
        </p>
      ) : (
        <p>Retrieving location...</p>
      )}

      <h1>
        Weather in {weather.city_name}, {weather.country_code}
      </h1>
      <p>
        Temperature: {weather.data && weather.data.temperature_2m[0].value}°C
      </p>
      <p>
        Precipitation Probability:{' '}
        {weather.data && weather.data.precipitation_probability[0].value}%
      </p>
      <p>Rain: {weather.data && weather.data.rain[0].value}mm</p>
      <p>Showers: {weather.data && weather.data.showers[0].value}%</p>
      <p>Snowfall: {weather.data && weather.data.snowfall[0].value}cm</p>
    </div>
  );
}
