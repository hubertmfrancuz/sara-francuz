"use client"

import { useEffect } from "react"
import Lenis from "lenis"

export default function SmoothScroll() {
  useEffect(() => {
    // Initialize Lenis with subtle settings
    const lenis = new Lenis({
      duration: 0.8, // Subtle: lower values = faster/less smooth, higher = slower/more smooth
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: "vertical", // Vertical scrolling
      gestureOrientation: "vertical",
      smoothWheel: true, // Enable smooth scrolling with mouse wheel
      wheelMultiplier: 1, // Mouse wheel sensitivity (1 = normal)
      touchMultiplier: 2, // Touch scroll sensitivity
      infinite: false, // No infinite scroll
    })

    // Update Lenis on each animation frame
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Cleanup
    return () => {
      lenis.destroy()
    }
  }, [])

  return null
}
