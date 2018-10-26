import { VuetifyUseOptions, VuetifyTheme } from 'types'

/* eslint-disable no-multi-spaces */
const THEME_DEFAULTS = {
  primary: '#1976D2',   // blue.darken2
  secondary: '#424242', // grey.darken3
  accent: '#82B1FF',    // blue.accent1
  error: '#FF5252',     // red.accent2
  info: '#2196F3',      // blue.base
  success: '#4CAF50',   // green.base
  warning: '#FFC107'    // amber.base
}

export default function theme (theme: VuetifyUseOptions['theme'] = {}): VuetifyTheme | false {
  if (theme === false) return false

  return {
    ...THEME_DEFAULTS,
    ...theme
  }
}
