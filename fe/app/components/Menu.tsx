"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

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

  // Custom easing
  const customEase = [0.77, 0, 0.18, 1]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: customEase }}
          className='fixed inset-0 z-40 bg-yellow-200'
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: customEase }}
            className='mx-auto px-400 py-400 flex h-full max-w-full flex-col md:max-w-[500px]'
          >
            {/* Menu Content */}
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2, ease: customEase }}
              className='relative flex flex-1 flex-col px-300 py-100'
            >
              {/* Animated Left Border */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ duration: 0.8, delay: 0.15, ease: customEase }}
                className='absolute left-0 top-0 w-[1px] bg-graphite-900'
              />

              {/* Animated Right Border */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ duration: 0.8, delay: 0.15, ease: customEase }}
                className='absolute right-0 top-0 w-[1px] bg-graphite-900'
              />
              {/* Collections with Dropdown */}
              <div className='border-b border-graphite-900'>
                <button
                  onClick={() => setIsCollectionsOpen(!isCollectionsOpen)}
                  className='w-full py-500 text-center text-herbik-xl italic'
                >
                  Collections
                </button>
                <AnimatePresence>
                  {isCollectionsOpen && collections.length > 0 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: customEase }}
                      style={{ overflow: "hidden" }}
                      className='pb-400'
                    >
                      {collections.map((collection, index) => (
                        <motion.div
                          key={collection.slug.current}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.4,
                            delay: index * 0.05,
                            ease: customEase,
                          }}
                        >
                          <Link
                            href={`/collections/${collection.slug.current}`}
                            onClick={onClose}
                            className='block py-200 text-center text-herbik-base'
                          >
                            {collection.title}
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Projects */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25, ease: customEase }}
              >
                <Link
                  href='/projects'
                  onClick={onClose}
                  className='border-b border-graphite-900 py-500 text-center text-herbik-xl italic block'
                >
                  Projects
                </Link>
              </motion.div>

              {/* Shop */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease: customEase }}
              >
                <Link
                  href='/shop'
                  onClick={onClose}
                  className='border-b border-graphite-900 py-500 text-center text-herbik-xl italic block'
                >
                  Shop
                </Link>
              </motion.div>

              {/* About */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35, ease: customEase }}
              >
                <Link
                  href='/about'
                  onClick={onClose}
                  className='border-b border-graphite-900 py-500 text-center text-herbik-xl italic block'
                >
                  About
                </Link>
              </motion.div>

              {/* FAQ */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4, ease: customEase }}
              >
                <Link
                  href='/faq'
                  onClick={onClose}
                  className='border-b border-graphite-900 py-500 text-center text-herbik-xl italic block'
                >
                  FAQ
                </Link>
              </motion.div>

              {/* Spacer */}
              <div className='flex-1' />

              {/* Contact Footer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: customEase }}
                className='text-center'
              >
                <p className='mb-400 font-cutive text-cutive uppercase tracking-wide'>
                  Contact
                </p>
                <p className='text-herbik-base leading-400'>
                  Email:{" "}
                  <a href='mailto:hello@sarafrancuz.com' className=''>
                    hello@sarafrancuz.com
                  </a>
                </p>
                <p className='text-herbik-base'>
                  Instagram:{" "}
                  <a
                    href='https://instagram.com/sarafrancuz'
                    target='_blank'
                    rel='noopener noreferrer'
                    className=''
                  >
                    @sarafrancuz
                  </a>
                </p>
              </motion.div>
            </motion.nav>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
