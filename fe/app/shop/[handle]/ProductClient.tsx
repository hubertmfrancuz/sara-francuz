"use client"

import { useState, useCallback, useEffect } from "react"
import ViewTransitionLink from "@/app/components/ViewTransitionLink"
import ImageWithFade from "@/app/components/ImageWithFade"
import { urlFor } from "@/lib/sanity"
import { Product } from "@/lib/types"
import { useCart } from "@/app/context/CartContext"
import useEmblaCarousel from "embla-carousel-react"
import { motion, AnimatePresence } from "framer-motion"

interface ProductClientProps {
  product: Product
  relatedProducts: Product[]
}

export default function ProductClient({
  product,
  relatedProducts,
}: ProductClientProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [openSection, setOpenSection] = useState<'details' | 'care' | null>('details')
  const { addItem, openCart } = useCart()
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCurrentImageIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi, onSelect])

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
    <div className='min-h-screen pt-[80px] md:pt-[104px]'>
      <div className='px-400 md:px-500'>
        {/* Back to Catalog - Mobile only, at the top */}
        <div className='flex justify-items-center gap-200 mb-400 md:hidden'>
          <div className='h-200 w-px bg-graphite-900 place-self-center' />
          <ViewTransitionLink
            href='/shop'
            className='block text-cutive font-cutive uppercase align-baseline'
          >
            Back to Catalog
          </ViewTransitionLink>
        </div>

        {/* Mobile: stacked, Desktop: 12-column grid (4 + 7) */}
        <div className='pb-400 flex flex-col gap-400 md:grid md:grid-cols-12 md:gap-400 md:pb-1000 md:items-start'>
          {/* Product Info Container - Second on mobile, Left 4 columns on desktop */}
          <div className='w-full md:max-w-[500px] order-2 md:order-1 md:col-span-5 md:sticky md:top-[104px] md:h-[calc(100vh-104px)] md:flex md:flex-col md:self-start'>
            {/* Top Content */}
            <div className='md:flex-1 md:overflow-y-auto md:overflow-x-hidden'>
              {/* Back to Catalog - Desktop only */}
              <div className='hidden md:flex hover:text-graphite-300 transition-all justify-items-center gap-200 mb-900'>
                <div className='h-200 w-px bg-graphite-900 place-self-center' />
                <ViewTransitionLink
                  href='/shop'
                  className='block text-cutive font-cutive uppercase align-baseline'
                >
                  Back to Catalog
                </ViewTransitionLink>
              </div>

              {/* Title */}
              <h1 className='text-herbik-xl italic mb-600'>{product.title}</h1>

              {/* Properties */}
              {product.properties && product.properties.length > 0 && (
                <div className='mb-600 border-b border-graphite-300'>
                  {product.properties.map((property, index) => (
                    <div
                      key={index}
                      className={`flex gap-400 py-100 ${
                        index !== product.properties!.length - 1
                          ? "border-b border-graphite-300"
                          : ""
                      }`}
                    >
                      <div className='text-cutive font-cutive min-w-[140px] uppercase'>
                        {property.title}
                      </div>
                      <div className='text-left text-cutive font-cutive'>
                        {property.content}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add to Inquiry Button */}
              <button
                onClick={handleAddToInquiry}
                className='mt-600 flex justify-between py-400 px-400 w-full text-left text-cutive font-cutive bg-yellow-200 transition-all hover:bg-yellow-300 cursor-pointer'
              >
                <span>| ADD TO INQUIRY +</span>
                <span>{product.price.toFixed(2)} PLN</span>
              </button>
            </div>

            {/* Collapsible Sections - At bottom of container */}
            <div className='mt-600 mb-600 md:mt-auto md:flex-shrink-0'>
              {/* Details Section */}
              {product.description && (
                <div className='border-t border-graphite-300'>
                  <button
                    onClick={() => setOpenSection(openSection === 'details' ? null : 'details')}
                    className='w-full py-100 flex items-center justify-between text-cutive font-cutive uppercase cursor-pointer hover:text-graphite-700 transition-colors'
                  >
                    <span>DETAILS</span>
                    <span>{openSection === 'details' ? '-' : '+'}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openSection === 'details' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.65, 0.05, 0.36, 1] }}
                        className='overflow-hidden'
                      >
                        <div className='pb-400 text-herbik-base pt-200 [&>p]:indent-900'>
                          {product.description.split('\n\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Care Instructions Section */}
              {product.careInstructions && (
                <div className='border-t border-graphite-300'>
                  <button
                    onClick={() => setOpenSection(openSection === 'care' ? null : 'care')}
                    className='w-full py-100 flex items-center justify-between text-cutive font-cutive uppercase cursor-pointer hover:text-graphite-700 transition-colors'
                  >
                    <span>CARE INSTRUCTIONS</span>
                    <span>{openSection === 'care' ? '-' : '+'}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openSection === 'care' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.65, 0.05, 0.36, 1] }}
                        className='overflow-hidden'
                      >
                        <div className='pb-400 pt-200 text-herbik-base [&>p]:indent-900'>
                          {product.careInstructions.split('\n\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>

          {/* Image Gallery - First on mobile, Right 6 columns on desktop (half screen) */}
          <div className='relative order-1 md:order-2 md:col-span-7'>
            {/* Mobile: Scrollable Image Slider */}
            <div className='relative md:hidden -mx-400'>
              <div className='overflow-hidden' ref={emblaRef}>
                <div className='flex'>
                  {product.images &&
                    product.images.map((image, index) => (
                      <div
                        key={index}
                        className='relative flex-[0_0_100%] aspect-3/4'
                      >
                        <ImageWithFade
                          src={urlFor(image).url()}
                          alt={image.alt || product.title}
                          fill
                          className='object-cover'
                          priority={index < 2}
                        />
                      </div>
                    ))}
                </div>
              </div>

              {/* Image Counter */}
              {product.images.length > 1 && (
                <div className='absolute px-400 py-400 right-0 top-0 text-white text-cutive font-cutive z-20'>
                  {currentImageIndex + 1} / {product.images.length}
                </div>
              )}
            </div>

            {/* Desktop: 2-column sub-grid pattern */}
            <div className='hidden md:grid md:grid-cols-2 md:gap-400'>
              {product.images &&
                product.images.map((image, index) => {
                  // Pattern: images 1-2 side by side, image 3 full width, images 4-5 side by side, repeat
                  // Index 0,1 -> 1 column each
                  // Index 2 -> 2 columns (full width)
                  // Index 3,4 -> 1 column each
                  // Index 5 -> 2 columns (full width)
                  const position = index % 3
                  const isFullWidth = position === 2

                  return (
                    <div
                      key={index}
                      className={`relative aspect-3/4 ${isFullWidth ? 'col-span-2' : ''}`}
                    >
                      <ImageWithFade
                        src={urlFor(image).url()}
                        alt={image.alt || product.title}
                        fill
                        className='object-cover'
                        priority={index === 0}
                      />
                    </div>
                  )
                })}
            </div>
          </div>

        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className='md:px-0 pb-1000'>
            <div className='w-full md:max-w-[850px] pt-1000'>
              <h2 className='w-full mb-600 text-cutive font-cutive uppercase'>
                FROM THIS COLLECTION
              </h2>

              {/* Mobile: Slider */}
              <div className='md:hidden -mx-400'>
                <div
                  className='scrollbar-hide w-full snap-x snap-mandatory overflow-y-hidden overflow-x-scroll whitespace-nowrap px-400'
                  style={{ scrollPaddingLeft: '16px', scrollPaddingRight: '16px' }}
                >
                  {relatedProducts.map(relatedProduct => (
                    <div
                      key={relatedProduct._id}
                      className='mr-200 inline-block w-[80%] snap-start whitespace-normal last:mr-0'
                    >
                      <ViewTransitionLink
                        href={`/shop/${relatedProduct.handle.current}`}
                        className='group block'
                      >
                        {/* Product Image */}
                        <div className='relative mb-200 aspect-[2/2.85] w-full overflow-hidden'>
                          {relatedProduct.images && relatedProduct.images[0] && (
                            <ImageWithFade
                              src={urlFor(relatedProduct.images[0]).url()}
                              alt={relatedProduct.images[0].alt || relatedProduct.title}
                              fill
                              className='object-cover transition-opacity duration-300 group-hover:opacity-80'
                            />
                          )}
                        </div>

                        {/* Product Info */}
                        <h3 className='text-cutive font-cutive uppercase leading-none truncate'>
                          {relatedProduct.title}
                        </h3>
                        <p className='text-cutive font-cutive'>
                          {relatedProduct.price.toFixed(2)} PLN
                        </p>
                      </ViewTransitionLink>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop: Flex */}
              <div className='hidden md:flex gap-400'>
                {relatedProducts.map(relatedProduct => (
                  <ViewTransitionLink
                    key={relatedProduct._id}
                    href={`/shop/${relatedProduct.handle.current}`}
                    className='group w-[140px]'
                  >
                    {/* Product Image */}
                    <div className='relative aspect-[3/4] w-full overflow-hidden mb-200'>
                      {relatedProduct.images && relatedProduct.images[0] && (
                        <ImageWithFade
                          src={urlFor(relatedProduct.images[0]).url()}
                          alt={relatedProduct.images[0].alt || relatedProduct.title}
                          fill
                          className='object-cover transition-opacity duration-300 group-hover:opacity-80'
                        />
                      )}
                    </div>

                    {/* Product Info */}
                    <div>
                      <h3 className='text-cutive font-cutive uppercase text-[10px] leading-tight truncate'>
                        {relatedProduct.title}
                      </h3>
                      <p className='text-cutive font-cutive text-[10px]'>
                        {relatedProduct.price.toFixed(2)} PLN
                      </p>
                    </div>
                  </ViewTransitionLink>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
