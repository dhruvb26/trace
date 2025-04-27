'use client'

import { useState, useEffect } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Loader } from '@/components/loader'
import { ScrapeData } from '@/types/scrape'
import { GoogleMap } from '@/components/maps/google-map'
import { CarbonEmissions } from '@/components/dashboard/carbon-emissions'

interface PlaceSelectorProps {
  onPlaceSelect?: (place: ScrapeData) => void
  disabled?: boolean
  selectedPlace?: ScrapeData | null
}

export function PlaceSelector({
  onPlaceSelect,
  disabled = false,
  selectedPlace: externalSelectedPlace,
}: PlaceSelectorProps) {
  const [places, setPlaces] = useState<ScrapeData[]>([])
  const [selectedPlaceName, setSelectedPlaceName] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (externalSelectedPlace) {
      setSelectedPlaceName(externalSelectedPlace.name)
    }
  }, [externalSelectedPlace])

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch('https://rector-api.vercel.app/scrape', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },
          body: JSON.stringify({
            url: 'https://www.patagonia.com/factories-farms-material-suppliers',
          }),
        })

        const contentType = response.headers.get('content-type')
        if (contentType && contentType.includes('text/html')) {
          throw new Error(
            'Received HTML instead of JSON. Please make sure to visit the ngrok URL in a browser first to accept any warnings.'
          )
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        setPlaces(data.products || [])
      } catch (err) {
        console.error('Fetch error:', err)
        if (err instanceof Error && err.message.includes('Received HTML')) {
          setError(
            'Please open this URL in a new tab first to accept the ngrok warning: https://b6c9-164-67-70-232.ngrok-free.app/scrape'
          )
        } else {
          setError(
            err instanceof Error
              ? err.message
              : 'An error occurred while fetching data'
          )
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const getSelectedPlaceDetails = () => {
    return places.find((place) => place.name === selectedPlaceName)
  }

  const handlePlaceSelect = (placeName: string) => {
    setSelectedPlaceName(placeName)
    const place = places.find((p) => p.name === placeName)
    if (place && onPlaceSelect) {
      onPlaceSelect(place)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader />
      </div>
    )
  }

  if (error) {
    return <div className="text-gray-500 text-sm text-center py-8">{error}</div>
  }

  return (
    <div className="space-y-6 mt-2">
      <div className="w-full">
        <Select
          value={selectedPlaceName}
          onValueChange={handlePlaceSelect}
          disabled={disabled}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a place" />
          </SelectTrigger>
          <SelectContent>
            {places.map((place, index) => (
              <SelectItem key={index} value={place.name}>
                {place.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className={disabled ? 'opacity-50' : ''}>
        <div className="min-h-[300px]">
          {selectedPlaceName && getSelectedPlaceDetails() ? (
            <>
              <GoogleMap address={getSelectedPlaceDetails()?.address || ''} />
              <div className="mt-2 gap-2 max-w-xs space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Address</p>
                  <p className="text-sm truncate max-w-xs">
                    {getSelectedPlaceDetails()?.address}
                  </p>
                </div>
                <CarbonEmissions
                  fromAddress="San Francisco, CA"
                  toAddress={getSelectedPlaceDetails()?.address || ''}
                  weight={1}
                />
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500 text-sm">
              Select a place to view details
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
