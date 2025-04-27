'use client'

import * as React from 'react'
import { TrendingUp } from 'lucide-react'
import { Label, Pie, PieChart } from 'recharts'

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

interface PieChartInteractiveProps {
  data: CompanyDashboardData['carbonEmissions']
}

const chartConfig = {
  emissions: {
    label: 'Carbon Emissions',
  },
  'Scope 1': {
    label: 'Scope 1',
    color: '#84cc16',
  },
  'Scope 2': {
    label: 'Scope 2',
    color: '#a3e635',
  },
  'Scope 3': {
    label: 'Scope 3',
    color: '#bef264',
  },
  Renewable: {
    label: 'Renewable',
    color: '#d9f99d',
  },
  Offset: {
    label: 'Offset',
    color: '#ecfccb',
  },
} satisfies ChartConfig

export function PieChartInteractive({ data }: PieChartInteractiveProps) {
  const totalEmissions = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.emissions, 0)
  }, [data])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Carbon Emissions Breakdown</CardTitle>
        <CardDescription>ESG Metrics Q1-Q2 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="emissions"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalEmissions.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          tCO₂e
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Reduced emissions by 12.3% this quarter
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total carbon footprint by emission category
        </div>
      </CardFooter>
    </Card>
  )
}
