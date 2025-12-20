import {defineType} from 'sanity'

export default defineType({
  name: 'collection',
  title: 'Collection',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Collection name (e.g., "Round", "Ghost")',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly version of the title',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this collection appears in the menu (lower numbers first)',
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
      description: 'Collection description (shown on collection detail page)',
    },
    {
      name: 'contentBlocks',
      title: 'Content Blocks',
      type: 'array',
      description: 'Editorial content blocks for the collection page',
      of: [
        {type: 'collectionTextBlock'},
        {type: 'collectionImageBlock'},
      ],
    },
    {
      name: 'featuredProducts',
      title: 'Featured Products',
      type: 'array',
      description: 'Products to feature on the collection page',
      of: [
        {
          type: 'reference',
          to: [{type: 'product'}],
        },
      ],
      validation: (Rule) => Rule.max(4),
    },
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      order: 'order',
    },
    prepare({title, order}) {
      return {
        title: title,
        subtitle: `Order: ${order}`,
      }
    },
  },
})
