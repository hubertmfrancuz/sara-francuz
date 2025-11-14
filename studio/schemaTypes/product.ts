import {defineType} from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Product Title',
      type: 'string',
      description: 'Product name (e.g., "Pillar 0503", "Bombi 01")',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'handle',
      title: 'Handle (URL Slug)',
      type: 'slug',
      description: 'URL-friendly version of the title',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'collection',
      title: 'Collection',
      type: 'reference',
      to: [{type: 'collection'}],
      description: 'Which collection this product belongs to',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price in PLN (e.g., 399.00)',
      validation: (Rule) => Rule.required().positive(),
    },
    {
      name: 'images',
      title: 'Product Images',
      type: 'array',
      description: 'First image will be the main product photo',
      of: [
        {
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
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'properties',
      title: 'Product Properties',
      type: 'array',
      description: 'Flexible properties (Lead time, Measurements, Composition, Shipping, etc.)',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Property Title',
              description: 'e.g., "LEAD TIME", "MEASUREMENTS"',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'content',
              type: 'text',
              title: 'Property Content',
              rows: 3,
              description: 'Property value (plain text)',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'content',
            },
          },
        },
      ],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
      description: 'Full product description',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'careInstructions',
      title: 'Care Instructions',
      type: 'text',
      rows: 5,
      description: 'Product care and maintenance instructions',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this product appears (lower numbers first)',
      validation: (Rule) => Rule.required().min(0),
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
    {
      title: 'Price Low to High',
      name: 'priceLowToHigh',
      by: [{field: 'price', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'collection.title',
      media: 'images.0',
      price: 'price',
    },
    prepare({title, subtitle, media, price}) {
      return {
        title: title,
        subtitle: `${subtitle} - ${price?.toFixed(2)} PLN`,
        media: media,
      }
    },
  },
})
