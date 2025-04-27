'use client'

import { useEffect, useRef, useState } from 'react'
import { Loader } from '@/components/loader'

interface GoogleMapProps {
  address: string
}

// Create a global variable to track if the script is loading or loaded
const googleMapsScriptId = 'google-maps-script'

export function GoogleMap({ address }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check if the script is already loaded or being loaded
    if (document.getElementById(googleMapsScriptId)) {
      // If the global Google object exists, the API is already loaded
      if (window.google?.maps) {
        setIsLoaded(true)
      } else {
        // Otherwise wait for the existing script to load
        const waitForGoogleMaps = setInterval(() => {
          if (window.google?.maps) {
            setIsLoaded(true)
            clearInterval(waitForGoogleMaps)
          }
        }, 100)

        return () => clearInterval(waitForGoogleMaps)
      }
    } else {
      // Script doesn't exist, create it
      const script = document.createElement('script')
      script.id = googleMapsScriptId
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`
      script.async = true
      script.defer = true
      script.onload = () => setIsLoaded(true)
      script.onerror = () => setError('Failed to load Google Maps')
      document.head.appendChild(script)

      return () => {
        // Don't remove the script on component unmount
        // This allows other instances to use the already loaded script
      }
    }
  }, [])

  useEffect(() => {
    if (!isLoaded || !mapRef.current || !address) return

    const geocoder = new google.maps.Geocoder()

    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK' && results?.[0]?.geometry?.location) {
        const map = new google.maps.Map(mapRef.current!, {
          center: results[0].geometry.location,
          zoom: 15,
          mapTypeControl: false,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }],
            },
            {
              featureType: 'transit',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }],
            },
          ],
        })

        new google.maps.Marker({
          map,
          position: results[0].geometry.location,
        })
      } else {
        setError('Could not find location on map')
      }
    })
  }, [isLoaded, address])

  if (error) {
    return <div className="text-gray-500 text-sm">{error}</div>
  }

  if (!isLoaded) {
    return <Loader />
  }

  return (
    <div ref={mapRef} className="w-full h-[300px] rounded-lg overflow-hidden" />
  )
}
