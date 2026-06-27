import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Alert: Block = {
  slug: 'alert',
  interfaceName: 'AlertBlock',
  labels: { singular: 'Alert', plural: 'Alerts' },
  fields: [
    {
      name: 'style',
      type: 'select',
      required: true,
      defaultValue: 'info',
      options: [
        { label: 'Info', value: 'info' },
        { label: 'Success', value: 'success' },
        { label: 'Warning', value: 'warning' },
        { label: 'Error', value: 'error' },
      ],
    },
    { name: 'title', type: 'text' },
    {
      name: 'message',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    {
      name: 'showIcon',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show icon',
    },
    {
      name: 'dismissible',
      type: 'checkbox',
      defaultValue: false,
      label: 'Dismissible',
    },
  ],
}
