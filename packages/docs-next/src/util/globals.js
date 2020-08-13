const IN_BROWSER = typeof window !== 'undefined'
const IS_DEBUG = process.env.DEBUG === 'true'
const IS_PROD = process.env.NODE_ENV === 'production'

module.exports = {
  IN_BROWSER,
  IS_DEBUG,
  IS_PROD,
}
