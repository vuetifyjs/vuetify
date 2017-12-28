const THEME_DEFAULTS = {
  primary: '#1976D2',
  secondary: '#424242',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
}

export default function theme (theme) {
  theme = theme || {}

  return Object.assign({}, THEME_DEFAULTS, theme)
}
