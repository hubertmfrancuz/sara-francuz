'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface HeroVideoProps {
  videoUrl: string
  posterUrl?: string
}

export default function HeroVideo({ videoUrl, posterUrl }: HeroVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const customEase = [0.65, 0.05, 0.36, 1] as [number, number, number, number]

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleCanPlay = () => {
      setIsLoaded(true)
    }

    // Check if video is already loaded
    if (video.readyState >= 3) {
      setIsLoaded(true)
    }

    video.addEventListener('canplay', handleCanPlay)
    return () => {
      video.removeEventListener('canplay', handleCanPlay)
    }
  }, [])

  return (
    <motion.video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      poster={posterUrl}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 1.2, ease: customEase }}
      className='h-full w-full object-cover'
      style={{ transform: 'translateZ(0)' }}
    >
      <source src={videoUrl} type='video/mp4' />
    </motion.video>
  )
}
