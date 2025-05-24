export const IS_CLIENT = typeof window !== 'undefined'
export const IS_MAC = IS_CLIENT && navigator.platform.toUpperCase().includes('MAC')

// Type definition for what an item looks like when it's a header.
// This is used by isHeaderItem type guard.
export interface CommandPaletteHeaderItem {
  isHeader: true
  title: string
  id: string
}

// Type predicate for header items
export function isHeaderItem (item: any): item is CommandPaletteHeaderItem {
  return item && typeof item === 'object' && 'isHeader' in item && item.isHeader === true
}

/**
 * Default priorities for action groups. Lower numbers appear first.
 * Groups not listed here will get a default priority (e.g., 100).
 */
export const defaultGroupPriorities: Record<string, number> = {
  Navigation: 1,
  File: 2,
  Edit: 3,
  // Add more common groups as needed
}
export const UNGROUPED_PRIORITY = 100
export const UNGROUPED_TITLE = 'Other Actions'

/**
 * Utility function to check if a value is a Promise
 */
export function isPromise<T> (value: any): value is Promise<T> {
  return value && typeof value === 'object' && typeof value.then === 'function'
}

/**
 * Helper logging function with consistent format
 * @param level Log level (debug, info, warn, error)
 * @param component Component name
 * @param ...args Multiple arguments
 */
export function log (
  level: 'debug' | 'info' | 'warn' | 'error',
  component: string,
  ...args: any[]
) {
  const prefix = `[Vuetify ${component}]`

  // eslint-disable no-console
  switch (level) {
    case 'debug':
      console.debug(prefix, ...args)
      break
    case 'info':
      console.info(prefix, ...args)
      break
    case 'warn':
      console.warn(prefix, ...args)
      break
    case 'error':
      if (typeof args[0] === 'string') {
        console.error(`${prefix} Failed at ${args[0]}`, ...args.slice(1))
      } else {
        console.error(prefix, ...args)
      }
      break
  }
}
