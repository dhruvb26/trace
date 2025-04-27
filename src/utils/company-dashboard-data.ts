export interface CompanyDashboardData {
  cards: {
    co2Emissions: {
      value: number
      change: number
      isIncrease: boolean
    }
    renewableShare: {
      value: number
      change: number
    }
    esgScore: {
      value: number
      change: number
    }
    wasteDiversion: {
      value: number
      goal: number
    }
  }
  energyConsumption: Array<{
    date: string
    renewable: number
    nonRenewable: number
  }>
  carbonEmissions: Array<{
    category: string
    emissions: number
    fill: string
  }>
  monthlyEnergy: Array<{
    month: string
    renewable: number
    nonRenewable: number
  }>
  resourceUsage: Array<{
    category: string
    usage: number
    fill: string
  }>
}

export const patagoniaDashboardData: CompanyDashboardData = {
  cards: {
    co2Emissions: {
      value: 2350,
      change: 8,
      isIncrease: false,
    },
    renewableShare: {
      value: 42,
      change: 12,
    },
    esgScore: {
      value: 7.6,
      change: 0.5,
    },
    wasteDiversion: {
      value: 68,
      goal: 80,
    },
  },
  energyConsumption: [
    { date: '2024-01-01', renewable: 150, nonRenewable: 120 },
    { date: '2024-01-07', renewable: 180, nonRenewable: 110 },
    { date: '2024-01-14', renewable: 160, nonRenewable: 130 },
    { date: '2024-01-21', renewable: 200, nonRenewable: 95 },
    { date: '2024-01-28', renewable: 170, nonRenewable: 115 },
    { date: '2024-02-04', renewable: 220, nonRenewable: 85 },
    { date: '2024-02-11', renewable: 190, nonRenewable: 105 },
    { date: '2024-02-18', renewable: 240, nonRenewable: 75 },
    { date: '2024-02-25', renewable: 210, nonRenewable: 95 },
    { date: '2024-03-03', renewable: 260, nonRenewable: 70 },
    { date: '2024-03-10', renewable: 230, nonRenewable: 90 },
    { date: '2024-03-17', renewable: 280, nonRenewable: 65 },
    { date: '2024-03-24', renewable: 250, nonRenewable: 85 },
    { date: '2024-03-31', renewable: 290, nonRenewable: 60 },
    { date: '2024-04-07', renewable: 260, nonRenewable: 80 },
    { date: '2024-04-14', renewable: 300, nonRenewable: 55 },
    { date: '2024-04-21', renewable: 270, nonRenewable: 75 },
    { date: '2024-04-28', renewable: 310, nonRenewable: 50 },
    { date: '2024-05-05', renewable: 280, nonRenewable: 70 },
    { date: '2024-05-12', renewable: 320, nonRenewable: 45 },
    { date: '2024-05-19', renewable: 290, nonRenewable: 65 },
    { date: '2024-05-26', renewable: 330, nonRenewable: 40 },
    { date: '2024-06-02', renewable: 300, nonRenewable: 60 },
    { date: '2024-06-09', renewable: 340, nonRenewable: 35 },
    { date: '2024-06-16', renewable: 310, nonRenewable: 55 },
    { date: '2024-06-23', renewable: 350, nonRenewable: 30 },
    { date: '2024-06-30', renewable: 320, nonRenewable: 50 },
  ],
  carbonEmissions: [
    { category: 'Scope 1', emissions: 275, fill: '#84cc16' },
    { category: 'Scope 2', emissions: 200, fill: '#a3e635' },
    { category: 'Scope 3', emissions: 287, fill: '#bef264' },
    { category: 'Renewable', emissions: 173, fill: '#d9f99d' },
    { category: 'Offset', emissions: 190, fill: '#ecfccb' },
  ],
  monthlyEnergy: [
    { month: 'January', renewable: 186, nonRenewable: 80 },
    { month: 'February', renewable: 305, nonRenewable: 200 },
    { month: 'March', renewable: 237, nonRenewable: 120 },
    { month: 'April', renewable: 73, nonRenewable: 190 },
    { month: 'May', renewable: 209, nonRenewable: 130 },
    { month: 'June', renewable: 214, nonRenewable: 140 },
  ],
  resourceUsage: [
    { category: 'Water', usage: 187, fill: '#84cc16' },
    { category: 'Electricity', usage: 200, fill: '#a3e635' },
    { category: 'Waste', usage: 275, fill: '#bef264' },
    { category: 'Paper', usage: 173, fill: '#d9f99d' },
    { category: 'Fuel', usage: 90, fill: '#ecfccb' },
  ],
}

