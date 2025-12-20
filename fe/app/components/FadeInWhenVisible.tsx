'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface FadeInWhenVisibleProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}

export default function FadeInWhenVisible({
  children,
  delay = 0,
  duration = 0.6,
  className = ''
}: FadeInWhenVisibleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration, delay, ease: [0.65, 0.05, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
