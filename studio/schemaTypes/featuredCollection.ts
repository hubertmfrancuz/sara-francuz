import {defineType} from 'sanity'

export default defineType({
  name: 'featuredCollection',
  title: 'Featured Collection',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'e.g., "Shop Round"',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'linkUrl',
      title: 'Link URL',
      type: 'string',
      description: 'URL where the title links to (e.g., "/shop" or "/shop?collection=round")',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'featuredProducts',
      title: 'Featured Products',
      type: 'array',
      description: 'Select products to feature in this section',
      of: [
        {
          type: 'reference',
          to: [{type: 'product'}],
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(8),
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'heroImage',
      productCount: 'featuredProducts.length',
    },
    prepare({title, media, productCount}) {
      return {
        title: title || 'Featured Collection',
        subtitle: `${productCount || 0} products`,
        media: media,
      }
    },
  },
})
