'use client'

import Image, { ImageProps } from 'next/image'
import { useState, useEffect, useRef } from 'react'

interface ImageWithFadeProps extends ImageProps {
  onLoadComplete?: () => void
}

export default function ImageWithFade({ onLoadComplete, ...props }: ImageWithFadeProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const hasCalledCallback = useRef(false)
  const loadTimeoutRef = useRef<NodeJS.Timeout>()

  const handleLoad = () => {
    setIsLoaded(true)
    // Only call the callback once
    if (onLoadComplete && !hasCalledCallback.current) {
      hasCalledCallback.current = true
      onLoadComplete()
    }
  }

  // Check if image is already cached/loaded on mount
  useEffect(() => {
    // Reset the callback flag when the src changes
    hasCalledCallback.current = false
    setIsLoaded(false)

    // Safety timeout: if image doesn't load within 100ms, show it anyway
    // This handles cases where cached images don't fire events
    loadTimeoutRef.current = setTimeout(() => {
      if (!isLoaded) {
        handleLoad()
      }
    }, 100)

    return () => {
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current)
      }
    }
  }, [props.src])

  return (
    <Image
      {...props}
      onLoad={(e) => {
        if (loadTimeoutRef.current) {
          clearTimeout(loadTimeoutRef.current)
        }
        handleLoad()
        // Call original onLoad if provided
        if (props.onLoad) {
          props.onLoad(e)
        }
      }}
      onLoadingComplete={() => {
        if (loadTimeoutRef.current) {
          clearTimeout(loadTimeoutRef.current)
        }
        // This fires for both cached and fresh images
        handleLoad()
      }}
      className={`transition-opacity duration-700 ease-out ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      } ${props.className || ''}`}
    />
  )
}
