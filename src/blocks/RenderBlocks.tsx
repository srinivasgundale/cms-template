import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { AlertBlock } from '@/blocks/Alert/Component'
import { ContentWithImageBlock } from '@/blocks/ContentWithImage/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { CardsBlock } from '@/blocks/Cards/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FAQBlock } from '@/blocks/FAQ/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { GalleryBlock } from '@/blocks/Gallery/Component'
import { HTMLEmbedBlock } from '@/blocks/HTMLEmbed/Component'
import { LogoCloudBlock } from '@/blocks/LogoCloud/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { NewsletterBlock } from '@/blocks/Newsletter/Component'
import { StatsBlock } from '@/blocks/Stats/Component'
import { TableBlock } from '@/blocks/Table/Component'
import { TabsBlock } from '@/blocks/Tabs/Component'
import { TeamBlock } from '@/blocks/Team/Component'
import { TestimonialsBlock } from '@/blocks/Testimonials/Component'
import { TimelineBlock } from '@/blocks/Timeline/Component'
import { VideoBlock } from '@/blocks/Video/Component'

const blockComponents = {
  alert: AlertBlock,
  archive: ArchiveBlock,
  cards: CardsBlock,
  content: ContentBlock,
  contentWithImage: ContentWithImageBlock,
  cta: CallToActionBlock,
  faq: FAQBlock,
  formBlock: FormBlock,
  gallery: GalleryBlock,
  htmlEmbed: HTMLEmbedBlock,
  logoCloud: LogoCloudBlock,
  mediaBlock: MediaBlock,
  newsletter: NewsletterBlock,
  stats: StatsBlock,
  table: TableBlock,
  tabs: TabsBlock,
  team: TeamBlock,
  testimonials: TestimonialsBlock,
  timeline: TimelineBlock,
  video: VideoBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
