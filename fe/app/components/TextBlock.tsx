import { TextBlock as TextBlockType } from '@/lib/types'

interface TextBlockProps {
  block: TextBlockType
}

export default function TextBlock({ block }: TextBlockProps) {
  return (
    <div className='featured-card text-block centered'>
      <div className='text-center py-600'>
        <p className='text-herbik-lg md:text-herbik-xl'>{block.content}</p>
      </div>
    </div>
  )
}
