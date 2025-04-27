'use client'
import { useSearchParams } from 'next/navigation'
import DefaultFlow from '@/components/flow/default-flow'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useState, useEffect } from 'react'
import { ProductInfo } from '@/components/product-info'

export default function Flow() {
  const searchParams = useSearchParams()
  const url = searchParams.get('url')
  const [tags, setTags] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchTags = async () => {
      if (!url) return

      setLoading(true)
      try {
        const encodedUrl = encodeURIComponent(url)
        const response = await fetch(
          `https://rector-api.vercel.app/tags?url=${encodedUrl}`
        )
        const data = await response.json()

        if (data.tags && Array.isArray(data.tags)) {
          setTags(
            data.tags.map((tag: string) => tag.replace(/```\n\[|\]\n```/g, ''))
          )
        }
      } catch (error) {
        console.error('Failed to fetch tags:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTags()
  }, [url])

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 p-4 pb-0 flex flex-col space-y-4 w-full">
        <div className="flex justify-between w-full">
          <div className="flex flex-wrap gap-2 pt-2 py-4">
            {loading ? (
              <>
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-14 rounded-full" />
              </>
            ) : tags.length > 0 ? (
              tags.map((item) => (
                <Badge
                  variant="outline"
                  key={item}
                  className="rounded-full px-2 font-normal"
                >
                  <p>{item.replace(/["']/g, '')}</p>
                </Badge>
              ))
            ) : (
              <p></p>
            )}
          </div>
        </div>
        <DefaultFlow />
      </div>
      <ProductInfo />
    </div>
  )
}
