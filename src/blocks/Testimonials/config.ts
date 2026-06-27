import type { Block } from 'payload'

export const Testimonials: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  labels: {
    singular: 'Testimonials',
    plural: 'Testimonials',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Carousel', value: 'carousel' },
        { label: 'List', value: 'list' },
      ],
    },
    {
      name: 'items',
      type: 'array',
      label: 'Testimonials',
      minRows: 1,
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          required: true,
        },
        {
          type: 'row',
          fields: [
            {
              name: 'author',
              type: 'text',
              required: true,
              admin: { width: '50%' },
            },
            {
              name: 'role',
              type: 'text',
              admin: { width: '50%' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'company',
              type: 'text',
              admin: { width: '50%' },
            },
            {
              name: 'rating',
              type: 'select',
              defaultValue: '5',
              options: [
                { label: '★★★★★  5', value: '5' },
                { label: '★★★★☆  4', value: '4' },
                { label: '★★★☆☆  3', value: '3' },
                { label: '★★☆☆☆  2', value: '2' },
                { label: '★☆☆☆☆  1', value: '1' },
              ],
              admin: { width: '50%' },
            },
          ],
        },
        {
          name: 'avatar',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
