import { NextResponse } from 'next/server'

const CARBON_API_KEY = process.env.CARBON_API_KEY

if (!CARBON_API_KEY) {
  console.error('CARBON_API_KEY environment variable is not set')
  throw new Error('CARBON_API_KEY environment variable is not set')
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { from_address, to_address, weight_kg } = body

    if (!from_address || !to_address || !weight_kg) {
      console.error('Missing required parameters:', {
        from_address,
        to_address,
        weight_kg,
      })
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    const MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    if (!MAPS_API_KEY) {
      throw new Error('GOOGLE_MAPS_API_KEY environment variable is not set')
    }

    const fromResponse = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        from_address
      )}&key=${MAPS_API_KEY}`
    )
    const fromData = await fromResponse.json()
    if (!fromData.results?.[0]?.geometry?.location) {
      throw new Error('Could not geocode from_address')
    }
    const fromLoc = fromData.results[0].geometry.location

    // Get coordinates for to_address
    const toResponse = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        to_address
      )}&key=${MAPS_API_KEY}`
    )
    const toData = await toResponse.json()
    if (!toData.results?.[0]?.geometry?.location) {
      throw new Error('Could not geocode to_address')
    }
    const toLoc = toData.results[0].geometry.location

    // Calculate distance in kilometers using Haversine formula
    const R = 6371 // Earth's radius in kilometers
    const dLat = ((toLoc.lat - fromLoc.lat) * Math.PI) / 180
    const dLon = ((toLoc.lng - fromLoc.lng) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((fromLoc.lat * Math.PI) / 180) *
        Math.cos((toLoc.lat * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c

    const response = await fetch(
      'https://www.carboninterface.com/api/v1/estimates',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${CARBON_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'shipping',
          weight_value: weight_kg,
          weight_unit: 'kg',
          distance_value: distance,
          distance_unit: 'km',
          transport_method: 'ship',
          from_address,
          to_address,
        }),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Carbon Interface API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
      })
      throw new Error('Failed to fetch from Carbon Interface API')
    }

    const data = await response.json()

    const result = {
      carbon_g: data.data.attributes.carbon_g,
      carbon_lb: data.data.attributes.carbon_lb,
      carbon_kg: data.data.attributes.carbon_kg,
      carbon_mt: data.data.attributes.carbon_mt,
      distance_value: data.data.attributes.distance_value,
      distance_unit: data.data.attributes.distance_unit,
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Carbon calculation error:', error)
    return NextResponse.json(
      { error: 'Failed to calculate carbon emissions' },
      { status: 500 }
    )
  }
}
