import type { Block } from 'payload'

export const LogoCloud: Block = {
  slug: 'logoCloud',
  interfaceName: 'LogoCloudBlock',
  labels: { singular: 'Logo Cloud', plural: 'Logo Clouds' },
  fields: [
    { name: 'title', type: 'text' },
    { name: 'subtitle', type: 'text' },
    {
      type: 'row',
      fields: [
        {
          name: 'layout',
          type: 'select',
          defaultValue: 'row',
          options: [
            { label: 'Row (scrolling strip)', value: 'row' },
            { label: 'Grid', value: 'grid' },
          ],
          admin: { width: '50%' },
        },
        {
          name: 'grayscale',
          type: 'checkbox',
          defaultValue: true,
          label: 'Grayscale logos',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'logos',
      type: 'array',
      minRows: 1,
      admin: { initCollapsed: true },
      fields: [
        { name: 'logo', type: 'upload', relationTo: 'media', required: true },
        { name: 'name', type: 'text', admin: { description: 'Used as alt text.' } },
        { name: 'url', type: 'text', admin: { description: 'Optional link.' } },
      ],
    },
  ],
}
