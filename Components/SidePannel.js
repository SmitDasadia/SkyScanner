import React from 'react'

import { SunIcon, MoonIcon } from "@heroicons/react/solid";
import City from './City';
import { Card, Metric, Text } from "@tremor/react";

const SidePannel = ({ city, lat, lon, results }) => {
  return (
    <>
      <div className=''>
        {/* <div className='pb-10'>
          <h1 className='text-6xl font-bold'>{city}</h1>
          <p className='text-gray-600 pt-2'>Lat/Lon: {lat}, {lon}</p>
        </div>


        <div className='mt-5 flex items-center justify-between space-x-10 mb-5'>
          <div>
            <p className='text-xl'>


              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
              })}
            </p>

            <p className='font-semiblod'>
              Timezone : {results.timezone}
            </p>
          </div>
          <div className='text-6xl font-bold'>
            {results.current_weather.temperature}°C
          </div>
        </div> */}
        <Card className="max-w-xs mx-auto" decoration="top" decorationColor="indigo">
          <Text>Current Temperature</Text>
          <Metric>{results.current_weather.temperature}°C</Metric>
        </Card>
      </div>
    </>
  )
}

export default SidePannel