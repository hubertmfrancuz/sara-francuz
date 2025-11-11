"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Header from "./Header"
import LoadingScreen from "./LoadingScreen"
import SmoothScroll from "./SmoothScroll"

interface Collection {
  title: string
  slug: { current: string }
}

interface ClientLayoutProps {
  collections: Collection[]
  children: React.ReactNode
}

export default function ClientLayout({
  collections,
  children,
}: ClientLayoutProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // TEMPORARY: Always show loading animation for testing
    // TODO: Re-enable sessionStorage check when done testing
    // Check if this is a fresh page load (not navigation)
    // const hasLoaded = sessionStorage.getItem('hasLoadedBefore')
    // if (hasLoaded) {
    //   // Skip loading animation on navigation
    //   setIsLoading(false)
    //   setShowContent(true)
    // } else {
    //   // Mark that we've loaded once
    //   sessionStorage.setItem('hasLoadedBefore', 'true')
    // }
  }, [])

  const handleLoadingComplete = () => {
    setShowContent(true)
  }

  return (
    <>
      {/* Smooth Scroll */}
      <SmoothScroll />

      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      <AnimatePresence>
        {showContent && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Header collections={collections} />
            </motion.div>

            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='pt-[0px]'
            >
              {children}
            </motion.main>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
