"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Header from "./Header"
import Footer from "./Footer"
import Cart from "./Cart"
import LoadingScreen from "./LoadingScreen"
import NavigationOverlay from "./NavigationOverlay"
import { useIsNavigating } from "./ViewTransitionLink"

interface Collection {
  title: string
  slug: { current: string }
}

interface ContactInfo {
  contactEmail: string
  instagramHandle: string
}

interface ClientLayoutProps {
  collections: Collection[]
  contactInfo: ContactInfo
  children: React.ReactNode
}

export default function ClientLayout({
  collections,
  contactInfo,
  children,
}: ClientLayoutProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const isNavigating = useIsNavigating()

  useEffect(() => {
    // TEMPORARY: Always show loading animation for testing
    // TODO: Re-enable sessionStorage check when done testing
    // Check if this is a fresh page load (not navigation)
    const hasLoaded = sessionStorage.getItem("hasLoadedBefore")
    if (hasLoaded) {
      // Skip loading animation on navigation
      setIsLoading(false)
      setShowContent(true)
    } else {
      // Mark that we've loaded once
      sessionStorage.setItem("hasLoadedBefore", "true")
    }
  }, [])

  const handleLoadingComplete = () => {
    setShowContent(true)
  }

  return (
    <>
      {/* Navigation Overlay */}
      <NavigationOverlay />

      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* Header - has its own animation */}
      {showContent && (
        <Header collections={collections} contactInfo={contactInfo} />
      )}

      <AnimatePresence mode="wait">
        {showContent && (
          <>
            <motion.main
              key="main-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: isNavigating ? 0 : 1 }}
              transition={{ duration: isNavigating ? 0.15 : 0.5, delay: isNavigating ? 0 : 0.2 }}
              className='pt-[0px]'
            >
              {children}
            </motion.main>

            <motion.div
              key="footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: isNavigating ? 0 : 1 }}
              transition={{ duration: isNavigating ? 0.15 : 0.5, delay: isNavigating ? 0 : 0.3 }}
            >
              <Footer collections={collections} contactInfo={contactInfo} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <Cart contactInfo={contactInfo} />
    </>
  )
}
