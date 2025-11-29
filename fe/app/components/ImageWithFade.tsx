'use client'

import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

interface ImageWithFadeProps extends ImageProps {
  onLoadComplete?: () => void
}

export default function ImageWithFade({ onLoadComplete, ...props }: ImageWithFadeProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <Image
      {...props}
      onLoad={(e) => {
        setIsLoaded(true)
        // Call onLoadComplete callback
        if (onLoadComplete) {
          onLoadComplete()
        }
        // Call original onLoad if provided
        if (props.onLoad) {
          props.onLoad(e)
        }
      }}
      className={`transition-opacity duration-700 ease-out ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      } ${props.className || ''}`}
    />
  )
}
