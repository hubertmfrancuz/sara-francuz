"use client"

import { useState } from "react"
import ViewTransitionLink from "@/app/components/ViewTransitionLink"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { urlFor } from "@/lib/sanity"
import { Product, Collection } from "@/lib/types"

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
                  className={!selectedCollection ? "" : "text-graphite-300"}
                >
                  All ({products.length})
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
                    className={
                      selectedCollection === collection.slug.current
                        ? ""
                        : "text-graphite-300"
                    }
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
                <span className={view === "large" ? "" : "text-graphite-300"}>
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
                <span className={view === "small" ? "" : "text-graphite-300"}>
                  Small
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className={`grid gap-200 ${gridClasses[view]}`}>
          {products.map(product => (
            <ViewTransitionLink
              key={product._id}
              href={`/shop/${product.handle.current}`}
              className='group'
            >
              {/* Product Image */}
              <div className='relative mb-200 aspect-3/4 w-full overflow-hidden bg-gray-200'>
                {product.images && product.images[0] && (
                  <Image
                    src={urlFor(product.images[0]).url()}
                    alt={product.images[0].alt || product.title}
                    fill
                    className='object-cover transition-transform duration-300 group-hover:scale-105'
                  />
                )}
              </div>

              {/* Product Info */}
              <h3 className='text-cutive font-cutive'>{product.title}</h3>
              <p className='text-cutive font-cutive'>
                €{product.price.toFixed(2)} EUR
              </p>
            </ViewTransitionLink>
          ))}
        </div>

        {/* No Products Message */}
        {products.length === 0 && (
          <div className='py-1000 text-center'>
            <p className='text-herbik-base italic'>
              No products found in this collection.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
