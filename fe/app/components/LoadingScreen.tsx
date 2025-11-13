"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true)
  const customEase = [0.77, 0, 0.18, 1] as [number, number, number, number]

  useEffect(() => {
    // Hold initial state for 1.5s, then start transition
    const timer = setTimeout(() => {
      setIsVisible(false)
      // Call onComplete after transition finishes (0.8s)
      setTimeout(onComplete, 800)
    }, 1500)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.4, ease: customEase }}
          className='fixed inset-0 z-[100] bg-yellow-200'
        >
          {/* Centered container for borders */}
          <motion.div
            initial={{
              position: "fixed",
              top: "0",
              left: "50%",
              transform: "translateX(-50%)",
              width: "100%",
              maxWidth: "600px",
              height: "100vh",
            }}
            exit={{
              position: "fixed",
              left: "50%",
              width: "100%",
              maxWidth: "600px",
              height: "48px",
            }}
            transition={{ duration: 0.8, ease: customEase }}
            className='z-[101]'
            style={{ padding: "1rem" }}
          >
            {/* Inner container with borders */}
            <div className='relative h-full' style={{ padding: "0 0.75rem" }}>
              {/* Left Border */}
              <div className='absolute left-0 top-0 h-full w-[1px] bg-graphite-900' />

              {/* Right Border */}
              <div className='absolute right-0 top-0 h-full w-[1px] bg-graphite-900' />
            </div>
          </motion.div>

          {/* Sara Francuz Text */}
          <motion.h1
            initial={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              opacity: 1,
            }}
            exit={{
              position: "fixed",
              top: "1rem",
              left: "50%",
              transform: "translate(-50%, 0)",
              y: "1rem",
              opacity: 0,
            }}
            transition={{
              duration: 0.8,
              ease: customEase,
              opacity: { duration: 0.1, delay: 0.4 },
            }}
            className='text-herbik-lg z-[102]'
          >
            Sara Francuz
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
