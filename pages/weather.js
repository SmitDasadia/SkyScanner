/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Text, Metric, CalloutCard, Callout } from "@tremor/react";
import StatsCard from '@/Components/StatsCard';
import { ExclamationIcon, CheckCircleIcon, SunIcon } from "@heroicons/react/solid";
import SidePannel from '@/Components/SidePannel';
import TempChart from '@/Components/TempChart';
import UVIndexChart from '@/Components/UVIndexChart';
import Head from 'next/head';

const weather = () => {
  const router = useRouter();
  const { query } = router;
  const [weather, setWeather] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [lat, setlat] = useState(null);
  const [lon, setlon] = useState(null);
  const [weatherCode, setweatherCode] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_KEY =  process.env.NEXT_PUBLIC_api_key;
        let url = '';
        if (query.lat && query.lon) {
          url = `https://api.openweathermap.org/data/2.5/weather?lat=${query.lat}&lon=${query.lon}&appid=${API_KEY}`;
        } else if (query.city) {
          url = `https://api.openweathermap.org/data/2.5/weather?q=${query.city}&appid=${API_KEY}`;
        } else {
          setError('Invalid query parameters');
          setLoading(false);
          return;
        }

        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
          setWeather(data);
          setlat(data.coord.lat)
          setlon(data.coord.lon)
        } else {
          setError(data.message);
        }
        setLoading(false);
      } catch (error) {
        setError('An error occurred while fetching weather data.');
        setLoading(false);
      }
    };

    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,uv_index,uv_index_clear_sky,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max&current_weather=true&timezone=auto`
        );
        setWeatherData(response.data);
        setweatherCode(response.data.current_weather.weathercode)
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();

    fetchData();
  }, [query, lat, lon]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>An error occurred: {error}</p>;
  }

  
  
  const getWeatherDescription = (code) => {
    switch (code) {
      case 0:
        return 'Clear sky';
      case 1:
        return 'Mainly clear';
      case 2:
        return 'Partly cloudy'

      case 3:
        return 'Overcast/Cloudly';
      case 45:
        return 'Foggy';

      case 48:
        return 'Rime Fog';
      case 51:
        return 'Light Drizzle';
      case 53:
        return 'Drizzle'
      case 55:
        return 'Heavy Drizzle';
      case 56:
        return 'Light Freezing Drizzle'

      case 57:
        return 'Freezing Drizzle'
      case 61:
        return 'Light Rain'
      case 63:
        return 'Rain'
      case 65:
        return 'Heavy Rain'
      case 66:
        return 'Freezing Rain Light'
      case 67:
        return 'Freezing Rain Heavy'

      case 71:
        return 'Light Snow'
      case 73:
        return 'Snow'
      case 75:
        return 'Heavy Snow'
      case 77:
        return 'Snow Grains'
      case 80:
        return 'Light Showers'
      case 81:
        return 'Showers'
      case 82:

        return 'Heavy Showers'
      case 85:
        return 'Snow Showers Slight'
      case 86:
        return 'Snow Showers Heavy'
      case 95:
        return 'Thunderstorm'
      case 96:
        return 'Thunderstorm with Sight Hail'
      case 99:
        return 'Thunderstorm with Heavy Hail'
      default:
        return 'Unknown weather code';
    }
  };

  
  
  // const weatherDescription = getWeatherDescription(weatherCode);

  return (
    <>
     <Head>
        <title> {weather.name},{weather.sys.country} Weather Forecast | SkyScanner</title>
      </Head>

      {weatherData ? (
        <>

          {/* <div>
          <SidePannel city={weather.name} lat={lat} lon={lon} results={weatherData} />

        </div> */}

          <div>
            <div className='p-5'>


              <div className='grid grid-cols-1 xl:grid-cols-2 gap-6 m-2'>
                {/* StatsCard */}

                <StatsCard 
                title='City'
                  mertic={`${weather.name}, ${weather.sys.country}`}
                  color="red" />

<StatsCard title="Latitude Longitude"
                  mertic={`${lat}, ${lon}`}
                  color="red" />

                <StatsCard title="Cuurent Temperature"
                  mertic={`${weatherData.current_weather.temperature.toFixed(1)}°C`}
                  color="blue" />

                <StatsCard title="Weather"
                  mertic={getWeatherDescription(weatherCode)}
                  color="blue" />


                <StatsCard title="Maximum Temperature"
                  mertic={`${weatherData.daily.temperature_2m_max[0].toFixed(1)}°C`}
                  color="yellow" />

                <StatsCard title="Minimum Temperature"
                  mertic={`${weatherData.daily.temperature_2m_min[0].toFixed(1)}°C`}
                  color="blue" />

                <div>
                  <StatsCard title="UV Index"
                    mertic={`${weatherData.daily.uv_index_max[0].toFixed(1)}`}
                    color="orange" />

                  {Number(weatherData.daily.uv_index_max[0].toFixed(1)) > 5 && (


                    <Callout
                      className='mt-5'
                      title=" High UV Index! Protect yourself now. Seek shade, wear sunscreen, and cover up. Stay safe"
                      icon={ExclamationIcon}
                      color="rose"
                    />

                  )}
                </div>

                <div className='flex space-x-5'>
                  <StatsCard title="Wind Speed"
                    mertic={`${weatherData.current_weather.windspeed.toFixed(1)} KM/H`}
                    color="cyan" />

                  <StatsCard title="Wind Direction"
                    mertic={`${weatherData.current_weather.winddirection.toFixed(1)}°`}
                    color="violet" />

                </div>


              </div>

              <hr className='border-t border-gray-300 my-4' />

              <div className='space-y-3'>
                {/* Temp Charts */}
                <TempChart results={weatherData} />

                {/* UV index */}
                <UVIndexChart results={weatherData} />
              </div>

              <div className='pb-5'>
                <p className='text-sm text-gray-400'>Last Updated at: {" "} {new Date(weatherData.current_weather.time).toLocaleString()}  ({weatherData.timezone})</p>
              </div>
            </div>
          </div>
        </>

      ) : (
        <p>Loading weather data...</p>
      )}

    </>
  );
};

export default weather;
