import { useState, useEffect } from 'react'

export default function App() {
    const [location, setLocation] = useState(null)
    const [weather, setWeather] = useState({})
    const [loading, setLoading] = useState(false)

    // get user's coordinates
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords
            setLocation({ latitude, longitude })
        })
    }, [])

    // weather api call
    useEffect(() => {
        if (location) {
            setLoading(true)
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
                    setWeather(data)
                    setLoading(false)
                })
                .catch((error) => console.error(error))
        }
    }, [location])

    return (
        <div className="App">
            <div className="App">
                {location ? (
                    <div>
                        location is {location.longitude}, {location.latitude}
                        {weather && weather.current_weather && (
                            <div>
                                <p>
                                    Temperature:{' '}
                                    {weather.current_weather.temperature}
                                </p>
                                <p>
                                    Wind Speed:{' '}
                                    {weather.current_weather.windspeed}
                                </p>
                                <p>
                                    Wind Direction:{' '}
                                    {weather.current_weather.winddirection}
                                </p>
                                <p>
                                    Weather Code:{' '}
                                    {weather.current_weather.weathercode}
                                </p>
                                <p>
                                    Is Day:{' '}
                                    {weather.current_weather.is_day
                                        ? 'Yes'
                                        : 'No'}
                                </p>
                                <p>Time: {weather.current_weather.time}</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <p>Retrieving location...</p>
                )}
            </div>
        </div>
    )
}
