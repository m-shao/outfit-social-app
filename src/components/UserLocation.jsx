import { useState, useEffect } from 'react';

export default function App() {
    const [location, setLocation] = useState(null);
    const [weather, setWeather] = useState({});
    const [loading, setLoading] = useState(false);

    // get user's coordinates
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
        });
    }, []);

    // weather api call
    useEffect(() => {
        if (location) {
            setLoading(true);
            fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max,windspeed_10m_max&current_weather=true&forecast_days=1&timezone=auto`,
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

    return (
        <div className="App">
            <div className="flex flex-col pt-6 sm:flex-row items-start justify-center">
                <div className="max-w-md mx-auto px-6 py-8 bg-white rounded-lg shadow-lg">
                    {location ? (
                        <div>
                            <p className="text-xl font-semibold mb-4">
                                Your location is {location.longitude},{' '}
                                {location.latitude}
                            </p>
                            {weather && weather.current_weather && (
                                <div>
                                    <p>
                                        <span className="font-semibold">
                                            Temperature:
                                        </span>{' '}
                                        {weather.current_weather.temperature}
                                        {'°C'}
                                    </p>
                                    <p>
                                        <span className="font-semibold">
                                            Wind Speed:
                                        </span>{' '}
                                        {weather.current_weather.windspeed}
                                        {' km/h'}
                                    </p>
                                    <p>
                                        <span className="font-semibold">
                                            Wind Direction:
                                        </span>{' '}
                                        {weather.current_weather.winddirection}
                                    </p>
                                    <p>
                                        <span className="font-semibold">
                                            Weather Code:
                                        </span>{' '}
                                        {weather.current_weather.weathercode}
                                    </p>
                                    <p>
                                        <span className="font-semibold">
                                            Weather Code:
                                        </span>{' '}
                                        {weather.current_weather.weathercode}
                                    </p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <p className="text-lg font-semibold">
                            Retrieving location...
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
