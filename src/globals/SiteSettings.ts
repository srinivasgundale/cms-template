import type { GlobalConfig } from 'payload'
import { revalidateTag } from 'next/cache'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Settings',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'defaultLocale',
      type: 'select',
      label: 'Default Frontend Language',
      defaultValue: 'en',
      options: [
        { label: 'English', value: 'en' },
        { label: 'Hindi (हिंदी)', value: 'hi' },
        { label: 'Marathi (मराठी)', value: 'mr' },
      ],
      required: true,
    },
    {
      name: 'devanagariFont',
      type: 'select',
      label: 'Devanagari Font (Hindi / Marathi)',
      defaultValue: 'noto-sans-devanagari',
      admin: {
        description: 'Font used for Hindi and Marathi content across the site.',
      },
      options: [
        { label: 'Noto Sans Devanagari (Recommended — clean, versatile)', value: 'noto-sans-devanagari' },
        { label: 'Mukta (Modern, humanist — great for body text)', value: 'mukta' },
        { label: 'Hind (Screen-optimised, UI-friendly)', value: 'hind' },
        { label: 'Tiro Devanagari (Traditional, serif — literary / formal)', value: 'tiro-devanagari' },
      ],
    },
  ],
  hooks: {
    afterChange: [
      ({ doc }) => {
        revalidateTag('global_site-settings')
        return doc
      },
    ],
  },
}
