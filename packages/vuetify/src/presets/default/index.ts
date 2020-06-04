// Styles
import '../../styles/main.sass'

// Locale
import { en } from '../../locale'

// Icons
// TODO: Enable for v3
// import mdi from '../../services/icons/presets/mdi'

// Types
import { VuetifyPreset } from 'vuetify/types/services/presets'

export const preset: VuetifyPreset = {
  breakpoint: {
    // TODO: update to MD2 spec in v3 - 1280
    mobileBreakpoint: 1264,
    scrollBarWidth: 16,
    thresholds: {
      xs: 600,
      sm: 960,
      md: 1280,
      lg: 1920,
    },
  },
  icons: {
    // TODO: remove v3
    iconfont: 'mdi',
    values: {},
  },
  lang: {
    current: 'en',
    locales: { en },
    // Default translator exists in lang service
    t: undefined as any,
  },
  rtl: false,
  theme: {
    dark: false,
    default: 'light',
    disable: false,
    options: {
      cspNonce: undefined,
      customProperties: undefined,
      minifyTheme: undefined,
      themeCache: undefined,
      variations: true,
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
