export const IN_BROWSER = typeof window !== 'undefined'
export const SUPPORTS_INTERSECTION = IN_BROWSER && 'IntersectionObserver' in window
export const SUPPORTS_TOUCH = IN_BROWSER && ('ontouchstart' in window || window.navigator.maxTouchPoints > 0)
export const SUPPORTS_EYE_DROPPER = IN_BROWSER && 'EyeDropper' in window
export const SUPPORTS_MATCH_MEDIA = IN_BROWSER && 'matchMedia' in window && typeof window.matchMedia === 'function'
