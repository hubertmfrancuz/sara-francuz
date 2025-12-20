"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface FAQEntry {
  question: string
  answer: string
}

interface FAQClientProps {
  faqEntries: FAQEntry[]
}

export default function FAQClient({ faqEntries }: FAQClientProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className='space-y-0'>
      {faqEntries.map((entry, index) => (
        <div key={index} className='border-t border-graphite-300'>
          <button
            onClick={() => toggleFAQ(index)}
            className='flex w-full items-start justify-between py-200 text-left cursor-pointer'
          >
            <span className='text-cutive font-cutive uppercase pr-400'>
              {entry.question}
            </span>
            <span className='flex-shrink-0 text-cutive font-cutive'>
              {openIndex === index ? "-" : "+"}
            </span>
          </button>

          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.65, 0.05, 0.36, 1] }}
                className='overflow-hidden'
              >
                <div className='pb-400 text-herbik-base [&>p]:indent-900'>
                  {entry.answer.split('\n\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
