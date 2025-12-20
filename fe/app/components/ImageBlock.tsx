import ViewTransitionLink from './ViewTransitionLink'
import ImageWithFade from './ImageWithFade'
import { urlFor } from '@/lib/sanity'
import { ImageBlock as ImageBlockType } from '@/lib/types'

interface ImageBlockProps {
  block: ImageBlockType
}

export default function ImageBlock({ block }: ImageBlockProps) {
  // Determine the link href based on linkType
  let href = ''
  if (block.linkType === 'url' && block.url) {
    href = block.url
  } else if (block.linkType === 'product' && block.productReference) {
    href = `/shop/${block.productReference.handle.current}`
  } else if (block.linkType === 'collection' && block.collectionReference) {
    href = `/shop?collection=${block.collectionReference.slug.current}`
  }

  // Combine classes for the featured card
  const cardClasses = `featured-card ${block.size} ${block.alignment} ${block.orientation} ${block.mobileAlignment}`

  return (
    <div className={cardClasses}>
      <ViewTransitionLink href={href} className='group block'>
        {/* Image */}
        <div className={`featured-card-image ${block.orientation} relative w-full overflow-hidden mb-400`}>
          <ImageWithFade
            src={urlFor(block.image).url()}
            alt={block.image.alt || block.title}
            fill
            className='object-cover transition-opacity duration-300 group-hover:opacity-50'
          />
        </div>

        {/* Content */}
        <div className='flex items-center pl-200 border-l border-graphite-900 justify-between gap-400'>
          <h3 className='text-herbik-lg italic leading-1'>{block.title}</h3>
          <span className='text-cutive font-cutive uppercase text-right whitespace-nowrap flex-shrink-0'>
            {block.buttonText}
          </span>
        </div>
      </ViewTransitionLink>
    </div>
  )
}
