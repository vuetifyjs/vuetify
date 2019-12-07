// Services
import {
  Breakpoint,
  BreakpointOptions,
} from 'vuetify/types/services/breakpoint'
import {
  Icons,
  IconsOptions,
} from 'vuetify/types/services/icons'
import {
  Lang,
  LangOptions,
} from 'vuetify/types/services/lang'
import {
  Theme,
  ThemeOptions,
} from 'vuetify/types/services/theme'

export interface VuetifyPreset {
  breakpoint: {
    scrollBarWidth: Breakpoint['scrollBarWidth']
    thresholds: Breakpoint['thresholds']
  }
  icons: {
    iconfont: Icons['iconfont']
    values: Partial<Icons['values']>
  }
  lang: {
    current: Lang['current']
    locales: Partial<Lang['locales']>
    t: Lang['t']
  }
  theme: {
    dark: Theme['dark']
    default: Theme['default']
    disable: Theme['disable']
    options: Theme['options']
    themes: Theme['themes']
  }

  [name: string]: any
}

export interface UserVuetifyPreset {
  breakpoint?: BreakpointOptions
  icons?: IconsOptions
  lang?: LangOptions
  theme?: ThemeOptions

  [name: string]: any
}
