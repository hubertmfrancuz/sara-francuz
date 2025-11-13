'use client'

import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

export default function ImageWithFade(props: ImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <Image
      {...props}
      onLoad={() => {
        setIsLoaded(true)
        // Call original onLoad if provided
        if (props.onLoad) {
          props.onLoad(props.onLoad as any)
        }
      }}
      className={`transition-opacity duration-500 ease-out ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      } ${props.className || ''}`}
    />
  )
}
