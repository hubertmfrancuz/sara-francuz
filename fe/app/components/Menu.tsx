"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import ViewTransitionLink from "./ViewTransitionLink"
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
  const pathname = usePathname()

  // Custom easing
  const customEase = [0.65, 0.05, 0.36, 1]

  // Close menu when route changes
  useEffect(() => {
    if (isOpen) {
      onClose()
    }
  }, [pathname])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay - same as cart */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: customEase }}
            onClick={onClose}
            className='fixed inset-0 z-40 bg-black mix-blend-hue'
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: customEase }}
            onClick={onClose}
            className='fixed inset-0 z-[39] bg-yellow-700'
          />

          {/* Menu content */}
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)", opacity: 1 }}
            animate={{ clipPath: "inset(0 0 0 0)", opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              clipPath: { duration: 0.6, ease: customEase },
              opacity: { duration: 0.3, ease: customEase },
            }}
            className='fixed inset-0 z-40 flex justify-center bg-yellow-200 md:bg-transparent pointer-events-none md:top-400 md:bottom-400 md:inset-auto md:left-0 md:right-0'
          >
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: customEase }}
              className='w-full px-400 py-400 flex h-full flex-col md:w-[600px] md:bg-yellow-200 pointer-events-auto md:h-auto'
            >
              {/* Menu Content */}
              <motion.nav
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.6, ease: customEase }}
                className='relative flex flex-1 flex-col pt-1000 px-300 py-100'
              >
                {/* Animated Left Border */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "100%" }}
                  transition={{ duration: 0.5, delay: 0.6, ease: customEase }}
                  className='absolute left-0 top-0 w-[1px] bg-graphite-900'
                />

                {/* Animated Right Border */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "100%" }}
                  transition={{ duration: 0.5, delay: 0.6, ease: customEase }}
                  className='absolute right-0 top-0 w-[1px] bg-graphite-900'
                />
                {/* Collections with Dropdown */}
                <div className='border-b border-graphite-900'>
                  <button
                    onClick={() => setIsCollectionsOpen(!isCollectionsOpen)}
                    className='w-full py-500 text-center text-herbik-xl italic cursor-pointer'
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
                            <ViewTransitionLink
                              href={`/collections/${collection.slug.current}`}
                              className='block py-200 text-center text-herbik-base'
                            >
                              {collection.title}
                            </ViewTransitionLink>
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
                  <ViewTransitionLink
                    href='/projects'
                    className='border-b border-graphite-900 py-500 text-center text-herbik-xl italic block'
                  >
                    Projects
                  </ViewTransitionLink>
                </motion.div>

                {/* Shop */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3, ease: customEase }}
                >
                  <ViewTransitionLink
                    href='/shop'
                    className='border-b border-graphite-900 py-500 text-center text-herbik-xl italic block'
                  >
                    Shop
                  </ViewTransitionLink>
                </motion.div>

                {/* About */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35, ease: customEase }}
                >
                  <ViewTransitionLink
                    href='/about'
                    className='border-b border-graphite-900 py-500 text-center text-herbik-xl italic block'
                  >
                    About
                  </ViewTransitionLink>
                </motion.div>

                {/* FAQ */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4, ease: customEase }}
                >
                  <ViewTransitionLink
                    href='/faq'
                    className='border-b border-graphite-900 py-500 text-center text-herbik-xl italic block'
                  >
                    FAQ
                  </ViewTransitionLink>
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
        </>
      )}
    </AnimatePresence>
  )
}
