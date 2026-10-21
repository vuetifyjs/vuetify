const IN_BROWSER = typeof window !== 'undefined'
const IS_DEBUG = import.meta.env.DEBUG === 'true'
const IS_PROD = import.meta.env.NODE_ENV === 'production'
const IS_SERVER = import.meta.env.SSR
const PREFERS_REDUCED_MOTION = () => IN_BROWSER && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export {
  IN_BROWSER,
  IS_DEBUG,
  IS_PROD,
  IS_SERVER,
  PREFERS_REDUCED_MOTION,
}
