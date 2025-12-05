"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useCart } from "@/app/context/CartContext"

interface ContactInfo {
  contactEmail: string
  instagramHandle: string
}

interface CartProps {
  contactInfo: ContactInfo
}

export default function Cart({ contactInfo }: CartProps) {
  const {
    items,
    removeItem,
    updateQuantity,
    totalItems,
    isCartOpen,
    closeCart,
  } = useCart()

  const customEase = [0.65, 0.05, 0.36, 1] as const

  // Lock scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isCartOpen])

  const generateMailtoLink = () => {
    const subject = "Inquiry from Sara Francuz Shop"
    let body =
      "Hello,\n\nI would like to inquire about the following items:\n\n"

    items.forEach((item, index) => {
      body += `${index + 1}. ${item.title} x${item.quantity}, ${(item.price * item.quantity).toFixed(2)} PLN\n`
    })

    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )
    body += `\nTotal: ${total.toFixed(2)} PLN\n\n`
    body +=
      "Please let me know about availability and next steps.\n\nThank you!"

    return `mailto:${contactInfo.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: customEase }}
            onClick={closeCart}
            className='fixed inset-0 z-[10001] bg-black mix-blend-hue'
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: customEase }}
            onClick={closeCart}
            className='fixed inset-0 z-[10000] bg-yellow-700'
          />

          {/* Cart Drawer */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.7, ease: customEase }}
            className='px-400 py-300 fixed bottom-0 left-0 right-0 z-[10001] mx-auto max-w-[600px] bg-yellow-200'
          >
            <div className='border-l border-r'>
              {/* Header */}
              <div className='flex items-center justify-between px-400 pb-600'>
                <h2 className='text-herbik-base italic'>Cart ({totalItems})</h2>
                <button
                  onClick={closeCart}
                  className='text-herbik-base font-herbik italic relative group cursor-pointer'
                >
                  Close
                  <span className='absolute -bottom-0 left-0 w-0 h-[1px] bg-graphite-900 transition-all duration-300 ease-out group-hover:w-full' />
                </button>
              </div>

              {/* Cart Items */}
              <div className='max-h-[60vh] overflow-y-auto px-400 py-400'>
                {items.length === 0 ? (
                  <p className='py-800 text-center text-herbik-base italic'>
                    Cart is empty
                  </p>
                ) : (
                  <div className='flex flex-col gap-400'>
                    {items.map(item => (
                      <div key={item._id} className='pb-400 border-b'>
                        <div className='mb-200 flex items-start justify-between'>
                          <div className='flex-1'>
                            <h3 className='text-cutive font-cutive uppercase'>
                              {item.title}
                            </h3>
                          </div>
                          <p className='text-cutive font-cutive'>
                            {(item.price * item.quantity).toFixed(2)} PLN
                          </p>
                        </div>

                        <div className='flex items-center justify-between'>
                          {/* Quantity Controls */}
                          <div className='flex items-center gap-100'>
                            <button
                              onClick={() =>
                                updateQuantity(item._id, item.quantity - 1)
                              }
                              className='flex items-center justify-center border-graphite-900 text-cutive font-cutive transition-all hover:bg-graphite-900 hover:text-yellow-100 cursor-pointer'
                            >
                              —
                            </button>
                            <span className='min-w-[20px] text-center text-cutive font-cutive'>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item._id, item.quantity + 1)
                              }
                              className='flex items-center justify-center text-cutive font-cutive transition-all hover:bg-graphite-900 hover:text-yellow-100 cursor-pointer'
                            >
                              +
                            </button>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeItem(item._id)}
                            className='text-cutive font-cutive uppercase transition-opacity text-graphite-500 hover:opacity-50 cursor-pointer'
                          >
                            REMOVE [X]
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Send Inquiry Button */}
              {items.length > 0 && (
                <div className='px-400 py-400'>
                  <a
                    href={generateMailtoLink()}
                    className='block w-full py-400 text-center text-cutive font-cutive transition-all hover:bg-graphite-900 hover:text-yellow-100 cursor-pointer'
                  >
                    | SEND INQUIRY
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
