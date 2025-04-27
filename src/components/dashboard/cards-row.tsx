import React from 'react'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUpIcon, TrendingDownIcon } from 'lucide-react'
import { CompanyDashboardData } from '@/utils/company-dashboard-data'

interface CardsRowProps {
  data: CompanyDashboardData['cards']
}

const CardsRow = ({ data }: CardsRowProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total CO₂ Emissions (YTD)</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-mono font-semibold tabular-nums text-lime-800">
            {data.co2Emissions.value.toLocaleString()} tCO₂e
          </CardTitle>
          <div className="absolute right-4 top-4"></div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {data.co2Emissions.isIncrease ? 'Up' : 'Down'}{' '}
            {data.co2Emissions.change}% from last year{' '}
            {data.co2Emissions.isIncrease ? (
              <TrendingUpIcon className="size-4" />
            ) : (
              <TrendingDownIcon className="size-4" />
            )}
          </div>
          <div className="text-muted-foreground">
            Scope 1 & 2 emissions (CDP, 2024)
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Renewable Energy Share</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold font-mono tabular-nums text-lime-800">
            {data.renewableShare.value}%
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />+{data.renewableShare.change}
              %
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Increased renewable sourcing <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Aligned with RE100 targets
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>ESG Score (MSCI)</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold font-mono tabular-nums text-lime-800">
            {data.esgScore.value.toFixed(1)} / 10
          </CardTitle>
          <div className="absolute right-4 top-4"></div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Strong governance & ethics <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Top quartile in sector (MSCI, 2024)
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Waste Diversion Rate</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold font-mono tabular-nums text-lime-800">
            {data.wasteDiversion.value}%
          </CardTitle>
          <div className="absolute right-4 top-4"></div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            On track for zero waste <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            {data.wasteDiversion.goal}% goal by 2025 (EPA, 2024)
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default CardsRow
