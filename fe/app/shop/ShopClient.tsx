"use client"

import { useState } from "react"
import ViewTransitionLink from "@/app/components/ViewTransitionLink"
import ImageWithFade from "@/app/components/ImageWithFade"
import { useRouter } from "next/navigation"
import { urlFor } from "@/lib/sanity"
import { Product, Collection } from "@/lib/types"
import { motion, AnimatePresence } from "framer-motion"

interface ShopClientProps {
  products: Product[]
  collections: Collection[]
  selectedCollection?: string
}

export default function ShopClient({
  products,
  collections,
  selectedCollection,
}: ShopClientProps) {
  const router = useRouter()
  const [view, setView] = useState<"large" | "small">("small")

  // Custom easing
  const customEase = [0.65, 0.05, 0.36, 1] as [number, number, number, number]

  // Calculate total products count from all collections
  const totalProductsCount = collections.reduce(
    (sum, collection) => sum + (collection.count || 0),
    0
  )

  const handleCollectionFilter = (slug: string | null) => {
    if (slug) {
      router.push(`/shop?collection=${slug}`)
    } else {
      router.push("/shop")
    }
  }

  // Grid classes based on view
  const gridClasses = {
    large: "grid-cols-1 md:grid-cols-3",
    small: "grid-cols-2 md:grid-cols-4",
  }

  return (
    <div className='min-h-screen px-400 pb-1000 pt-[88px]'>
      <div className='mx-auto max-w-2xl md:max-w-[1400px]'>
        {/* Filters Sidebar */}
        <div className='mb-800 grid grid-cols-2 gap-600'>
          {/* Collection Filter */}
          <div>
            <h3 className='mb-400 text-cutive font-cutive uppercase'>
              Collection
            </h3>
            <div className='flex flex-col'>
              <button
                onClick={() => handleCollectionFilter(null)}
                className='flex items-center gap-200 text-left text-herbik-lg italic cursor-pointer'
              >
                {!selectedCollection ? (
                  <div className='h-[14px] w-[1px] bg-graphite-900' />
                ) : (
                  <div className='w-[1px]' />
                )}
                <span
                  className={`transition-colors duration-300 ${!selectedCollection ? "hover:text-graphite-500" : "text-graphite-300 hover:text-graphite-500"}`}
                >
                  All ({totalProductsCount})
                </span>
              </button>
              {collections.map(collection => (
                <button
                  key={collection.slug.current}
                  onClick={() =>
                    handleCollectionFilter(collection.slug.current)
                  }
                  className='flex items-center gap-200 text-left text-herbik-lg italic cursor-pointer'
                >
                  {selectedCollection === collection.slug.current ? (
                    <div className='h-[14px] w-[1px] bg-graphite-900' />
                  ) : (
                    <div className='w-[1px]' />
                  )}
                  <span
                    className={`transition-colors duration-300 ${
                      selectedCollection === collection.slug.current
                        ? "hover:text-graphite-500"
                        : "text-graphite-300 hover:text-graphite-500"
                    }`}
                  >
                    {collection.title} ({collection.count})
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* View Toggle */}
          <div>
            <h3 className='mb-400 text-cutive font-cutive uppercase'>View</h3>
            <div className='flex flex-col'>
              <button
                onClick={() => setView("large")}
                className='flex items-center gap-200 text-left text-herbik-lg italic cursor-pointer'
              >
                {view === "large" ? (
                  <div className='h-[14px] w-[1px] bg-graphite-900' />
                ) : (
                  <div className='w-[1px]' />
                )}
                <span
                  className={`transition-colors duration-300 ${view === "large" ? "hover:text-graphite-500" : "text-graphite-300 hover:text-graphite-500"}`}
                >
                  Large
                </span>
              </button>
              <button
                onClick={() => setView("small")}
                className='flex items-center gap-200 text-left text-herbik-lg italic cursor-pointer'
              >
                {view === "small" ? (
                  <div className='h-[14px] w-[1px] bg-graphite-900' />
                ) : (
                  <div className='w-[1px]' />
                )}
                <span
                  className={`transition-colors duration-300 ${view === "small" ? "hover:text-graphite-500" : "text-graphite-300 hover:text-graphite-500"}`}
                >
                  Small
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className={`grid gap-x-200 gap-y-600 ${gridClasses[view]}`}>
          <AnimatePresence mode='sync'>
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.3,
                  ease: customEase,
                }}
              >
                <ViewTransitionLink
                  href={`/shop/${product.handle.current}`}
                  className='group'
                >
                  {/* Product Image */}
                  <div className='relative mb-200 aspect-3/4 w-full overflow-hidden bg-gray-200 group-hover:border-yellow-700'>
                    {product.images && product.images[0] && (
                      <ImageWithFade
                        src={urlFor(product.images[0]).url()}
                        alt={product.images[0].alt || product.title}
                        fill
                        className='object-cover transition-transform duration-300'
                      />
                    )}
                  </div>

                  {/* Product Info */}
                  <h3 className='text-cutive font-cutive uppercase'>
                    {product.title}
                  </h3>
                  <p className='text-cutive font-cutive'>
                    €{product.price.toFixed(2)} EUR
                  </p>
                </ViewTransitionLink>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* No Products Message */}
        <AnimatePresence>
          {products.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: customEase }}
              className='py-1000 text-center'
            >
              <p className='text-herbik-base italic'>
                No products found in this collection.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
