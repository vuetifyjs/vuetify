export const IN_BROWSER = typeof window !== 'undefined'
export const IS_DEBUG = process.env.DEBUG === 'true'
export const IS_PROD = process.env.NODE_ENV === 'production'
export const SUPPORTS_INTERSECTION = IN_BROWSER && 'IntersectionObserver' in window