export const northFaceDashboardData: CompanyDashboardData = {
  cards: {
    co2Emissions: {
      value: 3150,
      change: 5,
      isIncrease: true,
    },
    renewableShare: {
      value: 35,
      change: 8,
    },
    esgScore: {
      value: 7.2,
      change: 0.3,
    },
    wasteDiversion: {
      value: 62,
      goal: 75,
    },
  },
  energyConsumption: [
    { date: '2024-01-01', renewable: 100, nonRenewable: 180 },
    { date: '2024-01-07', renewable: 140, nonRenewable: 160 },
    { date: '2024-01-14', renewable: 120, nonRenewable: 190 },
    { date: '2024-01-21', renewable: 160, nonRenewable: 150 },
    { date: '2024-01-28', renewable: 130, nonRenewable: 170 },
    { date: '2024-02-04', renewable: 180, nonRenewable: 140 },
    { date: '2024-02-11', renewable: 150, nonRenewable: 165 },
    { date: '2024-02-18', renewable: 190, nonRenewable: 135 },
    { date: '2024-02-25', renewable: 160, nonRenewable: 155 },
    { date: '2024-03-03', renewable: 200, nonRenewable: 130 },
    { date: '2024-03-10', renewable: 170, nonRenewable: 150 },
    { date: '2024-03-17', renewable: 220, nonRenewable: 125 },
    { date: '2024-03-24', renewable: 190, nonRenewable: 145 },
    { date: '2024-03-31', renewable: 230, nonRenewable: 120 },
    { date: '2024-04-07', renewable: 200, nonRenewable: 140 },
    { date: '2024-04-14', renewable: 240, nonRenewable: 115 },
    { date: '2024-04-21', renewable: 210, nonRenewable: 135 },
    { date: '2024-04-28', renewable: 250, nonRenewable: 110 },
    { date: '2024-05-05', renewable: 220, nonRenewable: 130 },
    { date: '2024-05-12', renewable: 260, nonRenewable: 105 },
    { date: '2024-05-19', renewable: 230, nonRenewable: 125 },
    { date: '2024-05-26', renewable: 270, nonRenewable: 100 },
    { date: '2024-06-02', renewable: 240, nonRenewable: 120 },
    { date: '2024-06-09', renewable: 280, nonRenewable: 95 },
    { date: '2024-06-16', renewable: 250, nonRenewable: 115 },
    { date: '2024-06-23', renewable: 290, nonRenewable: 90 },
    { date: '2024-06-30', renewable: 260, nonRenewable: 110 },
  ],
  carbonEmissions: [
    { category: 'Scope 1', emissions: 350, fill: '#84cc16' },
    { category: 'Scope 2', emissions: 280, fill: '#a3e635' },
    { category: 'Scope 3', emissions: 320, fill: '#bef264' },
    { category: 'Renewable', emissions: 150, fill: '#d9f99d' },
    { category: 'Offset', emissions: 160, fill: '#ecfccb' },
  ],
  monthlyEnergy: [
    { month: 'January', renewable: 150, nonRenewable: 100 },
    { month: 'February', renewable: 280, nonRenewable: 220 },
    { month: 'March', renewable: 210, nonRenewable: 150 },
    { month: 'April', renewable: 90, nonRenewable: 170 },
    { month: 'May', renewable: 180, nonRenewable: 150 },
    { month: 'June', renewable: 195, nonRenewable: 160 },
  ],
  resourceUsage: [
    { category: 'Water', usage: 210, fill: '#84cc16' },
    { category: 'Electricity', usage: 230, fill: '#a3e635' },
    { category: 'Waste', usage: 290, fill: '#bef264' },
    { category: 'Paper', usage: 185, fill: '#d9f99d' },
    { category: 'Fuel', usage: 110, fill: '#ecfccb' },
  ],
}
