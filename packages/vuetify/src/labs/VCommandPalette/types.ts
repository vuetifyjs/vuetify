/**
 * VCommandPalette Type Definitions
 *
 * Provides strict typing for command palette items and related functionality.
 * Uses discriminated unions for type safety and includes runtime type guards.
 */

// Types
import type { RouteLocationRaw } from 'vue-router'

/**
 * Base properties shared across VList items
 */
export interface BaseVListItem {
  title?: string
  subtitle?: string
  prependIcon?: string
  appendIcon?: string
  prependAvatar?: string
  appendAvatar?: string
}

/**
 * Navigation properties for items that can navigate
 */
interface NavigableItemProps {
  to?: RouteLocationRaw
  href?: string
}

/**
 * Standard action item - can execute a handler or navigate
 * Type defaults to 'item' if not specified
 */
export interface VCommandPaletteActionItem extends BaseVListItem, NavigableItemProps {
  type?: 'item'
  onClick?: (event: MouseEvent | KeyboardEvent, value?: any) => void
  value?: any
  hotkey?: string
}

/**
 * Subheader item - non-interactive group header for visual organization
 */
export interface VCommandPaletteSubheader {
  type: 'subheader'
  title: string
  inset?: boolean
}

/**
 * Divider item - visual separator between sections
 */
export interface VCommandPaletteDivider {
  type: 'divider'
  inset?: boolean
}

/**
 * Union of all supported item types for command palette
 */
export type VCommandPaletteItem =
  | VCommandPaletteActionItem
  | VCommandPaletteSubheader
  | VCommandPaletteDivider

/**
 * Type guard: Check if item is an action item
 */
export function isActionItem (item: any): item is VCommandPaletteActionItem {
  return !item.type || item.type === 'item'
}

/**
 * Type guard: Check if item is a subheader
 */
export function isSubheader (item: any): item is VCommandPaletteSubheader {
  return item.type === 'subheader'
}

/**
 * Type guard: Check if item is a divider
 */
export function isDivider (item: any): item is VCommandPaletteDivider {
  return item.type === 'divider'
}

/**
 * Type guard: Check if item is selectable/interactive
 * (excludes subheaders and dividers)
 */
export function isSelectableItem (item: any): item is VCommandPaletteActionItem {
  return isActionItem(item)
}
