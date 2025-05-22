/**
 * @file platform.ts Utility constants for platform detection.
 */

/**
 * Indicates if the code is running in a browser environment where `window` is defined.
 * @type {boolean}
 */
export const IS_CLIENT = typeof window !== 'undefined'

/**
 * Indicates if the client platform is macOS.
 * This is determined by checking `navigator.platform` and is only relevant if `IS_CLIENT` is true.
 * @type {boolean}
 */
export const IS_MAC = IS_CLIENT && navigator.platform.toUpperCase().includes('MAC')
