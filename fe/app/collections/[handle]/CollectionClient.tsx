'use client'

import { CollectionDetail } from '@/lib/types'
import ViewTransitionLink from '@/app/components/ViewTransitionLink'
import CollectionTextBlock from '@/app/components/CollectionTextBlock'
import CollectionImageBlock from '@/app/components/CollectionImageBlock'
import { urlFor } from '@/lib/sanity'
import ImageWithFade from '@/app/components/ImageWithFade'
import '@/app/components/EditorialGrid.css'

interface CollectionClientProps {
  collectionDetail: CollectionDetail
}

export default function CollectionClient({ collectionDetail }: CollectionClientProps) {
  const productCount = collectionDetail.products?.length || 0

  return (
    <div className='min-h-screen pt-[104px] pb-1000 px-400 md:px-0'>
      {/* Header Section */}
      <div className='max-w-[850px] mx-auto mb-1000 text-center'>
        <h1 className='text-herbik-xl md:text-herbik-2xl italic leading-1 mb-400'>
          {collectionDetail.title} Collection
        </h1>
        <div className='flex items-baseline justify-between gap-400 mb-600'>
          <span className='text-cutive font-cutive uppercase text-graphite-500'>
            {productCount} {productCount === 1 ? 'Product' : 'Products'}
          </span>
          <ViewTransitionLink
            href={`/shop?collection=${collectionDetail.slug.current}`}
            className='text-cutive font-cutive uppercase'
          >
            View Collection
          </ViewTransitionLink>
        </div>
        {collectionDetail.description && (
          <div className='text-herbik-base [&>p]:indent-900'>
            {collectionDetail.description.split('\n\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        )}
      </div>

      {/* Editorial Content Blocks */}
      {collectionDetail.contentBlocks && collectionDetail.contentBlocks.length > 0 && (
        <div className='editorial-grid mb-1000'>
          {collectionDetail.contentBlocks.map((block) => {
            if (block._type === 'collectionTextBlock') {
              return <CollectionTextBlock key={block._key} block={block} />
            }
            if (block._type === 'collectionImageBlock') {
              return <CollectionImageBlock key={block._key} block={block} />
            }
            return null
          })}
        </div>
      )}

      {/* Featured Products */}
      {collectionDetail.featuredProducts && collectionDetail.featuredProducts.length > 0 && (
        <div className='max-w-[850px] mx-auto pt-1000'>
          <h2 className='mb-600 text-cutive font-cutive uppercase'>
            Featured Products
          </h2>

          {/* Mobile: Slider */}
          <div className='md:hidden -mx-400'>
            <div
              className='scrollbar-hide w-full snap-x snap-mandatory overflow-y-hidden overflow-x-scroll whitespace-nowrap px-400'
              style={{ scrollPaddingLeft: '16px', scrollPaddingRight: '16px' }}
            >
              {collectionDetail.featuredProducts.map((product) => (
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
            {collectionDetail.featuredProducts.map((product) => (
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
        </div>
      )}
    </div>
  )
}
