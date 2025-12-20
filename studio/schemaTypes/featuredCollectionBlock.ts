import {defineType} from 'sanity'

export default defineType({
  name: 'featuredCollectionBlock',
  title: 'Featured Collection Block',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
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
      name: 'collection',
      title: 'Collection',
      type: 'reference',
      to: [{type: 'collection'}],
      description: 'The collection this block links to',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'products',
      title: 'Featured Products',
      type: 'array',
      description: 'Manually select products to feature (up to 4)',
      of: [
        {
          type: 'reference',
          to: [{type: 'product'}],
        },
      ],
      validation: (Rule) => Rule.max(4).required().min(1),
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      collectionTitle: 'collection.title',
    },
    prepare({title, media, collectionTitle}) {
      return {
        title: title,
        subtitle: `Featured Collection - ${collectionTitle || 'No collection selected'}`,
        media,
      }
    },
  },
})
