"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ComponentProps, MouseEvent, useState, useEffect } from "react"

type ViewTransitionLinkProps = ComponentProps<typeof Link>

// Global loading state
let isNavigating = false
let navigationListeners: Set<(state: boolean) => void> = new Set()

export function setNavigating(state: boolean) {
  isNavigating = state
  navigationListeners.forEach(listener => listener(state))
}

export function useIsNavigating() {
  const [navigating, setNavigating] = useState(isNavigating)

  useEffect(() => {
    navigationListeners.add(setNavigating)
    return () => {
      navigationListeners.delete(setNavigating)
    }
  }, [])

  return navigating
}

export default function ViewTransitionLink({
  href,
  children,
  className,
  ...props
}: ViewTransitionLinkProps) {
  const router = useRouter()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Don't intercept if it's a modifier click (cmd/ctrl/shift)
    if (e.metaKey || e.ctrlKey || e.shiftKey) {
      return
    }

    e.preventDefault()

    // Set loading state immediately
    setNavigating(true)

    // Wait for overlay to be visible, then navigate
    setTimeout(() => {
      router.push(href.toString())

      // Keep overlay visible for minimum time to ensure new page renders
      setTimeout(() => {
        setNavigating(false)
      }, 800)
    }, 150)
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`cursor-pointer ${className || ''}`}
      {...props}
    >
      {children}
    </Link>
  )
}
