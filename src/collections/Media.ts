import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { anyone } from '../access/anyone'
import { isAdminOrHigher } from '../access/isAdminOrHigher'
import { isEditorOrHigher } from '../access/isEditorOrHigher'
import { cldPublicId, cldSizePublicId, deleteFromCloudinary, uploadToCloudinary } from '../utilities/cloudinary'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const cloudinaryEnabled = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET,
)

export const Media: CollectionConfig = {
  slug: 'media',
  folders: true,
  access: {
    create: isEditorOrHigher,
    delete: isAdminOrHigher,
    read: anyone,
    update: isEditorOrHigher,
  },
  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        if (!cloudinaryEnabled) return doc
        if (req.context?.skipCloudinarySync) return doc
        if (operation !== 'create' && operation !== 'update') return doc
        if (!doc.filename || doc.url?.includes('cloudinary.com')) return doc

        try {
          // Upload main file
          const mainUrl = await uploadToCloudinary(doc.filename, cldPublicId(doc.id))
          if (!mainUrl) return doc

          // Upload each size variant
          const sizesUpdate: Record<string, { url: string }> = {}
          for (const [sizeName, sizeData] of Object.entries(doc.sizes ?? {})) {
            const sd = sizeData as { filename?: string }
            if (sd?.filename) {
              const url = await uploadToCloudinary(sd.filename, cldSizePublicId(doc.id, sizeName))
              if (url) sizesUpdate[sizeName] = { url }
            }
          }

          await req.payload.update({
            collection: 'media',
            id: doc.id,
            data: {
              url: mainUrl,
              ...(Object.keys(sizesUpdate).length > 0 && { sizes: sizesUpdate }),
            },
            context: { skipCloudinarySync: true },
            req,
          })

          return { ...doc, url: mainUrl }
        } catch (err) {
          console.error('Cloudinary upload error:', err)
          return doc
        }
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        if (!cloudinaryEnabled) return
        try {
          await deleteFromCloudinary(cldPublicId(doc.id))
          for (const sizeName of Object.keys(doc.sizes ?? {})) {
            await deleteFromCloudinary(cldSizePublicId(doc.id, sizeName))
          }
        } catch (err) {
          console.error('Cloudinary delete error:', err)
        }
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      //required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
  ],
  upload: {
    // Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
    staticDir: path.resolve(dirname, '../../public/media'),
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
  },
}
