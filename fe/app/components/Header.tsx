"use client"

import { useState } from "react"
import Menu from "./Menu"
import { useCart } from "@/app/context/CartContext"

interface Collection {
  title: string
  slug: { current: string }
}

interface HeaderProps {
  collections: Collection[]
}

export default function Header({ collections }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [removePadding, setRemovePadding] = useState(false)
  const { totalItems, openCart } = useCart()

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
      setRemovePadding(false)
    }
  }

  const handleCartClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false)
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
      <header className='fixed top-0 md:top-400 left-0 right-0 z-50 flex justify-center'>
        <div className={`w-full bg-yellow-200 px-400 pt-400 md:w-[600px] ${removePadding ? '' : 'pb-400'}`}>
          <div className='flex items-center justify-between px-300 leading-4 border-l border-r border-graphite-900 relative'>
            {/* Left: Menu/Close Button */}
            <button
              onClick={handleMenuToggle}
              className='text-herbik-md italic relative group cursor-pointer'
            >
              {isMenuOpen ? "Close" : "Menu"}
              <span className='absolute -bottom-100 left-0 w-0 h-[1px] bg-graphite-900 transition-all duration-300 ease-out group-hover:w-full' />
            </button>

            {/* Center: Logo/Title - Absolutely positioned */}
            <h1 className='text-herbik-lg absolute left-1/2 -translate-x-1/2'>
              Sara Francuz
            </h1>

            {/* Right: Cart */}
            <button onClick={handleCartClick} className='text-herbik-md italic relative group cursor-pointer'>
              Cart {totalItems > 0 && `(${totalItems})`}
              <span className='absolute -bottom-100 left-0 w-0 h-[1px] bg-graphite-900 transition-all duration-300 ease-out group-hover:w-full' />
            </button>
          </div>
        </div>
      </header>

      {/* Menu Overlay */}
      <Menu
        isOpen={isMenuOpen}
        onClose={() => {
          setIsMenuOpen(false)
          setRemovePadding(false)
        }}
        collections={collections}
      />
    </>
  )
}
