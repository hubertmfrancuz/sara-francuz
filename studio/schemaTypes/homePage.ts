import {defineType} from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'Internal title for reference',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'hero',
    },
    {
      name: 'contentBlocks',
      title: 'Content Blocks',
      type: 'array',
      of: [{type: 'contentBlock'}],
      description: 'Add blocks to showcase projects, collections, or featured items',
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
        },
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],
})
