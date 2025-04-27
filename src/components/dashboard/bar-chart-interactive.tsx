'use client'

import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from 'recharts'

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

interface BarChartInteractiveProps {
  data: CompanyDashboardData['resourceUsage']
}

const chartConfig = {
  usage: {
    label: 'Resource Usage',
  },
  Water: {
    label: 'Water',
    color: '#84cc16',
  },
  Electricity: {
    label: 'Electricity',
    color: '#a3e635',
  },
  Waste: {
    label: 'Waste',
    color: '#bef264',
  },
  Paper: {
    label: 'Paper',
    color: '#d9f99d',
  },
  Fuel: {
    label: 'Fuel',
    color: '#ecfccb',
  },
} satisfies ChartConfig

export function BarChartInteractive({ data }: BarChartInteractiveProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resource Consumption</CardTitle>
        <CardDescription>Q1-Q2 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="usage"
              strokeWidth={2}
              radius={8}
              activeIndex={2}
              activeBar={({ ...props }) => {
                return (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                )
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Resource efficiency improved 8.3% <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing resource consumption in standardized units
        </div>
      </CardFooter>
    </Card>
  )
}
