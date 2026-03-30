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
      description: 'Product name (e.g., "Pillar 0503", "Bombi 01") — leave blank if synced from Shopify',
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
      name: 'store',
      title: 'Shopify data',
      type: 'object',
      description: 'Managed by Sanity Connect — do not edit manually',
      options: {collapsible: true, collapsed: true},
      fields: [
        {name: 'gid', type: 'string', title: 'GID'},
        {name: 'id', type: 'number', title: 'ID'},
        {name: 'title', type: 'string', title: 'Title'},
        {name: 'slug', type: 'slug', title: 'Slug'},
        {name: 'descriptionHtml', type: 'text', title: 'Description HTML'},
        {name: 'vendor', type: 'string', title: 'Vendor'},
        {name: 'productType', type: 'string', title: 'Product type'},
        {name: 'tags', type: 'string', title: 'Tags'},
        {name: 'status', type: 'string', title: 'Status'},
        {name: 'isDeleted', type: 'boolean', title: 'Is deleted'},
        {name: 'createdAt', type: 'datetime', title: 'Created at'},
        {
          name: 'priceRange',
          type: 'object',
          title: 'Price range',
          fields: [
            {name: 'minVariantPrice', type: 'number', title: 'Min variant price'},
            {name: 'maxVariantPrice', type: 'number', title: 'Max variant price'},
          ],
        },
        {
          name: 'options',
          type: 'array',
          title: 'Options',
          of: [
            {
              type: 'object',
              name: 'option',
              fields: [
                {name: 'name', type: 'string'},
                {name: 'values', type: 'array', of: [{type: 'string'}]},
              ],
            },
          ],
        },
        {
          name: 'variants',
          type: 'array',
          title: 'Variants',
          of: [{type: 'reference', to: [{type: 'productVariant'}], weak: true}],
        },
        {
          name: 'shop',
          type: 'object',
          title: 'Shop',
          fields: [{name: 'domain', type: 'string'}],
        },
      ],
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
      storeTitle: 'store.title',
      subtitle: 'collection.title',
      media: 'images.0',
      storePrice: 'store.priceRange.minVariantPrice',
    },
    prepare({title, storeTitle, subtitle, media, storePrice}) {
      const displayTitle = title || storeTitle || 'Untitled'
      const displayPrice = storePrice
      return {
        title: displayTitle,
        subtitle: `${subtitle ?? ''} - ${displayPrice?.toFixed(2) ?? '?'} PLN`,
        media: media,
      }
    },
  },
})
