import { VuetifyPreset } from 'vuetify/types/presets'

// Icons
import md from '../icons/md'

// Language
import en from '../locale/en'

const preset: VuetifyPreset = {
  breakpoint: {
    thresholds: {
      xs: 600,
      sm: 960,
      md: 1280,
      lg: 1920
    },
    scrollBarWidth: 16
  },
  icons: md,
  lang: {
    current: 'en',
    locales: { en }
  },
  rtl: false,
  theme: {
    dark: false,
    options: {
      cspNonce: null,
      customProperties: false,
      minifyTheme: null,
      themeCache: null
    },
    variants: {
      light: {
        primary: '#1976D2',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00'
      },
      dark: {
        primary: '#2196F3',
        secondary: '#424242',
        accent: '#FF3F80',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00'
      }
    }
  }
}

export default preset
