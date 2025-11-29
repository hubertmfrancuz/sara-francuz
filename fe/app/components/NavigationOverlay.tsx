"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useIsNavigating } from "./ViewTransitionLink"

export default function NavigationOverlay() {
  const isNavigating = useIsNavigating()

  return (
    <AnimatePresence mode="wait">
      {isNavigating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 0.2, ease: "easeInOut" }
          }}
          className="fixed inset-0 z-[9999] bg-yellow-100"
          style={{ pointerEvents: "none" }}
        />
      )}
    </AnimatePresence>
  )
}
