import { defineType } from 'sanity'

export default defineType({
  name: 'collectionTextBlock',
  title: 'Collection Text Block',
  type: 'object',
  fields: [
    {
      name: 'text',
      title: 'Text Content',
      type: 'array',
      of: [{ type: 'block' }],
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {
      blocks: 'text'
    },
    prepare({ blocks }) {
      const block = (blocks || []).find((block: any) => block._type === 'block')
      return {
        title: block
          ? block.children
              .filter((child: any) => child._type === 'span')
              .map((span: any) => span.text)
              .join('')
          : 'No text'
      }
    }
  }
})
