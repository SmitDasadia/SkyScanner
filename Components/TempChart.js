'use client'
import React from 'react'
import { Card, Title, AreaChart } from "@tremor/react";





const TempChart = ({ results }) => {

    const hourly = results?.hourly.time
        .map(time => new Date(time).toLocaleString('en-US', {
            hour: 'numeric',
            hour12: false,
        }))
        .slice(0, 24);

    const data = hourly.map((hour, i) => ({
        time: Number(hour),
        "Temperature": results.hourly.temperature_2m[i],
        "Rain": results.hourly.rain[i],
        "Humidity": results.hourly.relativehumidity_2m[i],
        "Feels Like": results.hourly.apparent_temperature[i],

    }))
    return (
        <Card>
            <Title>Temputture , Rain , Humidity, Feels Like</Title>
            <AreaChart
                className="h-72 mt-4"
                data={data}
                index="time"
                categories={["Temperature", "Rain", "Humidity","Feels Like"]}
                colors={["orange", "blue", "violet","green"]}
                minValue={0}
                yAxisWidth={40}
            />
        </Card>
    )
}

export default TempChart