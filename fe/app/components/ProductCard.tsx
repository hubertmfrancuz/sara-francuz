"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import ViewTransitionLink from "./ViewTransitionLink"
import Image from "next/image"
import { urlFor } from "@/lib/sanity"
import { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
  index: number
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const customEase = [0.65, 0.05, 0.36, 1] as [number, number, number, number]

  // Check if products have been animated before
  useEffect(() => {
    const animated = sessionStorage.getItem('products-animated')
    if (animated) {
      setHasAnimated(true)
    } else {
      sessionStorage.setItem('products-animated', 'true')
    }
  }, [])

  // Stagger delay: 50ms per item, max 500ms (only for initial animation)
  const staggerDelay = hasAnimated ? 0 : Math.min(index * 0.05, 0.5)

  return (
    <ViewTransitionLink
      href={`/shop/${product.handle.current}`}
      className='group'
    >
      <motion.div
        className='product-card-animate w-full'
        initial={hasAnimated ? { opacity: 1 } : { opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: hasAnimated ? 0 : 0.6,
          delay: staggerDelay,
          ease: customEase,
        }}
      >
        {/* Product Image */}
        <div className='relative mb-200 aspect-[2/2.85] w-full overflow-hidden'>
          {product.images && product.images[0] && (
            <Image
              src={urlFor(product.images[0]).url()}
              alt={product.images[0].alt || product.title}
              fill
              loading="eager"
              onLoad={() => setIsImageLoaded(true)}
              onLoadingComplete={() => setIsImageLoaded(true)}
              className={`object-cover transition-all duration-700 ease-out ${
                isImageLoaded ? 'blur-0 scale-100 group-hover:opacity-80' : 'blur-md scale-105'
              }`}
            />
          )}
        </div>

        {/* Product Info */}
        <div className="leading-none">
        <h3 className='text-cutive font-cutive uppercase truncate'>{product.title}</h3>
        <p className='text-cutive font-cutive pt-100'>
          {product.price.toFixed(2)} PLN
        </p>
        </div>
      </motion.div>
    </ViewTransitionLink>
  )
}
