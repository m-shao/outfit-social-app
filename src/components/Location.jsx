import {} from 'React';
import { useState, useEffect } from 'react';

export default function App() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
    });
  });

  return (
    <div className="App">
      {location ? (
        <p>
          location is {location.longitude}, {location.latitude}
        </p>
      ) : (
        <p>Retrieving location...</p>
      )}
    </div>
  );
}
