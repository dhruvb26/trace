'use client'
import React, { useState, useEffect } from 'react'
import { Loader } from '@/components/loader'
import { ScrapeData } from '@/types/scrape'

export function RightSidebar() {
  const [places, setPlaces] = useState<ScrapeData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

  return (
    <div className="fixed right-4 top-4 flex flex-col gap-4 h-[calc(100vh-2rem)] w-[400px] z-50">
      <div className="rounded-md flex items-center justify-between p-2 px-4 bg-background border border-lime-300">
        <div className="flex justify-start flex-col items-start ">
          <h2 className="text-base font-semibold text-lime-800">Patagonia</h2>
          <p className="text-xs text-lime-600">San Francisco, CA</p>
        </div>
      </div>

      <div className="flex-1 rounded-md border bg-background overflow-hidden">
        {isLoading && (
          <div className="flex items-center justify-center h-full">
            <Loader />
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        )}

        {!isLoading && !error && places.length > 0 && (
          <div className="overflow-auto h-full">
            <div>
              {places.map((place, index) => (
                <div
                  key={`duplicate-${index}`}
                  className={`flex justify-between items-center p-4 group ${
                    index !== places.length - 1 ? 'border-b border-border' : ''
                  }`}
                >
                  <div className="max-w-xs">
                    <h3 className="font-medium text-sm">{place.name}</h3>
                    <p className="text-muted-foreground max-w-[18rem] text-xs truncate">
                      {place.address}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
