'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { ScrapeData } from '@/types/scrape'
import { StepOne } from './steps/step-one'
import { StepTwo } from './steps/step-two'
import { StepThree } from './steps/step-three'

interface AnalysisDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  trigger?: React.ReactNode
}

export function AnalysisDialog({
  isOpen,
  onOpenChange,
  trigger,
}: AnalysisDialogProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedPlace, setSelectedPlace] = useState<ScrapeData | null>(null)
  const totalSteps = 3

  const goToNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handlePlaceSelect = (place: ScrapeData) => {
    setSelectedPlace(place)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepOne
            selectedPlace={selectedPlace}
            onPlaceSelect={handlePlaceSelect}
          />
        )
      case 2:
        return <StepTwo selectedPlace={selectedPlace} />
      case 3:
        return <StepThree />
      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center w-full justify-center space-x-4">
            <Image
              src="/logos/icon.png"
              alt="Rector Agent"
              width={20}
              height={20}
            />
            <Image
              src="/logos/fetch.svg"
              alt="Rector Agent"
              width={100}
              height={100}
            />
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col space-y-6">
          {renderStepContent()}

          <div className="space-y-4">
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={goToPreviousStep}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              <Button
                className="text-lime-800 bg-lime-100 border-lime-300 border hover:bg-lime-200"
                onClick={goToNextStep}
                disabled={currentStep === 1 && !selectedPlace}
              >
                {currentStep === totalSteps ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
