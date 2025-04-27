'use client'
import React, { useEffect, useState } from 'react'
import { Loader } from '@/components/loader'
import { ProductData, SupplyChainData } from '@/types/supply-chain'
import exampleProduct from '@/utils/example-product.json'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export function ProductInfo() {
  const [data, setData] = useState<ProductData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [parsedSupplyChain, setParsedSupplyChain] =
    useState<SupplyChainData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch('https://rector-api.vercel.app/analyze', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     product: "Men's Better Sweater® Fleece Jacket",
        //   }),
        // })

        // if (!response.ok) {
        //   throw new Error('Failed to fetch data')
        // }

        // const jsonData = await response.json()
        setData(exampleProduct)

        try {
          const supplyChainStr =
            exampleProduct.result.supply_chain_data.ai_response
          const startIndex = supplyChainStr.indexOf('{')
          const endIndex = supplyChainStr.lastIndexOf('}') + 1
          const jsonStr = supplyChainStr.slice(startIndex, endIndex)
          setParsedSupplyChain(JSON.parse(jsonStr))
        } catch (e) {
          console.error('Failed to parse supply chain data:', e)
        }

        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 h-fit w-[400px] z-50">
      <div className="flex-1 rounded-md border bg-background overflow-hidden">
        <div className="h-full overflow-auto">
          {loading && (
            <div className="flex items-center justify-center min-h-[400px]">
              <Loader />
            </div>
          )}
          {error && (
            <div className="flex items-center justify-center h-full">
              <p className="text-sm text-red-500">{error}</p>
            </div>
          )}
          {!loading && !error && data && (
            <div className="p-6 space-y-4">
              <div>
                <h2 className="text-xl text-lime-800 font-semibold">
                  {data.result.product_name}
                </h2>
                <p className="text-lime-600 text-xs">{data.result.company}</p>
              </div>

              <div className=" p-4 rounded-md">
                <div className="flex items-center justify-between flex-row gap-4">
                  <span className={`text-xl text-lime-700 font-bold`}>
                    {data.result.sustainability_score}/100
                  </span>
                  <p className="text-sm text-gray-600">
                    {data.result.score_explanation}
                  </p>
                </div>
              </div>

              {parsedSupplyChain && (
                <div className="space-y-4">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="sustainability">
                      <AccordionTrigger>
                        Sustainability Initiatives
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-square list-inside space-y-1">
                          {parsedSupplyChain.sustainability_initiatives.map(
                            (initiative, index) => (
                              <li key={index} className="text-sm text-gray-600">
                                {initiative}
                              </li>
                            )
                          )}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="certifications">
                      <AccordionTrigger>Certifications</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-square list-inside space-y-1">
                          {parsedSupplyChain.certifications.map(
                            (cert, index) => (
                              <li key={index} className="text-sm text-gray-600">
                                {cert}
                              </li>
                            )
                          )}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="carbon">
                      <AccordionTrigger>Carbon Footprint</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-gray-600">
                          {parsedSupplyChain.carbon_footprint_estimate.value}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                          {parsedSupplyChain.carbon_footprint_estimate.remarks}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
