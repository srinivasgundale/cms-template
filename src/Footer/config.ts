import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Background Color',
      admin: {
        description: 'CSS color for the footer (e.g. #111827). Leave blank for default.',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Site logo shown in the footer. Falls back to the text logo if not set.',
      },
    },
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline',
      admin: {
        description: 'Short description shown below the logo.',
      },
    },
    {
      name: 'navColumnLabel',
      type: 'text',
      label: 'Links Column Heading',
      defaultValue: 'Quick Links',
      admin: {
        description: 'Heading above the navigation links column.',
      },
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 8,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'contactColumnLabel',
      type: 'text',
      label: 'Contact Column Heading',
      defaultValue: 'Contact Us',
      admin: {
        description: 'Heading above the contact info column.',
      },
    },
    {
      name: 'address',
      type: 'text',
      label: 'Address',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone',
    },
    {
      name: 'email',
      type: 'text',
      label: 'Email',
    },
    {
      name: 'hours',
      type: 'text',
      label: 'Office Hours',
      admin: {
        description: 'e.g. Mon–Fri, 9 AM – 5 PM',
      },
    },
    {
      name: 'copyrightText',
      type: 'text',
      label: 'Copyright Text',
      admin: {
        description: 'Bottom bar text. Use {year} for the current year.',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
