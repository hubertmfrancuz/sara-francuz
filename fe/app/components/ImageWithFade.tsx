'use client'

import Image, { ImageProps } from 'next/image'
import { useState, useEffect, useRef } from 'react'

interface ImageWithFadeProps extends ImageProps {
  onLoadComplete?: () => void
}

export default function ImageWithFade({ onLoadComplete, ...props }: ImageWithFadeProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const hasCalledCallback = useRef(false)

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
  }, [props.src])

  return (
    <Image
      {...props}
      onLoad={(e) => {
        handleLoad()
        // Call original onLoad if provided
        if (props.onLoad) {
          props.onLoad(e)
        }
      }}
      onLoadingComplete={() => {
        // This fires for both cached and fresh images
        handleLoad()
      }}
      className={`transition-opacity duration-700 ease-out ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      } ${props.className || ''}`}
    />
  )
}
