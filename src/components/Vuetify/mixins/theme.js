const LIGHT_THEME_DEFAULTS = {
  primary: '#1976D2',
  secondary: '#424242',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
}

const DARK_THEME_DEFAULTS = LIGHT_THEME_DEFAULTS

export default function (opts) {
  const dark = opts.theme && opts.theme.dark
    ? opts.theme.dark
    : opts.theme
  const light = opts.theme && opts.theme.light
    ? opts.theme.light
    : opts.theme

  return {
    dark: Object.assign({}, DARK_THEME_DEFAULTS, dark),
    light: Object.assign({}, LIGHT_THEME_DEFAULTS, light)
  }
}
