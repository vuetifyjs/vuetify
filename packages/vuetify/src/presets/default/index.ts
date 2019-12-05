// Styles
import '../../styles/main.sass'

// Utilities
import colors from '../../util/colors'

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
        primary: colors.blue.darken2,
        secondary: colors.grey.darken3,
        accent: colors.blue.accent1,
        error: colors.red.accent2,
        info: colors.blue.base,
        success: colors.green.base,
        warning: colors.amber.base,
      },
      dark: {
        primary: colors.blue.base,
        secondary: colors.grey.darken3,
        accent: colors.pink.accent2,
        error: colors.red.accent2,
        info: colors.blue.base,
        success: colors.green.base,
        warning: colors.amber.base,
      },
    },
  },
}
