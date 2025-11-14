import {defineType} from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'object',
  fields: [
    {
      name: 'video',
      title: 'Hero Video (MP4)',
      type: 'file',
      description: 'Upload an MP4 video for the hero. Video takes priority over image if both are set.',
      options: {
        accept: 'video/mp4',
      },
    },
    {
      name: 'image',
      title: 'Hero Image',
      type: 'image',
      description: 'Fallback image if no video is uploaded, or poster image for the video',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'linkUrl',
      title: 'Link URL',
      type: 'url',
      description: 'Optional link for the hero image/video',
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
  validation: (Rule) =>
    Rule.custom((fields: any) => {
      if (!fields?.video && !fields?.image) {
        return 'Please provide either a video or an image for the hero section'
      }
      return true
    }),
})
