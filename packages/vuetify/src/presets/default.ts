/* eslint-disable */
import { VuetifyPreset } from 'vuetify/types/presets'

const preset: VuetifyPreset = {
  ssr: false,
  locale: {
    lang: 'en',
    rtl: false
  },
  theme: {
    options: {
      cspNonce: undefined,
    },
    default: 'light',
    themes: {
      dark: {
        primary: '#1976D2',   // blue.darken2
        secondary: '#424242', // grey.darken3
        accent: '#82B1FF',    // blue.accent1
        error: '#FF5252',     // red.accent2
        info: '#2196F3',      // blue.base
        success: '#4CAF50',   // green.base
        warning: '#FFC107'    // amber.base
      },
      light: {
        primary: '#FF5252',   // blue.darken2
        secondary: '#424242', // grey.darken3
        accent: '#82B1FF',    // blue.accent1
        error: '#FF5252',     // red.accent2
        info: '#2196F3',      // blue.base
        success: '#4CAF50',   // green.base
        warning: '#FFC107'    // amber.base
      }
    },
  },
  icons: {
    iconfont: 'md'
  }
}

export default preset
