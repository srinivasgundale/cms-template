import type { Block } from 'payload'

export const Newsletter: Block = {
  slug: 'newsletter',
  interfaceName: 'NewsletterBlock',
  labels: { singular: 'Newsletter', plural: 'Newsletters' },
  fields: [
    { name: 'title', type: 'text' },
    { name: 'description', type: 'textarea' },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'centered',
      options: [
        { label: 'Centered', value: 'centered' },
        { label: 'Inline (label + input + button in a row)', value: 'inline' },
        { label: 'Stacked', value: 'stacked' },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'inputPlaceholder',
          type: 'text',
          defaultValue: 'Enter your email',
          admin: { width: '50%' },
        },
        {
          name: 'buttonLabel',
          type: 'text',
          defaultValue: 'Subscribe',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'actionUrl',
      type: 'text',
      admin: {
        description: 'Form POST endpoint (e.g. Mailchimp, ConvertKit, or your own API route). Leave blank to handle client-side.',
      },
    },
    {
      name: 'successMessage',
      type: 'text',
      defaultValue: 'Thanks for subscribing!',
    },
    {
      name: 'disclaimer',
      type: 'text',
      admin: { description: 'e.g. "No spam. Unsubscribe anytime."' },
    },
  ],
}
