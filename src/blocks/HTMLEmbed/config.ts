import type { Block } from 'payload'

export const HTMLEmbed: Block = {
  slug: 'htmlEmbed',
  interfaceName: 'HTMLEmbedBlock',
  labels: { singular: 'HTML Embed', plural: 'HTML Embeds' },
  fields: [
    {
      name: 'html',
      type: 'code',
      required: true,
      admin: {
        language: 'html',
        description: 'Raw HTML rendered directly on the page. Only use trusted content — this is not sandboxed.',
      },
    },
    { name: 'caption', type: 'text' },
  ],
}
