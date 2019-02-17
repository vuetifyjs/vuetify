import {
  VuetifyIconOptions,
  VuetifyIconService
} from 'vuetify/types/services/icons'

import {
  VuetifyThemeService,
  VuetifyThemeOptions
} from 'vuetify/types/services/theme'

export interface VuetifyPreset {
  [name: string]: any

  ssr?: boolean
  locale?: {
    lang?: string
    rtl?: boolean
  }
  icons: VuetifyIconOptions
  theme: VuetifyThemeOptions
}
