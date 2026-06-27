import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (_props: Props) => {
  return (
    <div className="flex items-center gap-2 select-none" aria-label="Hindu Temple">
      <span
        className="text-[2rem] leading-none font-bold text-[#E07800]"
        aria-hidden="true"
      >
        ॐ
      </span>
      <span className="font-bold text-lg tracking-[0.2em] uppercase text-white">
        HINDU
      </span>
    </div>
  )
}
