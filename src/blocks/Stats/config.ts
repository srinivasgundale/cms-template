import type { Block } from 'payload'

export const Stats: Block = {
  slug: 'stats',
  interfaceName: 'StatsBlock',
  labels: { singular: 'Stats', plural: 'Stats' },
  fields: [
    { name: 'title', type: 'text' },
    { name: 'subtitle', type: 'text' },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Inline / Row', value: 'inline' },
      ],
    },
    {
      name: 'items',
      type: 'array',
      label: 'Stats',
      minRows: 1,
      admin: { initCollapsed: true },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'value',
              type: 'text',
              required: true,
              admin: { width: '50%', description: 'e.g. "10k+", "99%", "$5M"' },
            },
            {
              name: 'label',
              type: 'text',
              required: true,
              admin: { width: '50%', description: 'e.g. "Active Users"' },
            },
          ],
        },
        { name: 'description', type: 'text' },
        { name: 'icon', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
