import {defineType} from 'sanity'

export default defineType({
  name: 'contentBlock',
  title: 'Content Block',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'linkUrl',
      title: 'Link URL',
      type: 'url',
      description: 'Where this block should link to',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    },
    {
      name: 'linkText',
      title: 'Link Text',
      type: 'string',
      description: 'Text to display on the button (e.g., "Shop Objects", "View Project")',
      hidden: ({parent}) => !parent?.linkUrl,
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'image',
    },
  },
})
