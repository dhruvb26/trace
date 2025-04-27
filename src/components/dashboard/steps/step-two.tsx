import { ScrapeData } from '@/types/scrape'
import { useState, useEffect } from 'react'
import { Loader } from '@/components/loader'
import ReactMarkdown from 'react-markdown'

interface StepTwoProps {
  selectedPlace: ScrapeData | null
}

export function StepTwo({ selectedPlace }: StepTwoProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<string>('')
  const [citations, setCitations] = useState<string | null>(null)

  useEffect(() => {
    if (selectedPlace) {
      fetchAlternatives()
    }
  }, [selectedPlace])

  const fetchAlternatives = async () => {
    if (!selectedPlace) {
      setError('No place selected')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('https://rector-api.vercel.app/query', {
        method: 'POST',
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: selectedPlace.name }),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch alternatives')
      }

      const data = await response.json()

      setData(data.alternatives.choices[0].message.content)
      setCitations(data.alternatives.citations.join('\n'))
      setIsLoading(false)
      return
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setIsLoading(false)
    }
  }

  return (
    <div className="py-8 h-[500px] space-y-8 overflow-auto">
      <div className="prose max-w-none">
        {selectedPlace ? (
          <>
            <h1 className="text-xl text-lime-800 font-medium font-mono truncate max-w-sm">
              {selectedPlace.name}
            </h1>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader />
              </div>
            ) : (
              <>
                {error && <p className="text-gray-500 text-sm mt-2">{error}</p>}
              </>
            )}
          </>
        ) : (
          <p className="text-gray-500 text-sm">
            Please select a place in step one first.
          </p>
        )}

        {data && !isLoading && (
          <div className="text-sm mt-6">
            <div className="markdown-content">
              <ReactMarkdown>{data}</ReactMarkdown>
            </div>
            <style jsx>{`
              .markdown-content :global(p) {
                margin-bottom: 1.5em;
              }
            `}</style>
          </div>
        )}

        {citations && (
          <div className="mt-8">
            <div className="overflow-x-auto pb-4">
              <div className="flex space-x-4 min-w-full justify-center">
                {citations.split('\n').map((citation, i) => (
                  <a
                    key={i}
                    href={citation}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 p-4 bg-lime-100 border border-lime-300 rounded-md hover:bg-lime-200 transition-colors flex flex-col justify-center items-center"
                  >
                    <div className="w-full h-[90%] flex items-center justify-center">
                      <div className="text-sm text-gray-700 text-center line-clamp-3">
                        {new URL(citation).hostname}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
