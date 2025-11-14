"use client"

import { useState } from "react"
import ViewTransitionLink from "@/app/components/ViewTransitionLink"
import ImageWithFade from "@/app/components/ImageWithFade"
import { urlFor } from "@/lib/sanity"
import { Product } from "@/lib/types"
import { useCart } from "@/app/context/CartContext"

interface ProductClientProps {
  product: Product
  relatedProducts: Product[]
}

export default function ProductClient({
  product,
  relatedProducts,
}: ProductClientProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { addItem, openCart } = useCart()

  const handlePrevImage = () => {
    setCurrentImageIndex(prev =>
      prev === 0 ? product.images.length - 1 : prev - 1
    )
  }

  const handleNextImage = () => {
    setCurrentImageIndex(prev =>
      prev === product.images.length - 1 ? 0 : prev + 1
    )
  }

  const handleAddToInquiry = () => {
    addItem({
      _id: product._id,
      title: product.title,
      price: product.price,
      handle: product.handle.current,
    })
    openCart()
  }

  return (
    <div className='min-h-screen pt-[88px]'>
      <div className='mx-auto max-w-2xl md:max-w-[1400px]'>
        {/* Back to Catalog */}
        <div className='px-400 flex justify-items-center gap-200 mb-400'>
          <div className='h-200 w-px bg-graphite-900 place-self-center' />
          <ViewTransitionLink
            href='/shop'
            className='block text-cutive font-cutive uppercase align-baseline'
          >
            Back to Catalog
          </ViewTransitionLink>
        </div>

        {/* Mobile: stacked, Desktop: 5-column grid (3 + 2) */}
        <div className='md:mx-400 pb-400 flex flex-col gap-400 md:grid md:grid-cols-5 md:gap-400 md:pb-1000 md:items-start'>
          {/* Image Gallery - First on mobile, Left 3 columns on desktop */}
          <div className='mx-400 md:mx-0 relative order-1 md:col-span-3'>
            {/* Mobile: Image Slider */}
            <div
              className='relative aspect-3/4 w-full cursor-pointer md:hidden'
              onClick={handleNextImage}
            >
              {product.images && product.images[currentImageIndex] && (
                <ImageWithFade
                  src={urlFor(product.images[currentImageIndex]).url()}
                  alt={product.images[currentImageIndex].alt || product.title}
                  fill
                  className='object-cover'
                  priority
                />
              )}

              {/* Image Counter */}
              {product.images.length > 1 && (
                <div className='absolute px-400 py-400 right-0 top-0 text-white text-cutive font-cutive'>
                  {currentImageIndex + 1} / {product.images.length}
                </div>
              )}
            </div>

            {/* Desktop: Vertical Image List */}
            <div className='hidden md:flex md:flex-col md:gap-400'>
              {product.images &&
                product.images.map((image, index) => (
                  <div key={index} className='relative aspect-3/4 w-full'>
                    <ImageWithFade
                      src={urlFor(image).url()}
                      alt={image.alt || product.title}
                      fill
                      className='object-cover'
                      priority={index === 0}
                    />
                  </div>
                ))}
            </div>
          </div>

          {/* Product Info Container - Second on mobile, Right 2 columns on desktop (sticky) */}
          <div className='md:px-400 bg-yellow-300 p-500 order-2 md:col-span-2 md:sticky md:top-[108px] md:h-fit'>
            {/* Title and Price */}
            <div className='flex items-start justify-between'>
              <h1 className='text-herbik-xl italic'>{product.title}</h1>
              <p className='text-cutive font-cutive'>
                €{product.price.toFixed(2)} EUR
              </p>
            </div>

            {/* Add to Inquiry Button */}
            <button
              onClick={handleAddToInquiry}
              className='py-800 w-full text-center text-cutive font-cutive transition-all hover:text-graphite-300 cursor-pointer'
            >
              | ADD TO INQUIRY +
            </button>

            {/* Properties */}
            {product.properties && product.properties.length > 0 && (
              <div className=''>
                {product.properties.map((property, index) => (
                  <div
                    key={index}
                    className={`flex justify-between gap-400 py-300 ${
                      index !== product.properties!.length - 1
                        ? "border-b border-graphite-900"
                        : ""
                    }`}
                  >
                    <div className='text-cutive font-cutive uppercase'>
                      {property.title}
                    </div>
                    <div className='text-right text-cutive font-cutive'>
                      {property.content}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Description */}
            {product.description && (
              <div className='pt-600'>
                <h2 className='mb-400 text-cutive font-cutive uppercase'>
                  Description
                </h2>
                <p className='text-herbik-sm'>{product.description}</p>
              </div>
            )}

            {/* Care Instructions */}
            {product.careInstructions && (
              <div className='pt-600'>
                <h2 className='mb-400 text-cutive font-cutive uppercase'>
                  Care Instructions
                </h2>
                <p className='text-herbik-sm'>{product.careInstructions}</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className='px-400 mt-1000'>
            <h2 className='mb-600 text-cutive font-cutive uppercase'>
              More from {product.collection?.title}
            </h2>
            <div className='grid grid-cols-2 gap-200 md:grid-cols-4'>
              {relatedProducts.map(relatedProduct => (
                <ViewTransitionLink
                  key={relatedProduct._id}
                  href={`/shop/${relatedProduct.handle.current}`}
                  className='group'
                >
                  {/* Product Image */}
                  <div className='relative mb-200 aspect-3/4 w-full overflow-hidden bg-gray-200'>
                    {relatedProduct.images && relatedProduct.images[0] && (
                      <ImageWithFade
                        src={urlFor(relatedProduct.images[0]).url()}
                        alt={
                          relatedProduct.images[0].alt || relatedProduct.title
                        }
                        fill
                        className='object-cover transition-transform duration-300 group-hover:scale-105'
                      />
                    )}
                  </div>

                  {/* Product Info */}
                  <h3 className='text-cutive font-cutive'>
                    {relatedProduct.title}
                  </h3>
                  <p className='text-cutive font-cutive'>
                    €{relatedProduct.price.toFixed(2)} EUR
                  </p>
                </ViewTransitionLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
