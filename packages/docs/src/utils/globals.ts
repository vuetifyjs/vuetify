const IN_BROWSER = typeof window !== 'undefined'
const IS_DEBUG = import.meta.env.DEBUG === 'true'
const IS_PROD = import.meta.env.NODE_ENV === 'production'
const IS_SERVER = import.meta.env.SSR

export {
  IN_BROWSER,
  IS_DEBUG,
  IS_PROD,
  IS_SERVER,
}
