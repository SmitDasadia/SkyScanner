'use client'


import React from 'react'
import { Card, Text, Metric, Color,Icon  } from "@tremor/react";

const StatsCard = ({title , mertic, color}) => {
  return (
    <div>
        <Card  decoration='top' decorationColor={color}>
        
            <Text>{title}</Text>
            <Metric>{mertic}</Metric>
        </Card>
    </div>
  )
}

export default StatsCard