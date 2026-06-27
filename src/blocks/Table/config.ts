import type { Block } from 'payload'

export const Table: Block = {
  slug: 'table',
  interfaceName: 'TableBlock',
  labels: {
    singular: 'Table',
    plural: 'Tables',
  },
  fields: [
    {
      name: 'caption',
      type: 'text',
      admin: { description: 'Optional title shown above the table.' },
    },
    {
      name: 'headers',
      type: 'array',
      label: 'Column Headers',
      minRows: 1,
      admin: { initCollapsed: false },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              admin: { width: '70%' },
            },
            {
              name: 'align',
              type: 'select',
              defaultValue: 'left',
              options: [
                { label: 'Left', value: 'left' },
                { label: 'Center', value: 'center' },
                { label: 'Right', value: 'right' },
              ],
              admin: { width: '30%' },
            },
          ],
        },
      ],
    },
    {
      name: 'rows',
      type: 'array',
      label: 'Rows',
      minRows: 1,
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'cells',
          type: 'array',
          label: 'Cells',
          minRows: 1,
          admin: {
            description: 'Add one cell per column, in the same order as the headers.',
          },
          fields: [
            {
              name: 'content',
              type: 'text',
              required: true,
              label: false,
            },
          ],
        },
      ],
    },
    {
      name: 'striped',
      type: 'checkbox',
      defaultValue: true,
      label: 'Striped rows',
    },
    {
      name: 'bordered',
      type: 'checkbox',
      defaultValue: false,
      label: 'Show borders',
    },
  ],
}
