"use client"

import { useState, useMemo } from "react"
import { Product, Collection } from "@/lib/types"
import { motion, AnimatePresence } from "framer-motion"
import ProductCard from "@/app/components/ProductCard"
import PageLayout from "@/app/components/PageLayout"

interface ShopClientProps {
  products: Product[]
  collections: Collection[]
}

export default function ShopClient({
  products,
  collections,
}: ShopClientProps) {
  const [view, setView] = useState<"large" | "small">("small")
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null)

  // Custom easing
  const customEase = [0.65, 0.05, 0.36, 1] as [number, number, number, number]

  // Filter products
  const filteredProducts = useMemo(() => {
    if (!selectedCollection) {
      return products
    }
    return products.filter(product =>
      product.collection?.slug.current === selectedCollection
    )
  }, [products, selectedCollection])

  // Calculate total products count from all collections
  const totalProductsCount = collections.reduce(
    (sum, collection) => sum + (collection.count || 0),
    0
  )

  const handleCollectionFilter = (slug: string | null) => {
    setSelectedCollection(slug)
  }

  // Grid classes based on view
  const gridClasses = {
    large: "grid-cols-1 md:grid-cols-2",
    small: "grid-cols-2 md:grid-cols-3",
  }

  return (
    <div className='min-h-screen pb-1000 pt-[80px] md:pt-[104px]'>

      <PageLayout pattern="with-sidebar" className='px-400 md:px-0'>
        {/* Filters Sidebar */}
        <div className='sidebar mb-800 md:mb-0'>
          {/* Collection Filter */}
          <div className='mb-600'>
            <h3 className='mb-300 text-cutive font-cutive uppercase'>
              COLLECTION
            </h3>
            <div className='flex flex-col gap-100'>
              <button
                onClick={() => handleCollectionFilter(null)}
                className='text-left text-herbik-lg italic cursor-pointer'
              >
                <span
                  className={`transition-colors duration-300 pb-200 ${!selectedCollection ? "" : "text-graphite-300 hover:text-graphite-500"}`}
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
                  className='text-left text-herbik-lg italic cursor-pointer'
                >
                  <span
                    className={`transition-colors duration-300 pb-200 ${
                      selectedCollection === collection.slug.current
                        ? ""
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
            <h3 className='mb-300 text-cutive font-cutive uppercase'>VIEW</h3>
            <div className='flex flex-col gap-100'>
              <button
                onClick={() => setView("large")}
                className='text-left text-herbik-lg italic cursor-pointer'
              >
                <span
                  className={`transition-colors duration-300 pb-200 ${view === "large" ? "" : "text-graphite-300 hover:text-graphite-500"}`}
                >
                  Large
                </span>
              </button>
              <button
                onClick={() => setView("small")}
                className='text-left text-herbik-lg italic cursor-pointer'
              >
                <span
                  className={`transition-colors duration-300 pb-200 ${view === "small" ? "" : "text-graphite-300 hover:text-graphite-500"}`}
                >
                  Small
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid Container */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCollection || 'all'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: customEase }}
              className={`product-grid ${view} grid ${gridClasses[view]} gap-y-[32px] md:gap-y-[104px] justify-center gap-x-[10px] md:gap-x-1000`}
            >
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  index={index}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* No Products Message */}
          <AnimatePresence>
            {filteredProducts.length === 0 && (
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
      </PageLayout>
    </div>
  )
}
