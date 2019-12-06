// Styles
import '../../styles/main.sass'

// Types
import { VuetifyPreset } from 'vuetify/types/presets'

export const Preset: VuetifyPreset = {
  breakpoint: {
    scrollBarWidth: 16,
    thresholds: {
      xs: 600,
      sm: 960,
      md: 1280,
      lg: 1920,
    },
  },
  goto: {
    container: undefined,
    duration: undefined,
    offset: undefined,
    easing: undefined,
    appOffset: undefined,
  },
  icons: {
    iconfont: 'mdi',
    values: {},
  },
  lang: {
    current: 'en',
    locales: {},
    t: undefined,
  },
  rtl: false,
  theme: {
    dark: false,
    disable: undefined,
    options: {
      cspNonce: undefined,
      customProperties: undefined,
      minifyTheme: undefined,
      themeCache: undefined,
    },
    themes: {
      light: {
        primary: '#1976D2',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
      },
      dark: {
        primary: '#2196F3',
        secondary: '#424242',
        accent: '#FF4081',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
      },
    },
  },
}
