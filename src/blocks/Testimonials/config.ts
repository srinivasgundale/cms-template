import type { Block } from 'payload'

export const Testimonials: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  labels: {
    singular: 'Testimonials',
    plural: 'Testimonials',
  },
  fields: [
    { name: 'title', type: 'text' },
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
        { name: 'quote', type: 'textarea', required: true },
        {
          type: 'row',
          fields: [
            { name: 'author', type: 'text', required: true, admin: { width: '50%' } },
            { name: 'role', type: 'text', admin: { width: '50%' } },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'tenure',
              type: 'text',
              label: 'Tenure / Duration',
              admin: { width: '50%', description: 'e.g. "3 years with us"' },
            },
            {
              name: 'rating',
              type: 'select',
              label: 'Rating (optional)',
              admin: { width: '50%' },
              options: [
                { label: '★★★★★  5', value: '5' },
                { label: '★★★★☆  4', value: '4' },
                { label: '★★★☆☆  3', value: '3' },
                { label: '★★☆☆☆  2', value: '2' },
                { label: '★☆☆☆☆  1', value: '1' },
              ],
            },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'badge', type: 'text', label: 'Badge (optional, e.g. "Member")', admin: { width: '50%' } },
            {
              name: 'badgeColor',
              type: 'select',
              label: 'Badge Color',
              defaultValue: 'green',
              admin: { width: '50%' },
              options: [
                { label: 'Green', value: 'green' },
                { label: 'Blue', value: 'blue' },
                { label: 'Orange', value: 'orange' },
                { label: 'Purple', value: 'purple' },
                { label: 'Red', value: 'red' },
                { label: 'Gray', value: 'gray' },
              ],
            },
          ],
        },
        { name: 'avatar', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
