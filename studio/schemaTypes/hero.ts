import {defineType} from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'object',
  fields: [
    {
      name: 'image',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'linkUrl',
      title: 'Link URL',
      type: 'url',
      description: 'Optional link for the hero image',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    },
    {
      name: 'linkText',
      title: 'Link Text',
      type: 'string',
      description: 'Text to display on the button (e.g., "Shop Objects")',
      hidden: ({parent}) => !parent?.linkUrl,
    },
    {
      name: 'alt',
      title: 'Alternative Text',
      type: 'string',
      description: 'Important for SEO and accessibility',
    },
  ],
})
