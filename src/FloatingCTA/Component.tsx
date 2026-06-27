import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import { FloatingCTAClient } from './Component.client'

export async function FloatingCTA() {
  const data = await getCachedGlobal('floating-cta', 1)()

  if (!data?.enabled) return null

  return <FloatingCTAClient data={data} />
}
