"use client"

import { useState } from "react"
import Link from "next/link"

interface Collection {
  title: string
  slug: { current: string }
}

interface MenuProps {
  isOpen: boolean
  onClose: () => void
  collections: Collection[]
}

export default function Menu({ isOpen, onClose, collections }: MenuProps) {
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false)

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-40 bg-yellow-200'>
      <div className='mx-auto px-400 py-400 flex h-full max-w-full flex-col md:max-w-[500px]'>
        {/* Spacer for header */}
        <div className='h-[52px]' />

        {/* Menu Content */}
        <nav className='flex flex-1 flex-col border-l border-r border-graphite-900 px-300 py-100'>
          {/* Collections with Dropdown */}
          <div className='border-b border-graphite-900'>
            <button
              onClick={() => setIsCollectionsOpen(!isCollectionsOpen)}
              className='w-full py-500 text-center text-herbik-lg italic'
            >
              Collections
            </button>
            {isCollectionsOpen && collections.length > 0 && (
              <div className='pb-400'>
                {collections.map(collection => (
                  <Link
                    key={collection.slug.current}
                    href={`/collections/${collection.slug.current}`}
                    onClick={onClose}
                    className='block py-200 text-center text-herbik-base'
                  >
                    {collection.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Projects */}
          <Link
            href='/projects'
            onClick={onClose}
            className='border-b border-graphite-900 py-500 text-center text-herbik-lg italic'
          >
            Projects
          </Link>

          {/* Shop */}
          <Link
            href='/shop'
            onClick={onClose}
            className='border-b border-graphite-900 py-500 text-center text-herbik-lg italic'
          >
            Shop
          </Link>

          {/* About */}
          <Link
            href='/about'
            onClick={onClose}
            className='border-b border-graphite-900 py-500 text-center text-herbik-lg italic'
          >
            About
          </Link>

          {/* FAQ */}
          <Link
            href='/faq'
            onClick={onClose}
            className='border-b border-graphite-900 py-500 text-center text-herbik-lg italic'
          >
            FAQ
          </Link>

          {/* Spacer */}
          <div className='flex-1' />

          {/* Contact Footer */}
          <div className='text-center'>
            <p className='mb-400 font-cutive text-cutive uppercase tracking-wide'>
              Contact
            </p>
            <p className='text-herbik-md'>
              Email:{" "}
              <a href='mailto:hello@sarafrancuz.com' className='underline'>
                hello@sarafrancuz.com
              </a>
            </p>
            <p className='text-herbik-md'>
              Instagram:{" "}
              <a
                href='https://instagram.com/sarafrancuz'
                target='_blank'
                rel='noopener noreferrer'
                className='underline'
              >
                @sarafrancuz
              </a>
            </p>
          </div>
        </nav>
      </div>
    </div>
  )
}
