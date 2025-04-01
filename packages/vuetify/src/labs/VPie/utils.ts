// Types
import type { PieItem } from './types'

export function formatTextTemplate (template: string, item?: PieItem) {
  return item
    ? template
      .replaceAll('[title]', item.title)
      .replaceAll('[value]', String(item.value))
    : undefined
}
