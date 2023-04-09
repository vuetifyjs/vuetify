export const IN_BROWSER = typeof window !== 'undefined'
export const SUPPORTS_INTERSECTION = IN_BROWSER && 'IntersectionObserver' in window
export const SUPPORTS_TOUCH = IN_BROWSER && ('ontouchstart' in window || window.navigator.maxTouchPoints > 0)
export const SUPPORTS_FOCUS_VISIBLE = IN_BROWSER &&
  typeof CSS !== 'undefined' &&
  typeof CSS.supports !== 'undefined' &&
  CSS.supports('selector(:focus-visible)')
