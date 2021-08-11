const IN_BROWSER = typeof window !== 'undefined'
const IS_DEBUG = process.env.DEBUG === 'true'
const IS_PROD = process.env.NODE_ENV === 'production'
const IS_SERVER = process.env.VUE_APP_WEBPACK_TARGET === 'node'

module.exports = {
  IN_BROWSER,
  IS_DEBUG,
  IS_PROD,
  IS_SERVER,
}
