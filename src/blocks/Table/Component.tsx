import type { TableBlock as TableBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'

type Props = TableBlockProps & {
  className?: string
  disableInnerContainer?: boolean
}

const alignClass: Record<string, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

export const TableBlock: React.FC<Props> = ({
  className,
  caption,
  headers,
  rows,
  striped = true,
  bordered = false,
}) => {
  if (!headers?.length) return null

  return (
    <div className={cn('container overflow-x-auto', className)}>
      {caption && (
        <p className="mb-3 text-lg font-semibold">{caption}</p>
      )}

      <table
        className={cn('w-full border-collapse text-sm', {
          'border border-border': bordered,
        })}
      >
        <thead>
          <tr className="bg-muted">
            {headers.map((header, i) => (
              <th
                key={i}
                className={cn(
                  'px-4 py-3 font-semibold text-foreground',
                  alignClass[header.align ?? 'left'] ?? alignClass['left'],
                  { 'border border-border': bordered },
                )}
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows?.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              className={cn({
                'bg-muted/40': striped && rowIdx % 2 !== 0,
                'hover:bg-muted/60': true,
              })}
            >
              {row.cells?.map((cell, cellIdx) => (
                <td
                  key={cellIdx}
                  className={cn(
                    'px-4 py-3 text-muted-foreground',
                    alignClass[headers[cellIdx]?.align ?? 'left'] ?? alignClass['left'],
                    { 'border border-border': bordered },
                  )}
                >
                  {cell.content}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
