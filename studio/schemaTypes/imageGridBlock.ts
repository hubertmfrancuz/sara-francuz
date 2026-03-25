import {defineType} from 'sanity'

export default defineType({
  name: 'imageGridBlock',
  title: 'Image Grid',
  type: 'object',
  fields: [
    {
      name: 'columns',
      title: 'Columns',
      type: 'number',
      options: {
        list: [
          {title: '2 Columns', value: 2},
          {title: '3 Columns', value: 3},
          {title: '4 Columns', value: 4},
        ],
      },
      initialValue: 4,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{type: 'imageBlock'}],
      validation: (Rule) => Rule.required().min(1),
    },
  ],
  preview: {
    select: {
      columns: 'columns',
      items: 'items',
    },
    prepare({columns, items}) {
      return {
        title: `Image Grid — ${columns} col, ${items?.length || 0} items`,
      }
    },
  },
})
