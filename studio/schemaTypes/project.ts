import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'handle',
      title: 'Handle',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      description: 'Main image displayed on the projects index page (4/5 aspect ratio)',
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
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'projectCategory'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      description: 'Project date (displayed as MM YYYY)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Project Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
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
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'Optional image caption',
            },
            {
              name: 'orientation',
              title: 'Orientation',
              type: 'string',
              options: {
                list: [
                  {title: 'Horizontal (5/4)', value: 'horizontal'},
                  {title: 'Vertical (4/5)', value: 'vertical'},
                ],
                layout: 'radio',
              },
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'caption',
              media: 'image',
              orientation: 'orientation',
            },
            prepare({title, media, orientation}) {
              return {
                title: title || 'Untitled Image',
                subtitle: orientation === 'horizontal' ? 'Horizontal (5/4)' : 'Vertical (4/5)',
                media,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'credits',
      title: 'Credits',
      type: 'text',
      rows: 3,
      description: 'Optional credits section displayed at the end of the project',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Order in which projects appear (lower numbers first)',
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
    {
      title: 'Date, Newest',
      name: 'dateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      category: 'category.title',
    },
    prepare({title, media, category}) {
      return {
        title,
        subtitle: category,
        media,
      }
    },
  },
})
