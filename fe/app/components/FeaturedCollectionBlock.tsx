'use client'

import ViewTransitionLink from './ViewTransitionLink'
import ImageWithFade from './ImageWithFade'
import { urlFor } from '@/lib/sanity'
import { FeaturedCollectionBlock as FeaturedCollectionBlockType } from '@/lib/types'

interface FeaturedCollectionBlockProps {
  block: FeaturedCollectionBlockType
}

export default function FeaturedCollectionBlock({ block }: FeaturedCollectionBlockProps) {
  const collectionHref = `/shop?collection=${block.collection.slug.current}`

  return (
    <div className='featured-card featured-collection-block large'>

      {/* Hero Image */}
      <div className='relative mb-400 aspect-[4/3] w-full overflow-hidden'>
        <ImageWithFade
          src={urlFor(block.image).url()}
          alt={block.image.alt || block.title}
          fill
          className='object-cover'
        />
      </div>

      {/* Title and Button - styled like ImageBlock */}
      <div className='flex items-start pl-200 border-l border-graphite-900 justify-between gap-400 mb-1000'>
        <h3 className='text-herbik-lg italic leading-1'>{block.title}</h3>
        <ViewTransitionLink
          href={collectionHref}
          className='text-cutive font-cutive uppercase text-right whitespace-nowrap flex-shrink-0'
        >
          {block.buttonText}
        </ViewTransitionLink>
      </div>

      {/* Products - Mobile Slider, Desktop Grid */}
      {block.products && block.products.length > 0 && (
        <>
          {/* Mobile: Slider */}
          <div className='md:hidden -mx-400'>
            <div
              className='scrollbar-hide w-full snap-x snap-mandatory overflow-y-hidden overflow-x-scroll whitespace-nowrap px-400'
              style={{ scrollPaddingLeft: '16px', scrollPaddingRight: '16px' }}
            >
              {block.products.map((product) => (
                <div
                  key={product._id}
                  className='mr-200 inline-block w-[80%] snap-start whitespace-normal last:mr-0'
                >
                  <ViewTransitionLink
                    href={`/shop/${product.handle.current}`}
                    className='group block'
                  >
                    {/* Product Image */}
                    <div className='relative mb-200 aspect-[2/2.85] w-full overflow-hidden'>
                      {product.images && product.images[0] && (
                        <ImageWithFade
                          src={urlFor(product.images[0]).url()}
                          alt={product.images[0].alt || product.title}
                          fill
                          className='object-cover transition-opacity duration-300 group-hover:opacity-80'
                        />
                      )}
                    </div>

                    {/* Product Info */}
                    <h3 className='text-cutive font-cutive uppercase leading-none truncate'>
                      {product.title}
                    </h3>
                    <p className='text-cutive font-cutive'>
                      {product.price.toFixed(2)} PLN
                    </p>
                  </ViewTransitionLink>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: Flex */}
          <div className='hidden md:flex gap-400'>
            {block.products.map((product) => (
              <ViewTransitionLink
                key={product._id}
                href={`/shop/${product.handle.current}`}
                className='group w-[140px]'
              >
                {/* Product Image */}
                <div className='relative aspect-[3/4] w-full overflow-hidden mb-200'>
                  {product.images && product.images[0] && (
                    <ImageWithFade
                      src={urlFor(product.images[0]).url()}
                      alt={product.images[0].alt || product.title}
                      fill
                      className='object-cover transition-opacity duration-300 group-hover:opacity-80'
                    />
                  )}
                </div>

                {/* Product Info */}
                <div>
                  <h3 className='text-cutive font-cutive uppercase text-[10px] leading-tight truncate'>
                    {product.title}
                  </h3>
                  <p className='text-cutive font-cutive text-[10px]'>
                    {product.price.toFixed(2)} PLN
                  </p>
                </div>
              </ViewTransitionLink>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
