"use client"

import { useState } from "react"
import Menu from "./Menu"

interface Collection {
  title: string
  slug: { current: string }
}

interface HeaderProps {
  collections: Collection[]
}

export default function Header({ collections }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      {/* Header Bar */}
      <header className='fixed top-0 left-0 right-0 z-50 bg-yellow-200 px-400 py-400'>
        <div className='mx-auto flex max-w-full items-center justify-between px-300 leading-4 border-l border-r border-graphite-900 md:max-w-[500px]'>
          {/* Left: Menu/Close Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='text-herbik-md italic'
          >
            {isMenuOpen ? "Close" : "Menu"}
          </button>

          {/* Center: Logo/Title */}
          <h1 className='text-herbik-lg'>Sara Francuz</h1>

          {/* Right: Cart */}
          <button className='text-herbik-md italic'>Cart</button>
        </div>
      </header>

      {/* Menu Overlay */}
      <Menu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        collections={collections}
      />
    </>
  )
}
