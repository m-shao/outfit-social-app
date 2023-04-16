import { useState, useEffect } from 'react';
import { FaCloud, FaSun, FaWind } from 'react-icons/fa';

import OutfitGeneration from './OutfitGeneration';

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
            <div className="flex flex-col md:sm:flex-row items-start justify-center">
                <div className="max-w-md mx-auto px-6 py-8 bg-white rounded-lg shadow-lg">
                    {location ? (
                        <div>
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
                                    {/* <p>
                                        <span className="font-semibold">
                                            Weather Code:
                                        </span>{' '}
                                        {weather.current_weather.weathercode}
                                    </p> */}
                                    {/* Conditional icons for weather */}
                                    {weather.current_weather.weathercode ===
                                    0 ? (
                                        <FaSun className="inline-block mr-2 text-yellow-500" />
                                    ) : weather.current_weather.weathercode ===
                                          1 ||
                                      2 ||
                                      3 ? (
                                        <FaCloud className="inline-block mr-2 text-yellow-500" />
                                    ) : weather.current_weather.weathercode ===
                                          45 || 48 ? (
                                        <FaCloud className="inline-block mr-2 text-gray-500" />
                                    ) : weather.current_weather.weathercode ===
                                          56 || 57 ? (
                                        <FaCloud className="inline-block mr-2 text-gray-500" />
                                    ) : weather.current_weather.weathercode ===
                                          61 ||
                                      63 ||
                                      65 ? (
                                        <FaCloud className="inline-block mr-2 text-gray-500" />
                                    ) : weather.current_weather.weathercode ===
                                          45 || 48 ? (
                                        <FaCloud className="inline-block mr-2 text-gray-500" />
                                    ) : (
                                        <FaQuestion className="inline-block mr-2 text-gray-500" />
                                    )}
                                    <span className="font-semibold">
                                        Weather Code:
                                    </span>{' '}
                                    {weather.current_weather.weathercode}
                                    {weather.current_weather.weathercode ===
                                    0 ? (
                                        <div>
                                            <br />
                                            <em className="text-sm text-gray-500 mt-2">
                                                Clear skies ahead. You'll want
                                                to wear light and breathable
                                                clothes such as shorts,
                                                t-shirts, and sandals.
                                            </em>
                                        </div>
                                    ) : weather.current_weather.weathercode ===
                                          1 ||
                                      2 ||
                                      3 ? (
                                        <div>
                                            <br />
                                            <em className="text-sm text-gray-500 mt-2">
                                                Mainly clear, partly cloudy, and
                                                overcast: You'll want to bring a
                                                light jacket or sweater in case
                                                it gets cooler as the sun sets.
                                            </em>
                                        </div>
                                    ) : weather.current_weather.weathercode ===
                                          45 || 48 ? (
                                        <div>
                                            <br />
                                            <em className="text-sm text-gray-500 mt-2">
                                                Foggy day; you'll want to wear
                                                clothes that are visible to
                                                others, such as bright or
                                                reflective clothing to ensure
                                                your safety.
                                            </em>
                                        </div>
                                    ) : weather.current_weather.weathercode ===
                                          56 || 57 ? (
                                        <div>
                                            <br />
                                            <em className="text-sm text-gray-500 mt-2">
                                                Freezing Drizzle: You should
                                                dress warmly in this weather and
                                                wear clothes that are waterproof
                                                and have insulation to keep you
                                                dry and warm.
                                            </em>
                                        </div>
                                    ) : weather.current_weather.weathercode ===
                                          61 ||
                                      63 ||
                                      65 ? (
                                        <div>
                                            <br />
                                            <em className="text-sm text-gray-500 mt-2">
                                                Rain: Wear waterproof clothes or
                                                bring an umbrella to keep
                                                yourself dry. You may also want
                                                to wear clothes that dry
                                                quickly, such as synthetic
                                                fabrics, to avoid getting too
                                                wet.
                                            </em>
                                        </div>
                                    ) : weather.current_weather.weathercode ===
                                          66 || 67 ? (
                                        <div>
                                            <br />
                                            <em className="text-sm text-gray-500 mt-2">
                                                Freezing Rain: Light and heavy
                                                intensity: You should dress
                                                warmly in this weather and wear
                                                clothes that are waterproof and
                                                have insulation to keep you dry
                                                and warm.
                                            </em>
                                        </div>
                                    ) : weather.current_weather.weathercode ===
                                          71 ||
                                      73 ||
                                      75 ? (
                                        <div>
                                            <br />
                                            <em className="text-sm text-gray-500 mt-2">
                                                Snow fall: Y should dress warmly
                                                and wear waterproof boots and
                                                gloves to keep your feet and
                                                hands dry. You may also want to
                                                wear layers of clothing to stay
                                                warm.
                                            </em>
                                        </div>
                                    ) : weather.current_weather.weathercode ===
                                      77 ? (
                                        <div>
                                            <br />
                                            <em className="text-sm text-gray-500 mt-2">
                                                Snow grains: Snow grains are
                                                very small, round pellets of
                                                snow that are smaller than
                                                snowflakes. You should dress
                                                warmly in this weather and wear
                                                clothes that are waterproof and
                                                have insulation to keep you dry
                                                and warm.
                                            </em>
                                        </div>
                                    ) : weather.current_weather.weathercode ===
                                          80 ||
                                      81 ||
                                      82 ? (
                                        <div>
                                            <br />
                                            <em className="text-sm text-gray-500 mt-2">
                                                Rain showers; You should wear
                                                waterproof clothes or bring an
                                                umbrella to keep yourself dry.
                                                You may also want to wear
                                                clothes that dry quickly, such
                                                as synthetic fabrics, to avoid
                                                getting too wet. If it's windy,
                                                you may want to wear clothes
                                                that fit closely to your body to
                                                avoid getting blown around.
                                            </em>
                                        </div>
                                    ) : weather.current_weather.weathercode ===
                                          85 || 86 ? (
                                        <div>
                                            <br />
                                            <em className="text-sm text-gray-500 mt-2">
                                                Snow showers: Slight and heavy:
                                                Snow showers are similar to rain
                                                showers, but with snow instead
                                                of rain. If it's snowing, you
                                                should dress warmly and wear
                                                waterproof boots and gloves to
                                                keep your feet and hands dry.
                                                You may also want to wear layers
                                                of clothing to stay
                                            </em>
                                        </div>
                                    ) : weather.current_weather.weathercode ===
                                          95 ||
                                      96 ||
                                      99 ? (
                                        <div>
                                            <br />
                                            <em className="text-sm text-gray-500 mt-2">
                                                Thunderstorms forecasted. During
                                                a thunderstorm, it is
                                                recommended to stay indoors and
                                                avoid outdoor activities.
                                            </em>
                                        </div>
                                    ) : (
                                        <em>Clear skies</em>
                                    )}
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
            <OutfitGeneration temp={weather?.current_weather?.temperature}/>
        </div>
    );
}
