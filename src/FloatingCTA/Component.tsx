import { getCachedGlobal } from '@/utilities/getGlobals'
import { getLocale } from '@/utilities/getLocale'
import React from 'react'

import { FloatingCTAClient } from './Component.client'

export async function FloatingCTA() {
  const locale = await getLocale()
  const data = await getCachedGlobal('floating-cta', 1, locale)()

  if (!data?.enabled) return null

  return <FloatingCTAClient data={data} />
}
