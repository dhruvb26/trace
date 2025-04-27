import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { Loader } from '@/components/loader'

interface CarbonEmissionsProps {
  fromAddress: string
  toAddress: string
  weight: number
}

interface EmissionsResponse {
  carbon_g: number
  carbon_lb: number
  carbon_kg: number
  carbon_mt: number
  distance_value: number
  distance_unit: string
}

export function CarbonEmissions({
  fromAddress,
  toAddress,
  weight,
}: CarbonEmissionsProps) {
  const [emissions, setEmissions] = useState<EmissionsResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEmissions = async () => {
      if (!fromAddress || !toAddress) return

      setLoading(true)
      setError(null)

      try {
        const response = await fetch('/api/carbon-emissions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from_address: fromAddress,
            to_address: toAddress,
            weight_kg: weight,
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to fetch emissions data')
        }

        const data = await response.json()
        setEmissions(data)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to calculate emissions'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchEmissions()
  }, [fromAddress, toAddress, weight])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader />
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500 text-sm text-center py-4">{error}</div>
  }

  if (!emissions) return null

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">Carbon Footprint</p>
          <p className="text-2xl font-semibold text-lime-800">
            {emissions.carbon_kg.toFixed(2)} kg CO₂e
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Distance</p>
          <p className="text-2xl font-semibold text-lime-800">
            {emissions.distance_value.toFixed(0)} {emissions.distance_unit}
          </p>
        </div>
      </div>
    </div>
  )
}
