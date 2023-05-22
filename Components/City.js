import { useState } from 'react';
import { useRouter } from 'next/router';

const WeatherApp = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [city, setCity] = useState('');
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'latitude') {
      setLatitude(value);
    } else if (name === 'longitude') {
      setLongitude(value);
    } else if (name === 'city') {
      setCity(value);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let url = '';

    if (latitude && longitude) {
      url = `/weather?lat=${latitude}&lon=${longitude}`;
    } else if (city) {
      url = `/weather?city=${city}`;
    }

    router.push(url);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="px-8 py-6 sm:p-10 sm:max-w-max max-w-4xl w-full">
        <form onSubmit={handleFormSubmit} className="flex flex-col space-y-4">
          <div className="flex space-x-4 items-center">
            <div className="flex-1">
             
              <input
                type="text"
                id="latitude"
                name="latitude"
                placeholder='latitude'
                value={latitude}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded w-full"
              />
            </div>


            <div className="flex-1">
              
              <input
                type="text"
                id="longitude"
                name="longitude"
                placeholder='longitude'
                value={longitude}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded w-full"
              />
            </div>

            <div className="flex-1">
              
              <input
                type="text"
                id="city"
                name="city"
                placeholder='Search City'
                value={city}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded w-full"
              />
            </div>
          </div>



          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Get Weather
          </button>
        </form>
      </div>
    </div>
  );
};

export default WeatherApp;
