/**
 * VCommandPalette Type Definitions
 *
 * Provides strict typing for command palette items and related functionality.
 * Uses discriminated unions for type safety and includes runtime type guards.
 */

// Types
import type { RouteLocationRaw } from 'vue-router'

export interface BaseVListItem {
  title?: string
  subtitle?: string
  prependIcon?: string
  appendIcon?: string
  prependAvatar?: string
  appendAvatar?: string
}

interface NavigableItemProps {
  to?: RouteLocationRaw
  href?: string
}

export interface VCommandPaletteActionItem extends BaseVListItem, NavigableItemProps {
  type?: 'item'
  onClick?: (event: MouseEvent | KeyboardEvent, value?: any) => void
  value?: any
  hotkey?: string
}

export interface VCommandPaletteSubheader {
  type: 'subheader'
  title: string
  inset?: boolean
}

export interface VCommandPaletteDivider {
  type: 'divider'
  inset?: boolean
}

export type VCommandPaletteItem =
  | VCommandPaletteActionItem
  | VCommandPaletteSubheader
  | VCommandPaletteDivider

export function isActionItem (item: any): item is VCommandPaletteActionItem {
  return !item.type || item.type === 'item'
}

export function isSubheader (item: any): item is VCommandPaletteSubheader {
  return item.type === 'subheader'
}

export function isDivider (item: any): item is VCommandPaletteDivider {
  return item.type === 'divider'
}

export function isSelectableItem (item: any): item is VCommandPaletteActionItem {
  return isActionItem(item)
}
