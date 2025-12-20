import { defineType } from 'sanity'

export default defineType({
  name: 'collectionImageBlock',
  title: 'Collection Image Block',
  type: 'object',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string'
        }
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'caption',
      title: 'Caption (optional)',
      type: 'string',
      description: 'Optional caption text below the image'
    },
    {
      name: 'linkedProduct',
      title: 'Linked Product (optional)',
      type: 'reference',
      to: [{ type: 'product' }],
      description: 'If set, clicking the image will link to this product'
    },
    {
      name: 'size',
      title: 'Size',
      type: 'string',
      options: {
        list: [
          { title: 'Small (~25%)', value: 'small' },
          { title: 'Medium (~40%)', value: 'medium' },
          { title: 'Large (~75%)', value: 'large' }
        ],
        layout: 'radio'
      },
      initialValue: 'medium',
      validation: Rule => Rule.required()
    },
    {
      name: 'alignment',
      title: 'Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Centered', value: 'centered' }
        ],
        layout: 'radio'
      },
      initialValue: 'default',
      validation: Rule => Rule.required()
    },
    {
      name: 'orientation',
      title: 'Orientation',
      type: 'string',
      options: {
        list: [
          { title: 'Portrait (3:4)', value: 'portrait' },
          { title: 'Landscape (4:3)', value: 'landscape' }
        ],
        layout: 'radio'
      },
      initialValue: 'portrait',
      validation: Rule => Rule.required()
    },
    {
      name: 'mobileAlignment',
      title: 'Mobile Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'mobile-left' },
          { title: 'Right', value: 'mobile-right' },
          { title: 'Centered', value: 'mobile-centered' }
        ],
        layout: 'radio'
      },
      initialValue: 'mobile-left',
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {
      caption: 'caption',
      media: 'image',
      size: 'size',
      hasProduct: 'linkedProduct'
    },
    prepare({ caption, media, size, hasProduct }) {
      return {
        title: caption || 'Image Block',
        subtitle: `${size}${hasProduct ? ' (linked to product)' : ''}`,
        media
      }
    }
  }
})
