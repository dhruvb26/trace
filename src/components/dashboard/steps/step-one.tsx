import { PlaceSelector } from '@/components/dashboard/place-selector'
import { Dropzone } from '@/components/dashboard/dropzone'
import { ScrapeData } from '@/types/scrape'

interface StepOneProps {
  selectedPlace: ScrapeData | null
  onPlaceSelect: (place: ScrapeData) => void
}

export function StepOne({ selectedPlace, onPlaceSelect }: StepOneProps) {
  return (
    <div className="grid grid-cols-2 gap-6 h-[500px]">
      <div className="space-y-6">
        <PlaceSelector
          onPlaceSelect={onPlaceSelect}
          selectedPlace={selectedPlace}
          disabled={false}
        />
      </div>
      <Dropzone />
    </div>
  )
}
