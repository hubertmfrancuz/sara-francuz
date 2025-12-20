import ViewTransitionLink from './ViewTransitionLink'
import ImageWithFade from './ImageWithFade'
import { urlFor } from '@/lib/sanity'
import { CollectionImageBlock as CollectionImageBlockType } from '@/lib/types'

interface CollectionImageBlockProps {
  block: CollectionImageBlockType
}

export default function CollectionImageBlock({ block }: CollectionImageBlockProps) {
  // Combine classes for the featured card
  const cardClasses = `featured-card ${block.size} ${block.alignment} ${block.orientation} ${block.mobileAlignment}`

  if (!block.image) {
    return null
  }

  const content = (
    <>
      {/* Image */}
      <div className={`featured-card-image ${block.orientation} relative w-full overflow-hidden mb-200`}>
        <ImageWithFade
          src={urlFor(block.image).url()}
          alt={block.image.alt || 'Collection image'}
          fill
          className='object-cover transition-opacity duration-300 group-hover:opacity-50'
        />
      </div>

      {/* Optional Caption */}
      {block.caption && (
        <p className='text-herbik-sm text-graphite-900 indent-6'>{block.caption}</p>
      )}
    </>
  )

  // If there's a linked product, wrap in link
  if (block.linkedProduct?.handle?.current) {
    return (
      <div className={cardClasses}>
        <ViewTransitionLink href={`/shop/${block.linkedProduct.handle.current}`} className='group block'>
          {content}
        </ViewTransitionLink>
      </div>
    )
  }

  // Otherwise just show the image
  return (
    <div className={cardClasses}>
      {content}
    </div>
  )
}
