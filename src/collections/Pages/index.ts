import type { CollectionConfig } from 'payload'

import { isAdminOrHigher } from '../../access/isAdminOrHigher'
import { isEditorOrHigher } from '../../access/isEditorOrHigher'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Alert } from '../../blocks/Alert/config'
import { Events } from '../../blocks/Events/config'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Cards } from '../../blocks/Cards/config'
import { Content } from '../../blocks/Content/config'
import { ContentWithImage } from '../../blocks/ContentWithImage/config'
import { FAQ } from '../../blocks/FAQ/config'
import { FormBlock } from '../../blocks/Form/config'
import { Gallery } from '../../blocks/Gallery/config'
import { HTMLEmbed } from '../../blocks/HTMLEmbed/config'
import { LogoCloud } from '../../blocks/LogoCloud/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { Newsletter } from '../../blocks/Newsletter/config'
import { Slider } from '../../blocks/Slider/config'
import { Stats } from '../../blocks/Stats/config'
import { Table } from '../../blocks/Table/config'
import { Tabs } from '../../blocks/Tabs/config'
import { Team } from '../../blocks/Team/config'
import { Testimonials } from '../../blocks/Testimonials/config'
import { Timeline } from '../../blocks/Timeline/config'
import { Video } from '../../blocks/Video/config'
import { hero } from '@/heros/config'
import { slugField } from 'payload'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: isEditorOrHigher,
    delete: isAdminOrHigher,
    read: authenticatedOrPublished,
    update: isEditorOrHigher,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'pages',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [CallToAction, Content, ContentWithImage, MediaBlock, Archive, FormBlock, Gallery, Video, Testimonials, Timeline, Table, FAQ, Stats, Team, Newsletter, Cards, Tabs, HTMLEmbed, Alert, LogoCloud, Slider, Events],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
