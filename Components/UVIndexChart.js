'use client'
import React from 'react'
import { Card, Title, AreaChart } from "@tremor/react";





const UVIndexChart = ({ results }) => {

    const hourly = results?.hourly.time
        .map(time => new Date(time).toLocaleString('en-US', {
            hour: 'numeric',
            hour12: false,
        }))
        .slice(0, 24);

    const data = hourly.map((hour, i) => ({
        time: Number(hour),
        "UV Index": results.hourly.uv_index[i],
        
    }))
    return (
        <Card>
            <Title>UV Index</Title>
            <AreaChart
                className="h-72 mt-4"
                data={data}
                index="time"
                categories={["UV Index"]}
                colors={["yellow"]}
                minValue={0}
                yAxisWidth={40}
            />
        </Card>
    )
}

export default UVIndexChart