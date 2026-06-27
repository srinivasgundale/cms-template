import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Timeline: Block = {
  slug: 'timeline',
  interfaceName: 'TimelineBlock',
  labels: {
    singular: 'Timeline',
    plural: 'Timelines',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'vertical',
      options: [
        { label: 'Vertical', value: 'vertical' },
        { label: 'Horizontal', value: 'horizontal' },
        { label: 'Alternating', value: 'alternating' },
      ],
    },
    {
      name: 'items',
      type: 'array',
      label: 'Events',
      minRows: 1,
      admin: { initCollapsed: true },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'date',
              type: 'text',
              admin: {
                width: '50%',
                description: 'e.g. "2020", "Jan 2020", "Q1 2024"',
              },
            },
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: { width: '50%' },
            },
          ],
        },
        {
          name: 'description',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Optional icon or image for this event.' },
        },
      ],
    },
  ],
}
