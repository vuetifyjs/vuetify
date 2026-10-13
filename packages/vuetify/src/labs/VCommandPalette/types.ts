// Types
import type {
  BaseVListItem,
  VCommandPaletteActionItem,
  VCommandPaletteDivider,
  VCommandPaletteItem,
  VCommandPaletteSubheader,
} from './types.types'

export type { BaseVListItem, VCommandPaletteActionItem, VCommandPaletteDivider, VCommandPaletteItem, VCommandPaletteSubheader }

export function isActionItem (item: any): item is VCommandPaletteActionItem {
  return !item.type || item.type === 'item'
}
