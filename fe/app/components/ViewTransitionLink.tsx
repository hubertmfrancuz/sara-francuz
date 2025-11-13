"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ComponentProps, MouseEvent } from "react"

type ViewTransitionLinkProps = ComponentProps<typeof Link>

export default function ViewTransitionLink({
  href,
  children,
  className,
  ...props
}: ViewTransitionLinkProps) {
  const router = useRouter()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Check if browser supports View Transitions
    if (!document.startViewTransition) {
      // Fallback: just use normal navigation
      return
    }

    // Don't intercept if it's a modifier click (cmd/ctrl/shift)
    if (e.metaKey || e.ctrlKey || e.shiftKey) {
      return
    }

    e.preventDefault()

    // Start view transition
    document.startViewTransition(() => {
      router.push(href.toString())
    })
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
