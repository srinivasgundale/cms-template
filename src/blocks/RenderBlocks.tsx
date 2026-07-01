import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { AnimateIn } from '@/components/AnimateIn'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { AlertBlock } from '@/blocks/Alert/Component'
import { EventsBlock } from '@/blocks/Events/Component'
import { ContentWithImageBlock } from '@/blocks/ContentWithImage/Component'
import { SliderBlock } from '@/blocks/Slider/Component'
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

// Blocks that span full viewport width and manage their own background via cms-bg
const fullBleedBlocks = new Set([
  'slider', 'mediaBlock', 'gallery', 'contentWithImage',
  'faq', 'newsletter', 'formBlock', 'events',
])

const blockComponents = {
  alert: AlertBlock,
  events: EventsBlock,
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
  slider: SliderBlock,
  stats: StatsBlock,
  table: TableBlock,
  tabs: TabsBlock,
  team: TeamBlock,
  testimonials: TestimonialsBlock,
  timeline: TimelineBlock,
  video: VideoBlock,
}

// Alternating section backgrounds — even: white, odd: light gray
const sectionBgs = ['#ffffff', '#F5F5F5'] as const

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
              const isFullBleed = fullBleedBlocks.has(blockType)
              const alternateBg = sectionBgs[index % 2]

              return (
                <AnimateIn key={index} className="w-full">
                  <section
                    className={cn(
                      'relative w-full',
                      !isFullBleed && 'py-20 lg:py-[7.5rem]',
                      isFullBleed && 'overflow-hidden',
                    )}
                    style={{
                      '--section-bg': alternateBg,
                      ...(!isFullBleed && { backgroundColor: alternateBg }),
                    } as React.CSSProperties}
                  >
                    {/* @ts-expect-error there may be some mismatch between the expected types here */}
                    <Block {...block} disableInnerContainer />
                  </section>
                </AnimateIn>
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
