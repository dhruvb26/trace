'use client'

import { useState } from 'react'
import { LayoutGroup, motion } from 'framer-motion'
import { TextRotate } from '@/components/ui/text-rotate'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { KeyReturn } from '@phosphor-icons/react/dist/ssr'
import Floating, { FloatingElement } from '@/components/ui/parallax-floating'
import { exampleImages } from '@/utils/image'
import { useRouter } from 'next/navigation'

function LandingHero() {
  const [link, setLink] = useState('')
  const router = useRouter()

  const handleSubmit = () => {
    router.push(`/flow?url=${link}`)
  }

  return (
    <section className="w-full h-screen overflow-hidden md:overflow-hidden flex flex-col items-center justify-center relative">
      <Floating sensitivity={-0.5} className="h-full">
        <FloatingElement
          depth={4}
          className="top-[90%] left-[6%] md:top-[80%] md:left-[8%]"
        >
          <motion.img
            src={exampleImages[2].url}
            alt={exampleImages[2].title}
            className="w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 lg:w-64 lg:h-64 object-cover -rotate-[4deg] hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          />
        </FloatingElement>

        <FloatingElement
          depth={1}
          className="top-[78%] left-[83%] md:top-[68%] md:left-[83%]"
        >
          <motion.img
            src={exampleImages[4].url}
            alt={exampleImages[4].title}
            className="w-44 h-44 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rotate-[19deg] rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          />
        </FloatingElement>
      </Floating>

      <div className="flex flex-col justify-center items-center w-[250px] sm:w-[300px] md:w-[500px] lg:w-[700px] z-50 pointer-events-auto">
        <motion.h1
          className="text-6xl text-center w-full justify-center items-center flex-col flex whitespace-pre leading-tight font-calendas tracking-tight space-y-1 md:space-y-2"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: 'easeOut', delay: 0.3 }}
        >
          <span>Fix your </span>
          <LayoutGroup>
            <motion.span layout className="flex whitespace-pre">
              <motion.span
                layout
                className="flex whitespace-pre"
                transition={{ type: 'spring', damping: 30, stiffness: 400 }}
              >
                supply chain{' '}
              </motion.span>
              <TextRotate
                texts={[
                  'instantly',
                  'efficiently',
                  'smartly 🧠',
                  'easily',
                  '⚡ fast',
                  '🔄 smoothly',
                  'securely',
                  '📈 profitably',
                  'now 🚀',
                  'automatically',
                  'seamlessly ✨',
                  'reliably 💪',
                ]}
                mainClassName="overflow-hidden pr-3 text-lime-700 py-0 pb-2 md:pb-4 rounded-xl"
                staggerDuration={0.03}
                staggerFrom="last"
                rotationInterval={3000}
                transition={{ type: 'spring', damping: 30, stiffness: 400 }}
              />
            </motion.span>
          </LayoutGroup>
        </motion.h1>
        <motion.p
          className="text-sm sm:text-lg md:text-xl lg:text-2xl text-center font-overusedGrotesk pt-4 sm:pt-8 md:pt-10 lg:pt-12"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: 'easeOut', delay: 0.5 }}
        >
          transform your supply chain operations with our intelligent platform.
          start optimizing in minutes.
        </motion.p>

        <div className="flex flex-row justify-center space-x-4 items-center mt-10 sm:mt-16 md:mt-20 lg:mt-20 min-w-full">
          <Textarea
            className="w-full p-4 resize-none shadow-xl text-lg"
            placeholder="Drop in the link and we'll get to work"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <Button
            className="text-lime-700 bg-lime-100 border-lime-300 border shadow-xl cursor-pointer hover:bg-lime-200 hover:border-lime-400 hover:shadow-xl transition-all duration-100"
            size="lg"
            onClick={handleSubmit}
            disabled={link.length === 0}
          >
            Let's go
            <KeyReturn weight="fill" size={14} />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default LandingHero
