const OPTIONS_DEFAULTS = {
  minifyTheme: null,
  themeCache: null,
  customProperties: false,
  cspNonce: null
}

export default function options (options = {}) {
  return Object.assign({}, OPTIONS_DEFAULTS, options)
}
