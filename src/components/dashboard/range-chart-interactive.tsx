'use client'

import { TrendingUp } from 'lucide-react'
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { CompanyDashboardData } from '@/utils/company-dashboard-data'

interface RangeChartInteractiveProps {
  data: CompanyDashboardData['monthlyEnergy']
}

const chartConfig = {
  renewable: {
    label: 'Renewable',
    color: '#84cc16', // lime-500
  },
  nonRenewable: {
    label: 'Non-Renewable',
    color: '#bef264', // lime-300
  },
} satisfies ChartConfig

export function RangeChartInteractive({ data }: RangeChartInteractiveProps) {
  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>Energy Consumption Breakdown</CardTitle>
        <CardDescription>
          Renewable vs Non-Renewable Energy (MWh)
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              bottom: 10,
              left: 10,
            }}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <PolarAngleAxis
              dataKey="month"
              tick={({ x, y, textAnchor, value, index, ...props }) => {
                const dataPoint = data[index]

                return (
                  <text
                    x={x}
                    y={index === 0 ? y - 10 : y}
                    textAnchor={textAnchor}
                    fontSize={8}
                    fontWeight={500}
                    {...props}
                  >
                    <tspan>{dataPoint.renewable}</tspan>
                    <tspan className="fill-muted-foreground">/</tspan>
                    <tspan>{dataPoint.nonRenewable}</tspan>
                    <tspan
                      x={x}
                      dy={'1rem'}
                      fontSize={12}
                      className="fill-muted-foreground"
                    >
                      {dataPoint.month}
                    </tspan>
                  </text>
                )
              }}
            />

            <PolarGrid />
            <Radar dataKey="renewable" fill="#84cc16" fillOpacity={0.6} />
            <Radar dataKey="nonRenewable" fill="#bef264" />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Renewable usage up 15.7% this quarter{' '}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground">
          Q1-Q2 2024
        </div>
      </CardFooter>
    </Card>
  )
}
