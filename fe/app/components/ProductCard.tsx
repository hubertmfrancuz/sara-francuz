"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import ViewTransitionLink from "./ViewTransitionLink"
import ImageWithFade from "./ImageWithFade"
import { urlFor } from "@/lib/sanity"
import { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
  index: number
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const customEase = [0.65, 0.05, 0.36, 1] as [number, number, number, number]

  // Stagger delay: 50ms per item, max 500ms
  const staggerDelay = Math.min(index * 0.05, 0.5)

  return (
    <ViewTransitionLink
      href={`/shop/${product.handle.current}`}
      className='group'
    >
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={isImageLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 0 }}
        transition={{
          duration: 0.6,
          delay: staggerDelay,
          ease: customEase,
        }}
      >
        {/* Product Image */}
        <div className='relative mb-200 aspect-3/4 w-full overflow-hidden group-hover:border-yellow-700'>
          {product.images && product.images[0] && (
            <ImageWithFade
              src={urlFor(product.images[0]).url()}
              alt={product.images[0].alt || product.title}
              fill
              className='object-cover transition-transform duration-300'
              onLoadComplete={() => setIsImageLoaded(true)}
            />
          )}
        </div>

        {/* Product Info */}
        <h3 className='text-cutive font-cutive uppercase'>{product.title}</h3>
        <p className='text-cutive font-cutive'>
          {product.price.toFixed(2)} PLN
        </p>
      </motion.div>
    </ViewTransitionLink>
  )
}
