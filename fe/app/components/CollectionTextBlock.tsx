import { PortableText } from '@portabletext/react'
import { CollectionTextBlock as CollectionTextBlockType } from '@/lib/types'

interface CollectionTextBlockProps {
  block: CollectionTextBlockType
}

export default function CollectionTextBlock({ block }: CollectionTextBlockProps) {
  return (
    <div className='featured-card text-block medium'>
      <div className='text-herbik-base [&>p]:indent-900'>
        <PortableText value={block.text} />
      </div>
    </div>
  )
}
