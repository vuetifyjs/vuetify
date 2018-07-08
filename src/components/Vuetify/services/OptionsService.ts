const OPTIONS_DEFAULTS = {
  themeVariations: ['primary', 'secondary', 'accent'],
  minifyTheme: null,
  themeCache: null,
  cspNonce: null
}

export default function options (options = {}) {
  return Object.assign({}, OPTIONS_DEFAULTS, options)
}
