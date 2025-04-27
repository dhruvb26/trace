'use client'

import { ChartAreaInteractive } from '@/components/dashboard/chart-area-interactive'
import { PieChartInteractive } from '@/components/dashboard/pie-chart'
import { RangeChartInteractive } from '@/components/dashboard/range-chart-interactive'
import { BarChartInteractive } from '@/components/dashboard/bar-chart-interactive'
import CardsRow from '@/components/dashboard/cards-row'
import { AnalysisDialog } from '@/components/dashboard/analysis-dialog'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  patagoniaDashboardData,
  northFaceDashboardData,
} from '@/utils/company-dashboard-data'

const companies = [
  {
    name: 'Patagonia',
    location: 'San Francisco, CA',
    data: patagoniaDashboardData,
  },
  {
    name: 'The North Face',
    location: 'Denver, CO',
    data: northFaceDashboardData,
  },
]

export default function DashboardPage() {
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState(companies[0])

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold text-lime-800">
            {selectedCompany.name}
          </h2>
          <p className="text-xs text-lime-600">{selectedCompany.location}</p>
        </div>
        <div className="flex items-center gap-4">
          <Select
            value={selectedCompany.name}
            onValueChange={(value) => {
              const company = companies.find((c) => c.name === value)
              if (company) setSelectedCompany(company)
            }}
          >
            <SelectTrigger className="w-[180px] bg-lime-100 border-lime-300 text-lime-800">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {companies.map((company) => (
                <SelectItem
                  key={company.name}
                  value={company.name}
                  className="cursor-pointer"
                >
                  {company.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            size="sm"
            className="text-lime-800 bg-lime-100 border-lime-300 border hover:bg-lime-200"
            onClick={() => setIsAnalysisOpen(true)}
          >
            Analyze
          </Button>
          <p className="text-lg text-lime-800 font-medium">2024</p>
        </div>
      </div>
      <AnalysisDialog
        isOpen={isAnalysisOpen}
        onOpenChange={setIsAnalysisOpen}
      />
      <CardsRow data={selectedCompany.data.cards} />
      <ChartAreaInteractive data={selectedCompany.data.energyConsumption} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <PieChartInteractive data={selectedCompany.data.carbonEmissions} />
        <RangeChartInteractive data={selectedCompany.data.monthlyEnergy} />
        <BarChartInteractive data={selectedCompany.data.resourceUsage} />
      </div>
    </div>
  )
}
