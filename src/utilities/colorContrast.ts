/**
 * Returns true when the given CSS color value has a perceived luminance above 0.6
 * (i.e. it's light enough that dark text is needed for legibility).
 *
 * Supports: hex (#fff / #ffffff), rgb(r,g,b), and common named light colors.
 * Falls back to false (dark background assumed) when parsing fails.
 */
export function isLightBackground(color: string | null | undefined): boolean {
  if (!color) return false
  const c = color.trim().toLowerCase()

  const namedLight = new Set([
    'white', 'snow', 'ivory', 'lightyellow', 'lightcyan', 'aliceblue',
    'ghostwhite', 'honeydew', 'lavender', 'linen', 'mintcream', 'oldlace',
    'seashell', 'floralwhite', 'antiquewhite', 'beige',
  ])
  if (namedLight.has(c)) return true

  const hex = c.startsWith('#') ? c.slice(1) : null
  if (hex) {
    const full = hex.length === 3 ? hex.split('').map((h) => h + h).join('') : hex
    if (full.length === 6) {
      const r = parseInt(full.slice(0, 2), 16)
      const g = parseInt(full.slice(2, 4), 16)
      const b = parseInt(full.slice(4, 6), 16)
      return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6
    }
  }

  const rgb = c.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/)
  if (rgb) {
    return (0.299 * +rgb[1] + 0.587 * +rgb[2] + 0.114 * +rgb[3]) / 255 > 0.6
  }

  return false
}
