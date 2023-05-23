import { useState } from 'react';
import { useRouter } from 'next/router';

const WeatherApp = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'latitude') {
      setLatitude(value);
    } else if (name === 'longitude') {
      setLongitude(value);
    } else if (name === 'city') {
      setCity(value);
    } else if (name === 'country') {
      setCountry(value);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let url = '';

    if (latitude && longitude) {
      url = `/weather?lat=${latitude}&lon=${longitude}`;
    } else if (city) {
      url = `/weather?city=${city}`;
    } else if (city && country){
      url = `/weather?city=${city}&country=${country}`;
    }

    router.push(url);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className=" px-8 py-6 sm:p-10 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">SkyScaaner</h1>
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 text-sm font-bold" htmlFor="latitude">
              Latitude:
            </label>
            <input
              type="text"
              id="latitude"
              name="latitude"
              value={latitude}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 text-sm font-bold" htmlFor="longitude">
              Longitude:
            </label>
            <input
              type="text"
              id="longitude"
              name="longitude"
              value={longitude}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          

          <div className="flex flex-col space-y-2">
          <span className="text-gray-700 font-bold pb-2 text-center">OR</span>
            <label className="text-gray-700 text-sm font-bold" htmlFor="city">
              City:
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={city}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 text-sm font-bold" htmlFor="city">
              Country Code:
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={country}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="bg-slate-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none w-full"
          >
            Get Weather
          </button>
        </form>
      </div>
    </div>
  );
};

export default WeatherApp;
