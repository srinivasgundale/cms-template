import type { GlobalConfig } from 'payload'

import { revalidateFloatingCTA } from './hooks/revalidateFloatingCTA'

export const FloatingCTA: GlobalConfig = {
  slug: 'floating-cta',
  label: 'Floating CTA',
  access: { read: () => true },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: false,
      label: 'Enable Floating CTA',
    },
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'bottom-bar',
      admin: {
        description: 'Where the CTA appears on the page.',
        condition: (data) => Boolean(data?.enabled),
      },
      options: [
        { label: 'Bottom Bar (fixed, above footer)', value: 'bottom-bar' },
        { label: 'Right Side Bubbles', value: 'side-right' },
        { label: 'Left Side Bubbles', value: 'side-left' },
      ],
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      admin: {
        initCollapsed: true,
        condition: (data) => Boolean(data?.enabled),
      },
      fields: [
        {
          name: 'icon',
          type: 'select',
          required: true,
          defaultValue: 'phone',
          options: [
            { label: 'Phone', value: 'phone' },
            { label: 'WhatsApp', value: 'whatsapp' },
            { label: 'Email', value: 'email' },
            { label: 'Chat / Message', value: 'chat' },
            { label: 'Custom Image', value: 'custom' },
          ],
        },
        {
          name: 'customIcon',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Used when icon is set to "Custom Image".',
            condition: (_, siblingData) => siblingData?.icon === 'custom',
          },
        },
        {
          name: 'label',
          type: 'text',
          admin: {
            description: 'Button text — shown on primary/outline style buttons in the bottom bar.',
          },
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          admin: {
            description:
              'tel:+1234567890  |  https://wa.me/1234567890  |  mailto:info@example.com  |  any URL',
          },
        },
        {
          name: 'style',
          type: 'select',
          defaultValue: 'bubble',
          options: [
            { label: 'Icon Bubble', value: 'bubble' },
            { label: 'Primary Button (filled)', value: 'primary' },
            { label: 'Outline Button', value: 'outline' },
          ],
        },
        {
          name: 'backgroundColor',
          type: 'text',
          admin: {
            description:
              'Override bubble colour (e.g. #FF6B00). Leave blank to use the default colour for the icon type.',
          },
        },
        {
          name: 'newTab',
          type: 'checkbox',
          defaultValue: false,
          label: 'Open in new tab',
        },
      ],
    },
    {
      name: 'showScrollToTop',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show scroll-to-top button',
      admin: {
        description: 'Appears at the bottom of side-bubble variants once the user scrolls down.',
        condition: (data) =>
          data?.enabled && (data?.variant === 'side-right' || data?.variant === 'side-left'),
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFloatingCTA],
  },
}
