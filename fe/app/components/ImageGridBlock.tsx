import Image from 'next/image'
import ViewTransitionLink from './ViewTransitionLink'
import { urlFor } from '@/lib/sanity'
import { ImageGridBlock as ImageGridBlockType, ImageBlock } from '@/lib/types'
import './ImageGridBlock.css'

interface Props {
  block: ImageGridBlockType
}

function getHref(item: ImageBlock): string | null {
  if (item.linkType === 'url' && item.url) return item.url
  if (item.linkType === 'product' && item.productReference)
    return `/shop/${item.productReference.handle.current}`
  if (item.linkType === 'collection' && item.collectionReference)
    return `/shop?collection=${item.collectionReference.slug.current}`
  return null
}

function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}

export default function ImageGridBlock({ block }: Props) {
  const columns = chunk(block.items, 2)

  return (
    <div className="image-grid-block">
      <div className={`image-grid cols-${block.columns}`}>
        {columns.map((col, colIndex) => (
          <div key={colIndex} className="image-grid__column">
            {col.map((item, i) => {
              const href = getHref(item)
              const tileClass = `image-grid-tile${href ? ' linked' : ''}`

              const inner = (
                <>
                  <div className="image-grid-tile__image">
                    {item.video?.asset?.url ? (
                      <video
                        src={item.video.asset.url}
                        autoPlay
                        loop
                        muted
                        playsInline
                        disablePictureInPicture
                        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                      />
                    ) : (
                      <Image
                        src={urlFor(item.image).width(600).url()}
                        alt={item.image.alt || item.title}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover"
                      />
                    )}
                  </div>
                  {item.title && (
                    <p className="image-grid-tile__caption font-cutive">{item.title}</p>
                  )}
                </>
              )

              return href ? (
                <ViewTransitionLink key={i} href={href} className={tileClass}>
                  {inner}
                </ViewTransitionLink>
              ) : (
                <div key={i} className={tileClass}>
                  {inner}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
