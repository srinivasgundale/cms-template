'use client'

import React, { useEffect, useState } from 'react'

export const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const max = scrollHeight - clientHeight
      setProgress(max > 0 ? scrollTop / max : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div
      className="fixed left-0 top-0 z-[9999] h-[3px] w-full origin-left"
      style={{
        transform: `scaleX(${progress})`,
        background: 'linear-gradient(to right, var(--brand-primary), var(--brand-accent))',
        transition: 'transform 80ms linear',
      }}
      aria-hidden="true"
      role="presentation"
    />
  )
}
