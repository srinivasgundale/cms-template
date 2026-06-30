import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { link } from '@/fields/link'

export const Slider: Block = {
  slug: 'slider',
  interfaceName: 'SliderBlock',
  labels: { singular: 'Slider', plural: 'Sliders' },
  fields: [
    { name: 'title', type: 'text' },
    {
      type: 'row',
      fields: [
        {
          name: 'autoplay',
          type: 'checkbox',
          defaultValue: false,
          label: 'Autoplay',
          admin: { width: '50%' },
        },
        {
          name: 'autoplaySpeed',
          type: 'number',
          defaultValue: 4000,
          admin: {
            width: '50%',
            description: 'Milliseconds between slides.',
            condition: (_, siblingData) => Boolean(siblingData?.autoplay),
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'showArrows',
          type: 'checkbox',
          defaultValue: true,
          label: 'Show prev / next arrows',
          admin: { width: '50%' },
        },
        {
          name: 'showDots',
          type: 'checkbox',
          defaultValue: true,
          label: 'Show dot indicators',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'slides',
      type: 'array',
      minRows: 1,
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'mobileImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Mobile Image (optional)',
          admin: { description: 'Shown on small screens instead of the main image.' },
        },
        {
          type: 'row',
          fields: [
            { name: 'title', type: 'text', admin: { width: '50%' } },
            {
              name: 'overlayPosition',
              type: 'select',
              defaultValue: 'bottom-left',
              options: [
                { label: 'Bottom Left', value: 'bottom-left' },
                { label: 'Bottom Center', value: 'bottom-center' },
                { label: 'Center', value: 'center' },
              ],
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
        { name: 'enableLink', type: 'checkbox', defaultValue: false },
        link({
          appearances: ['default', 'outline'],
          overrides: {
            admin: {
              condition: (_, siblingData) => Boolean(siblingData?.enableLink),
            },
          },
        }),
      ],
    },
  ],
}
