import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imageList',
      title: 'Image List',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      description: 'Brief description shown on service cards (max 150 characters)',
      validation: (Rule) => Rule.required().max(150),
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'text',
      rows: 4,
      description: 'Detailed description shown on service detail page',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'expertises',
      title: 'Our Expertises',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of expertise bullet points',
    }),
    defineField({
      name: 'projectsSectionTitle',
      title: 'Projects Section Title',
      type: 'string',
      description: 'Title shown above the projects carousel on service detail page',
      initialValue: 'Selected Steel Design Projects',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this service appears (lower numbers appear first)',
      validation: (Rule) => Rule.required().min(0),
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      order: 'order',
    },
    prepare({ title, media, order }) {
      return {
        title,
        subtitle: `Order: ${order}`,
        media,
      }
    },
  },
})

