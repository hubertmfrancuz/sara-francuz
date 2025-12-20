import {defineType} from 'sanity'

export default defineType({
  name: 'imageBlock',
  title: 'Image Block',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
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
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      options: {
        list: [
          {title: 'URL', value: 'url'},
          {title: 'Product', value: 'product'},
          {title: 'Collection', value: 'collection'},
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
      hidden: ({parent}) => parent?.linkType !== 'url',
      validation: (Rule) =>
        Rule.custom((url, context) => {
          const linkType = (context.parent as any)?.linkType
          if (linkType === 'url' && !url) {
            return 'URL is required when Link Type is URL'
          }
          return true
        }),
    },
    {
      name: 'productReference',
      title: 'Product',
      type: 'reference',
      to: [{type: 'product'}],
      hidden: ({parent}) => parent?.linkType !== 'product',
      validation: (Rule) =>
        Rule.custom((ref, context) => {
          const linkType = (context.parent as any)?.linkType
          if (linkType === 'product' && !ref) {
            return 'Product is required when Link Type is Product'
          }
          return true
        }),
    },
    {
      name: 'collectionReference',
      title: 'Collection',
      type: 'reference',
      to: [{type: 'collection'}],
      hidden: ({parent}) => parent?.linkType !== 'collection',
      validation: (Rule) =>
        Rule.custom((ref, context) => {
          const linkType = (context.parent as any)?.linkType
          if (linkType === 'collection' && !ref) {
            return 'Collection is required when Link Type is Collection'
          }
          return true
        }),
    },
    {
      name: 'size',
      title: 'Size (Width)',
      type: 'string',
      options: {
        list: [
          {title: 'Small (~25%)', value: 'small'},
          {title: 'Medium (~40%)', value: 'medium'},
          {title: 'Large (~75%)', value: 'large'},
        ],
      },
      initialValue: 'medium',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'alignment',
      title: 'Alignment',
      type: 'string',
      options: {
        list: [
          {title: 'Default', value: 'default'},
          {title: 'Centered', value: 'centered'},
        ],
      },
      initialValue: 'default',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'orientation',
      title: 'Orientation',
      type: 'string',
      options: {
        list: [
          {title: 'Portrait', value: 'portrait'},
          {title: 'Landscape', value: 'landscape'},
        ],
      },
      initialValue: 'portrait',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'mobileAlignment',
      title: 'Mobile Alignment',
      type: 'string',
      description: 'On mobile, blocks will be 50% width and positioned according to this setting',
      options: {
        list: [
          {title: 'Left (50% width, aligned left)', value: 'mobile-left'},
          {title: 'Right (50% width, aligned right)', value: 'mobile-right'},
          {title: 'Centered (50% width, centered)', value: 'mobile-centered'},
        ],
      },
      initialValue: 'mobile-left',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      size: 'size',
    },
    prepare({title, media, size}) {
      return {
        title: title,
        subtitle: `Image Block - ${size}`,
        media,
      }
    },
  },
})
