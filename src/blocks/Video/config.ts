import type { Block } from 'payload'

export const Video: Block = {
  slug: 'video',
  interfaceName: 'VideoBlock',
  labels: {
    singular: 'Video',
    plural: 'Videos',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'source',
      type: 'select',
      required: true,
      defaultValue: 'youtube',
      options: [
        { label: 'YouTube', value: 'youtube' },
        { label: 'Vimeo', value: 'vimeo' },
        { label: 'Self-hosted / Upload', value: 'upload' },
      ],
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      admin: {
        description: 'Paste the full YouTube or Vimeo URL (e.g. https://www.youtube.com/watch?v=...).',
        condition: (_, siblingData) =>
          siblingData?.source === 'youtube' || siblingData?.source === 'vimeo',
      },
    },
    {
      name: 'video',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Upload an MP4 or WebM video file.',
        condition: (_, siblingData) => siblingData?.source === 'upload',
      },
    },
    {
      name: 'poster',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Thumbnail shown before the video plays.',
        condition: (_, siblingData) => siblingData?.source === 'upload',
      },
    },
    {
      name: 'caption',
      type: 'text',
    },
    {
      name: 'autoplay',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Only applies to self-hosted videos. Autoplay is blocked by most browsers unless muted.',
        condition: (_, siblingData) => siblingData?.source === 'upload',
      },
    },
  ],
}
