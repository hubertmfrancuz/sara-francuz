"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Menu from "./Menu"
import ViewTransitionLink from "./ViewTransitionLink"
import { useCart } from "@/app/context/CartContext"

interface Collection {
  title: string
  slug: { current: string }
}

interface ContactInfo {
  contactEmail: string
  instagramHandle: string
}

interface HeaderProps {
  collections: Collection[]
  contactInfo: ContactInfo
}

export default function Header({ collections, contactInfo }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [removePadding, setRemovePadding] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const { totalItems, openCart } = useCart()

  const customEase = [0.65, 0.05, 0.36, 1] as [number, number, number, number]

  // Mark as animated on mount
  useEffect(() => {
    const animated = sessionStorage.getItem('header-animated')
    if (!animated) {
      sessionStorage.setItem('header-animated', 'true')
      setHasAnimated(false)
    } else {
      setHasAnimated(true)
    }
  }, [])

  const handleMenuToggle = () => {
    if (!isMenuOpen) {
      // Opening menu
      setIsMenuOpen(true)
      // Remove padding after clip-path animation (0.6s)
      setTimeout(() => {
        setRemovePadding(true)
      }, 600)
    } else {
      // Closing menu
      setIsMenuOpen(false)
      // Restore padding immediately to animate during menu fade-out
      setRemovePadding(false)
    }
  }

  const handleCartClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false)
      // Restore padding immediately to animate during menu fade-out
      setRemovePadding(false)
      // Wait for menu to close before opening cart
      setTimeout(() => {
        openCart()
      }, 700) // Match menu exit animation duration
    } else {
      openCart()
    }
  }

  return (
    <>
      {/* Header Bar */}
      <motion.header
        initial={hasAnimated ? false : { opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: customEase }}
        className='fixed top-0 md:top-400 left-0 right-0 z-[10002] flex justify-center'
      >
        <div className={`w-full bg-yellow-200 px-400 pt-400 md:w-[500px] transition-[padding] duration-100 ease-[cubic-bezier(0.65,0.05,0.36,1)] ${removePadding ? '' : 'pb-400'}`}>
          <motion.div
            initial={hasAnimated ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: customEase }}
            className='flex items-center justify-between px-300 leading-4 border-l border-r border-graphite-900 relative'
          >
            {/* Left: Menu/Close Button */}
            <button
              onClick={handleMenuToggle}
              className='text-herbik-md italic relative group cursor-pointer'
            >
              {isMenuOpen ? "Close" : "Menu"}
              <span className='absolute -bottom-100 left-0 w-0 h-[1px] bg-graphite-900 transition-all duration-300 ease-out group-hover:w-full' />
            </button>

            {/* Center: Logo/Title - Absolutely positioned */}
            <ViewTransitionLink href='/' className='text-herbik-lg absolute left-1/2 -translate-x-1/2'>
              Sara Francuz
            </ViewTransitionLink>

            {/* Right: Cart */}
            <button onClick={handleCartClick} className='text-herbik-md italic relative group cursor-pointer'>
              Cart {totalItems > 0 && `(${totalItems})`}
              <span className='absolute -bottom-100 left-0 w-0 h-[1px] bg-graphite-900 transition-all duration-300 ease-out group-hover:w-full' />
            </button>
          </motion.div>
        </div>
      </motion.header>

      {/* Menu Overlay */}
      <Menu
        isOpen={isMenuOpen}
        onClose={() => {
          setIsMenuOpen(false)
          // Restore padding immediately to animate during menu fade-out
          setRemovePadding(false)
        }}
        collections={collections}
        contactInfo={contactInfo}
      />
    </>
  )
}
